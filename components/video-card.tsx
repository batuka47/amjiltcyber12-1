"use client"

import { PlayIcon, CalendarIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { VideoMemory } from "@/lib/mock-videos"

interface VideoCardProps {
  video: VideoMemory
  onSelect: (video: VideoMemory) => void
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  const formattedDate = new Date(video.takenAt).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
      {/* Video thumbnail placeholder */}
      <div className="relative aspect-video bg-secondary">
        <div className="flex size-full items-center justify-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-card/90 shadow-sm backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            <PlayIcon
              className="size-5 text-accent"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Date overlay */}
        <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-xl bg-card/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
          <CalendarIcon className="size-3 text-accent" aria-hidden="true" />
          {formattedDate}
        </span>
      </div>

      <CardContent className="flex flex-col gap-3 p-4">
        {/* Title */}
        <h3 className="truncate text-sm font-semibold text-foreground">
          {video.title}
        </h3>

        {/* People chips */}
        {video.people.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {video.people.slice(0, 3).map((person) => (
              <Badge key={person.id} className="rounded-full bg-[#ffbb98]/15 text-foreground text-xs hover:bg-[#ffbb98]/25">
                {person.name}
              </Badge>
            ))}
            {video.people.length > 3 && (
              <Badge variant="outline" className="rounded-full border-border/60 text-xs text-foreground">
                +{video.people.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Action button */}
        <Button
          variant="outline"
          size="sm"
          className="mt-auto w-full gap-2 rounded-xl border-border/60 bg-secondary/70 text-foreground hover:bg-secondary transition-all duration-200"
          onClick={() => onSelect(video)}
        >
          <PlayIcon className="size-3.5" aria-hidden="true" />
          Үзэх
        </Button>
      </CardContent>
    </Card>
  )
}
