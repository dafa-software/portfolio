import { site } from '../../data/site'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'

const stats = [
  { key: 'about.stats.experience', value: '5+' },
  { key: 'about.stats.projects', value: '30+' },
  { key: 'about.stats.clients', value: '15+' },
] as const

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} />

        <Reveal>
          <div className="mt-14 grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="mx-auto w-56 md:w-full">
              <div className="flex aspect-square w-full flex-col items-center justify-center rounded-3xl border border-border bg-surface text-foreground">
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                  {site.name.charAt(0)}
                </span>
                <span className="mt-4 text-sm font-semibold">{site.fullName}</span>
                <span className="mt-1 text-xs text-muted-foreground">
                  {site.role['pt-BR']}
                </span>
              </div>
            </div>

            <div>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('about.bio.1')}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('about.bio.2')}
              </p>

              <dl className="mt-10 grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.key}>
                    <dt className="text-xs font-medium text-muted-foreground">
                      {t(stat.key)}
                    </dt>
                    <dd className="mt-1 text-3xl font-bold tracking-tight text-primary">
                      {stat.value}
                    </dd>
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
