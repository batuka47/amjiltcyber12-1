"use client"

import { useState, useMemo } from "react"
import { MOCK_VIDEOS, type VideoMemory } from "@/lib/mock-videos"
import { VideosHero } from "@/components/videos-hero"
import { VideosFilterBar } from "@/components/videos-filter-bar"
import { VideoCard } from "@/components/video-card"
import { VideoDetailDialog } from "@/components/video-detail-dialog"
import { VideoIcon } from "lucide-react"

export default function VideosPage() {
  const [search, setSearch] = useState("")
  const [person, setPerson] = useState("")
  const [dateFrom, setDateFrom] = useState("")

  const [selectedVideo, setSelectedVideo] = useState<VideoMemory | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const hasFilters = !!(search || person || dateFrom)

  function clearFilters() {
    setSearch("")
    setPerson("")
    setDateFrom("")
  }

  const filtered = useMemo(() => {
    return MOCK_VIDEOS.filter((v) => {
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
  }, [search, person, dateFrom])

  const lastDate = MOCK_VIDEOS.reduce(
    (latest, v) => (v.takenAt > latest ? v.takenAt : latest),
    MOCK_VIDEOS[0].takenAt
  )

  function handleSelect(video: VideoMemory) {
    setSelectedVideo(video)
    setDialogOpen(true)
  }

  return (
    <>
      <VideosHero
        totalVideos={MOCK_VIDEOS.length}
        lastDate={new Date(lastDate).toLocaleDateString("mn-MN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Filter bar */}
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

        {/* Video grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onSelect={handleSelect}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60 shadow-sm shadow-foreground/[0.03]">
              <VideoIcon
                className="size-6 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Таны хайлтад тохирох видео олдсонгүй.
            </p>
          </div>
        )}
      </section>

      {/* Detail dialog */}
      <VideoDetailDialog
        video={selectedVideo}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
