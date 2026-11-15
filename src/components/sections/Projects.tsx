import { useMemo, useState } from 'react'
import { projects } from '../../data/projects'
import { sectorOrder } from '../../data/sectors'
import type { SectorId } from '../../data/sectors'
import { useProjectHash } from '../../hooks/useProjectHash'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../Reveal'
import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { ProjectCard } from '../features/projects/ProjectCard'
import type {
  CategoryFilter,
  LocaleFilter,
  SectorFilter,
} from '../features/projects/ProjectFilters'
import { ProjectFilters } from '../features/projects/ProjectFilters'
import { ProjectDetail } from './ProjectDetail'

const isKnownId = (id: string) => projects.some((project) => project.id === id)

export function Projects() {
  const { t } = useLanguage()
  const [sector, setSector] = useState<SectorFilter>('all')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [locale, setLocale] = useState<LocaleFilter>('all')
  const { openId, open, close } = useProjectHash(isKnownId)

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          (sector === 'all' || project.sectors.includes(sector)) &&
          (category === 'all' || project.category === category) &&
          (locale === 'all' || project.locale === locale)
      ),
    [sector, category, locale]
  )

  // Sector counts describe what each chip would show given the type and region
  // filters, so a chip never promises results the grid cannot deliver.
  const sectorCounts = useMemo(() => {
    const scoped = projects.filter(
      (project) =>
        (category === 'all' || project.category === category) &&
        (locale === 'all' || project.locale === locale)
    )
    return Object.fromEntries(
      sectorOrder.map((id) => [id, scoped.filter((p) => p.sectors.includes(id)).length])
    ) as Record<SectorId, number>
  }, [category, locale])

  const selectedProject = projects.find((project) => project.id === openId) ?? null

  const clearFilters = () => {
    setSector('all')
    setCategory('all')
    setLocale('all')
  }

  return (
    <Section id="projects">
      <SectionHeader
        index="03"
        overline={t('projects.eyebrow')}
        title={t('projects.title')}
        intro={t('projects.intro')}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <ProjectFilters
            sectorCounts={sectorCounts}
            sector={sector}
            category={category}
            locale={locale}
            onSectorChange={setSector}
            onCategoryChange={setCategory}
            onLocaleChange={setLocale}
            count={filtered.length}
          />
        </div>

        <div className="lg:col-span-9">
          {filtered.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2">
              {filtered.map((project, index) => (
                <Reveal as="li" key={project.id} delay={index * 70} className="h-full">
                  <ProjectCard project={project} index={index} onOpen={open} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start border border-dashed border-border bg-surface/50 p-10">
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                {t('projects.empty.title')}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t('projects.empty.body')}
              </p>
              <button type="button" onClick={clearFilters} className="btn btn-ghost mt-6">
                {t('projects.empty.action')}
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedProject ? (
        <ProjectDetail
          key={selectedProject.id}
          project={selectedProject}
          onClose={close}
        />
      ) : null}
    </Section>
  )
}
