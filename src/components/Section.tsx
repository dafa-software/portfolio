import type { ReactNode } from 'react'

type Tone = 'base' | 'surface'
type Size = 'regular' | 'tall'

const toneClasses: Record<Tone, string> = {
  base: 'bg-background',
  surface: 'bg-surface/60',
}

const sizeClasses: Record<Size, string> = {
  regular: 'py-20 md:py-28',
  tall: 'py-24 md:py-36',
}

export function Section({
  id,
  tone = 'base',
  size = 'regular',
  className = '',
  children,
}: {
  id: string
  tone?: Tone
  size?: Size
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-b border-border ${toneClasses[tone]} ${className}`}
    >
      <div className={`mx-auto max-w-6xl px-6 ${sizeClasses[size]}`}>{children}</div>
    </section>
  )
}
