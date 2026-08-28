import { site } from '../data/site'
import { useLanguage } from '../i18n/useLanguage'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold tracking-tight text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t('footer.tagline')}</p>
        </div>

        <ul className="flex items-center gap-6">
          {Object.values(site.socials).map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-6 py-4 text-center text-xs text-muted-foreground md:text-left">
          © {year} {site.fullName}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
