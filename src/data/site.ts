export interface SocialLink {
  label: string
  url: string
}

export const site = {
  name: 'DAFA Software',
  founder: 'Diego Aguiar',
  email: 'diegoa.aguiar.dev@gmail.com',
  socials: {
    github: { label: 'GitHub', url: 'https://github.com/' } satisfies SocialLink,
    linkedin: { label: 'LinkedIn', url: 'https://linkedin.com/' } satisfies SocialLink,
    instagram: { label: 'Instagram', url: 'https://instagram.com/' } satisfies SocialLink,
  },
} as const
