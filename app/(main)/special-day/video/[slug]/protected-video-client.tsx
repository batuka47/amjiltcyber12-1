"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { AlertCircle, KeyRound, Users, UserRound, PlayCircle } from "lucide-react"

import { supabase } from "@/lib/supabase/client"
import { SpecialDayHero } from "@/components/special-day-hero"
import { StudentCard } from "@/components/student-card"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import type { Student } from "@/lib/students"
import { buildEmbedUrl, parseYouTube } from "@/lib/youtube"

type SpecialDayPublicRow = {
  id: string
  slug: string
  title: string
  hero_title: string | null
  hero_subtitle: string | null
  hero_image_url: string | null
  type: "gallery" | "protected_video"
  event_date: string | null
}

type ProfileRow = {
  id: string
  role: string | null
  full_name: string
  avatar_url: string | null
  best_title: string | null
  bio?: string | null
}

type VideoRowPublic = {
  id: string
  special_day_id: string
  profile_id: string
  title: string | null
  created_at: string | null
}

type VideoItem = {
  videoId: string
  videoTitle: string
  role: string | null
  bio?: string | null
  student: Student
}

function dumpSupabaseError(tag: string, err: any, extra?: any) {
  const summary = {
    ...(extra ?? {}),
    message: err?.message ?? null,
    details: err?.details ?? null,
    hint: err?.hint ?? null,
    code: err?.code ?? null,
    status: err?.status ?? null,
  }
  console.error(tag + " " + JSON.stringify(summary))
}

