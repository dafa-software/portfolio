import { useMemo, useState } from 'react'
import type { ProjectCategory, ProjectLocale } from '../../data/projects'
import { projects } from '../../data/projects'
import type { TranslationKey } from '../../i18n/translations'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { SectionHeader } from '../SectionHeader'
import { ProjectDetail } from './ProjectDetail'

type CategoryFilter = 'all' | ProjectCategory
type LocaleFilter = 'all' | ProjectLocale

const categoryFilters: { value: CategoryFilter; labelKey: TranslationKey }[] = [
  { value: 'all', labelKey: 'projects.filter.all' },
  { value: 'institutional', labelKey: 'projects.filter.institutional' },
  { value: 'platform', labelKey: 'projects.filter.platform' },
]

const localeFilters: { value: LocaleFilter; labelKey: TranslationKey }[] = [
  { value: 'all', labelKey: 'projects.filter.br' },
  { value: 'intl', labelKey: 'projects.filter.intl' },
]

export function Projects() {
  const { lang, t } = useLanguage()
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [localeFilter, setLocaleFilter] = useState<LocaleFilter>('br')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (category === 'all' || project.category === category) &&
          (localeFilter === 'all' || project.locale === localeFilter)
      ),
    [category, localeFilter]
  )

  const selectedProject = projects.find((project) => project.id === selected) ?? null

  return (
    <section id="projects" className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeader
          index="04"
          overline={t('projects.eyebrow')}
          title={t('projects.title')}
          intro={t('projects.intro')}
        />

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <div
            role="group"
            aria-label="category"
            className="flex flex-wrap items-center gap-5"
          >
            {categoryFilters.map((option) => {
              const isActive = category === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCategory(option.value)}
                  aria-pressed={isActive}
                  className={`overline pb-1 transition-colors ${
                    isActive
                      ? 'border-b-2 border-primary text-primary'
                      : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(option.labelKey)}
                </button>
              )
            })}
          </div>
          <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />
          <div
            role="group"
            aria-label="locale"
            className="flex flex-wrap items-center gap-5"
          >
            {localeFilters.map((option) => {
              const isActive = localeFilter === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setLocaleFilter(option.value)}
                  aria-pressed={isActive}
                  className={`overline pb-1 transition-colors ${
                    isActive
                      ? 'border-b-2 border-primary text-primary'
                      : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t(option.labelKey)}
                </button>
              )
            })}
          </div>
        </div>

        <Reveal>
          <ul className="mt-6">
            {filtered.map((project, index) => (
              <li key={project.id} className="border-t border-border">
                <button
                  type="button"
                  onClick={() => setSelected(project.id)}
                  aria-label={`${t('projects.details')}: ${project.name}`}
                  className="group grid w-full gap-3 py-7 text-left transition-colors hover:bg-surface/70 md:grid-cols-12 md:items-baseline md:gap-4 md:py-9"
                >
                  <span className="font-mono text-sm text-primary md:col-span-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex flex-col gap-1 md:col-span-4">
                    <span className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                      {project.name}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.role[lang]}
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground md:col-span-5 md:text-base">
                    {project.summary[lang]}
                  </span>
                  <span className="flex items-center justify-between gap-2 md:col-span-2 md:justify-end">
                    <span className="flex flex-wrap items-center gap-1.5">
                      {project.historical ? (
                        <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {t('projects.historical')}
                        </span>
                      ) : null}
                      <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {t(
                          project.locale === 'br'
                            ? 'projects.locale.br'
                            : 'projects.locale.intl'
                        )}
                      </span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon name="arrowUpRight" className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="h-px w-full bg-border" />
        </Reveal>
      </div>

      {selectedProject ? (
        <ProjectDetail project={selectedProject} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  )
}
