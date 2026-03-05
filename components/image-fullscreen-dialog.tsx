"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface ImageFullscreenDialogProps {
  imageUrl: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
}

export function ImageFullscreenDialog({
  imageUrl,
  open,
  onOpenChange,
  title = "Зураг (Fullscreen)",
}: ImageFullscreenDialogProps) {
  if (!imageUrl) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl border-none bg-transparent p-0 shadow-none">
        {/* Accessible title/description (visually hidden) */}
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Зургийг fullscreen горимоор харуулж байна.</DialogDescription>
        </DialogHeader>

        {/* Click outside to close is handled by Dialog */}
        <div className="relative overflow-hidden rounded-2xl bg-black/70 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[88vh] w-full select-none rounded-xl object-contain"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}