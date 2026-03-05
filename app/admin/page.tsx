import Link from "next/link"
import {
  User,
  Trophy,
  Users,
  ImagePlus,
  CalendarPlus,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const quickLinks = [
  {
    label: "Миний мэдээлэл",
    description: "Хувийн мэдээллээ удирдах",
    href: "/admin/profile",
    icon: User,
  },
  {
    label: "Миний амжилтууд",
    description: "Амжилт, шагналын бүртгэл",
    href: "/admin/achievements",
    icon: Trophy,
  },
  {
    label: "Сурагчид",
    description: "Сурагчдын жагсаалт, мэдээлэл",
    href: "/admin/students",
    icon: Users,
  },
  {
    label: "Дурсамж нэмэх",
    description: "Зураг, видео нэмэх",
    href: "/admin/memories/new",
    icon: ImagePlus,
  },
  {
    label: "Онцгой өдөр үүсгэх",
    description: "Шинэ онцгой өдөр бүртгэх",
    href: "/admin/special-day/new",
    icon: CalendarPlus,
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <Card className="mb-8 border-transparent rounded-2xl bg-muted/40 shadow-sm shadow-foreground/[0.03]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Тавтай морил
          </CardTitle>
          <CardDescription className="text-pretty text-muted-foreground leading-relaxed">
            Амжилт кибер 12-1 ангийн удирдлагын хэсэгт тавтай морил. Энд та ангийн
            мэдээлэл, дурсамж, сурагчдын бүртгэлийг удирдах боломжтой.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mb-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Шуурхай холбоос
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className="group">
            <Card className="h-full rounded-2xl border-transparent shadow-md shadow-foreground/[0.04] transition-all duration-200 hover:shadow-lg hover:shadow-foreground/[0.07] hover:-translate-y-0.5">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-200 group-hover:bg-accent group-hover:text-accent-foreground group-hover:shadow-sm group-hover:shadow-accent/20">
                  <link.icon className="size-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {link.label}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
