"use client"

type PhotosHeroProps = {
  totalPhotos: number
  lastDate: string
}

export default function PhotosHero({
  totalPhotos,
  lastDate,
}: PhotosHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
            Дурсамжийн сан
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Зургийн сан
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Ангийн дурсамж, үйл ажиллагаа, тэмдэглэлт мөчүүдийг нэг дороос үзээрэй.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <div className="text-xs text-muted-foreground">Нийт зураг</div>
              <div className="mt-2 text-2xl font-semibold text-foreground">
                {totalPhotos}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm">
              <div className="text-xs text-muted-foreground">Сүүлд нэмэгдсэн огноо</div>
              <div className="mt-2 text-base font-medium text-foreground">
                {lastDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}