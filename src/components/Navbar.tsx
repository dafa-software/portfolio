import { useEffect, useState } from 'react'
import { site } from '../data/site'
import type { TranslationKey } from '../i18n/translations'
import { useLanguage } from '../i18n/useLanguage'
import { Icon } from './Icon'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

const links: { key: TranslationKey; href: string }[] = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.contact', href: '#contact' },
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
    'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-lg font-bold tracking-tight text-foreground">
          {site.name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={linkClasses}>
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LanguageToggle />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={t(menuOpen ? 'nav.menu.close' : 'nav.menu.open')}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground md:hidden"
        >
          <Icon name={menuOpen ? 'x' : 'menu'} className="h-5 w-5" />
        </button>
      </nav>

      {menuOpen ? (
        <div className="border-t border-border bg-background px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-foreground"
              >
                {t(link.key)}
              </a>
            ))}
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
