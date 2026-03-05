"use client"

import type { Student } from "@/lib/students"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { User, Trophy } from "lucide-react"

interface StudentDetailDialogProps {
  student: Student | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudentDetailDialog({
  student,
  open,
  onOpenChange,
}: StudentDetailDialogProps) {
  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
            {/* Bigger avatar */}
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-accent/10">
              {student.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={student.avatarUrl}
                  alt={`${student.name} зураг`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
                  <User className="size-9 text-accent" />
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-1 sm:items-start">
              <DialogTitle>{student.name}</DialogTitle>
              <DialogDescription asChild>
                <span>
                  {student.bestTitle ? (
                    <Badge variant="secondary">{student.bestTitle}</Badge>
                  ) : (
                    <Badge variant="secondary">—</Badge>
                  )}
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Achievements */}
        <div className="flex flex-col gap-1">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Trophy className="size-3.5" aria-hidden="true" />
            Амжилтууд
          </h4>

          {student.achievements.length > 0 ? (
            <div className="mt-2 flex flex-col gap-4">
              {student.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h5 className="text-sm font-medium text-foreground">
                      {achievement.title}
                    </h5>

                    {achievement.achieved_on ? (
                      <time
                        dateTime={achievement.achieved_on}
                        className="text-xs text-muted-foreground"
                      >
                        {new Date(achievement.achieved_on).toLocaleDateString("mn-MN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    ) : (
                      <span className="text-xs text-muted-foreground"></span>
                    )}
                  </div>

                  {achievement.description ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {achievement.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Амжилтын мэдээлэл байхгүй байна.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}