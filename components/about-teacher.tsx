"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, GraduationCap } from "lucide-react"

type Teacher = {
  id: string
  full_name: string
  avatar_url: string | null
  best_title: string | null
}

export function AboutTeacher() {
  const [teacher, setTeacher] = useState<Teacher | null>(null)

  useEffect(() => {
    async function loadTeacher() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, best_title")
        .eq("role", "teacher")
        .single()

      if (error) {
        console.error(error)
        return
      }

      setTeacher(data)
    }

    loadTeacher()
  }, [])

  if (!teacher) return null

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h2 className="mb-6 text-lg font-semibold text-foreground">Багш</h2>

      <Card className="rounded-2xl border-border/60 bg-card shadow-sm">
        <CardContent className="flex flex-col gap-10 p-8">

          {/* PROFILE */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <img
              src={teacher.avatar_url ?? ""}
              alt={teacher.full_name}
              className="size-28 rounded-2xl object-cover shadow-sm"
            />

            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {teacher.full_name}
              </h3>

              <p className="text-sm text-muted-foreground">
                Хятад хэлний багш
              </p>

              {teacher.best_title && (
                <span className="mt-2 inline-flex rounded-full bg-accent/15 px-3 py-1 text-xs font-medium">
                  {teacher.best_title}
                </span>
              )}
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="mb-2 font-semibold text-foreground">Миний тухай</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Төрсөн огноо: 1992.08.06. Арван жилийн сургууль төгсөөд
              Хятад улсын засгийн газрын тэтгэлгээр тус улсын их
              сургуулиудад бакалавр, магистрын зэрэг тус тус хамгаалсан.
              Одоогоор HSK6 зэрэгтэй.
            </p>
          </div>

          {/* EXPERIENCE */}
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Туршлага</h4>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">2022 – Одоог хүртэл</p>
                <p>Амжилт Кибер Сургууль</p>
                <p>Хятад хэлний багш</p>
              </div>

              <div>
                <p className="font-medium text-foreground">2016 – 2017</p>
                <p>“Ялж сурах вэ” сургалтын төв</p>
                <p>Хятад хэлний багш</p>
              </div>

              <div>
                <p className="font-medium text-foreground">2013 – 2015</p>
                <p>Багшийн мэргэжил дээшлүүлэх институт</p>
                <p>Гадаад харилцааны мэргэжилтэн</p>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Боловсрол</h4>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">
                  Тяньжиний Их Сургууль
                </p>
                <p>Магистрын зэрэг (2017–2020)</p>
              </div>

              <div>
                <p className="font-medium text-foreground">
                  Харбины Багшийн Их Сургууль
                </p>
                <p>Бакалаврын зэрэг (2009–2013)</p>
              </div>

              <div>
                <p>HSK 6 зэрэгтэй</p>
              </div>
            </div>
          </div>


        </CardContent>
      </Card>
    </section>
  )
}