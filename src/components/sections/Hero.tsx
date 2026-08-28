import { useLanguage } from '../../i18n/useLanguage'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-80 max-w-4xl bg-primary/10 blur-3xl"
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center md:py-40">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t('hero.availability')}
        </span>

        <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
          {t('hero.title.prefix')}{' '}
          <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
            {t('hero.title.highlight')}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {t('hero.subtitle')}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {t('hero.cta.primary')}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t('hero.cta.secondary')}
          </a>
        </div>
      </div>
    </section>
  )
}
