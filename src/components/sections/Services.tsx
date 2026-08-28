import { services } from '../../data/services'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { SectionHeading } from '../SectionHeading'

export function Services() {
  const { lang, t } = useLanguage()

  return (
    <section id="services" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow={t('services.eyebrow')}
          title={t('services.title')}
          intro={t('services.intro')}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl border border-border bg-surface p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={service.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {service.title[lang]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description[lang]}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
