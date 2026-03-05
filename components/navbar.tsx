"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const memoryItems = [
  { label: "Зураг", href: "/memories/photos" },
  { label: "Видео", href: "/memories/videos" },
]

export function DesktopNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href
  const isMemoryActive = memoryItems.some((item) => pathname.startsWith(item.href))

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/"
              className={cn(
                navigationMenuTriggerStyle(),
                "text-foreground hover:bg-[#fbe0c3]/60 hover:text-foreground rounded-xl transition-colors",
                isActive("/") && "bg-[#fbe0c3]/70 text-foreground"
              )}
            >
              Нүүр
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn(
              "text-foreground hover:bg-[#fbe0c3]/60 hover:text-foreground rounded-xl transition-colors",
              isMemoryActive && "bg-[#fbe0c3]/70 text-foreground"
            )}
          >
            Дурсамж
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-44 gap-1 rounded-xl p-2">
              {memoryItems.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "block select-none rounded-xl px-3 py-2.5 text-sm font-medium leading-none no-underline outline-none transition-colors text-foreground hover:bg-[#fbe0c3]/60 hover:text-foreground focus:bg-[#fbe0c3]/60 focus:text-foreground",
                        isActive(item.href) &&
                          "bg-[#fbe0c3]/70 text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/about"
              className={cn(
                navigationMenuTriggerStyle(),
                "text-foreground hover:bg-[#fbe0c3]/60 hover:text-foreground rounded-xl transition-colors",
                isActive("/about") && "bg-[#fbe0c3]/70 text-foreground"
              )}
            >
              Бидний тухай
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href="/admin"
              className={cn(
                navigationMenuTriggerStyle(),
                "text-foreground hover:bg-[#fbe0c3]/60 hover:text-foreground rounded-xl transition-colors",
                isActive("/admin") && "bg-[#fbe0c3]/70 text-foreground"
              )}
            >
              Админ
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
