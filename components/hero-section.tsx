"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { HeroSectionClient } from "./hero-section-client"

type HeroSlide = {
  id: string
  badge: string | null
  title: string
  highlight: string | null
  description: string | null
  image_url: string
  stat_left_label: string | null
  stat_right_label: string | null
  cta_primary_text: string | null
  cta_primary_href: string | null
  cta_secondary_text: string | null
  cta_secondary_href: string | null
}

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let alive = true

    async function load() {
      const { data, error } = await supabase
        .from("home_hero_slides")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true })

      if (!alive) return

      if (error) {
        console.error("[home_hero_slides]", error)
        setSlides([])
      } else {
        setSlides((data ?? []) as HeroSlide[])
      }

      setLoaded(true)
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  // optional: show fallback text while loading
  return <HeroSectionClient slides={loaded ? slides : []} />
}