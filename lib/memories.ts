import { supabase } from "@/lib/supabase/client"

export type MemoryType = "image" | "video"

export type MemoryPerson = {
  id: string
  name: string
  avatarUrl: string | null
}

export type Memory = {
  id: string
  type: MemoryType
  title: string
  description: string | null
  takenAt: string // YYYY-MM-DD
  assetUrl: string
  thumbnailUrl: string | null
  people: MemoryPerson[]
}

type MemoryRow = {
  id: string
  type: MemoryType
  title: string | null
  description: string | null
  taken_at: string
  asset_url: string
  thumbnail_url: string | null
}

type MemoryPeopleRow = {
  memory_id: string
  profile_id: string
}

type PublicProfileRow = {
  id: string
  full_name: string
  avatar_url: string | null
}

function mapRowToMemoryBase(m: MemoryRow): Omit<Memory, "people"> {
  return {
    id: m.id,
    type: m.type,
    title: m.title ?? "Нэргүй",
    description: m.description,
    takenAt: m.taken_at,
    assetUrl: m.asset_url,
    thumbnailUrl: m.thumbnail_url,
  }
}

export async function fetchMemoriesByType(type: MemoryType): Promise<Memory[]> {
  // 1) Memories
  const { data: mem, error: memErr } = await supabase
    .from("memories")
    .select("id,type,title,description,taken_at,asset_url,thumbnail_url")
    .eq("is_public", true)
    .eq("type", type)
    .order("taken_at", { ascending: false })

  if (memErr) throw memErr

  const memRows = (mem ?? []) as MemoryRow[]
  if (memRows.length === 0) return []

  const memoryIds = memRows.map((m) => m.id)

  // 2) memory_people links
  const { data: links, error: linkErr } = await supabase
    .from("memory_people")
    .select("memory_id,profile_id")
    .in("memory_id", memoryIds)

  if (linkErr) throw linkErr

  const linkRows = (links ?? []) as MemoryPeopleRow[]
  const profileIds = Array.from(new Set(linkRows.map((l) => l.profile_id)))

  // If no tags, just return memories with empty people
  if (profileIds.length === 0) {
    return memRows.map((m) => ({ ...mapRowToMemoryBase(m), people: [] }))
  }

  // 3) public profile view
  const { data: prof, error: profErr } = await supabase
    .from("public_profiles")
    .select("id,full_name,avatar_url")
    .in("id", profileIds)

  if (profErr) throw profErr

  const profRows = (prof ?? []) as PublicProfileRow[]
  const profMap = new Map(profRows.map((p) => [p.id, p]))

  // group people by memory
  const peopleByMemory = new Map<string, MemoryPerson[]>()
  for (const l of linkRows) {
    const p = profMap.get(l.profile_id)
    if (!p) continue
    const list = peopleByMemory.get(l.memory_id) ?? []
    list.push({
      id: p.id,
      name: p.full_name,
      avatarUrl: p.avatar_url,
    })
    peopleByMemory.set(l.memory_id, list)
  }

  // 4) Build final list
  return memRows.map((m) => ({
    ...mapRowToMemoryBase(m),
    people: (peopleByMemory.get(m.id) ?? []).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
  }))
}