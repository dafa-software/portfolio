import { useMemo } from 'react'
import { projects } from '../../../data/projects'
import { site } from '../../../data/site'
import { useLanguage } from '../../../i18n/useLanguage'
import { Icon } from '../../Icon'
import { Reveal } from '../../Reveal'

/** Projects grouped by the role the founder held on them, derived from data. */
function useRoleGroups() {
  const { lang } = useLanguage()

  return useMemo(() => {
    const groups = new Map<string, { id: string; name: string }[]>()
    for (const project of projects) {
      const role = project.role[lang]
      groups.set(role, [
        ...(groups.get(role) ?? []),
        { id: project.id, name: project.name },
      ])
    }
    // Roles held on more projects first; Map order keeps ties stable.
    return [...groups.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [lang])
}

export function FounderPanel() {
  const { t } = useLanguage()
  const roleGroups = useRoleGroups()

  const facts = [
    { label: t('about.facts.base'), value: t('about.facts.base.value') },
    { label: t('about.facts.languages'), value: t('about.facts.languages.value') },
    {
      label: t('about.facts.education'),
      value: `${t('about.facts.education.value')} · ${site.education}`,
    },
    { label: t('about.facts.mentoring'), value: t('about.facts.mentoring.value') },
  ]

  return (
    <div className="mt-20 grid gap-12 border-t border-border pt-16 lg:grid-cols-12">
      <Reveal className="lg:col-span-4">
        <p className="overline text-primary">{t('about.founder.eyebrow')}</p>
        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {site.founder}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {t('about.founder.title')}
        </p>
        <a
          href={site.socials.linkedin.url}
          target="_blank"
          rel="noreferrer noopener"
          className="btn btn-ghost mt-6"
        >
          <Icon name="linkedin" className="h-4 w-4" />
          {t('about.founder.linkedin')}
        </a>
      </Reveal>

      <Reveal className="lg:col-span-8" delay={80}>
        <p className="text-base leading-relaxed text-foreground md:text-lg">
          {t('about.founder.bio')}
        </p>

        <dl className="mt-10 border-t border-border">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="grid gap-1 border-b border-border py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
            >
              <dt className="overline text-muted-foreground">{fact.label}</dt>
              <dd className="text-sm font-medium text-foreground">{fact.value}</dd>
            </div>
          ))}
          <div className="grid gap-3 border-b border-border py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="overline text-muted-foreground">{t('about.facts.roles')}</dt>
            <dd>
              <ul className="space-y-3">
                {roleGroups.map(([role, items]) => (
                  <li
                    key={role}
                    className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <span className="text-sm font-medium text-foreground sm:w-56 sm:shrink-0">
                      {role}
                    </span>
                    <span className="flex flex-wrap gap-x-3 gap-y-1">
                      {items.map((item) => (
                        <a
                          key={item.id}
                          href={`#projects/${encodeURIComponent(item.id)}`}
                          className="font-mono text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                        >
                          {item.name}
                        </a>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Reveal>
    </div>
  )
}
