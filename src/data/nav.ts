import type { TranslationKey } from '../i18n/translations'

export interface NavLink {
  key: TranslationKey
  id: string
  index: string
}

export const navLinks: NavLink[] = [
  { key: 'about.eyebrow', id: 'about', index: '01' },
  { key: 'nav.process', id: 'process', index: '02' },
  { key: 'nav.projects', id: 'projects', index: '03' },
  { key: 'nav.contact', id: 'contact', index: '04' },
]

export const sectionIds = ['home', ...navLinks.map((link) => link.id)]
