import { useContext } from 'react'
import type { LanguageContextValue } from './LanguageContext'
import { LanguageContext } from './LanguageContext'

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return ctx
}
