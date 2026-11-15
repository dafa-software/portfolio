import { metricValue } from '../../../data/projects'
import type { Project } from '../../../data/projects'
import { sectorLabelKey } from '../../../data/sectors'
import { useLanguage } from '../../../i18n/useLanguage'
import { Icon } from '../../Icon'

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (id: string) => void
}) {
  const { lang, t } = useLanguage()
  const cover = project.media.find((media) => media.type !== 'video')
  const metric = project.metrics[0]

  return (
    <button
      type="button"
      onClick={() => onOpen(project.id)}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        event.currentTarget.style.setProperty(
          '--glow-x',
          `${event.clientX - rect.left}px`
        )
        event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
      }}
      className="cursor-glow group flex h-full w-full flex-col border border-border bg-background text-left transition-colors hover:border-primary/50"
    >
      {cover ? (
        <span className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-border bg-surface">
          <img
            src={cover.src}
            alt={cover.alt?.[lang] ?? project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </span>
      ) : null}

      <span className="flex flex-1 flex-col p-6">
        <span className="flex items-center justify-between gap-4">
          <span className="overline text-primary">
            {project.sectors.map((sector) => t(sectorLabelKey[sector])).join(' · ')}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, '0')}
          </span>
        </span>

        <span className="mt-4 flex items-start justify-between gap-4">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {project.name}
          </span>
          <Icon
            name="arrowUpRight"
            className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </span>

        <span className="mt-1 font-mono text-xs text-muted-foreground">
          {project.role[lang]}
        </span>

        <span className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {project.summary[lang]}
        </span>

        {metric ? (
          <span className="mt-5 flex items-baseline gap-2 border-t border-border pt-4">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              {metricValue(metric, lang)}
            </span>
            <span className="text-xs text-muted-foreground">{metric.label[lang]}</span>
          </span>
        ) : null}

        <span className="mt-auto flex flex-wrap gap-2 pt-5">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {t(
              project.category === 'institutional'
                ? 'projects.category.institutional'
                : 'projects.category.platform'
            )}
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
            {t(project.locale === 'br' ? 'projects.locale.br' : 'projects.locale.intl')}
          </span>
          {project.historical ? (
            <span className="rounded-full border border-border px-2.5 py-1 text-xs font-semibold text-muted-foreground">
              {t('projects.historical')}
            </span>
          ) : null}
        </span>
      </span>

      <span className="sr-only">{t('projects.details')}</span>
    </button>
  )
}
