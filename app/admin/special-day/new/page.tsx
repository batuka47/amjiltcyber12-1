"use client"

import { useState, useMemo } from "react"
import {
  CalendarPlus,
  Upload,
  Search,
  Check,
  Lock,
  Film,
  Images,
  Eye,
  EyeOff,
  X,
  Save,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ---------- types ----------

type DayType = "gallery" | "protected_video"

interface Person {
  id: string
  name: string
  role: "student" | "teacher"
}

// ---------- mock data ----------

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

const TAG_OPTIONS = [
  { value: "new_year", label: "Шинэ жил" },
  { value: "deeltei_mongol", label: "Дээлтэй Монгол" },
  { value: "graduation", label: "Төгсөлт" },
  { value: "tsagaan_sar", label: "Цагаан сар" },
  { value: "teachers_day", label: "Багш нарын баяр" },
  { value: "sports_day", label: "Спортын өдөр" },
]

// ---------- sub-components ----------

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
          Онцлох сурагчид
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
                        variant={
                          person.role === "teacher" ? "default" : "secondary"
                        }
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

function TagSelector({
  selectedTags,
  onToggle,
}: {
  selectedTags: Set<string>
  onToggle: (tag: string) => void
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">
        Шошго сонгох
      </Label>
      <div className="flex flex-wrap gap-2">
        {TAG_OPTIONS.map((tag) => {
          const isActive = selectedTags.has(tag.value)
          return (
            <button
              key={tag.value}
              type="button"
              onClick={() => onToggle(tag.value)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {isActive && <Check className="size-3" />}
              {tag.label}
              {isActive && (
                <X
                  className="size-3 opacity-70"
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggle(tag.value)
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
      {selectedTags.size > 0 && (
        <p className="text-xs text-muted-foreground">
          {selectedTags.size} шошго сонгосон
        </p>
      )}
    </div>
  )
}

// ---------- Gallery fields ----------

function GalleryFields() {
  const [pullFromMemories, setPullFromMemories] = useState(false)
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  return (
    <div className="space-y-5">
      <Separator />
      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex-1 space-y-0.5">
          <Label
            htmlFor="pull-toggle"
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Дурсамжаас татах
          </Label>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Одоо байгаа дурсамжуудаас зургийг автоматаар татна
          </p>
        </div>
        <Switch
          id="pull-toggle"
          checked={pullFromMemories}
          onCheckedChange={setPullFromMemories}
        />
      </div>

      <TagSelector selectedTags={selectedTags} onToggle={toggleTag} />
    </div>
  )
}

// ---------- Protected video fields ----------

function ProtectedVideoFields() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-5">
      <Separator />

      {/* Password */}
      <div className="space-y-2">
        <Label
          htmlFor="day-password"
          className="text-sm font-medium text-foreground"
        >
          Нууц үг
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="day-password"
            type={showPassword ? "text" : "password"}
            placeholder="Нууц үг оруулна уу"
            className="pl-9 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Нууцлах" : "Харуулах"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Хэрэглэгчид энэ нууц үгийг оруулж видеог нээнэ
        </p>
      </div>

      {/* YouTube URL */}
      <div className="space-y-2">
        <Label
          htmlFor="youtube-url"
          className="text-sm font-medium text-foreground"
        >
          YouTube холбоос
        </Label>
        <div className="relative">
          <Film className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="youtube-url"
            placeholder="https://youtube.com/watch?v=..."
            className="pl-9"
          />
        </div>
      </div>
    </div>
  )
}

// ---------- Main page ----------

export default function NewSpecialDayPage() {
  const [type, setType] = useState<DayType | "">("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set())

  const togglePerson = (id: string) => {
    setSelectedPeople((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "")
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mx-auto max-w-2xl">
        <Card className="border-border">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <CalendarPlus className="size-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Онцгой өдөр үүсгэх
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  Шинэ онцгой өдрийн хуудас үүсгэнэ.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* ── Basic Info ── */}
            <fieldset className="space-y-5">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ерөнхий мэдээлэл
              </legend>

              {/* Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="day-title"
                  className="text-sm font-medium text-foreground"
                >
                  Нэр
                </Label>
                <Input
                  id="day-title"
                  placeholder="Жишээ: Шинэ жилийн баяр"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    if (!slug || slug === generateSlug(title)) {
                      setSlug(generateSlug(e.target.value))
                    }
                  }}
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label
                  htmlFor="day-slug"
                  className="text-sm font-medium text-foreground"
                >
                  Slug
                </Label>
                <Input
                  id="day-slug"
                  placeholder="shinii_jiliin_bayar"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  URL-д ашиглагдана: /special-day/{slug || "..."}
                </p>
              </div>
            </fieldset>

            <Separator />

            {/* ── Hero section ── */}
            <fieldset className="space-y-5">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Hero хэсэг
              </legend>

              {/* Hero title */}
              <div className="space-y-2">
                <Label
                  htmlFor="hero-title"
                  className="text-sm font-medium text-foreground"
                >
                  Hero гарчиг
                </Label>
                <Input id="hero-title" placeholder="Том гарчиг" />
              </div>

              {/* Hero subtitle */}
              <div className="space-y-2">
                <Label
                  htmlFor="hero-subtitle"
                  className="text-sm font-medium text-foreground"
                >
                  Hero дэд гарчиг
                </Label>
                <Textarea
                  id="hero-subtitle"
                  placeholder="Товч тайлбар..."
                  rows={2}
                  className="resize-none"
                />
              </div>

              {/* Cover image */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Ковер зураг
                </Label>
                <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-10 text-center transition-colors hover:border-muted-foreground/40 hover:bg-muted/50">
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
            </fieldset>

            <Separator />

            {/* ── Type Selection ── */}
            <fieldset className="space-y-5">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Төрөл тохиргоо
              </legend>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Хуудасны төрөл
                </Label>
                <Select
                  value={type}
                  onValueChange={(v) => setType(v as DayType)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Төрөл сонгох..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gallery">
                      <div className="flex items-center gap-2">
                        <Images className="size-4 text-muted-foreground" />
                        <span>Зөвхөн зураг (Gallery)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="protected_video">
                      <div className="flex items-center gap-2">
                        <Lock className="size-4 text-muted-foreground" />
                        <span>Нууц видео</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conditional fields */}
              {type === "gallery" && <GalleryFields />}
              {type === "protected_video" && <ProtectedVideoFields />}
            </fieldset>

            {/* ── Featured students (show when type is selected) ── */}
            {type && (
              <>
                <Separator />
                <PeopleSelector
                  selectedIds={selectedPeople}
                  onToggle={togglePerson}
                />
              </>
            )}

            {/* ── Description ── */}
            <Separator />
            <div className="space-y-2">
              <Label
                htmlFor="day-description"
                className="text-sm font-medium text-foreground"
              >
                Тайлбар
              </Label>
              <Textarea
                id="day-description"
                placeholder="Энэ өдрийн тухай дэлгэрэнгүй тайлбар..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* ── Actions ── */}
            <Separator />
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <Button variant="outline" className="gap-2">
                <Save className="size-4" />
                Ноорог хадгалах
              </Button>
              <Button className="gap-2">
                <Check className="size-4" />
                Үүсгэх
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
