import { Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-center gap-2 px-4 sm:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Амжилт кибер 12-1
        </p>
        <Heart className="size-3 text-primary animate-pulse" aria-hidden="true" />
      </div>
    </footer>
  )
}
