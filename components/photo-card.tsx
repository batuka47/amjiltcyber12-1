"use client"

import { ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Memory } from "@/lib/mock-memories"

interface PhotoCardProps {
  memory: Memory
  onSelect: (memory: Memory) => void
}

export function PhotoCard({ memory, onSelect }: PhotoCardProps) {
  const formattedDate = new Date(memory.takenAt).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card
      className="group cursor-pointer overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
    >
      <button
        type="button"
        onClick={() => onSelect(memory)}
        className="w-full text-left focus:outline-none"
        aria-label={`${memory.title} — ${formattedDate}`}
      >
        {/* Thumbnail placeholder */}
        <div className="relative aspect-[4/3] bg-secondary">
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
                className="size-10 text-muted-foreground/30"
                aria-hidden="true"
              />
            </div>
          )}

          {/* Date label */}
          <span className="absolute bottom-2 left-2 rounded-xl bg-card/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
            {formattedDate}
          </span>
        </div>

        <CardContent className="p-3">
          <p className="truncate text-sm font-medium text-foreground group-hover:text-foreground/80">
            {memory.title}
          </p>
        </CardContent>
      </button>
    </Card>
  )
}
