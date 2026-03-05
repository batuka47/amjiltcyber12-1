"use client"

import { useEffect, useMemo, useState } from "react"
import { fetchStudentsWithAchievements, type Student } from "@/lib/students"
import { StudentCard } from "@/components/student-card"
import { StudentDetailDialog } from "@/components/student-detail-dialog"

export function AboutStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    let alive = true

    async function run() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchStudentsWithAchievements()
        if (!alive) return
        setStudents(data)
      } catch (e: any) {
        if (!alive) return
        setError(e?.message ?? "Алдаа гарлаа.")
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }

    run()
    return () => {
      alive = false
    }
  }, [])

  function handleSelect(student: Student) {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  const subtitle = useMemo(() => {
    if (loading) return "Ачаалж байна…"
    if (error) return "Мэдээлэл татахад алдаа гарлаа."
    return `Нийт ${students.length} сурагч`
  }, [loading, error, students.length])

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-2 flex items-center gap-2.5">
        <span className="text-xl" aria-hidden="true">
          &#x1F9D1;&#x200D;&#x1F91D;&#x200D;&#x1F9D1;
        </span>
        <h2 className="text-lg font-semibold text-foreground">Сурагчид</h2>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">{subtitle}</p>

      {error ? (
        <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm text-foreground">
          <div className="font-medium">Алдаа</div>
          <div className="mt-1 text-muted-foreground">{error}</div>
          <div className="mt-3 text-muted-foreground">
            Tip: Supabase дээр `public_profiles` view, `achievements` хүснэгтүүдэд
            anon хэрэглэгч SELECT зөвшөөрөлтэй эсэхээ шалгаарай.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} onSelect={handleSelect} />
          ))}
        </div>
      )}

      <StudentDetailDialog
        student={selectedStudent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  )
}