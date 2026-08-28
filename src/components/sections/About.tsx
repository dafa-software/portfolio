import { site } from '../../data/site'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../Reveal'
import { SectionHeader } from '../SectionHeader'

const stats = [
  { key: 'about.stats.experience', value: '12+' },
  { key: 'about.stats.projects', value: '50+' },
  { key: 'about.stats.clients', value: '20+' },
] as const

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeader
          index="01"
          overline={t('about.eyebrow')}
          title={t('about.title')}
        />

        <Reveal>
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="border border-border bg-surface">
                <div className="flex aspect-square items-center justify-center border-b border-border bg-primary p-10">
                  <img src="/logo.png" alt="" className="h-full w-full object-contain" />
                </div>
                <dl className="grid grid-cols-2 divide-x divide-border">
                  <div className="px-5 py-4">
                    <dt className="overline text-muted-foreground">
                      {t('hero.meta.studio')}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">
                      {site.name}
                    </dd>
                  </div>
                  <div className="px-5 py-4">
                    <dt className="overline text-muted-foreground">
                      {t('hero.meta.founder')}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">
                      {site.founder}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="lg:col-span-8">
              <p className="text-lg leading-relaxed text-foreground md:text-2xl">
                {t('about.bio.1')}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('about.bio.2')}
              </p>

              <dl className="mt-12 grid grid-cols-3 border border-border">
                {stats.map((stat, index) => (
                  <div
                    key={stat.key}
                    className={
                      index > 0 ? 'border-l border-border px-6 py-6' : 'px-6 py-6'
                    }
                  >
                    <dd className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-2 text-xs font-medium text-muted-foreground">
                      {t(stat.key)}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
