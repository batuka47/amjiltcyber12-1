import { TIMELINE } from "@/lib/mock-about"

export function AboutTimeline() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-2 flex items-center gap-2.5">
        <h2 className="text-lg font-semibold text-foreground">
          Анги амжилтууд
        </h2>
      </div>

      <p className="mb-8 text-sm text-muted-foreground">
        Хичээлийн жилийн чухал үйл явдлууд
      </p>

      <div
        className="relative ml-4"
        role="list"
        aria-label="Анги амжилтууд"
      >
        {/* Vertical timeline line */}
        <div
          className="absolute bottom-0 top-0 left-0 w-0.5 rounded-full bg-primary/30"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-8">
          {TIMELINE.map((item, index) => (
            <div
              key={index}
              className="relative pl-8"
              role="listitem"
            >
              {/* Dot */}
              <div
                className="absolute left-0 top-1 flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full bg-accent"
                aria-hidden="true"
              />

              <time
                dateTime={item.date}
                className="text-xs font-medium text-accent"
              >
                {new Date(item.date).toLocaleDateString("mn-MN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <h3 className="mt-1 text-sm font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}