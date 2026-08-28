import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { isLocale, translations, type Locale, type TranslationKey } from './translations'
import { LanguageContext } from './LanguageContext'

const STORAGE_KEY = 'dafa-language'

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  return isLocale(stored) ? stored : 'pt-BR'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLocale] = useState<Locale>(getInitialLocale)

  const setLanguage = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next)
    setLocale(next)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'pt-BR' ? 'en' : 'pt-BR')
  }, [lang, setLanguage])

  const t = useCallback((key: TranslationKey) => translations[lang][key], [lang])

  const value = useMemo(
    () => ({ lang, setLanguage, toggleLanguage, t }),
    [lang, setLanguage, toggleLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
