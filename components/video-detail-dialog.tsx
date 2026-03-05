"use client"

import { CalendarIcon, PlayIcon, UsersIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { VideoMemory } from "@/lib/mock-videos"

interface VideoDetailDialogProps {
  video: VideoMemory | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VideoDetailDialog({
  video,
  open,
  onOpenChange,
}: VideoDetailDialogProps) {
  if (!video) return null

  const formattedDate = new Date(video.takenAt).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {video.title} видеоны дэлгэрэнгүй
          </DialogDescription>
        </DialogHeader>

        {/* Video player placeholder */}
        <div className="aspect-video overflow-hidden rounded-xl bg-muted">
          <div className="flex size-full flex-col items-center justify-center gap-2">
            <div className="flex size-14 items-center justify-center rounded-full border-transparent bg-background shadow-md shadow-foreground/[0.06]">
              <PlayIcon
                className="size-6 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              Видео тоглуулагч
            </span>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="size-4" aria-hidden="true" />
          <span>Огноо: {formattedDate}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground leading-relaxed">
          {video.description}
        </p>

        {/* People */}
        {video.people.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UsersIcon className="size-4" aria-hidden="true" />
              <span>Видеонд байгаа хүмүүс</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {video.people.map((person) => (
                <Badge key={person.id} variant="secondary">
                  {person.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
