export function parseYouTube(url: string): { id: string; isShorts: boolean } {
    try {
      const u = new URL(url)
  
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/shorts/")[1]?.split(/[/?#]/)[0] ?? ""
        return { id, isShorts: !!id }
      }
  
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.split("/embed/")[1]?.split(/[/?#]/)[0] ?? ""
        return { id, isShorts: false }
      }
  
      if (u.hostname.includes("youtu.be")) {
        const id = u.pathname.replace("/", "").split(/[/?#]/)[0] ?? ""
        return { id, isShorts: false }
      }
  
      const id = u.searchParams.get("v") ?? ""
      return { id, isShorts: false }
    } catch {
      return { id: "", isShorts: false }
    }
  }
  
  export function buildEmbedUrl(id: string) {
    const params = new URLSearchParams({
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      controls: "1",
    })
    return `https://www.youtube.com/embed/${id}?${params.toString()}`
  }