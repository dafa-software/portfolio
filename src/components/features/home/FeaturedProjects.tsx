import { metricValue, projects } from '../../../data/projects'
import { sectorLabelKey } from '../../../data/sectors'
import { useLanguage } from '../../../i18n/useLanguage'
import { Icon } from '../../Icon'

const featured = projects.filter((project) => project.featured)

/**
 * Hero strip: a handful of real projects, each deep-linking into its detail
 * sheet, so a visitor sees proof of work before they scroll.
 */
export function FeaturedProjects() {
  const { lang, t } = useLanguage()

  return (
    <div className="relative border-t border-border bg-background/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 pb-5 pt-4">
        <div className="flex items-center justify-between gap-4">
          <p className="overline text-muted-foreground">{t('hero.featured.title')}</p>
          <a
            href="#projects"
            className="overline inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary-hover"
          >
            {t('hero.featured.all')}
            <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
          </a>
        </div>

        <ul className="-mx-6 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-1 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {featured.map((project) => {
            const metric = project.metrics[0]
            return (
              <li key={project.id} className="w-64 shrink-0 snap-start lg:w-auto">
                <a
                  href={`#projects/${encodeURIComponent(project.id)}`}
                  className="group flex h-full flex-col gap-1.5 border border-border bg-background px-4 py-3.5 transition-colors hover:border-primary/50"
                >
                  <span className="overline truncate text-primary">
                    {project.sectors
                      .map((sector) => t(sectorLabelKey[sector]))
                      .join(' · ')}
                  </span>
                  <span className="flex items-center justify-between gap-3 font-display text-base font-semibold tracking-tight text-foreground">
                    {project.name}
                    <Icon
                      name="arrowUpRight"
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    />
                  </span>
                  <span className="line-clamp-2 font-mono text-xs text-muted-foreground">
                    {metric
                      ? `${metricValue(metric, lang)} ${metric.label[lang]}`
                      : project.role[lang]}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
