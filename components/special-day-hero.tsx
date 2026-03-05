"use client"

import { ImageIcon, CalendarIcon } from "lucide-react"

export type SpecialDayHeroModel = {
  title: string
  subtitle?: string | null
  date?: string | Date | null
  coverImage?: string | null
}

interface SpecialDayHeroProps {
  specialDay: SpecialDayHeroModel
}

function safeDate(value?: string | Date | null) {
  if (!value) return null
  const d = value instanceof Date ? value : new Date(value)
  return Number.isNaN(d.getTime()) ? null : d
}

export function SpecialDayHero({ specialDay }: SpecialDayHeroProps) {
  const dateObj = safeDate(specialDay.date)
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString("mn-MN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="absolute inset-0">
        {specialDay.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={specialDay.coverImage}
            alt={specialDay.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted">
            <ImageIcon className="size-24 text-muted-foreground/20" aria-hidden="true" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-start gap-3">
          {formattedDate && (
            <div className="flex items-center gap-1.5 rounded-2xl border border-border/60 bg-background/80 px-3.5 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm">
              <CalendarIcon className="size-3.5" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
          )}

          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {specialDay.title}
          </h1>

          {specialDay.subtitle ? (
            <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              {specialDay.subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}