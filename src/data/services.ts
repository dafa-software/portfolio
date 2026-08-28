import type { LocalizedText } from './projects'

export interface Service {
  id: string
  icon: string
  title: LocalizedText
  description: LocalizedText
}

export const services: Service[] = [
  {
    id: 'web-dev',
    icon: 'code',
    title: {
      'pt-BR': 'Desenvolvimento Web',
      en: 'Web Development',
    },
    description: {
      'pt-BR':
        'Sites institucionais e landing pages rápidos, modernos e otimizados para conversão, do design ao deploy.',
      en: 'Fast, modern and conversion-optimized websites and landing pages, from design to deployment.',
    },
  },
  {
    id: 'platforms',
    icon: 'layers',
    title: {
      'pt-BR': 'Plataformas e Aplicações',
      en: 'Platforms & Applications',
    },
    description: {
      'pt-BR':
        'Produtos web completos — dashboards, áreas de assinante, editores e sistemas internos sob medida.',
      en: 'Full web products — dashboards, member areas, editors and tailor-made internal systems.',
    },
  },
  {
    id: 'ui-ux',
    icon: 'pen',
    title: {
      'pt-BR': 'Implementação de UI/UX',
      en: 'UI/UX Implementation',
    },
    description: {
      'pt-BR':
        'Tradução fiel de protótipos em interfaces acessíveis, responsivas e consistentes em qualquer tema.',
      en: 'Fidelity translation of prototypes into accessible, responsive and theme-consistent interfaces.',
    },
  },
  {
    id: 'performance',
    icon: 'gauge',
    title: {
      'pt-BR': 'Performance e SEO',
      en: 'Performance & SEO',
    },
    description: {
      'pt-BR':
        'Core Web Vitals no verde, carregamento rápido e estrutura de conteúdo pronta para buscadores.',
      en: 'Green Core Web Vitals, fast loading and content structure ready for search engines.',
    },
  },
  {
    id: 'maintenance',
    icon: 'wrench',
    title: {
      'pt-BR': 'Manutenção e Evolução',
      en: 'Maintenance & Evolution',
    },
    description: {
      'pt-BR':
        'Suporte contínuo: correções, novas seções, atualizações de dependências e melhorias incrementais.',
      en: 'Ongoing support: fixes, new sections, dependency updates and incremental improvements.',
    },
  },
  {
    id: 'quality',
    icon: 'shield',
    title: {
      'pt-BR': 'Código limpo e revisado',
      en: 'Clean, reviewed code',
    },
    description: {
      'pt-BR':
        'TypeScript, lint automatizado, testes e boas práticas para escalar sem dor e facilitar a manutenção.',
      en: 'TypeScript, automated linting, tests and best practices so the codebase scales and stays maintainable.',
    },
  },
]
