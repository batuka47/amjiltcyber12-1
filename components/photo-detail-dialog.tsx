"use client"

import { CalendarIcon, ImageIcon, UsersIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Memory } from "@/lib/mock-memories"

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
  if (!memory) return null

  const formattedDate = new Date(memory.takenAt).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{memory.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {memory.title} зургийн дэлгэрэнгүй
          </DialogDescription>
        </DialogHeader>

        {/* Large image placeholder */}
        <div className="aspect-video overflow-hidden rounded-xl bg-muted">
          {memory.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="size-full object-cover"
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
        <p className="text-sm text-foreground leading-relaxed">
          {memory.description}
        </p>

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
  )
}
