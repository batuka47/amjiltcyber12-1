"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  User,
  Trophy,
  Users,
  ImagePlus,
  CalendarPlus,
  LayoutDashboard,
  ArrowLeft,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const personalItems = [
  {
    label: "Хяналтын самбар",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Миний мэдээлэл",
    href: "/admin/profile",
    icon: User,
  },
  {
    label: "Миний амжилтууд",
    href: "/admin/achievements",
    icon: Trophy,
  },
]

const adminItems = [
  {
    label: "Сурагчид",
    href: "/admin/students",
    icon: Users,
  },
  {
    label: "Дурсамж нэмэх",
    href: "/admin/memories/new",
    icon: ImagePlus,
  },
  {
    label: "Онцгой өдөр үүсгэх",
    href: "/admin/special-day/new",
    icon: CalendarPlus,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          <span>Манай Анги</span>
        </Link>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          Админ
        </h2>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Хувийн</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personalItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Удирдлага</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-sm shadow-accent/10">
            <User className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Багш</span>
            <span className="text-xs text-muted-foreground">Админ</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
