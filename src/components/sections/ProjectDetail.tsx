import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { metricValue } from '../../data/projects'
import type { Project } from '../../data/projects'
import { sectorLabelKey } from '../../data/sectors'
import { useLanguage } from '../../i18n/useLanguage'
import { Icon } from '../Icon'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-border py-5">
      <p className="overline text-muted-foreground">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const { lang, t } = useLanguage()
  const panelRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const hasMedia = project.media.length > 0

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    panel?.focus()

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((node) => node.offsetParent !== null)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const nodes = focusables()
        if (nodes.length === 0) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        const active = document.activeElement
        if (event.shiftKey && (active === first || active === panel)) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        }
      }
      if (hasMedia && event.key === 'ArrowLeft') {
        setCurrent((index) => (index === 0 ? project.media.length - 1 : index - 1))
      }
      if (hasMedia && event.key === 'ArrowRight') {
        setCurrent((index) => (index === project.media.length - 1 ? 0 : index + 1))
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [onClose, hasMedia, project.media.length])

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
      {/* Dismiss surface only: the dialog's own close button is the
          keyboard-reachable one, so this must not be a focus stop. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fade-in absolute inset-0 bg-background/70 backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        tabIndex={-1}
        className="sheet-in relative flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-border bg-background outline-none"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-6 py-4 backdrop-blur md:px-10">
          <p className="overline truncate text-primary">
            {t('projects.sheet')}
            <span aria-hidden="true"> / </span>
            {project.sectors.map((sector) => t(sectorLabelKey[sector])).join(' · ')}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('projects.close')}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Icon name="x" className="h-4 w-4" />
          </button>
        </header>

        <div className="px-6 pb-16 pt-8 md:px-10">
          <h3
            id="project-detail-title"
            className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          >
            {project.name}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.historical ? (
              <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                {t('projects.historical')}
              </span>
            ) : null}
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

          {project.metrics.length > 0 ? (
            <dl className="mt-8 grid divide-y divide-border border border-border sm:grid-flow-col sm:auto-cols-fr sm:divide-x sm:divide-y-0">
              {project.metrics.map((metric) => (
                <div key={metric.label.en} className="flex flex-col-reverse px-5 py-4">
                  <dt className="mt-1 text-xs leading-snug text-muted-foreground">
                    {metric.label[lang]}
                  </dt>
                  <dd className="font-display text-2xl font-bold tracking-tight text-primary">
                    {metricValue(metric, lang)}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {hasMedia ? (
            <figure className="mt-8 border border-border bg-surface">
              <div className="relative aspect-video">
                {project.media.map((media, index) => (
                  <div
                    key={media.id}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      index === current ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
                    aria-hidden={index !== current}
                  >
                    {media.type === 'video' ? (
                      <video
                        src={media.src}
                        poster={media.poster}
                        controls
                        tabIndex={index === current ? 0 : -1}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <img
                        src={media.src}
                        alt={media.alt?.[lang] ?? project.name}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>
                ))}

                {project.media.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label={t('projects.media.previous')}
                      onClick={() =>
                        setCurrent((index) =>
                          index === 0 ? project.media.length - 1 : index - 1
                        )
                      }
                      className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground transition-colors hover:border-primary/50"
                    >
                      <Icon name="chevronLeft" className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label={t('projects.media.next')}
                      onClick={() =>
                        setCurrent((index) =>
                          index === project.media.length - 1 ? 0 : index + 1
                        )
                      }
                      className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground transition-colors hover:border-primary/50"
                    >
                      <Icon name="chevronRight" className="h-5 w-5" />
                    </button>
                  </>
                ) : null}
              </div>

              {project.media.length > 1 ? (
                <figcaption className="flex items-center justify-between border-t border-border px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {project.media.map((media, index) => (
                      <button
                        key={media.id}
                        type="button"
                        aria-label={media.alt?.[lang] ?? `${index + 1}`}
                        aria-current={index === current}
                        onClick={() => setCurrent(index)}
                        className={`h-1.5 transition-all ${
                          index === current
                            ? 'w-8 bg-primary'
                            : 'w-4 bg-border hover:bg-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(current + 1).padStart(2, '0')} /{' '}
                    {String(project.media.length).padStart(2, '0')}
                  </span>
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="mt-10">
            <Field label={t('projects.overview')}>
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.description[lang]}
              </p>
            </Field>

            <Field label={t('projects.highlights')}>
              <ul className="space-y-3">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight.en}
                    className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-primary"
                    />
                    {highlight[lang]}
                  </li>
                ))}
              </ul>
            </Field>

            <Field label={t('projects.audience')}>
              <p className="text-base leading-relaxed text-foreground">
                {project.audience[lang]}
              </p>
            </Field>

            <Field label={t('projects.role')}>
              <p className="text-base font-medium text-foreground">
                {project.role[lang]}
              </p>
            </Field>

            <Field label={t('projects.stack')}>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Field>
          </div>

          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary mt-10"
            >
              {t('projects.visit')}
              <Icon name="arrowUpRight" className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
