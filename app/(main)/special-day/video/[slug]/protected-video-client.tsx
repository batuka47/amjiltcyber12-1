"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { AlertCircle, KeyRound, Users } from "lucide-react"

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
  full_name: string
  avatar_url: string | null
  best_title: string | null
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

export default function ProtectedVideoClient({ slug: slugProp }: { slug?: string }) {
  const params = useParams<{ slug: string }>()
  const slug = slugProp ?? params?.slug

  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [specialDay, setSpecialDay] = useState<SpecialDayPublicRow | null>(null)
  const [videos, setVideos] = useState<VideoItem[]>([])

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

      // 1) Load special day (public)
      const { data: day, error: dayErr } = await supabase
        .from("special_days_public")
        .select("id,slug,title,hero_title,hero_subtitle,hero_image_url,type,event_date")
        .eq("slug", slug)
        .maybeSingle()

      if (!mounted) return

      if (dayErr || !day) {
        dumpSupabaseError("[special_days_public error]", dayErr, { slug })
        setSpecialDay(null)
        setVideos([])
        setLoadError("Онцгой өдөр олдсонгүй.")
        setLoading(false)
        return
      }

      const ev = day as SpecialDayPublicRow
      setSpecialDay(ev)

      if (ev.type !== "protected_video") {
        setVideos([])
        setLoading(false)
        return
      }

      // 2) Load video rows from SAFE VIEW (no youtube_url/password_hash)
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
        setVideos([])
        setLoading(false)
        return
      }

      const rows = (videoRows ?? []) as VideoRowPublic[]
      if (rows.length === 0) {
        setVideos([])
       	setLoading(false)
        return
      }

      const profileIds = Array.from(new Set(rows.map((r) => r.profile_id).filter(Boolean)))

      // 3) Fetch profiles (public view)
      const { data: profiles, error: pErr } = await supabase
        .from("public_profiles")
        .select("id,full_name,avatar_url,best_title")
        .in("id", profileIds)

      if (!mounted) return

      if (pErr) {
        dumpSupabaseError("[public_profiles error]", pErr, {
          slug,
          specialDayId: ev.id,
        })
        setVideos([])
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
            achievements: [], // ✅ not needed on this page
          }

          return {
            videoId: r.id,
            videoTitle: (r.title?.trim() || p.full_name) as string,
            student,
          }
        })
        .filter(Boolean) as VideoItem[]

      setVideos(mapped)
      setLoading(false)
    })()

    return () => {
      mounted = false
    }
  }, [slug])

  // ✅ CONNECT HERO TO DB (this is the "3rd step")
  const heroModel = useMemo(() => {
    if (!specialDay) return null
    return {
      title: specialDay.hero_title ?? specialDay.title,
      subtitle: specialDay.hero_subtitle ?? null,
      date: specialDay.event_date ?? null,
      coverImage: specialDay.hero_image_url ?? null,
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
      {/* ✅ HERO CONNECTED */}
      <SpecialDayHero specialDay={heroModel} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Онцлох сурагчид</h2>
          </div>

          {videos.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {videos.map((item) => (
                <div key={item.videoId} className="flex flex-col gap-2">
                  {/* ✅ Hide "0 амжилт" + "Дэлгэрэнгүй" only on this page */}
                  <StudentCard
                    student={item.student}
                    showAchievementsCount={false}
                    showDetailsButton={false}
                  />

                  <div className="px-1 text-xs text-muted-foreground line-clamp-1">
                    {item.videoTitle}
                  </div>

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

      {/* Unlock dialog */}
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