import { useEffect, useState } from 'react'
import { navLinks, sectionIds } from '../data/nav'
import { site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useLanguage } from '../i18n/useLanguage'
import { Icon } from './Icon'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <a
        href="#about"
        className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
      >
        {t('skip.content')}
      </a>

      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          className="flex items-center transition-opacity hover:opacity-80"
          aria-label={site.name}
        >
          <img src="/logo.png" alt={site.name} className="h-9 w-auto" />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span
                  className={`font-mono text-[11px] transition-colors ${
                    isActive ? 'text-primary' : 'text-primary/60'
                  }`}
                >
                  {link.index}
                </span>
                {t(link.key)}
              </a>
            )
          })}
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
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={active === link.id ? 'true' : undefined}
                className={`flex items-baseline gap-3 text-base font-medium ${
                  active === link.id ? 'text-primary' : 'text-foreground'
                }`}
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
