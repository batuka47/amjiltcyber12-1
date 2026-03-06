import { supabase } from "@/lib/supabase/client"

export type Achievement = {
  id: string
  title: string
  description: string | null
  achieved_on: string | null
  image_url: string | null
}

export type Student = {
  id: string
  name: string
  avatarUrl: string | null
  bestTitle: string | null
  role: "student" | "teacher"
  achievements: Achievement[]
}

type PublicProfileRow = {
  id: string
  full_name: string
  avatar_url: string | null
  best_title: string | null
  role: "student" | "teacher"
}

type AchievementRow = {
  id: string
  profile_id: string
  title: string
  description: string | null
  achieved_on: string | null
  image_url: string | null
}

export async function fetchStudentsWithAchievements(): Promise<Student[]> {
  const { data: profiles, error: profilesError } = await supabase
    .from("public_profiles")
    .select("id, full_name, avatar_url, best_title, role")

  if (profilesError) throw profilesError

  const { data: ach, error: achError } = await supabase
    .from("achievements")
    .select("id, profile_id, title, description, achieved_on, image_url")

  if (achError) throw achError

  const profs = (profiles ?? []) as PublicProfileRow[]
  const achievements = (ach ?? []) as AchievementRow[]

  const byStudent = new Map<string, Achievement[]>()

  for (const a of achievements) {
    const list = byStudent.get(a.profile_id) ?? []
    list.push({
      id: a.id,
      title: a.title,
      description: a.description,
      achieved_on: a.achieved_on,
      image_url: a.image_url,
    })
    byStudent.set(a.profile_id, list)
  }

  for (const [, list] of byStudent) {
    list.sort((x, y) => {
      const ax = x.achieved_on ?? ""
      const ay = y.achieved_on ?? ""
      return ay.localeCompare(ax)
    })
  }

  const students: Student[] = profs
    .map((p) => ({
      id: p.id,
      name: p.full_name,
      avatarUrl: p.avatar_url,
      bestTitle: p.best_title,
      role: p.role,
      achievements: byStudent.get(p.id) ?? [],
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return students
}