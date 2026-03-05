import { TEACHER } from "@/lib/mock-about"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, User, GraduationCap } from "lucide-react"

export function AboutTeacher() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="text-xl" aria-hidden="true">&#x1F469;&#x200D;&#x1F3EB;</span>
        <h2 className="text-lg font-semibold text-foreground">Багш</h2>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm">
        <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-start">
          {/* Avatar placeholder */}
          <div
            className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-accent/10"
            aria-hidden="true"
          >
            <GraduationCap className="size-10 text-accent" />
          </div>

          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {TEACHER.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {TEACHER.position}
              </p>
            </div>

            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              {TEACHER.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="size-3.5 text-primary" aria-hidden="true" />
                {TEACHER.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="size-3.5 text-primary" aria-hidden="true" />
                {TEACHER.phone}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
