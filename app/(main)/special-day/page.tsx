"use client"

import { useState, useMemo } from "react"
import { ImageIcon } from "lucide-react"
import { MOCK_SPECIAL_DAY, MOCK_SPECIAL_DAY_IMAGES } from "@/lib/mock-special-days"
import type { Memory } from "@/lib/mock-memories"
import { SpecialDayHero } from "@/components/special-day-hero"
import { SpecialDayFilterBar } from "@/components/special-day-filter-bar"
import { PhotoCard } from "@/components/photo-card"
import { PhotoDetailDialog } from "@/components/photo-detail-dialog"

export default function SpecialDayPage() {
  const [search, setSearch] = useState("")
  const [person, setPerson] = useState("")

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const hasFilters = !!(search || person)

  function clearFilters() {
    setSearch("")
    setPerson("")
  }

  const filtered = useMemo(() => {
    return MOCK_SPECIAL_DAY_IMAGES.filter((m) => {
      if (search && !m.title.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      if (person && !m.people.some((p) => p.name === person)) {
        return false
      }
      return true
    })
  }, [search, person])

  function handleSelect(memory: Memory) {
    setSelectedMemory(memory)
    setDialogOpen(true)
  }

  return (
    <>
      {/* Hero section */}
      <SpecialDayHero specialDay={MOCK_SPECIAL_DAY} />

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Filter bar */}
        <SpecialDayFilterBar
          search={search}
          onSearchChange={setSearch}
          person={person}
          onPersonChange={setPerson}
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
