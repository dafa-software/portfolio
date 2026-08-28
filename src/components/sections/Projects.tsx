import { useMemo, useState } from 'react'
import type { ProjectCategory, ProjectLocale } from '../../data/projects'
import { projects } from '../../data/projects'
import type { TranslationKey } from '../../i18n/translations'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../SectionHeading'
import { ProjectDetail } from './ProjectDetail'

type CategoryFilter = 'all' | ProjectCategory
type LocaleFilter = 'all' | ProjectLocale

const categoryFilters: { value: CategoryFilter; labelKey: TranslationKey }[] = [
  { value: 'all', labelKey: 'projects.filter.all' },
  { value: 'institutional', labelKey: 'projects.filter.institutional' },
  { value: 'platform', labelKey: 'projects.filter.platform' },
]

const localeFilters: { value: LocaleFilter; labelKey: TranslationKey }[] = [
  { value: 'all', labelKey: 'projects.filter.all' },
  { value: 'br', labelKey: 'projects.filter.br' },
  { value: 'intl', labelKey: 'projects.filter.intl' },
]

const coverGradients = [
  'from-primary to-primary-hover',
  'from-primary/70 to-primary-hover/70',
  'from-primary-hover to-primary/60',
]

export function Projects() {
  const { lang, t } = useLanguage()
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [localeFilter, setLocaleFilter] = useState<LocaleFilter>('all')
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
    <section id="projects" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <SectionHeading
          eyebrow={t('projects.eyebrow')}
          title={t('projects.title')}
          intro={t('projects.intro')}
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <FilterGroup
            label="category"
            options={categoryFilters}
            active={category}
            onChange={setCategory}
          />
          <span aria-hidden="true" className="mx-2 hidden h-5 w-px bg-border sm:block" />
          <FilterGroup
            label="locale"
            options={localeFilters}
            active={localeFilter}
            onChange={setLocaleFilter}
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 80}>
              <button
                type="button"
                onClick={() => setSelected(project.id)}
                aria-label={`${t('projects.details')}: ${project.name}`}
                className="group flex h-full w-full flex-col overflow-hidden text-left rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-32 items-center justify-center bg-gradient-to-br ${
                    coverGradients[index % coverGradients.length]
                  }`}
                >
                  <span className="text-4xl font-bold text-primary-foreground/90">
                    {project.name
                      .split(' ')
                      .map((part) => part.charAt(0))
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </span>

                <span className="flex flex-1 flex-col p-5">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-foreground">
                      {project.name}
                    </span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                      {t(
                        project.category === 'institutional'
                          ? 'projects.category.institutional'
                          : 'projects.category.platform'
                      )}
                    </span>
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.summary[lang]}
                  </span>
                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedProject ? (
        <ProjectDetail project={selectedProject} onClose={() => setSelected(null)} />
      ) : null}
    </section>
  )
}

function FilterGroup<T extends CategoryFilter | LocaleFilter>({
  label,
  options,
  active,
  onChange,
}: {
  label: string
  options: { value: T; labelKey: TranslationKey }[]
  active: T
  onChange: (value: T) => void
}) {
  const { t } = useLanguage()
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-1 rounded-full border border-border bg-surface p-1"
    >
      {options.map((option) => {
        const isActive = active === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t(option.labelKey)}
          </button>
        )
      })}
    </div>
  )
}
