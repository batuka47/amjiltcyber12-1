"use client"

import { SearchIcon, XIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STUDENTS } from "@/lib/mock-memories"

interface PhotosFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  person: string
  onPersonChange: (value: string) => void
  dateFrom: string
  onDateFromChange: (value: string) => void
  dateTo?: string
  onDateToChange?: (value: string) => void
  onClear: () => void
  hasFilters: boolean
}

export function PhotosFilterBar({
  search,
  onSearchChange,
  person,
  onPersonChange,
  dateFrom,
  onDateFromChange,
  onClear,
  hasFilters,
}: PhotosFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-md shadow-foreground/[0.04] sm:flex-row sm:items-center sm:flex-wrap">
      {/* Search */}
      <div className="relative flex-1 sm:min-w-48 sm:max-w-72">
        <label htmlFor="photo-search" className="sr-only">
          Нэрээр хайх
        </label>
        <SearchIcon
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="photo-search"
          type="search"
          placeholder="Нэрээр хайх..."
          className="rounded-xl border-transparent bg-secondary/50 pl-9 shadow-sm shadow-foreground/[0.03] placeholder:text-muted-foreground focus:bg-card focus:shadow-md transition-shadow duration-200"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Person select */}
      <div className="sm:w-48">
        <label htmlFor="person-select" className="sr-only">
          Сурагчийн нэр
        </label>
        <Select value={person} onValueChange={onPersonChange}>
            <SelectTrigger id="person-select" className="w-full rounded-xl border-transparent bg-secondary/50 text-foreground shadow-sm shadow-foreground/[0.03]">
            <SelectValue placeholder="Сурагч сонгох" />
          </SelectTrigger>
            <SelectContent className="rounded-xl shadow-lg shadow-foreground/[0.06] border-transparent">
            {STUDENTS.map((name) => (
              <SelectItem key={name} value={name} className="rounded-lg text-foreground hover:bg-[#ffbb98]/15">
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Single date filter */}
      <div>
        <label htmlFor="date-filter" className="sr-only">
          Огноо
        </label>
        <Input
          id="date-filter"
          type="date"
          className="rounded-xl border-transparent bg-secondary/50 text-foreground shadow-sm shadow-foreground/[0.03] focus:shadow-md transition-shadow duration-200 sm:w-44"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          aria-label="Огноогоор шүүх"
        />
      </div>

      {/* Clear */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="gap-1.5 rounded-xl text-muted-foreground hover:bg-[#ffbb98]/15 hover:text-foreground"
        >
          <XIcon className="size-3.5" aria-hidden="true" />
          Цэвэрлэх
        </Button>
      )}
    </div>
  )
}
