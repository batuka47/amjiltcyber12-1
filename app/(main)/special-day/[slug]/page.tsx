"use client"

import { useEffect, useMemo, useState } from "react"
import { AlertCircle, KeyRound, Users } from "lucide-react"

import { supabase } from "@/lib/supabase/client" // adjust if needed
import { SpecialDayHero } from "@/components/special-day-hero"
import { StudentCard } from "@/components/student-card"
import { StudentDetailDialog } from "@/components/student-detail-dialog"

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
}

type ProfileRow = {
  id: string
  full_name: string
  avatar_url: string | null
  best_title: string | null
}

export default function ProtectedVideoPage() {
  const slug = "march-8"

  const [loading, setLoading] = useState(true)
  const [specialDay, setSpecialDay] = useState<SpecialDayPublicRow | null>(null)
  const [specialStudents, setSpecialStudents] = useState<Student[]>([])

  // student detail dialog (your existing dialog)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [studentDialogOpen, setStudentDialogOpen] = useState(false)

  // unlock dialog (password + video)
  const [unlockOpen, setUnlockOpen] = useState(false)
  const [unlockStudent, setUnlockStudent] = useState<Student | null>(null)
  const [password, setPassword] = useState("")
  const [unlocking, setUnlocking] = useState(false)
  const [unlockError, setUnlockError] = useState<string | null>(null)
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      setLoading(true)

      const { data: day, error: dayErr } = await supabase
        .from("special_days_public")
        .select("id,slug,title,hero_title,hero_subtitle,hero_image_url,type")
        .eq("slug", slug)
        .maybeSingle()

      if (!mounted) return
      if (dayErr || !day) {
        console.error(dayErr)
        setSpecialDay(null)
        setSpecialStudents([])
        setLoading(false)
        return
      }

      setSpecialDay(day as SpecialDayPublicRow)

      // load special students
      const { data: rows, error: joinErr } = await supabase
        .from("special_day_students")
        .select("profile_id, profiles:profiles (id, full_name, avatar_url, best_title)")
        .eq("special_day_id", (day as any).id)

      if (!mounted) return

      if (joinErr) {
        console.error(joinErr)
        setSpecialStudents([])
      } else {
        const mapped: Student[] = (rows ?? [])
          .map((r: any) => r?.profiles as ProfileRow | null)
          .filter(Boolean)
          .map((p) => ({
            id: p!.id,
            name: p!.full_name,
            avatarUrl: p!.avatar_url ?? null,
            bestTitle: p!.best_title ?? null,
            achievements: [],
          }))

        setSpecialStudents(mapped)
      }

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
      description: specialDay.hero_subtitle ?? "",
      coverUrl: specialDay.hero_image_url ?? null,
    }
  }, [specialDay])

  const embedUrl = useMemo(() => {
    if (!unlockedUrl) return ""
    const { id } = parseYouTube(unlockedUrl)
    if (!id) return ""
    return buildEmbedUrl(id)
  }, [unlockedUrl])

  const openUnlockForStudent = (student: Student) => {
    setUnlockStudent(student)
    setPassword("")
    setUnlockError(null)
    setUnlockedUrl(null)
    setUnlockOpen(true)
  }

  const handleUnlock = async () => {
    if (!unlockStudent) return
    setUnlocking(true)
    setUnlockError(null)

    const { data, error } = await supabase.rpc("unlock_student_video", {
      p_special_slug: slug,
      p_profile_id: unlockStudent.id,
      p_password: password,
    })

    if (error) {
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

  if (!specialDay || !heroModel) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="text-sm text-muted-foreground">Онцгой өдөр олдсонгүй.</p>
      </main>
    )
  }

  return (
    <>
      <SpecialDayHero specialDay={heroModel as any} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">
              Онцлох сурагчид
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {specialStudents.map((student) => (
              <div key={student.id} className="flex flex-col gap-2">
                <StudentCard
                  student={student}
                  onSelect={(s) => {
                    // keep your existing student detail dialog on "Дэлгэрэнгүй"
                    setSelectedStudent(s)
                    setStudentDialogOpen(true)
                  }}
                />

                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => openUnlockForStudent(student)}
                >
                  Хувийн видео үзэх
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Student detail (your existing) */}
      <StudentDetailDialog
        student={selectedStudent}
        open={studentDialogOpen}
        onOpenChange={setStudentDialogOpen}
      />

      {/* Unlock + video dialog */}
      <Dialog
        open={unlockOpen}
        onOpenChange={(open) => {
          setUnlockOpen(open)
          if (!open) {
            setUnlockStudent(null)
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
              {unlockStudent ? `${unlockStudent.name} — хувийн видео` : "Хувийн видео"}
            </DialogTitle>
            <DialogDescription>
              Нууц үгээ оруулсны дараа видео гарч ирнэ.
            </DialogDescription>
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
                <div
                  className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive"
                  role="alert"
                >
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
                    title={unlockStudent ? unlockStudent.name : "Private video"}
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
                  // allow switching students without closing page
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