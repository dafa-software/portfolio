import { advantages } from '../../data/advantages'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { SectionHeading } from '../SectionHeading'

export function Advantages() {
  const { lang, t } = useLanguage()

  return (
    <section id="advantages" className="border-b border-border bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow={t('advantages.eyebrow')}
          title={t('advantages.title')}
          intro={t('advantages.intro')}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage) => (
            <article
              key={advantage.id}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={advantage.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {advantage.title[lang]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {advantage.description[lang]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
