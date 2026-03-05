export type Student = {
    id: string
    name: string
    gender: "boy" | "girl"
    bestTitle: string
    avatarUrl?: string
  }
  
  export type Memory = {
    id: string
    type: "image" | "video"
    title?: string
    description?: string
    assetUrl: string
    takenAt: string
  }
  
  export type Event = {
    slug: string
    title: string
    description: string
    type: "Зураг" | "Нууц видео" | "Видео"
    coverUrl?: string
  } 