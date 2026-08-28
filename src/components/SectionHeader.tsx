import { Reveal } from './Reveal'

export function SectionHeader({
  index,
  overline,
  title,
  intro,
}: {
  index: string
  overline: string
  title: string
  intro?: string
}) {
  return (
    <Reveal>
      <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="overline text-primary">
            {index} <span aria-hidden="true">/</span> {overline}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
        </div>
        {intro ? (
          <p className="max-w-md text-base leading-relaxed text-muted-foreground lg:col-span-5 lg:justify-self-end">
            {intro}
          </p>
        ) : null}
      </header>
      <div aria-hidden="true" className="mt-12 h-px w-full bg-border" />
    </Reveal>
  )
}
