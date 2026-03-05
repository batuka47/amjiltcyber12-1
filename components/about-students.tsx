"use client"

import { useState } from "react"
import { MOCK_STUDENTS, type Student } from "@/lib/mock-about"
import { StudentCard } from "@/components/student-card"
import { StudentDetailDialog } from "@/components/student-detail-dialog"

export function AboutStudents() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleSelect(student: Student) {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-xl" aria-hidden="true">&#x1F9D1;&#x200D;&#x1F91D;&#x200D;&#x1F9D1;</span>
        <h2 className="text-lg font-semibold text-foreground">Сурагчид</h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Амжилт кибер 12-1 ангийн сурагчид ба тэдний амжилтууд
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {MOCK_STUDENTS.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <StudentDetailDialog
        student={selectedStudent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  )
}
