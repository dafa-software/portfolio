export interface SocialLink {
  label: string
  url: string
}

export const site = {
  name: 'DAFA Software',
  founder: 'Diego Aguiar',
  email: 'diegoa.aguiar.dev@gmail.com',
  /** Public LinkedIn facts the founder panel is built from. */
  education: 'Descomplica Faculdade Digital',
  socials: {
    github: {
      label: 'GitHub',
      url: 'https://github.com/diegoafaguiar',
    } satisfies SocialLink,
    linkedin: {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/diegoafaguiar',
    } satisfies SocialLink,
    instagram: {
      label: 'Instagram',
      url: 'https://instagram.com/diegoafaguiar',
    } satisfies SocialLink,
  },
} as const
