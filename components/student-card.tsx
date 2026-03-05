import type { Student } from "@/lib/mock-about"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

interface StudentCardProps {
  student: Student
  onSelect: (student: Student) => void
}

export function StudentCard({ student, onSelect }: StudentCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      <CardContent className="flex flex-col items-center gap-3 p-5 text-center">
        {/* Avatar placeholder */}
        <div
          className="flex size-16 items-center justify-center rounded-2xl bg-accent/10 transition-colors duration-200 group-hover:bg-accent/15"
          aria-hidden="true"
        >
          <User className="size-7 text-accent" />
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <h3 className="text-sm font-semibold text-foreground">
            {student.name}
          </h3>
          <Badge className="rounded-full bg-[#ffbb98]/20 text-foreground text-xs hover:bg-[#ffbb98]/30">
            {student.bestTitle}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground">
          {student.achievements.length} амжилт
        </p>

        <Button
          variant="outline"
          size="sm"
          className="w-full rounded-xl border-border/60 bg-secondary/70 text-foreground hover:bg-secondary transition-all duration-200"
          onClick={() => onSelect(student)}
        >
          Дэлгэрэнгүй
        </Button>
      </CardContent>
    </Card>
  )
}
