import Link from "next/link"
import { Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface EventItem {
  slug: string
  title: string
  description: string
  type: "Зураг" | "Нууц видео" | "Видео"
  coverUrl: string | null
}

interface EventCardProps {
  event: EventItem
}

export function EventCard({ event }: EventCardProps) {
  const isLocked = event.type === "Нууц видео"

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div
        className="relative flex aspect-16/10 w-full items-center justify-center bg-secondary/70"
        role="img"
        aria-label={`${event.title} зургийн орон зай`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground/30"
          aria-hidden="true"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>

        {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/5 backdrop-blur-[2px]">
            <div className="flex items-center gap-1.5 rounded-2xl border border-border/60 bg-card/90 px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
              <Lock className="size-3.5" aria-hidden="true" />
              <span>Түгжээтэй</span>
            </div>
          </div>
        )}
      </div>

      <CardHeader className="gap-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={isLocked ? "outline" : "secondary"}
            className={
              isLocked
                ? "rounded-full border-transparent shadow-sm text-foreground"
                : "rounded-full bg-accent/15 text-foreground"
            }
          >
            {isLocked && <Lock className="size-3" aria-hidden="true" />}
            {event.type}
          </Badge>
        </div>
        <CardTitle className="text-base text-foreground">{event.title}</CardTitle>
        <CardDescription className="leading-relaxed text-muted-foreground">
          {event.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto">
        <Button
          asChild
          variant={isLocked ? "outline" : "default"}
          size="sm"
          className={
            isLocked
              ? "w-full rounded-xl border-border/60 bg-secondary/80 text-foreground hover:bg-secondary transition-all duration-200"
              : "w-full rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
          }
        >
          <Link href={`/memories/${event.slug}`}>
            {isLocked ? "Нэвтрэх шаардлагатай" : "Дэлгэрэнгүй"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
