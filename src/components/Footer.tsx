import { navLinks } from '../data/nav'
import { site } from '../data/site'
import { useLanguage } from '../i18n/useLanguage'
import { Icon } from './Icon'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/60">
      <a
        href="#contact"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect()
          event.currentTarget.style.setProperty(
            '--glow-x',
            `${event.clientX - rect.left}px`
          )
          event.currentTarget.style.setProperty(
            '--glow-y',
            `${event.clientY - rect.top}px`
          )
        }}
        className="cursor-glow group block border-b border-border"
      >
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="overline text-primary">{t('footer.cta')}</p>
          <p className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-6xl lg:text-7xl">
            {t('footer.tagline')}
          </p>
          <span className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary">
            {t('hero.cta.secondary')}
            <Icon
              name="arrowUpRight"
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </a>

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="overline text-muted-foreground">{t('footer.navigation')}</p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="overline text-muted-foreground">{t('footer.contact')}</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
              </li>
              {Object.entries(site.socials).map(([key, social]) => (
                <li key={key}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon name={key} className="h-3.5 w-3.5" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2 md:justify-self-end md:text-right">
            <p className="overline text-muted-foreground">{t('hero.meta.studio')}</p>
            <p className="mt-4 font-display text-lg font-semibold tracking-tight text-foreground">
              {site.name}
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {site.founder} · {t('hero.based')}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} {site.name}. {t('footer.rights')}
          </p>
          <p>{t('hero.based')}</p>
        </div>
      </div>
    </footer>
  )
}
