"use client"

import { PlayIcon, CalendarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Memory } from "@/lib/memories"

interface VideoCardProps {
  video: Memory
  onSelect: (video: Memory) => void
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  const formattedDate = new Date(video.takenAt).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const thumbSrc = video.thumbnailUrl

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Make thumbnail clickable */}
      <button
        type="button"
        onClick={() => onSelect(video)}
        className="block w-full text-left focus:outline-none"
        aria-label={`${video.title} — ${formattedDate}`}
      >
        <div className="relative aspect-video bg-secondary">
          {thumbSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbSrc}
              alt={video.title}
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-card/90 shadow-sm backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                <PlayIcon className="size-5 text-accent" aria-hidden="true" />
              </div>
            </div>
          )}

          {/* Play overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-card/90 shadow-sm backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
              <PlayIcon className="size-5 text-accent" aria-hidden="true" />
            </div>
          </div>

          {/* Date overlay */}
          <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-xl bg-card/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
            <CalendarIcon className="size-3 text-accent" aria-hidden="true" />
            {formattedDate}
          </span>
        </div>
      </button>

      <CardContent className="flex flex-col gap-3 p-4">
        <h3 className="truncate text-sm font-semibold text-foreground">
          {video.title}
        </h3>

        {video.people.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {video.people.slice(0, 3).map((person) => (
              <Badge
                key={person.id}
                className="rounded-full bg-[#ffbb98]/15 text-foreground text-xs hover:bg-[#ffbb98]/25"
              >
                {person.name}
              </Badge>
            ))}
            {video.people.length > 3 && (
              <Badge
                variant="outline"
                className="rounded-full border-border/60 text-xs text-foreground"
              >
                +{video.people.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Button also opens dialog */}
        <Button
          variant="outline"
          size="sm"
          className="mt-auto w-full gap-2 rounded-xl border-border/60 bg-secondary/70 text-foreground transition-all duration-200 hover:bg-secondary"
          onClick={() => onSelect(video)}
        >
          <PlayIcon className="size-3.5" aria-hidden="true" />
          Үзэх
        </Button>
      </CardContent>
    </Card>
  )
}