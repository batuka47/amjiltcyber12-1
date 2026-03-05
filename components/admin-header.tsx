"use client"

import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const pageTitles: Record<string, string> = {
  "/admin": "Хяналтын самбар",
  "/admin/profile": "Миний мэдээлэл",
  "/admin/achievements": "Миний амжилтууд",
  "/admin/students": "Сурагчид",
  "/admin/memories/new": "Дурсамж нэмэх",
  "/admin/special-day/new": "Онцгой өдөр үүсгэх",
}

export function AdminHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Админ"

  return (
    <header className="flex h-14 shrink-0 items-center justify-between bg-background px-4 shadow-sm shadow-foreground/[0.03]">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <Separator orientation="vertical" className="h-5" />
        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full"
            aria-label="Хэрэглэгчийн цэс"
          >
            <div className="flex size-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <User className="size-3.5" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg shadow-foreground/[0.06] border-transparent">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">Багш</p>
              <p className="text-xs text-muted-foreground">
                teacher@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Профайл</DropdownMenuItem>
          <DropdownMenuItem>Тохиргоо</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Гарах</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
