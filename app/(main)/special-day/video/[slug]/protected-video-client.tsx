"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import {
  AlertCircle,
  KeyRound,
  Users,
  UserRound,
  PlayCircle,
} from "lucide-react"

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

type SpecialDayRow = {
  id: string
  slug: string
  title: string
  hero_title: string | null
  hero_subtitle: string | null
  hero_image_url: string | null
  type: "photo_collection" | "protected_video"
  event_date: string | null
  is_public: boolean
}

type ProfileRow = {
  id: string
  role: "student" | "teacher" | "admin" | null
  full_name: string
  avatar_url: string | null
  best_title: string | null
  quote: string | null
}

type VideoRowPublic = {
  id: string
  special_day_id: string
  profile_id: string
  title: string | null
  created_at: string | null
}

type SpecialDayStudentRow = {
  special_day_id: string
  profile_id: string
}

type VideoItem = {
  videoId: string
  videoTitle: string
  role: string | null
  quote: string | null
  student: Student
}

type StudentListItem = {
  student: Student
  video: VideoItem | null
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

  const [specialDay, setSpecialDay] = useState<SpecialDayRow | null>(null)
  const [teacherVideo, setTeacherVideo] = useState<VideoItem | null>(null)
  const [studentItems, setStudentItems] = useState<StudentListItem[]>([])

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
        .from("special_days")
        .select("id,slug,title,hero_title,hero_subtitle,hero_image_url,type,event_date,is_public")
        .eq("slug", slug)
        .eq("is_public", true)
        .maybeSingle()

      if (!mounted) return

      if (dayErr || !day) {
        dumpSupabaseError("[special_days error]", dayErr, { slug })
        setSpecialDay(null)
        setTeacherVideo(null)
        setStudentItems([])
        setLoadError("Онцгой өдөр олдсонгүй.")
        setLoading(false)
        return
      }

      const ev = day as SpecialDayRow
      setSpecialDay(ev)

      if (ev.type !== "protected_video") {
        setTeacherVideo(null)
        setStudentItems([])
        setLoading(false)
        return
      }

      // 2) get public video rows
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
        setStudentItems([])
        setLoading(false)
        return
      }

      const safeVideoRows = (videoRows ?? []) as VideoRowPublic[]

      // 3) get student membership list
      const { data: dayStudents, error: dsErr } = await supabase
        .from("special_day_students")
        .select("special_day_id,profile_id")
        .eq("special_day_id", ev.id)

      if (!mounted) return

      if (dsErr) {
        dumpSupabaseError("[special_day_students error]", dsErr, {
          slug,
          specialDayId: ev.id,
        })
        setTeacherVideo(null)
        setStudentItems([])
        setLoading(false)
        return
      }

      const studentMembershipRows = (dayStudents ?? []) as SpecialDayStudentRow[]
      const studentProfileIds = Array.from(
        new Set(studentMembershipRows.map((r) => r.profile_id).filter(Boolean))
      )

      const videoProfileIds = Array.from(
        new Set(safeVideoRows.map((r) => r.profile_id).filter(Boolean))
      )

      const allNeededProfileIds = Array.from(
        new Set([...studentProfileIds, ...videoProfileIds])
      )

      if (allNeededProfileIds.length === 0) {
        setTeacherVideo(null)
        setStudentItems([])
        setLoading(false)
        return
      }

      // NOTE:
      // current public_profiles view still seems to expose `bio`, not `quote`
      // so we alias bio -> quote in the select
      const { data: profiles, error: pErr } = await supabase
        .from("public_profiles")
        .select("id,role,full_name,avatar_url,best_title,quote:bio")
        .in("id", allNeededProfileIds)

      if (!mounted) return

      if (pErr) {
        dumpSupabaseError("[public_profiles error]", pErr, { slug, specialDayId: ev.id })
        setTeacherVideo(null)
        setStudentItems([])
        setLoading(false)
        return
      }

      const profileMap = new Map<string, ProfileRow>()
      ;(profiles ?? []).forEach((p: any) => {
        profileMap.set(p.id, p as ProfileRow)
      })

      const videoByProfileId = new Map<string, VideoRowPublic>()
      for (const row of safeVideoRows) {
        if (!videoByProfileId.has(row.profile_id)) {
          videoByProfileId.set(row.profile_id, row)
        }
      }

      // Teacher comes from video rows + profile role
      let teacher: VideoItem | null = null

      for (const row of safeVideoRows) {
        const p = profileMap.get(row.profile_id)
        if (!p || p.role !== "teacher") continue

        const teacherStudent: Student = {
          id: p.id,
          name: p.full_name,
          avatarUrl: p.avatar_url ?? null,
          bestTitle: p.best_title ?? null,
          role: "teacher",
          achievements: [],
        }

        teacher = {
          videoId: row.id,
          videoTitle: row.title?.trim() || p.full_name,
          role: p.role,
          quote: p.quote ?? null,
          student: teacherStudent,
        }
        break
      }

      // Students come from special_day_students
      const studentsSorted: StudentListItem[] = studentProfileIds
        .map((profileId) => {
          const p = profileMap.get(profileId)
          if (!p) return null

          const student: Student = {
            id: p.id,
            name: p.full_name,
            avatarUrl: p.avatar_url ?? null,
            bestTitle: p.best_title ?? null,
            role: "student",
            achievements: [],
          }

          const videoRow = videoByProfileId.get(profileId)

          const video: VideoItem | null = videoRow
            ? {
                videoId: videoRow.id,
                videoTitle: videoRow.title?.trim() || p.full_name,
                role: p.role ?? "student",
                quote: p.quote ?? null,
                student,
              }
            : null

          return { student, video }
        })
        .filter(Boolean)
        .sort((a, b) => a!.student.name.localeCompare(b!.student.name)) as StudentListItem[]

      setTeacherVideo(teacher)
      setStudentItems(studentsSorted)
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
      {teacherVideo && (
        <section className="mb-10">
          <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-4 p-5 sm:gap-6 sm:p-7">
              <div className="shrink-0">
                {teacherVideo.student.avatarUrl ? (
                  <img
                    src={teacherVideo.student.avatarUrl}
                    alt={teacherVideo.student.name}
                    className="rounded-xl object-cover"
                    style={{
                      width: "325px",
                      height: "325px",
                      maxWidth: "325px",
                      maxHeight: "325px",
                      display: "block"
                    }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center rounded-xl bg-muted"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <UserRound className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
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

                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {teacherVideo.student.name}
                </h2>

                <div className="mt-4 ml-0 flex justify-center sm:justify-start">
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
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Онцлох сурагчид</h2>
          </div>

          {studentItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {studentItems.map((item) => (
                <div key={item.student.id} className="flex flex-col gap-2">
                  <StudentCard
                    student={item.student}
                    showAchievementsCount={false}
                    showDetailsButton={false}
                  />

                  <Button
                    variant="outline"
                    className="w-full rounded-xl"
                    disabled={!item.video}
                    onClick={() => item.video && openUnlockForVideo(item.video)}
                  >
                    {item.video ? "Үзэх" : "Видео алга"}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 flex justify-center">
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-background px-6 py-8 text-center shadow-sm">
                <Users className="mb-1 h-6 w-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Одоогоор сурагч нэмээгүй байна.</p>
              </div>
            </div>
          )}
        </section>
      </main>

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
            <DialogDescription>
              Нууц үгээ оруулсны дараа видео гарч ирнэ.
            </DialogDescription>
          </DialogHeader>

          {!unlockedUrl ? (
            <div className="flex flex-col gap-3 mt-4">
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