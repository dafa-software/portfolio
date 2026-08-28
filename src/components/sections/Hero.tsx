import { site } from '../../data/site'
import { useLanguage } from '../../i18n/useLanguage'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="overline inline-flex items-center gap-2.5 text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {t('hero.availability')}
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:col-span-8 lg:text-7xl">
            {t('hero.title.prefix')}{' '}
            <span className="text-primary">{t('hero.title.highlight')}</span>.
          </h1>

          <div className="flex flex-col justify-end lg:col-span-4">
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('hero.subtitle')}
            </p>

            <dl className="mt-10 space-y-3 border-l-2 border-primary pl-5">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="overline text-muted-foreground">
                  {t('hero.meta.studio')}
                </dt>
                <dd className="font-mono text-sm font-medium text-foreground">
                  {site.name}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="overline text-muted-foreground">{t('hero.meta.based')}</dt>
                <dd className="font-mono text-sm font-medium text-foreground">
                  {t('hero.based')}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="overline text-muted-foreground">{t('hero.meta.mail')}</dt>
                <dd className="min-w-0 font-mono text-sm font-medium text-foreground">
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all transition-colors hover:text-primary"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href="#contact" className="btn btn-primary">
                {t('hero.cta.secondary')}
              </a>
              <a href="#projects" className="btn btn-ghost">
                {t('hero.cta.primary')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
