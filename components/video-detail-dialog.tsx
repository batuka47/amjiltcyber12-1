"use client"

import { useEffect } from "react"
import { CalendarIcon, UsersIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Memory } from "@/lib/memories"

interface VideoDetailDialogProps {
  video: Memory | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function parseYouTube(url: string): { id: string; isShorts: boolean } {
  try {
    const u = new URL(url)

    // shorts: /shorts/ID
    if (u.pathname.startsWith("/shorts/")) {
      const id = u.pathname.split("/shorts/")[1]?.split(/[/?#]/)[0] ?? ""
      return { id, isShorts: !!id }
    }

    // embed: /embed/ID
    if (u.pathname.startsWith("/embed/")) {
      const id = u.pathname.split("/embed/")[1]?.split(/[/?#]/)[0] ?? ""
      return { id, isShorts: false }
    }

    // youtu.be/ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "").split(/[/?#]/)[0] ?? ""
      return { id, isShorts: false }
    }

    // watch?v=ID
    const id = u.searchParams.get("v") ?? ""
    return { id, isShorts: false }
  } catch {
    return { id: "", isShorts: false }
  }
}

function buildEmbedUrl(id: string) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    controls: "1",
  })
  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}

export function VideoDetailDialog({
  video,
  open,
  onOpenChange,
}: VideoDetailDialogProps) {
  // Prevent background scroll while dialog open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev || "auto"
    }
  }, [open])

  if (!video) return null

  const formattedDate = new Date(video.takenAt).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const { id, isShorts } = video.assetUrl
    ? parseYouTube(video.assetUrl)
    : { id: "", isShorts: false }

  const embedUrl = id ? buildEmbedUrl(id) : ""

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {video.title} видеоны дэлгэрэнгүй
          </DialogDescription>
        </DialogHeader>

        {/* Player */}
        <div className={isShorts ? "mx-auto w-full max-w-sm" : "w-full"}>
          <div
            className={
              isShorts
                ? "aspect-9/16 overflow-hidden rounded-xl bg-muted"
                : "aspect-video overflow-hidden rounded-xl bg-muted"
            }
          >
            {embedUrl ? (
              <iframe
                className="h-full w-full"
                src={embedUrl}
                title={video.title}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  Видео холбоос буруу байна.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="size-4" aria-hidden="true" />
          <span>Огноо: {formattedDate}</span>
        </div>

        {/* Description */}
        {video.description ? (
          <p className="text-sm leading-relaxed text-foreground">
            {video.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Тайлбар байхгүй.</p>
        )}

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