function normalizeHeroImage(value?: string | null) {
  if (!value) return null
  const v = value.trim()
  if (!v) return null
  if (v.startsWith("http://") || v.startsWith("https://")) return v

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) return null
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${v}`
}

export default function ProtectedVideoClient({ slug: slugProp }: { slug?: string }) {
  const params = useParams<{ slug: string }>()
  const slug = slugProp ?? params?.slug

  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [specialDay, setSpecialDay] = useState<SpecialDayPublicRow | null>(null)
  const [teacherVideo, setTeacherVideo] = useState<VideoItem | null>(null)
  const [studentVideos, setStudentVideos] = useState<VideoItem[]>([])

  // unlock dialog
  const [unlockOpen, setUnlockOpen] = useState(false)
  const [unlockVideo, setUnlockVideo] = useState<VideoItem | null>(null)
  const [password, setPassword] = useState("")
  const [unlocking, setUnlocking] = useState(false)
  const [unlockError, setUnlockError] = useState<string | null>(null)
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let mounted = true

    ;(async () => {
      setLoading(true)
      setLoadError(null)

      // 1) special day
      const { data: day, error: dayErr } = await supabase
        .from("special_days_public")
        .select("id,slug,title,hero_title,hero_subtitle,hero_image_url,type,event_date")
        .eq("slug", slug)
        .maybeSingle()

      if (!mounted) return

      if (dayErr || !day) {
        dumpSupabaseError("[special_days_public error]", dayErr, { slug })
        setSpecialDay(null)
        setTeacherVideo(null)
        setStudentVideos([])
        setLoadError("Онцгой өдөр олдсонгүй.")
        setLoading(false)
        return
      }

      const ev = day as SpecialDayPublicRow
      setSpecialDay(ev)

      if (ev.type !== "protected_video") {
        setTeacherVideo(null)
        setStudentVideos([])
        setLoading(false)
        return
      }

      // 2) videos (public view)
      const { data: videoRows, error: vErr } = await supabase
        .from("special_day_student_videos_public")
        .select("id,special_day_id,profile_id,title,created_at")
        .eq("special_day_id", ev.id)
        .order("created_at", { ascending: true })

      if (!mounted) return

      if (vErr) {
        dumpSupabaseError("[special_day_student_videos_public error]", vErr, {
          slug,
          specialDayId: ev.id,
        })
        setTeacherVideo(null)
        setStudentVideos([])
        setLoading(false)
        return
      }

      const rows = (videoRows ?? []) as VideoRowPublic[]
      if (rows.length === 0) {
        setTeacherVideo(null)
        setStudentVideos([])
        setLoading(false)
        return
      }

      const profileIds = Array.from(new Set(rows.map((r) => r.profile_id).filter(Boolean)))

      // 3) profiles (must include role)
      const { data: profiles, error: pErr } = await supabase
        .from("public_profiles")
        .select("id,role,full_name,avatar_url,best_title,bio")
        .in("id", profileIds)

      if (!mounted) return

      if (pErr) {
        dumpSupabaseError("[public_profiles error]", pErr, { slug, specialDayId: ev.id })
        setTeacherVideo(null)
        setStudentVideos([])
        setLoading(false)
        return
      }

      const mapById = new Map<string, ProfileRow>()
      ;(profiles ?? []).forEach((p: any) => mapById.set(p.id, p as ProfileRow))

      const mapped: VideoItem[] = rows
        .map((r) => {
          const p = mapById.get(r.profile_id)
          if (!p) return null

          const student: Student = {
            id: p.id,
            name: p.full_name,
            avatarUrl: p.avatar_url ?? null,
            bestTitle: p.best_title ?? null,
            role: (p.role === "teacher" ? "teacher" : "student"),
            achievements: [],
          }

          return {
            videoId: r.id,
            videoTitle: (r.title?.trim() || p.full_name) as string,
            role: p.role ?? null,
            bio: p.bio ?? null,
            student,
          }
        })
        .filter(Boolean) as VideoItem[]

      // ✅ 1) Teacher card = role==teacher (take first one if multiple)
      const teacher = mapped.find((x) => x.role === "teacher") ?? null

      // ✅ 2) Student list = ONLY role==student
      const studentsOnly = mapped.filter((x) => x.role === "student")

      setTeacherVideo(teacher)
      setStudentVideos(studentsOnly)
      setLoading(false)
    })()

    return () => {
      mounted = false
    }
  }, [slug])

  const heroModel = useMemo(() => {
    if (!specialDay) return null
    return {
      title: specialDay.hero_title ?? specialDay.title,
      subtitle: specialDay.hero_subtitle ?? null,
      date: specialDay.event_date ?? null,
      coverImage: normalizeHeroImage(specialDay.hero_image_url),
    }
  }, [specialDay])

  const embedUrl = useMemo(() => {
    if (!unlockedUrl) return ""
    const { id } = parseYouTube(unlockedUrl)
    if (!id) return ""
    return buildEmbedUrl(id)
  }, [unlockedUrl])

  const openUnlockForVideo = (item: VideoItem) => {
    setUnlockVideo(item)
    setPassword("")
    setUnlockError(null)
    setUnlockedUrl(null)
    setUnlockOpen(true)
  }

  const handleUnlock = async () => {
    if (!unlockVideo) return
    setUnlocking(true)
    setUnlockError(null)

    const { data, error } = await supabase.rpc("unlock_special_day_student_video", {
      p_video_id: unlockVideo.videoId,
      p_password: password,
    })

    if (error) {
      dumpSupabaseError("[unlock_special_day_student_video error]", error, {
        slug,
        videoId: unlockVideo.videoId,
      })
      setUnlocking(false)
      setUnlockedUrl(null)
      setUnlockError("Нууц үг буруу байна. Дахин оролдоно уу.")
      return
    }

    setUnlockedUrl(data as string)
    setUnlocking(false)
  }

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleUnlock()
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="text-sm text-muted-foreground">Уншиж байна...</p>
      </main>
    )
  }

  if (loadError || !specialDay || !heroModel) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="text-sm text-muted-foreground">{loadError ?? "Алдаа гарлаа."}</p>
      </main>
    )
  }

  return (
    <>
      <SpecialDayHero specialDay={heroModel} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* ✅ TEACHER BIG CARD + "Үзэх" */}
        {teacherVideo && (
          <section className="mb-10">
            <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                <div className="shrink-0">
                  {teacherVideo.student.avatarUrl ? (
                    <img
                      src={teacherVideo.student.avatarUrl}
                      alt={teacherVideo.student.name}
                      className="h-28 w-28 rounded-3xl object-cover sm:h-36 sm:w-36"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-muted sm:h-36 sm:w-36">
                      <UserRound className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      Багш
                    </Badge>

                    {teacherVideo.student.bestTitle ? (
                      <Badge className="rounded-full bg-[#ffbb98]/20 text-foreground hover:bg-[#ffbb98]/30">
                        {teacherVideo.student.bestTitle}
                      </Badge>
                    ) : null}
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {teacherVideo.student.name}
                  </h2>

                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    {teacherVideo.videoTitle}
                  </p>

                  {teacherVideo.bio ? (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                      {teacherVideo.bio}
                    </p>
                  ) : null}

                  <div className="mt-5">
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => openUnlockForVideo(teacherVideo)}
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Үзэх
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STUDENTS */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Онцлох сурагчид</h2>
          </div>

          {studentVideos.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {studentVideos.map((item) => (
                <div key={item.videoId} className="flex flex-col gap-2">
                  <StudentCard
                    student={item.student}
                    showAchievementsCount={false}
                    showDetailsButton={false}
                  />

                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    onClick={() => openUnlockForVideo(item)}
                  >
                    Үзэх
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 flex justify-center">
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-background px-6 py-8 text-center shadow-sm">
                <Users className="mb-1 h-6 w-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Одоогоор видео нэмээгүй байна.</p>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Unlock dialog (same for teacher + students) */}
      <Dialog
        open={unlockOpen}
        onOpenChange={(open) => {
          setUnlockOpen(open)
          if (!open) {
            setUnlockVideo(null)
            setPassword("")
            setUnlockError(null)
            setUnlockedUrl(null)
          }
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="size-4 text-muted-foreground" />
              {unlockVideo ? `${unlockVideo.student.name} — видео` : "Хувийн видео"}
            </DialogTitle>
            <DialogDescription>Нууц үгээ оруулсны дараа видео гарч ирнэ.</DialogDescription>
          </DialogHeader>

          {!unlockedUrl ? (
            <div className="flex flex-col gap-3">
              <Input
                type="password"
                placeholder="Нууц үг"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
                className="rounded-xl"
              />

              {unlockError && (
                <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{unlockError}</span>
                </div>
              )}

              <Button
                onClick={handleUnlock}
                disabled={unlocking || password.trim().length === 0}
                className="w-full rounded-xl"
              >
                {unlocking ? "Шалгаж байна..." : "Нээх"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-muted">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={unlockVideo ? unlockVideo.student.name : "Private video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                    Линк буруу байна.
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={() => {
                  setUnlockedUrl(null)
                  setPassword("")
                  setUnlockError(null)
                }}
              >
                Өөр нууц үг оруулах
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}