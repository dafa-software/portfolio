import { advantages } from '../../data/advantages'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../Reveal'
import { SectionHeader } from '../SectionHeader'

export function Advantages() {
  const { lang, t } = useLanguage()

  return (
    <section id="advantages" className="border-b border-border bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeader
          index="03"
          overline={t('advantages.eyebrow')}
          title={t('advantages.title')}
          intro={t('advantages.intro')}
        />

        <Reveal>
          <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {advantages.map((advantage, index) => (
              <li key={advantage.id} className="border-l-2 border-primary/40 pl-5">
                <p className="overline text-primary">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {advantage.title[lang]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {advantage.description[lang]}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
