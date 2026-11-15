import { useCallback, useEffect, useRef, useState } from 'react'

const PREFIX = '#projects/'

const readHash = (): string | null => {
  if (typeof window === 'undefined') return null
  const { hash } = window.location
  if (!hash.startsWith(PREFIX)) return null
  const raw = hash.slice(PREFIX.length)
  try {
    return decodeURIComponent(raw)
  } catch {
    // Malformed percent-encoding (e.g. `#projects/%`) throws. Treat it as an
    // unknown id instead of letting it escape and unmount the app.
    return null
  }
}

const scrollToProjects = () => {
  document.getElementById('projects')?.scrollIntoView({ block: 'start' })
}

/**
 * Keeps the open project in sync with the URL hash (`#projects/<id>`), so a
 * detail view is shareable and the browser back button closes it.
 */
export function useProjectHash(isKnownId: (id: string) => boolean) {
  const [openId, setOpenId] = useState<string | null>(null)
  // Id of the project the page was opened straight onto, or null. While set,
  // the current history entry is the landing entry: there is no earlier in-page
  // entry to go back to. Any other way of reaching a project (grid card, hero
  // strip, founder panel) pushed a history entry.
  const landedIdRef = useRef<string | null>(null)
  // Set while a history.back() is in flight, so a second close (Escape key
  // repeat, Escape plus a backdrop click) cannot walk back two entries.
  const closingRef = useRef(false)

  useEffect(() => {
    const initialId = readHash()
    landedIdRef.current = initialId !== null && isKnownId(initialId) ? initialId : null

    const sync = () => {
      const id = readHash()
      const known = id !== null && isKnownId(id)
      closingRef.current = false
      // Once the landing entry is left (Back, no project, or a different
      // project), later opens are ordinary in-page navigation again.
      if (landedIdRef.current !== null && id !== landedIdRef.current) {
        landedIdRef.current = null
      }
      setOpenId(known ? id : null)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [isKnownId])

  const open = useCallback((id: string) => {
    window.location.hash = `projects/${encodeURIComponent(id)}`
  }, [])

  const close = useCallback(() => {
    if (landedIdRef.current === null) {
      if (closingRef.current) return
      closingRef.current = true
      window.history.back()
      return
    }
    // Landed directly on a shared link: rewrite the hash and put the projects
    // grid on screen rather than dropping the visitor at the hero.
    landedIdRef.current = null
    window.history.replaceState(null, '', '#projects')
    setOpenId(null)
    scrollToProjects()
  }, [])

  return { openId, open, close }
}
