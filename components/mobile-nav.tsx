"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const memoryItems = [
  { label: "Зураг", href: "/memories/photos" },
  { label: "Видео", href: "/memories/videos" },
]

const navLinks = [
  { label: "Нүүр", href: "/" },
  { label: "Бидний тухай", href: "/about" },
  { label: "Админ", href: "/admin" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [memoriesOpen, setMemoriesOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href
  const isMemoryActive = memoryItems.some((item) =>
    pathname.startsWith(item.href)
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground hover:bg-[#fbe0c3]/60 rounded-xl transition-colors duration-200"
          aria-label="Цэс нээх"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 bg-card">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground">
            <div className="flex size-8 items-center justify-center rounded-xl bg-accent/15">
              <BookOpen className="size-4 text-accent" aria-hidden="true" />
            </div>
            Манай Анги
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Гар утасны цэс" className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[#ffbb98]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive(link.href) && "bg-[#ffbb98]/20"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Collapsible open={memoriesOpen} onOpenChange={setMemoriesOpen}>
            <CollapsibleTrigger
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-[#ffbb98]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isMemoryActive && "bg-[#ffbb98]/20"
              )}
            >
              Дурсамж
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  memoriesOpen && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-1 pl-4 pt-1">
              {memoryItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm text-foreground transition-colors hover:bg-[#ffbb98]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive(item.href) && "bg-[#ffbb98]/20"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
