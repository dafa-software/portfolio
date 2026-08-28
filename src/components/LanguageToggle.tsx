import { useLanguage } from '../i18n/useLanguage'
import type { Locale } from '../i18n/translations'

const locales: { value: Locale; label: string }[] = [
  { value: 'pt-BR', label: 'PT' },
  { value: 'en', label: 'EN' },
]

export function LanguageToggle() {
  const { lang, setLanguage, t } = useLanguage()

  return (
    <div className="flex items-center rounded-full border border-border bg-surface p-0.5">
      {locales.map(({ value, label }) => {
        const active = lang === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setLanguage(value)}
            aria-pressed={active}
            aria-label={t('lang.toggle')}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
