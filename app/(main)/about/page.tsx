import { AboutTeacher } from "@/components/about-teacher"
import { AboutTimeline } from "@/components/about-timeline"
import { AboutStudents } from "@/components/about-students"
import { AboutCreators } from "@/components/about-creators"
import Image from "next/image"

export default function Page() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-16 right-1/4 size-36 rounded-full bg-primary/6 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-14 sm:px-6 sm:py-20 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3">
              <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Бидний тухай
              </h1>
            </div>

            <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
              Бид бол нэг анги, нэг гэр бүл. Хамтдаа суралцаж, хамтдаа хөгжиж,
              хамтдаа амжилтад хүрнэ.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-border/60 shadow-sm">
              <Image
                src="https://res.cloudinary.com/dzzrswogn/image/upload/v1772759406/all_studetn_selfie2_krvlly.jpg"
                alt="Анги хамт олон"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <AboutTeacher />
      <AboutTimeline />
      <AboutStudents />
      <AboutCreators />
    </>
  )
}