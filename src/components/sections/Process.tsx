import { useState } from 'react'
import { advantages } from '../../data/advantages'
import { services } from '../../data/services'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { ProcessTabs } from '../features/process/ProcessTabs'

type TabId = 'services' | 'advantages'

export function Process() {
  const { lang, t } = useLanguage()
  const [active, setActive] = useState<TabId>('services')

  const tabs = [
    { id: 'services', label: t('process.tab.services') },
    { id: 'advantages', label: t('process.tab.advantages') },
  ]

  return (
    <Section id="process" tone="surface" size="tall">
      <SectionHeader
        index="02"
        overline={t('process.eyebrow')}
        title={t('process.title')}
        intro={t('process.intro')}
      />

      <div className="mt-12">
        <ProcessTabs
          tabs={tabs}
          active={active}
          onChange={(id) => setActive(id as TabId)}
          label={t('process.title')}
        />

        <div
          role="tabpanel"
          id="process-panel-services"
          aria-labelledby="process-tab-services"
          hidden={active !== 'services'}
          tabIndex={0}
          className="pt-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <ul>
            {services.map((service, index) => (
              <Reveal as="li" key={service.id} delay={index * 60}>
                <div className="group grid gap-3 border-b border-border py-7 transition-colors hover:bg-background/70 md:grid-cols-12 md:items-baseline md:gap-4 md:py-8">
                  <span className="font-mono text-sm text-primary md:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:col-span-4 md:text-2xl">
                    {service.title[lang]}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-6 md:text-base">
                    {service.description[lang]}
                  </p>
                  <span className="hidden items-center justify-end text-muted-foreground transition-colors group-hover:text-primary md:col-span-1 md:flex">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div
          role="tabpanel"
          id="process-panel-advantages"
          aria-labelledby="process-tab-advantages"
          hidden={active !== 'advantages'}
          tabIndex={0}
          className="pt-8 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage, index) => (
              <Reveal
                as="li"
                key={advantage.id}
                delay={index * 60}
                className="bg-background"
              >
                <div className="h-full p-6 md:p-7">
                  <span className="flex h-10 w-10 items-center justify-center border border-primary/25 bg-primary/10 text-primary">
                    <Icon name={advantage.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                    {advantage.title[lang]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {advantage.description[lang]}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
