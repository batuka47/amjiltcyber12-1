"use client"

import { useState, useMemo } from "react"
import { Camera, Film, Upload, Search, CalendarIcon, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Person {
  id: string
  name: string
  role: "student" | "teacher"
}

const MOCK_PEOPLE: Person[] = [
  { id: "t1", name: "Д. Оюунтуяа", role: "teacher" },
  { id: "s1", name: "Б. Бат-Эрдэнэ", role: "student" },
  { id: "s2", name: "С. Сарангэрэл", role: "student" },
  { id: "s3", name: "Т. Тэмүүлэн", role: "student" },
  { id: "s4", name: "Н. Номин-Эрдэнэ", role: "student" },
  { id: "s5", name: "Г. Ганзориг", role: "student" },
  { id: "s6", name: "О. Оюунчимэг", role: "student" },
  { id: "s7", name: "Э. Энхжин", role: "student" },
  { id: "s8", name: "М. Мөнхбат", role: "student" },
  { id: "s9", name: "Д. Дэлгэрмаа", role: "student" },
  { id: "s10", name: "А. Анужин", role: "student" },
  { id: "s11", name: "Х. Хүслэн", role: "student" },
  { id: "s12", name: "Б. Болормаа", role: "student" },
]

function PeopleSelector({
  selectedIds,
  onToggle,
}: {
  selectedIds: Set<string>
  onToggle: (id: string) => void
}) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search.trim()) return MOCK_PEOPLE
    const q = search.toLowerCase()
    return MOCK_PEOPLE.filter((p) => p.name.toLowerCase().includes(q))
  }, [search])

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label className="text-sm font-medium text-foreground">
          Хүмүүс сонгох
        </Label>
        <Badge variant="secondary" className="tabular-nums">
          {selectedIds.size} сонгосон
        </Badge>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Нэрээр шүүх..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12" />
              <TableHead className="text-xs font-medium text-muted-foreground">
                Нэр
              </TableHead>
              <TableHead className="text-right text-xs font-medium text-muted-foreground">
                Үүрэг
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  Хүн олдсонгүй
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((person) => {
                const isSelected = selectedIds.has(person.id)
                return (
                  <TableRow
                    key={person.id}
                    className="cursor-pointer"
                    onClick={() => onToggle(person.id)}
                    data-state={isSelected ? "selected" : undefined}
                  >
                    <TableCell className="pl-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => onToggle(person.id)}
                        aria-label={`${person.name} сонгох`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                          {person.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {person.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={person.role === "teacher" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {person.role === "teacher" ? "Багш" : "Сурагч"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function PhotoForm() {
  const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set())
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  const togglePerson = (id: string) => {
    setSelectedPeople((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Зураг</Label>
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-12 text-center transition-colors hover:border-muted-foreground/40 hover:bg-muted/50">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Upload className="size-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Зураг чирж оруулах
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              PNG, JPG, WEBP (10MB хүртэл)
            </p>
          </div>
          <Button variant="outline" size="sm" className="mt-1">
            Файл сонгох
          </Button>
        </div>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="photo-date" className="text-sm font-medium text-foreground">
          Огноо
        </Label>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="photo-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="photo-title" className="text-sm font-medium text-foreground">
          Гарчиг
        </Label>
        <Input
          id="photo-title"
          placeholder="Жишээ: Ангийн зураг"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="photo-desc" className="text-sm font-medium text-foreground">
          Тайлбар
        </Label>
        <Textarea
          id="photo-desc"
          placeholder="Зургийн тухай товч тайлбар..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none"
        />
      </div>

      {/* People selector */}
      <PeopleSelector selectedIds={selectedPeople} onToggle={togglePerson} />

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
        <Button variant="outline" size="sm">
          Цэвэрлэх
        </Button>
        <Button size="sm" className="gap-2">
          <Check className="size-4" />
          Хадгалах
        </Button>
      </div>
    </div>
  )
}

function VideoForm() {
  const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set())
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  const togglePerson = (id: string) => {
    setSelectedPeople((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6">
      {/* YouTube URL */}
      <div className="space-y-2">
        <Label htmlFor="video-url" className="text-sm font-medium text-foreground">
          YouTube холбоос
        </Label>
        <div className="relative">
          <Film className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="video-url"
            placeholder="https://youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="video-date" className="text-sm font-medium text-foreground">
          Огноо
        </Label>
        <div className="relative">
          <CalendarIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="video-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="video-title" className="text-sm font-medium text-foreground">
          Гарчиг
        </Label>
        <Input
          id="video-title"
          placeholder="Жишээ: Ангийн тоглолт"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="video-desc" className="text-sm font-medium text-foreground">
          Тайлбар
        </Label>
        <Textarea
          id="video-desc"
          placeholder="Видеоний тухай товч тайлбар..."
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none"
        />
      </div>

      {/* People selector */}
      <PeopleSelector selectedIds={selectedPeople} onToggle={togglePerson} />

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
        <Button variant="outline" size="sm">
          Цэвэрлэх
        </Button>
        <Button size="sm" className="gap-2">
          <Check className="size-4" />
          Хадгалах
        </Button>
      </div>
    </div>
  )
}

export default function NewMemoryPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-foreground">
              Дурсамж нэмэх
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground leading-relaxed">
              Шинэ зураг эсвэл видео нэмж, ангийн дурсамжийг хадгалаарай.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="photo">
              <TabsList className="mb-6 w-full">
                <TabsTrigger value="photo" className="flex-1 gap-2">
                  <Camera className="size-4" />
                  Зураг
                </TabsTrigger>
                <TabsTrigger value="video" className="flex-1 gap-2">
                  <Film className="size-4" />
                  Видео
                </TabsTrigger>
              </TabsList>
              <TabsContent value="photo">
                <PhotoForm />
              </TabsContent>
              <TabsContent value="video">
                <VideoForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
