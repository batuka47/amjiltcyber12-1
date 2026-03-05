"use client"

import { useState } from "react"
import { CalendarIcon, ImageIcon, UsersIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Memory } from "@/lib/memories"
import { ImageFullscreenDialog } from "@/components/image-fullscreen-dialog"

interface PhotoDetailDialogProps {
  memory: Memory | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PhotoDetailDialog({
  memory,
  open,
  onOpenChange,
}: PhotoDetailDialogProps) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false)

  if (!memory) return null

  const formattedDate = new Date(memory.takenAt).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const imageSrc = memory.assetUrl

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{memory.title}</DialogTitle>
            <DialogDescription className="sr-only">
              {memory.title} зургийн дэлгэрэнгүй
            </DialogDescription>
          </DialogHeader>

          {/* Large image */}
          <div className="aspect-video overflow-hidden rounded-xl bg-muted">
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt={memory.title}
                className="size-full cursor-zoom-in object-cover"
                loading="lazy"
                onClick={() => setFullscreenOpen(true)}
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <ImageIcon
                  className="size-12 text-muted-foreground/40"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="size-4" aria-hidden="true" />
            <span>Огноо: {formattedDate}</span>
          </div>

          {/* Description */}
          {memory.description ? (
            <p className="text-sm leading-relaxed text-foreground">
              {memory.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Тайлбар байхгүй.</p>
          )}

          {/* People */}
          {memory.people.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UsersIcon className="size-4" aria-hidden="true" />
                <span>Зурагт байгаа хүмүүс</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {memory.people.map((person) => (
                  <Badge key={person.id} variant="secondary">
                    {person.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Fullscreen viewer */}
      <ImageFullscreenDialog
        imageUrl={imageSrc}
        open={fullscreenOpen}
        onOpenChange={setFullscreenOpen}
        title={memory.title}
      />
    </>
  )
}