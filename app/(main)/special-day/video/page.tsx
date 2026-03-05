"use client"

import { useState } from "react"
import { LockKeyhole, Play, Users, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SpecialDayHero } from "@/components/special-day-hero"
import { StudentCard } from "@/components/student-card"
import { StudentDetailDialog } from "@/components/student-detail-dialog"
import { MOCK_PROTECTED_VIDEO_DAY } from "@/lib/mock-special-days"
import type { Student } from "@/lib/mock-about"

export default function ProtectedVideoPage() {
  const specialDay = MOCK_PROTECTED_VIDEO_DAY

  const [password, setPassword] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [studentDialogOpen, setStudentDialogOpen] = useState(false)

  const handleUnlock = () => {
    setError(null)
    if (password === specialDay.password) {
      setIsUnlocked(true)
    } else {
      setError("Нууц үг буруу байна. Дахин оролдоно уу.")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUnlock()
    }
  }

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student)
    setStudentDialogOpen(true)
  }

  return (
    <>
      <SpecialDayHero specialDay={specialDay} />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {!isUnlocked ? (
          // Password Card - Locked State
          <div className="flex justify-center py-12 sm:py-20">
            <Card className="w-full max-w-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-full bg-muted">
                  <LockKeyhole className="size-7 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">Нууц үг оруулна уу</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Энэ видеог үзэхийн тулд нууц үг шаардлагатай
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Input
                  type="password"
                  placeholder="Нууц үг"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Нууц үг"
                  aria-describedby={error ? "password-error" : undefined}
                />

                {error && (
                  <div
                    id="password-error"
                    className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    role="alert"
                  >
                    <AlertCircle className="size-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button onClick={handleUnlock} className="w-full">
                  Нээх
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Unlocked State - Video + Content
          <div className="flex flex-col gap-10">
            {/* Video Section */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Play className="size-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">Видео</h2>
              </div>

              {/* Video Embed */}
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                {specialDay.youtubeUrl ? (
                  <iframe
                    src={specialDay.youtubeUrl}
                    title={specialDay.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <Play className="size-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </section>

            {/* Description Section */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                Тайлбар
              </h2>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {specialDay.description}
              </p>
            </section>

            {/* Special Students Section */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Users className="size-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold text-foreground">
                  Онцлох сурагчид
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {specialDay.specialStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onSelect={handleStudentSelect}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Student Detail Modal */}
      <StudentDetailDialog
        student={selectedStudent}
        open={studentDialogOpen}
        onOpenChange={setStudentDialogOpen}
      />
    </>
  )
}
