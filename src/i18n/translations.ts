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
    'about.eyebrow': 'Sobre mim',
    'about.title': 'Diálogo entre design e engenharia',
    'about.bio.1':
      'Sou desenvolvedor full-stack com foco em construir produtos web que unem estética e performance. Trabalho com marcas e plataformas de diferentes tamanhos, do site institucional ao SaaS.',
    'about.bio.2':
      'Gosto de começar pelo problema e não pela tecnologia: cada stack e cada detalhe de interface existe para resolver algo real — e para durar.',
    'about.stats.experience': 'Anos de experiência',
    'about.stats.projects': 'Projetos entregues',
    'about.stats.clients': 'Clientes atendidos',
    'services.eyebrow': 'Serviços',
    'services.title': 'O que eu faço',
    'services.intro':
      'Soluções completas para a sua presença digital — do conceito ao código em produção.',
    'advantages.eyebrow': 'Diferenciais',
    'advantages.title': 'Por que trabalhar comigo',
    'advantages.intro':
      'Valores e práticas que fazem a diferença no dia a dia do projeto e depois dele.',
    'projects.eyebrow': 'Projetos',
    'projects.title': 'Trabalhos em destaque',
    'projects.intro':
      'Uma seleção de projetos reais — sites, plataformas e produtos digitais.',
    'projects.filter.all': 'Todos',
    'projects.filter.institutional': 'Institucionais',
    'projects.filter.platform': 'Plataformas',
    'projects.filter.br': 'Brasil',
    'projects.filter.intl': 'Internacional',
    'projects.category.institutional': 'Institucional',
    'projects.category.platform': 'Plataforma',
    'projects.locale.br': 'Brasil',
    'projects.locale.intl': 'Internacional',
    'projects.role': 'Papel',
    'projects.visit': 'Visitar site',
    'projects.details': 'Ver detalhes',
    'projects.close': 'Fechar',
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
    'about.eyebrow': 'About me',
    'about.title': 'Where design meets engineering',
    'about.bio.1':
      "I'm a full-stack developer focused on building web products that pair aesthetics with performance. I work with brands and platforms of all sizes — from institutional websites to SaaS.",
    'about.bio.2':
      'I like to start from the problem, not the technology: every stack and interface detail exists to solve something real — and to last.',
    'about.stats.experience': 'Years of experience',
    'about.stats.projects': 'Projects delivered',
    'about.stats.clients': 'Clients served',
    'services.eyebrow': 'Services',
    'services.title': 'What I do',
    'services.intro':
      'Complete solutions for your digital presence — from concept to production code.',
    'advantages.eyebrow': 'Advantages',
    'advantages.title': 'Why work with me',
    'advantages.intro':
      'Values and practices that make a difference during the project and beyond.',
    'projects.eyebrow': 'Projects',
    'projects.title': 'Featured work',
    'projects.intro':
      'A selection of real projects — websites, platforms and digital products.',
    'projects.filter.all': 'All',
    'projects.filter.institutional': 'Institutional',
    'projects.filter.platform': 'Platforms',
    'projects.filter.br': 'Brazil',
    'projects.filter.intl': 'International',
    'projects.category.institutional': 'Institutional',
    'projects.category.platform': 'Platform',
    'projects.locale.br': 'Brazil',
    'projects.locale.intl': 'International',
    'projects.role': 'Role',
    'projects.visit': 'Visit website',
    'projects.details': 'View details',
    'projects.close': 'Close',
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
