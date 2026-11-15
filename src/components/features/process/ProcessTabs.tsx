import { useRef } from 'react'

export interface ProcessTab {
  id: string
  label: string
}

export function ProcessTabs({
  tabs,
  active,
  onChange,
  label,
}: {
  tabs: ProcessTab[]
  active: string
  onChange: (id: string) => void
  label: string
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  const move = (offset: number) => {
    const index = tabs.findIndex((tab) => tab.id === active)
    const next = tabs[(index + offset + tabs.length) % tabs.length]
    onChange(next.id)
    refs.current[next.id]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className="flex w-full gap-2 overflow-x-auto border-b border-border"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          move(1)
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          move(-1)
        }
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[tab.id] = node
            }}
            type="button"
            role="tab"
            id={`process-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`process-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={`-mb-px shrink-0 border-b-2 px-1 pb-3 pt-2 font-display text-base font-semibold tracking-tight transition-colors md:text-lg ${
              isActive
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
