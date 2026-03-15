"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"
import { EventCard, type EventItem } from "@/components/event-card"
import { supabase } from "@/lib/supabase/client"

type SpecialDayRow = {
  slug: string
  title: string
  hero_subtitle: string | null
  hero_image_url: string | null
  type: "photo_collection" | "protected_video"
  is_public: boolean
}

export function FeaturedEvents() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from("special_days")
        .select("slug,title,hero_subtitle,hero_image_url,type,is_public")
        .eq("is_public", true)
        .order("title", { ascending: true })
        .order("slug", { ascending: true })

      if (!mounted) return

      if (error) {
        console.error("[featured events error]", {
          message: (error as any).message,
          details: (error as any).details,
          hint: (error as any).hint,
          code: (error as any).code,
          status: (error as any).status,
          raw: error,
        })
        setEvents([])
        setLoading(false)
        return
      }

      const rows = (data ?? []) as SpecialDayRow[]

      const mapped: EventItem[] = rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        description: r.hero_subtitle ?? "Тайлбар оруулаагүй байна.",
        type: r.type === "protected_video" ? "Нууц видео" : "Зураг",
        coverUrl: r.hero_image_url ?? null,
      }))

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
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Уншиж байна...</p>
        ) : events.length > 0 ? (
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
        ) : (
          <p className="text-sm text-muted-foreground">
            Одоогоор онцгой өдөр нэмээгүй байна.
          </p>
        )}
      </div>
    </section>
  )
}