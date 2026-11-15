import { useEffect, useState } from 'react'

/** Dense thresholds so the stored heights refresh often while scrolling. */
const THRESHOLDS = Array.from({ length: 21 }, (_, step) => step / 20)

/**
 * Tracks which section id is currently dominant in the viewport.
 *
 * Sections are ranked by how many pixels of the viewport they actually fill
 * (`intersectionRect.height`), not by `intersectionRatio` — a section taller
 * than the viewport can never reach a high ratio, so ratio-based ranking keeps
 * the previous, shorter section highlighted.
 */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRect.height : 0
          )
        }
        let best: string | null = null
        let bestHeight = 0
        for (const [id, height] of visible) {
          if (height > bestHeight) {
            best = id
            bestHeight = height
          }
        }
        if (best) setActive(best)
      },
      { rootMargin: '-64px 0px -35% 0px', threshold: THRESHOLDS }
    )

    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [ids])

  return active
}
