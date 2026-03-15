import { supabase } from "@/lib/supabase/client"

export type Achievement = {
  id: string
  title: string
  description: string | null
  achieved_on: string | null
}

export type Student = {
  id: string
  name: string
  avatarUrl: string | null
  bestTitle: string | null
  role: "student" | "teacher" | "admin"
  achievements: Achievement[]
}

type PublicProfileRow = {
  id: string
  full_name: string
  avatar_url: string | null
  best_title: string | null
  role: "student" | "teacher" | "admin"
}

type AchievementRow = {
  id: string
  profile_id: string
  title: string
  description: string | null
  achieved_on: string | null
}

export async function fetchStudentsWithAchievements(): Promise<Student[]> {
  const { data: profiles, error: profilesError } = await supabase
    .from("public_profiles")
    .select("id, full_name, avatar_url, best_title, role")
    .in("role", ["student", "teacher"])

  if (profilesError) throw profilesError

  const { data: ach, error: achError } = await supabase
    .from("achievements")
    .select("id, profile_id, title, description, achieved_on")

  if (achError) throw achError

  const profs = (profiles ?? []) as PublicProfileRow[]
  const achievements = (ach ?? []) as AchievementRow[]

  const byProfile = new Map<string, Achievement[]>()

  for (const a of achievements) {
    const list = byProfile.get(a.profile_id) ?? []
    list.push({
      id: a.id,
      title: a.title,
      description: a.description,
      achieved_on: a.achieved_on,
    })
    byProfile.set(a.profile_id, list)
  }

  for (const [, list] of byProfile) {
    list.sort((a, b) => {
      const ax = a.achieved_on ?? ""
      const bx = b.achieved_on ?? ""
      return bx.localeCompare(ax)
    })
  }

  return profs
    .map((p) => ({
      id: p.id,
      name: p.full_name,
      avatarUrl: p.avatar_url,
      bestTitle: p.best_title,
      role: p.role,
      achievements: byProfile.get(p.id) ?? [],
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}