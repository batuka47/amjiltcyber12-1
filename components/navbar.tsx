"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, ImageIcon, VideoIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const memoryItems = [
  { label: "Зураг", href: "/memories/photos", icon: ImageIcon },
  { label: "Видео", href: "/memories/videos", icon: VideoIcon },
]

export function DesktopNav() {
  const pathname = usePathname()
  const [memOpen, setMemOpen] = useState(false)

  const isActive = (href: string) => pathname === href
  const isMemoryActive = memoryItems.some((item) => pathname.startsWith(item.href))

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {/* Нүүр */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className={cn(
                navigationMenuTriggerStyle(),
                "rounded-xl text-foreground transition-colors",
                "hover:bg-[#fbe0c3]/60 hover:text-foreground",
                isActive("/") && "bg-[#fbe0c3]/70 text-foreground"
              )}
            >
              Нүүр
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Дурсамж (CLICK ONLY dropdown, no hover-open) */}
        <NavigationMenuItem>
          <DropdownMenu open={memOpen} onOpenChange={setMemOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "rounded-xl text-foreground transition-colors",
                  "hover:bg-[#fbe0c3]/60 hover:text-foreground",
                  isMemoryActive && "bg-[#fbe0c3]/70 text-foreground",
                  // remove hover-open “feel”: keep pointer stable
                  "flex items-center gap-1.5"
                )}
              >
                Дурсамж
                <ChevronDown className="size-4 opacity-70" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              sideOffset={10}
              className={cn(
                "w-44 rounded-xl border-border/60 p-1 shadow-md",
                "bg-background text-foreground"
              )}
            >
              {memoryItems.map((item) => {
                const Icon = item.icon
                return (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className={cn(
                      "cursor-pointer rounded-lg",
                      isActive(item.href) && "bg-[#fbe0c3]/60"
                    )}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <Icon className="size-4" aria-hidden="true" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>

        {/* Бидний тухай */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/about"
              className={cn(
                navigationMenuTriggerStyle(),
                "rounded-xl text-foreground transition-colors",
                "hover:bg-[#fbe0c3]/60 hover:text-foreground",
                isActive("/about") && "bg-[#fbe0c3]/70 text-foreground"
              )}
            >
              Бидний тухай
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Админ */}
        {/* <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/admin"
              className={cn(
                navigationMenuTriggerStyle(),
                "rounded-xl text-foreground transition-colors",
                "hover:bg-[#fbe0c3]/60 hover:text-foreground",
                isActive("/admin") && "bg-[#fbe0c3]/70 text-foreground"
              )}
            >
              Админ
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}