import { services } from '../../data/services'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SectionHeader } from '../SectionHeader'

export function Services() {
  const { lang, t } = useLanguage()

  return (
    <section id="services" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeader
          index="02"
          overline={t('services.eyebrow')}
          title={t('services.title')}
          intro={t('services.intro')}
        />

        <Reveal>
          <ul className="mt-0">
            {services.map((service, index) => (
              <li
                key={service.id}
                className="group grid gap-3 border-b border-border py-7 transition-colors first:border-t hover:bg-surface/60 md:grid-cols-12 md:items-baseline md:gap-4 md:py-8"
              >
                <span className="font-mono text-sm text-primary md:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:col-span-4 md:text-2xl">
                  {service.title[lang]}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6 md:text-base">
                  {service.description[lang]}
                </p>
                <span className="hidden items-center justify-end text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 md:col-span-1 md:flex">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
