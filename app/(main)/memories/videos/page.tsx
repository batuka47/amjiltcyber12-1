"use client"

import { useEffect, useMemo, useState } from "react"
import { VideosHero } from "@/components/videos-hero"
import { VideosFilterBar } from "@/components/videos-filter-bar"
import { VideoCard } from "@/components/video-card"
import { VideoDetailDialog } from "@/components/video-detail-dialog"
import { VideoIcon } from "lucide-react"
import { fetchMemoriesByType, type Memory } from "@/lib/memories"

export default function VideosPage() {
  const [items, setItems] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [person, setPerson] = useState("")
  const [dateFrom, setDateFrom] = useState("")

  const [selectedVideo, setSelectedVideo] = useState<Memory | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    let alive = true
    async function run() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchMemoriesByType("video")
        if (!alive) return
        setItems(data)
      } catch (e: any) {
        if (!alive) return
        setError(e?.message ?? "Видео татахад алдаа гарлаа.")
      } finally {
        if (!alive) return
        setLoading(false)
      }
    }
    run()
    return () => {
      alive = false
    }
  }, [])

  const hasFilters = !!(search || person || dateFrom)

  function clearFilters() {
    setSearch("")
    setPerson("")
    setDateFrom("")
  }

  const filtered = useMemo(() => {
    return items.filter((v) => {
      if (search && !v.title.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (person && !v.people.some((p) => p.name === person)) {
        return false
      }
      if (dateFrom && v.takenAt < dateFrom) {
        return false
      }
      return true
    })
  }, [items, search, person, dateFrom])

  const lastDate = useMemo(() => {
    if (items.length === 0) return null
    return items.reduce((latest, v) => (v.takenAt > latest ? v.takenAt : latest), items[0].takenAt)
  }, [items])

  function handleSelect(video: Memory) {
    setSelectedVideo(video)
    setDialogOpen(true)
  }

  return (
    <>
      <VideosHero
        totalVideos={items.length}
        lastDate={
          lastDate
            ? new Date(lastDate).toLocaleDateString("mn-MN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "—"
        }
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <VideosFilterBar
          search={search}
          onSearchChange={setSearch}
          person={person}
          onPersonChange={setPerson}
          dateFrom={dateFrom}
          onDateFromChange={setDateFrom}
          onClear={clearFilters}
          hasFilters={hasFilters}
        />

        {error ? (
          <div className="mt-8 rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm">
            <div className="font-medium text-foreground">Алдаа</div>
            <div className="mt-1 text-muted-foreground">{error}</div>
          </div>
        ) : loading ? (
          <div className="mt-8 text-sm text-muted-foreground">Ачаалж байна…</div>
        ) : filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((video) => (
              <VideoCard key={video.id} video={video as any} onSelect={() => handleSelect(video)} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60 shadow-sm shadow-foreground/3">
              <VideoIcon className="size-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm text-muted-foreground">
              Таны хайлтад тохирох видео олдсонгүй.
            </p>
          </div>
        )}
      </section>

      <VideoDetailDialog
        video={selectedVideo as any}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}