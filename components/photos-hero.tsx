import { ImageIcon, CalendarIcon, Camera } from "lucide-react"

interface PhotosHeroProps {
  totalPhotos: number
  lastDate: string
}

export function PhotosHero({ totalPhotos, lastDate }: PhotosHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-16 right-1/4 size-36 rounded-full bg-primary/[0.06] blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10">
            <Camera className="size-5 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Дурсамж — Зураг
          </h1>
        </div>
        <p className="mt-3 max-w-lg text-pretty text-muted-foreground leading-relaxed">
          Хамтдаа өнгөрүүлсэн мөч бүрийг дурсамжлан хадгалъя.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3.5 py-2 shadow-sm">
            <ImageIcon className="size-4 text-accent" aria-hidden="true" />
            <span>
              Нийт <strong className="font-medium text-foreground">{totalPhotos}</strong> зураг
            </span>
          </span>
          <span className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-3.5 py-2 shadow-sm">
            <CalendarIcon className="size-4 text-accent" aria-hidden="true" />
            <span>
              Сүүлийн: <strong className="font-medium text-foreground">{lastDate}</strong>
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}
