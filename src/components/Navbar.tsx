import { useEffect, useState } from 'react'
import { site } from '../data/site'
import type { TranslationKey } from '../i18n/translations'
import { useLanguage } from '../i18n/useLanguage'
import { Icon } from './Icon'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

const links: { key: TranslationKey; href: string; index: string }[] = [
  { key: 'nav.about', href: '#about', index: '01' },
  { key: 'nav.services', href: '#services', index: '02' },
  { key: 'nav.projects', href: '#projects', index: '03' },
  { key: 'nav.contact', href: '#contact', index: '04' },
]

export function Navbar() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const linkClasses =
    'group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          className="flex items-center transition-opacity hover:opacity-80"
          aria-label={site.name}
        >
          <img src="/logo.png" alt={site.name} className="h-9 w-auto" />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={linkClasses}>
              <span className="font-mono text-[11px] text-primary">{link.index}</span>
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="#contact" className="btn btn-primary px-5! py-2.5!">
            {t('hero.cta.secondary')}
          </a>
          <ThemeToggle />
          <LanguageToggle />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={t(menuOpen ? 'nav.menu.close' : 'nav.menu.open')}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
        >
          <Icon name={menuOpen ? 'x' : 'menu'} className="h-5 w-5" />
        </button>
      </nav>

      {menuOpen ? (
        <div className="border-t border-border bg-background px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-3 text-base font-medium text-foreground"
              >
                <span className="font-mono text-xs text-primary">{link.index}</span>
                {t(link.key)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary mt-2"
            >
              {t('hero.cta.secondary')}
            </a>
          </div>
          <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      ) : null}
    </header>
  )
}
