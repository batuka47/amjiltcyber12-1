import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Camera, Heart, Star, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle decorative accent */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-20 right-1/4 size-40 rounded-full bg-primary/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:gap-16 md:py-24">
        <div className="flex flex-1 flex-col items-start gap-6">
          {/* Playful badge */}
          <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-4 py-2 shadow-sm">
            <Sparkles className="size-4 text-accent" aria-hidden="true" />
            <span className="text-xs font-medium text-foreground">Амжилт кибер 12-1 дурсамжийн цомог</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Хамтдаа бүтээсэн{" "}
            <span className="text-[#37d8e9]">мартагдашгүй</span>{" "}
            мөчүүд
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            Хамтдаа өнгөрүүлсэн цаг мөчүүд, баяр ёслол, найз нөхдийн тухай
            дулаахан дурсамжууд энд байна.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md">
              <Link href="/memories/photos">
                <Camera className="mr-2 size-4" aria-hidden="true" />
                Дурсамж үзэх
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl border-border/60 bg-card shadow-sm hover:bg-secondary transition-all duration-200">
              <Link href="/about">Бидний тухай</Link>
            </Button>
          </div>
        </div>

        <div className="flex w-full flex-1 items-center justify-center">
          <div className="relative">
            {/* Decorative floating badges */}
            <div className="absolute -top-3 -right-3 z-10 flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card px-3.5 py-2 shadow-sm">
              <Heart className="size-3.5 text-primary" aria-hidden="true" />
              <span className="text-xs font-medium text-foreground">12 сурагч</span>
            </div>
            <div className="absolute -bottom-3 -left-3 z-10 flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card px-3.5 py-2 shadow-sm">
              <Star className="size-3.5 text-accent" aria-hidden="true" />
              <span className="text-xs font-medium text-foreground">Шилдэг анги</span>
            </div>

            <div
              className="flex aspect-[4/3] w-full max-w-md items-center justify-center rounded-3xl border border-border/60 bg-card shadow-sm"
              aria-label="Зургийн орон зай"
              role="img"
            >
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
