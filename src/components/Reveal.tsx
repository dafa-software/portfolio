import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let ticking = false

    const reveal = () => {
      const rect = element.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.95) {
        element.classList.add('is-visible')
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        reveal()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    reveal()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
