"use client"

import { useEffect, useState } from "react"
import { EventCard, type EventItem } from "@/components/event-card"
import { Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase/client" // ✅ adjust if needed

type SpecialDayPublicRow = {
  slug: string
  title: string
  hero_subtitle: string | null
  hero_image_url: string | null
  type: "gallery" | "protected_video"
}

export function FeaturedEvents() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("special_days_public")
        .select("slug,title,hero_subtitle,hero_image_url,type")
        .order("created_at", { ascending: false })

      if (!mounted) return

      if (error) {
        console.error(error)
        setEvents([])
        setLoading(false)
        return
      }

      const mapped: EventItem[] = (data ?? []).map((row: any) => {
        const r = row as SpecialDayPublicRow
        return {
          slug: r.slug,
          title: r.title,
          description: r.hero_subtitle ?? " ",
          type: r.type === "protected_video" ? "Нууц видео" : "Зураг",
          coverUrl: r.hero_image_url ?? null,
        }
      })

      setEvents(mapped)
      setLoading(false)
    })()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-accent/10">
            <Sparkles className="size-5 text-accent" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Онцгой өдрүүд
            </h2>
            <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
              Хамгийн их дурсамж үлдээсэн тусгай өдрүүд
              {loading ? " (уншиж байна...)" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scrollable row */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          role="list"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {events.map((event) => (
            <div
              key={event.slug}
              className="w-[280px] shrink-0 snap-start"
              role="listitem"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {!loading && events.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            Одоогоор онцгой өдөр нэмээгүй байна.
          </p>
        ) : null}
      </div>
    </section>
  )
}