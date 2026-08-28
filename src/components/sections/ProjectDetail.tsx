import { useEffect, useRef } from 'react'
import type { Project } from '../../data/projects'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const { lang, t } = useLanguage()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label={t('projects.close')}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background p-6 outline-none md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('projects.close')}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon name="x" className="h-4 w-4" />
        </button>

        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
          {project.name.charAt(0)}
        </span>

        <h3
          id="project-detail-title"
          className="mt-4 text-2xl font-bold tracking-tight text-foreground"
        >
          {project.name}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t(
              project.category === 'institutional'
                ? 'projects.category.institutional'
                : 'projects.category.platform'
            )}
          </span>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
            {t(project.locale === 'br' ? 'projects.locale.br' : 'projects.locale.intl')}
          </span>
        </div>

        <dl className="mt-4">
          <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t('projects.role')}
          </dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {project.role[lang]}
          </dd>
        </dl>

        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {project.description[lang]}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          {t('projects.visit')}
          <Icon name="arrowUpRight" className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
