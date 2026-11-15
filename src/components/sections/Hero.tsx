import { useEffect, useState } from 'react'
import { site } from '../../data/site'
import type { TranslationKey } from '../../i18n/translations'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { FeaturedProjects } from '../features/home/FeaturedProjects'

const rotatingKeys: TranslationKey[] = [
  'hero.rotate.1',
  'hero.rotate.2',
  'hero.rotate.3',
  'hero.rotate.4',
]

const ROTATE_MS = 2800

export function Hero() {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % rotatingKeys.length),
      ROTATE_MS
    )
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden border-b border-border"
    >
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 opacity-60"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-10 md:py-24">
        <p className="overline inline-flex items-center gap-2.5 text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t('hero.availability')}
        </p>

        <div className="mt-6 grid gap-6 md:mt-8 md:gap-10 lg:grid-cols-12 lg:gap-12">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:col-span-7 lg:text-7xl">
            {t('hero.title.prefix')}{' '}
            <span className="text-primary">
              <span className="sr-only">{t('hero.rotate.1')}</span>
              <span key={index} aria-hidden="true" className="rotate-word">
                {t(rotatingKeys[index])}
              </span>
              .
            </span>
          </h1>

          <div className="flex flex-col justify-end gap-6 md:gap-8 lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('hero.subtitle')}
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:max-w-xs">
              <a href="#contact" className="btn btn-primary">
                {t('hero.cta.secondary')}
                <Icon name="arrowUpRight" className="h-4 w-4" />
              </a>
              <a href="#projects" className="btn btn-ghost">
                {t('hero.cta.primary')}
              </a>
            </div>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{site.founder}</span>
              <span aria-hidden="true">·</span>
              <span>{t('hero.based')}</span>
              <a
                href={site.socials.linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${site.founder} — LinkedIn`}
                className="-m-1.5 inline-flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon name="linkedin" className="h-4 w-4" />
              </a>
            </p>
          </div>
        </div>
      </div>

      <FeaturedProjects />
    </section>
  )
}
