"use client"

import { ImageIcon, CalendarIcon } from "lucide-react"
import type { SpecialDay, SpecialDayGallery, SpecialDayProtectedVideo } from "@/lib/mock-special-days"

interface SpecialDayHeroProps {
  specialDay: SpecialDay
}

export function SpecialDayHero({ specialDay }: SpecialDayHeroProps) {
  const formattedDate = new Date(specialDay.date).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section className="relative overflow-hidden bg-muted">
      {/* Cover image or placeholder */}
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
            <ImageIcon
              className="size-24 text-muted-foreground/20"
              aria-hidden="true"
            />
          </div>
        )}
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-start gap-3">
          {/* Date badge */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-border/60 bg-background/80 px-3.5 py-1.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm">
            <CalendarIcon className="size-3.5" aria-hidden="true" />
            <span>{formattedDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {specialDay.title}
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {specialDay.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
