import { AboutTeacher } from "@/components/about-teacher"
import { AboutTimeline } from "@/components/about-timeline"
import { AboutStudents } from "@/components/about-students"
import { AboutCreators } from "@/components/about-creators"
import { Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-16 right-1/4 size-36 rounded-full bg-primary/[0.06] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10">
              <Heart className="size-5 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Бидний тухай
            </h1>
          </div>
          <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
            Бид бол нэг анги, нэг гэр бүл. Хамтдаа суралцаж, хамтдаа хөгжиж,
            хамтдаа амжилтад хүрнэ.
          </p>
        </div>
      </div>

      <AboutTeacher />
      <AboutTimeline />
      <AboutStudents />
      <AboutCreators />
    </>
  )
}
