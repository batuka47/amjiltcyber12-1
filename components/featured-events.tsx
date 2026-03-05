import { EventCard, type EventItem } from "@/components/event-card"
import { Sparkles } from "lucide-react"

const events: EventItem[] = [
  {
    slug: "march-8",
    title: "Март 8",
    description:
      "Эмэгтэйчүүдийн баярын өдрийн хөгжилтэй мөчүүд, бэлэг солилцсон дурсамж.",
    type: "Зураг",
    coverUrl: null,
  },
  {
    slug: "deel-mongol",
    title: "Дээлтэй Монгол",
    description:
      "Үндэсний хувцсаа өмсөн хамт олноороо дурсамжийн зураг авахуулсан өдөр.",
    type: "Нууц видео",
    coverUrl: null,
  },
  {
    slug: "new-year",
    title: "Шинэ жил",
    description:
      "Шинэ жилийн баярын үдэшлэг, тоглоом наадам, хамтын дуу дуулсан цаг.",
    type: "Видео",
    coverUrl: null,
  },
  {
    slug: "sports-day",
    title: "Спортын баяр",
    description:
      "Хамт олноороо өрсөлдсөн, тэмцсэн, хөгжилтэй спортын наадам.",
    type: "Зураг",
    coverUrl: null,
  },
]

export function FeaturedEvents() {
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
      </div>
    </section>
  )
}
