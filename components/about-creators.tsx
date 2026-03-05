import { SITE_CREATORS } from "@/lib/mock-about"
import { Card, CardContent } from "@/components/ui/card"
import { Code, User } from "lucide-react"

export function AboutCreators() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-xl" aria-hidden="true">&#x1F4BB;</span>
        <h2 className="text-lg font-semibold text-foreground">
          Сайтыг хийсэн
        </h2>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Энэ вэбсайтыг хөгжүүлсэн хүмүүс
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-md">
        {SITE_CREATORS.map((creator) => (
          <Card key={creator.name} className="overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4">
              <div
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10"
                aria-hidden="true"
              >
                {creator.role === "Хөгжүүлэгч" ? (
                  <Code className="size-5 text-primary" />
                ) : (
                  <User className="size-5 text-primary" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {creator.name}
                </h3>
                <p className="text-xs text-muted-foreground">{creator.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
