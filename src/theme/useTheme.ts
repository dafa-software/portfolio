import { useContext } from 'react'
import type { ThemeContextValue } from './ThemeContext'
import { ThemeContext } from './ThemeContext'

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
