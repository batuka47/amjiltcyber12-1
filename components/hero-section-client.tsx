"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Heart, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

type HeroSlide = {
  id: string
  badge: string | null
  title: string
  highlight: string | null
  description: string | null
  image_url: string
  stat_left_label: string | null
  stat_right_label: string | null
  cta_primary_text: string | null
  cta_primary_href: string | null
  cta_secondary_text: string | null
  cta_secondary_href: string | null
}

export function HeroSectionClient({
  slides,
  intervalMs = 4500,
}: {
  slides: HeroSlide[]
  intervalMs?: number
}) {
  const safeSlides = useMemo(() => slides.filter((s) => !!s.image_url), [slides])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const current = safeSlides[index] ?? null

  useEffect(() => {
    if (paused) return
    if (safeSlides.length <= 1) return

    const t = setInterval(() => {
      setIndex((i) => (i + 1) % safeSlides.length)
    }, intervalMs)

    return () => clearInterval(t)
  }, [paused, safeSlides.length, intervalMs])

  useEffect(() => {
    if (index >= safeSlides.length) setIndex(0)
  }, [safeSlides.length, index])

  const prev = () => setIndex((i) => (i - 1 + safeSlides.length) % safeSlides.length)
  const next = () => setIndex((i) => (i + 1) % safeSlides.length)

  const badge = current?.badge ?? "Амжилт кибер 12-1 дурсамжийн цомог"
  const title = current?.title ?? "Хамтдаа бүтээсэн"
  const highlight = current?.highlight ?? "мартагдашгүй"
  const description =
    current?.description ??
    "Хамтдаа өнгөрүүлсэн цаг мөчүүд, баяр ёслол, найз нөхдийн тухай дулаахан дурсамжууд энд байна."

  const primaryText = current?.cta_primary_text ?? "Дурсамж үзэх"
  const primaryHref = current?.cta_primary_href ?? "/memories/photos"
  const secondaryText = current?.cta_secondary_text ?? "Бидний тухай"
  const secondaryHref = current?.cta_secondary_href ?? "/about"

  const statLeft = current?.stat_left_label ?? "12 сурагч"
  const statRight = current?.stat_right_label ?? "Шилдэг анги"

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-20 right-1/4 size-40 rounded-full bg-primary/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:gap-16 md:py-24">
        <div className="flex w-full flex-1 flex-col items-start gap-6">
          <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-2 shadow-sm">
            <Sparkles className="size-4 text-accent" aria-hidden="true" />
            <span className="text-xs font-medium text-foreground">{badge}</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title} <span className="text-[#37d8e9]">{highlight}</span> мөчүүд
          </h1>

          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{description}</p>
          <div className="flex w-full flex-1 items-center justify-center">
          <div
            className="relative w-full sm:max-w-4/6 max-w-9/10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="absolute sm:scale-150 -top-3 -right-8 z-10 flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card px-3.5 py-2 shadow-sm">
              <Heart className="size-3.5 text-primary" aria-hidden="true" />
              <span className="text-xs font-medium text-foreground">{statLeft}</span>
            </div>

            <div className="absolute sm:scale-150 -bottom-3 -left-8 z-10 flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card px-3.5 py-2 shadow-sm">
              <Star className="size-3.5 text-accent" aria-hidden="true" />
              <span className="text-xs font-medium text-foreground">{statRight}</span>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
              {current?.image_url ? (
                <Image src={current.image_url} alt={current.title} fill className="object-cover" priority />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground/30"
                  aria-hidden="true"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              )}

              {safeSlides.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-2 shadow transition"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-10 w-10 text-slate-800" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded-ful p-2 shadow transition"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-10 w-10 text-slate-800" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
          

          {safeSlides.length > 1 && (
            <div className="flex items-center w-full justify-center gap-2 pt-2">
              {safeSlides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-[#37d8e9]" : "w-2.5 bg-border"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
          <div className="flex flex-wrap sm:gap-40 gap-3 sm:mt-4 w-full items-center justify-center">
            <Button asChild size="lg" className="rounded-2xl sm:scale-150 shadow-sm transition-all duration-200 hover:shadow-md">
              <Link href={primaryHref}>
                <Camera className="mr-2 size-4" aria-hidden="true" />
                {primaryText}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-2xl sm:scale-150 border-border/60 bg-card shadow-sm hover:bg-secondary transition-all duration-200"
            >
              <Link href={secondaryHref}>{secondaryText}</Link>
            </Button>
          </div>
        </div>

        
      </div>
    </section>
  )
}