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
  takenAt: string
  assetUrl: string
  thumbnailUrl: string | null
  isPublic: boolean
  tag: string | null
  groupTag: string | null
  people: MemoryPerson[]
}

type MemoryRow = {
  id: string
  type: MemoryType
  title: string | null
  description: string | null
  taken_at: string | null
  asset_url: string
  thumbnail_url: string | null
  is_public: boolean
  tag: string | null
  group_tag: string | null
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

function mapRowToMemoryBase(row: MemoryRow): Omit<Memory, "people"> {
  return {
    id: row.id,
    type: row.type,
    title: row.title ?? "Нэргүй",
    description: row.description,
    takenAt: row.taken_at ?? "",
    assetUrl: row.asset_url,
    thumbnailUrl: row.thumbnail_url,
    isPublic: row.is_public,
    tag: row.tag,
    groupTag: row.group_tag,
  }
}

export async function fetchMemoriesByType(type: MemoryType): Promise<Memory[]> {
  const { data: mem, error: memErr } = await supabase
    .from("memories")
    .select(
      "id, type, title, description, taken_at, asset_url, thumbnail_url, is_public, tag, group_tag"
    )
    .eq("is_public", true)
    .eq("type", type)
    .order("taken_at", { ascending: false })

  if (memErr) throw memErr

  const memRows = (mem ?? []) as MemoryRow[]
  if (memRows.length === 0) return []

  const memoryIds = memRows.map((m) => m.id)

  const { data: links, error: linkErr } = await supabase
    .from("memory_people")
    .select("memory_id, profile_id")
    .in("memory_id", memoryIds)

  if (linkErr) throw linkErr

  const linkRows = (links ?? []) as MemoryPeopleRow[]
  const profileIds = Array.from(new Set(linkRows.map((l) => l.profile_id)))

  if (profileIds.length === 0) {
    return memRows.map((m) => ({
      ...mapRowToMemoryBase(m),
      people: [],
    }))
  }

  const { data: prof, error: profErr } = await supabase
    .from("public_profiles")
    .select("id, full_name, avatar_url")
    .in("id", profileIds)

  if (profErr) throw profErr

  const profRows = (prof ?? []) as PublicProfileRow[]
  const profMap = new Map(profRows.map((p) => [p.id, p]))

  const peopleByMemory = new Map<string, MemoryPerson[]>()

  for (const link of linkRows) {
    const profile = profMap.get(link.profile_id)
    if (!profile) continue

    const list = peopleByMemory.get(link.memory_id) ?? []
    list.push({
      id: profile.id,
      name: profile.full_name,
      avatarUrl: profile.avatar_url,
    })
    peopleByMemory.set(link.memory_id, list)
  }

  return memRows.map((m) => ({
    ...mapRowToMemoryBase(m),
    people: (peopleByMemory.get(m.id) ?? []).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
  }))
}

export async function fetchMemoriesByTag(tag: string): Promise<Memory[]> {
  const { data: mem, error: memErr } = await supabase
    .from("memories")
    .select(
      "id, type, title, description, taken_at, asset_url, thumbnail_url, is_public, tag, group_tag"
    )
    .eq("is_public", true)
    .eq("tag", tag)
    .order("taken_at", { ascending: false })

  if (memErr) throw memErr

  const memRows = (mem ?? []) as MemoryRow[]
  if (memRows.length === 0) return []

  const memoryIds = memRows.map((m) => m.id)

  const { data: links, error: linkErr } = await supabase
    .from("memory_people")
    .select("memory_id, profile_id")
    .in("memory_id", memoryIds)

  if (linkErr) throw linkErr

  const linkRows = (links ?? []) as MemoryPeopleRow[]
  const profileIds = Array.from(new Set(linkRows.map((l) => l.profile_id)))

  if (profileIds.length === 0) {
    return memRows.map((m) => ({
      ...mapRowToMemoryBase(m),
      people: [],
    }))
  }

  const { data: prof, error: profErr } = await supabase
    .from("public_profiles")
    .select("id, full_name, avatar_url")
    .in("id", profileIds)

  if (profErr) throw profErr

  const profRows = (prof ?? []) as PublicProfileRow[]
  const profMap = new Map(profRows.map((p) => [p.id, p]))

  const peopleByMemory = new Map<string, MemoryPerson[]>()

  for (const link of linkRows) {
    const profile = profMap.get(link.profile_id)
    if (!profile) continue

    const list = peopleByMemory.get(link.memory_id) ?? []
    list.push({
      id: profile.id,
      name: profile.full_name,
      avatarUrl: profile.avatar_url,
    })
    peopleByMemory.set(link.memory_id, list)
  }

  return memRows.map((m) => ({
    ...mapRowToMemoryBase(m),
    people: (peopleByMemory.get(m.id) ?? []).sort((a, b) =>
      a.name.localeCompare(b.name)
    ),
  }))
}