import type { LocalizedText } from './projects'

export interface SocialLink {
  label: string
  url: string
}

export const site = {
  name: 'Dafa',
  fullName: 'Dáfio Aguiar',
  role: {
    'pt-BR': 'Desenvolvedor Full-stack',
    en: 'Full-stack Developer',
  } satisfies LocalizedText,
  email: 'ola@dafa.dev',
  socials: {
    github: { label: 'GitHub', url: 'https://github.com/' } satisfies SocialLink,
    linkedin: { label: 'LinkedIn', url: 'https://linkedin.com/' } satisfies SocialLink,
    instagram: { label: 'Instagram', url: 'https://instagram.com/' } satisfies SocialLink,
  },
} as const
