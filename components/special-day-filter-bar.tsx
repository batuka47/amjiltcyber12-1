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

interface SpecialDayFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  person: string
  onPersonChange: (value: string) => void
  onClear: () => void
  hasFilters: boolean
}

export function SpecialDayFilterBar({
  search,
  onSearchChange,
  person,
  onPersonChange,
  onClear,
  hasFilters,
}: SpecialDayFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-md shadow-foreground/[0.04] sm:flex-row sm:items-center sm:flex-wrap">
      {/* Student select */}
      <div className="sm:w-52">
        <label htmlFor="student-select" className="sr-only">
          Сурагчаар шүүх
        </label>
        <Select value={person} onValueChange={onPersonChange}>
          <SelectTrigger id="student-select" className="w-full rounded-xl border-transparent bg-secondary/50 text-foreground shadow-sm shadow-foreground/[0.03]">
            <SelectValue placeholder="Сурагчаар шүүх" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-lg shadow-foreground/[0.06] border-transparent">
            {STUDENTS.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Search */}
      <div className="relative flex-1 sm:min-w-48 sm:max-w-72">
        <label htmlFor="special-day-search" className="sr-only">
          Зураг хайх
        </label>
        <SearchIcon
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          id="special-day-search"
          type="search"
          placeholder="Зураг хайх..."
          className="pl-9 rounded-xl border-transparent bg-secondary/50 shadow-sm shadow-foreground/[0.03] focus:bg-card focus:shadow-md transition-shadow duration-200"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Clear */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClear} className="gap-1.5 rounded-xl text-muted-foreground hover:bg-primary/15 hover:text-foreground transition-colors duration-200">
          <XIcon className="size-3.5" aria-hidden="true" />
          Цэвэрлэх
        </Button>
      )}
    </div>
  )
}
