import type { Student } from "@/lib/students"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

interface StudentCardProps {
  student: Student
  onSelect?: (student: Student) => void

  // ✅ new toggles
  showAchievementsCount?: boolean
  showDetailsButton?: boolean
}

export function StudentCard({
  student,
  onSelect,
  showAchievementsCount = true,
  showDetailsButton = true,
}: StudentCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="flex flex-col items-center gap-3 p-5 text-center">
        {/* Avatar */}
        <div className="relative size-16 overflow-hidden rounded-2xl bg-accent/10 transition-colors duration-200 group-hover:bg-accent/15">
          {student.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={student.avatarUrl}
              alt={`${student.name} зураг`}
              className="w-full object-cover scale-125"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
              <User className="size-7 text-accent" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <h3 className="text-sm font-semibold text-foreground">{student.name}</h3>

          {student.bestTitle ? (
            <Badge className="rounded-full bg-[#ffbb98]/20 text-foreground text-xs hover:bg-[#ffbb98]/30">
              {student.bestTitle}
            </Badge>
          ) : (
            <Badge variant="secondary" className="rounded-full text-xs">
              —
            </Badge>
          )}
        </div>

        {/* ✅ Hide on special-day page */}
        {showAchievementsCount && (
          <p className="text-xs text-muted-foreground">
            {student.achievements?.length ?? 0} амжилт
          </p>
        )}

        {/* ✅ Hide on special-day page */}
        {showDetailsButton && onSelect && (
          <Button
            variant="outline"
            size="sm"
            className="w-full rounded-xl border-border/60 bg-secondary/70 text-foreground transition-all duration-200 hover:bg-secondary"
            onClick={() => onSelect(student)}
          >
            Дэлгэрэнгүй
          </Button>
        )}
      </CardContent>
    </Card>
  )
}