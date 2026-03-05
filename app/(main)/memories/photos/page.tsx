"use client"

import { useEffect, useMemo, useState } from "react"
import { PhotosHero } from "@/components/photos-hero"
import { PhotosFilterBar } from "@/components/photos-filter-bar"
import { PhotoCard } from "@/components/photo-card"
import { PhotoDetailDialog } from "@/components/photo-detail-dialog"
import { ImageIcon } from "lucide-react"
import { fetchMemoriesByType, type Memory } from "@/lib/memories"

export default function PhotosPage() {
  const [items, setItems] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [person, setPerson] = useState("")
  const [dateFrom, setDateFrom] = useState("")

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    let alive = true
    async function run() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchMemoriesByType("image")
        if (!alive) return
        setItems(data)
      } catch (e: any) {
        if (!alive) return
        setError(e?.message ?? "Зураг татахад алдаа гарлаа.")
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
    return items.filter((m) => {
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
  }, [items, search, person, dateFrom])

  const lastDate = useMemo(() => {
    if (items.length === 0) return null
    return items.reduce((latest, m) => (m.takenAt > latest ? m.takenAt : latest), items[0].takenAt)
  }, [items])

  function handleSelect(memory: Memory) {
    setSelectedMemory(memory)
    setDialogOpen(true)
  }

  return (
    <>
      <PhotosHero
        totalPhotos={items.length}
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

        {error ? (
          <div className="mt-8 rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm">
            <div className="font-medium text-foreground">Алдаа</div>
            <div className="mt-1 text-muted-foreground">{error}</div>
          </div>
        ) : loading ? (
          <div className="mt-8 text-sm text-muted-foreground">Ачаалж байна…</div>
        ) : filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((memory) => (
              <PhotoCard key={memory.id} memory={memory} onSelect={handleSelect} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-3 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60 shadow-sm shadow-foreground/3">
              <ImageIcon className="size-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm text-muted-foreground">
              Таны хайлтад тохирох зураг олдсонгүй.
            </p>
          </div>
        )}
      </section>

      <PhotoDetailDialog
        memory={selectedMemory}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}