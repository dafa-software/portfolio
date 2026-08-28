export const translations = {
  'pt-BR': {
    'site.title': 'Dafa',
    'nav.about': 'Início',
    'nav.services': 'Serviços',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'hero.availability': 'Disponível para novos projetos',
    'hero.title.prefix': 'Transformo ideias em',
    'hero.title.highlight': 'produtos digitais',
    'hero.subtitle':
      'Desenvolvedor full-stack que constrói sites, plataformas e experiências web modernas, rápidas e acessíveis — do conceito à produção.',
    'hero.cta.primary': 'Ver projetos',
    'hero.cta.secondary': 'Fale comigo',
    'theme.toggle.dark': 'Ativar tema escuro',
    'theme.toggle.light': 'Ativar tema claro',
    'lang.toggle': 'Mudar para inglês (EN)',
    'footer.tagline': 'Produtos digitais com design moderno.',
    'footer.rights': 'Todos os direitos reservados.',
  },
  en: {
    'site.title': 'Dafa',
    'nav.about': 'Home',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.availability': 'Available for new projects',
    'hero.title.prefix': 'I turn ideas into',
    'hero.title.highlight': 'digital products',
    'hero.subtitle':
      'Full-stack developer building modern, fast and accessible websites, platforms and web experiences — from concept to production.',
    'hero.cta.primary': 'View projects',
    'hero.cta.secondary': 'Get in touch',
    'theme.toggle.dark': 'Enable dark theme',
    'theme.toggle.light': 'Enable light theme',
    'lang.toggle': 'Switch to Portuguese (BR)',
    'footer.tagline': 'Digital products with a modern design.',
    'footer.rights': 'All rights reserved.',
  },
} as const

export type Locale = keyof typeof translations
export type TranslationKey = keyof (typeof translations)['pt-BR']

export const isLocale = (value: string | null): value is Locale =>
  value === 'pt-BR' || value === 'en'
