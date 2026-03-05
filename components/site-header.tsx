"use client"

import Link from "next/link"
import { DesktopNav } from "@/components/navbar"
import { MobileNav } from "@/components/mobile-nav"
import { BookOpen } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:rounded-xl"
        >
          <div className="flex size-8 items-center justify-center rounded-xl bg-accent/15">
            <BookOpen className="size-4.5 text-accent" aria-hidden="true" />
          </div>
          Амжилт кибер 12-1
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  )
}
