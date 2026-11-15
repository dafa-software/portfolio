export function ContactProgress({
  steps,
  current,
  progressLabel,
}: {
  steps: string[]
  current: number
  progressLabel: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <ol className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {steps.map((step, index) => {
            const state =
              index === current ? 'current' : index < current ? 'done' : 'upcoming'
            return (
              <li
                key={step}
                aria-current={state === 'current' ? 'step' : undefined}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  state === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[11px] ${
                    state === 'upcoming'
                      ? 'border border-border text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{step}</span>
              </li>
            )
          })}
        </ol>
        <p className="shrink-0 font-mono text-xs text-muted-foreground">
          {progressLabel}
        </p>
      </div>

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={current + 1}
        aria-label={progressLabel}
        className="mt-5 h-0.5 w-full bg-border"
      >
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${((current + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
