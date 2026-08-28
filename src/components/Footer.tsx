import { site } from '../data/site'
import { useLanguage } from '../i18n/useLanguage'
import { Icon } from './Icon'

const navLinks: {
  key: 'nav.about' | 'nav.services' | 'nav.projects' | 'nav.contact'
  href: string
}[] = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.contact', href: '#contact' },
]

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="overline text-primary">{t('footer.cta')}</p>
            <a
              href="#contact"
              className="mt-4 block font-display text-4xl font-bold tracking-tight text-foreground transition-colors hover:text-primary md:text-6xl"
            >
              {t('footer.tagline')}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:col-span-5">
            <div>
              <p className="overline text-muted-foreground">{t('footer.navigation')}</p>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
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
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} {site.name}. {t('footer.rights')}
          </p>
          <p>{t('hero.based')}</p>
        </div>
      </div>
    </footer>
  )
}
