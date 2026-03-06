"use client"

import { useEffect, useState } from "react"
import { Code2, Quote, Sparkles } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"

type CreatorProfile = {
  id: string
  full_name: string
  avatar_url: string | null
  best_title: string | null
}

const CREATOR_QUOTES: Record<string, string> = {
  "Б.Бат-Эрдэнэ": "A reader knows the ending, but that doesn’t mean he can change it",
  "Б.Бат-Энх": "To reach the end, you must first go through hell.",
}

const CREATOR_NAMES = ["Б.Бат-Эрдэнэ", "Б.Бат-Энх"]

export function AboutCreators() {
  const [creators, setCreators] = useState<CreatorProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadCreators() {
      const { data, error } = await supabase
        .from("public_profiles")
        .select("id, full_name, avatar_url, best_title")
        .in("full_name", CREATOR_NAMES)

      if (!mounted) return

      if (error) {
        console.error("[about creators error]", error)
        setCreators([])
        setLoading(false)
        return
      }

      setCreators((data ?? []) as CreatorProfile[])
      setLoading(false)
    }

    loadCreators()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-2 flex items-center gap-2.5">
        <h2 className="text-lg font-semibold text-foreground">Сайтыг хийсэн</h2>
      </div>

      <p className="mb-10 text-sm text-muted-foreground">
        Энэ вэбсайтыг бүтээсэн хүмүүс
      </p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Уншиж байна...</p>
      ) : (
        <div className="flex flex-col gap-12 md:gap-20">
          {creators.map((creator, index) => {
            const quote =
              CREATOR_QUOTES[creator.full_name] ??
              "Дурсамж бол хамтдаа өнгөрүүлсэн мөчүүдийн үнэ цэнэ."

            const reverse = index % 2 === 1

            return (
              <div
                key={creator.id}
                className={`flex flex-col items-center gap-8 md:flex-row ${
                  reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* IMAGE */}
                <div className="relative h-[500px] md:h-[560px] w-full max-w-md overflow-hidden rounded-3xl shadow-lg">
                  {creator.avatar_url ? (
                    <img
                      src={creator.avatar_url}
                      alt={creator.full_name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <Code2 className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-5 left-5 text-white">
                    <h3 className="text-2xl font-bold">{creator.full_name}</h3>
                    <p className="text-sm text-white/80">Website Creator</p>
                  </div>
                </div>

                {/* TEXT */}
                <div className="flex max-w-md flex-col justify-center gap-5 md:min-h-[420px]">
                  {creator.best_title && (
                    <Badge className="w-fit rounded-full bg-primary/10 text-primary">
                      <Sparkles className="mr-1 h-3.5 w-3.5" />
                      {creator.best_title}
                    </Badge>
                  )}

                  <div className="rounded-2xl bg-primary/5 p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Quote className="h-4 w-4 text-primary" />
                      Ишлэл
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      “{quote}”
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}