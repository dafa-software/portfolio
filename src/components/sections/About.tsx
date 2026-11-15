import { site } from '../../data/site'
import type { TranslationKey } from '../../i18n/translations'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../Reveal'
import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { FounderPanel } from '../features/about/FounderPanel'

const stats: { key: TranslationKey; value: string }[] = [
  { key: 'about.stats.experience', value: '12+' },
  { key: 'about.stats.projects', value: '50+' },
  { key: 'about.stats.clients', value: '20+' },
]

export function About() {
  const { t } = useLanguage()

  return (
    <Section id="about">
      <SectionHeader index="01" overline={t('about.eyebrow')} title={t('about.title')} />

      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
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
        </Reveal>

        <Reveal className="lg:col-span-8" delay={80}>
          <p className="text-lg leading-relaxed text-foreground md:text-2xl">
            {t('about.bio.1')}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t('about.bio.2')}
          </p>
        </Reveal>
      </div>

      <FounderPanel />

      <div className="mt-20 grid grid-cols-3 border border-border">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.key}
            delay={index * 90}
            className={index > 0 ? 'border-l border-border' : ''}
          >
            <div className="px-4 py-6 sm:px-6 md:py-8">
              <p className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium text-muted-foreground sm:text-sm">
                {t(stat.key)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
