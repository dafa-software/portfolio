import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
        ) : null}
      </div>
    </Reveal>
  )
}
