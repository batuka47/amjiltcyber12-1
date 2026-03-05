"use client"

import { useState, useMemo } from "react"
import { MOCK_MEMORIES, type Memory } from "@/lib/mock-memories"
import { PhotosHero } from "@/components/photos-hero"
import { PhotosFilterBar } from "@/components/photos-filter-bar"
import { PhotoCard } from "@/components/photo-card"
import { PhotoDetailDialog } from "@/components/photo-detail-dialog"
import { ImageIcon } from "lucide-react"

export default function PhotosPage() {
  const [search, setSearch] = useState("")
  const [person, setPerson] = useState("")
  const [dateFrom, setDateFrom] = useState("")

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const hasFilters = !!(search || person || dateFrom)

  function clearFilters() {
    setSearch("")
    setPerson("")
    setDateFrom("")
  }

  const filtered = useMemo(() => {
    return MOCK_MEMORIES.filter((m) => {
      if (search && !m.title.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (person && !m.people.some((p) => p.name === person)) {
        return false
      }
      if (dateFrom && m.takenAt < dateFrom) {
        return false
      }
      return true
    })
  }, [search, person, dateFrom])

  const lastDate = MOCK_MEMORIES.reduce(
    (latest, m) => (m.takenAt > latest ? m.takenAt : latest),
    MOCK_MEMORIES[0].takenAt
  )

  function handleSelect(memory: Memory) {
    setSelectedMemory(memory)
    setDialogOpen(true)
  }

  return (
    <>
      <PhotosHero
        totalPhotos={MOCK_MEMORIES.length}
        lastDate={new Date(lastDate).toLocaleDateString("mn-MN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Filter bar */}
        <PhotosFilterBar
          search={search}
          onSearchChange={setSearch}
          person={person}
          onPersonChange={setPerson}
          dateFrom={dateFrom}
          onDateFromChange={setDateFrom}
          onClear={clearFilters}
          hasFilters={hasFilters}
        />

        {/* Gallery grid */}
        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((memory) => (
              <PhotoCard
                key={memory.id}
                memory={memory}
                onSelect={handleSelect}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60 shadow-sm shadow-foreground/[0.03]">
              <ImageIcon className="size-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm text-muted-foreground">
              Таны хайлтад тохирох зураг олдсонгүй.
            </p>
          </div>
        )}
      </section>

      {/* Detail dialog */}
      <PhotoDetailDialog
        memory={selectedMemory}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
