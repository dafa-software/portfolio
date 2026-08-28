import type { LocalizedText } from './projects'

export interface Advantage {
  id: string
  icon: string
  title: LocalizedText
  description: LocalizedText
}

export const advantages: Advantage[] = [
  {
    id: 'performance-first',
    icon: 'rocket',
    title: {
      'pt-BR': 'Performance em primeiro lugar',
      en: 'Performance first',
    },
    description: {
      'pt-BR':
        'Cada decisão considera velocidade e experiência do usuário, com métricas que entregam mais que o necessário.',
      en: 'Every decision weighs speed and user experience, with metrics that go beyond the baseline.',
    },
  },
  {
    id: 'responsive',
    icon: 'device',
    title: {
      'pt-BR': 'Responsivo em qualquer tela',
      en: 'Responsive on every screen',
    },
    description: {
      'pt-BR':
        'Layouts que se adaptam bem do smartphone ao desktop, sem quebrar nem sacrificar a hierarquia visual.',
      en: 'Layouts that adapt from smartphone to desktop without breaking or losing visual hierarchy.',
    },
  },
  {
    id: 'accessible',
    icon: 'sparkles',
    title: {
      'pt-BR': 'Acessível e inclusivo',
      en: 'Accessible & inclusive',
    },
    description: {
      'pt-BR':
        'Teclado, leitores de tela e temas claro/escuro — o produto funciona para todas as pessoas.',
      en: 'Keyboard, screen readers and light/dark themes — the product works for everyone.',
    },
  },
  {
    id: 'communication',
    icon: 'chat',
    title: {
      'pt-BR': 'Comunicação transparente',
      en: 'Clear communication',
    },
    description: {
      'pt-BR':
        'Progresso visível, prazos realistas e decisões compartilhadas em cada etapa do projeto.',
      en: 'Visible progress, realistic timelines and decisions shared at every project stage.',
    },
  },
  {
    id: 'seo-ready',
    icon: 'search',
    title: {
      'pt-BR': 'Pronto para buscadores',
      en: 'Search-engine ready',
    },
    description: {
      'pt-BR':
        'Metadados, dados estruturados e performance que ajudam seu negócio a ser encontrado.',
      en: 'Metadata, structured data and performance that help your business get found.',
    },
  },
  {
    id: 'delivery',
    icon: 'clock',
    title: {
      'pt-BR': 'Entrega pontual e iterativa',
      en: 'On-time, iterative delivery',
    },
    description: {
      'pt-BR':
        'Entregas incrementais desde o começo: você vê o produto evoluir e aprova em etapas.',
      en: 'Incremental delivery from day one: you watch the product evolve and approve in stages.',
    },
  },
]
