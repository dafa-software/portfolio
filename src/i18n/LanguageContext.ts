import { createContext } from 'react'
import type { Locale, TranslationKey } from './translations'

export interface LanguageContextValue {
  lang: Locale
  setLanguage: (lang: Locale) => void
  toggleLanguage: () => void
  t: (key: TranslationKey) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
