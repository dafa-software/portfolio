export type ProjectCategory = 'institutional' | 'platform'
export type ProjectLocale = 'br' | 'intl'

export interface LocalizedText {
  'pt-BR': string
  en: string
}

export interface Project {
  id: string
  name: string
  url: string
  category: ProjectCategory
  locale: ProjectLocale
  techStack: string[]
  role: LocalizedText
  summary: LocalizedText
  description: LocalizedText
}

export const projects: Project[] = [
  {
    id: 'obomatacadao',
    name: 'OBOM Atacadão',
    url: 'https://obomatacadao.com.br',
    category: 'institutional',
    locale: 'br',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Headless CMS'],
    role: {
      'pt-BR': 'Desenvolvedor Full-stack',
      en: 'Full-stack Developer',
    },
    summary: {
      'pt-BR':
        'Site institucional do OBOM Atacadão, atacarejo carioca com dezenas de milhares de ofertas.',
      en: 'Institutional website for OBOM Atacadão, a Rio de Janeiro wholesale-retail chain with tens of thousands of offers.',
    },
    description: {
      'pt-BR':
        'Desenvolvimento do site institucional do OBOM Atacadão, reunindo história da marca, seções de ofertas e encartes, divulgação do app e do cartão próprio, com foco em performance e conversão para o público de varejo e atacado.',
      en: 'Development of the OBOM Atacadão institutional website, bringing together the brand story, deals and flyer sections, app and card promotion — focused on performance and conversion for both retail and wholesale audiences.',
    },
  },
  {
    id: 'futureme',
    name: 'FutureMe',
    url: 'https://futureme.tech',
    category: 'platform',
    locale: 'br',
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    role: {
      'pt-BR': 'Desenvolvedor Full-stack',
      en: 'Full-stack Developer',
    },
    summary: {
      'pt-BR':
        'Plataforma de orientação profissional autodirigida e gamificada para estudantes do Ensino Médio.',
      en: 'Self-directed, gamified career guidance platform for high school students.',
    },
    description: {
      'pt-BR':
        'Plataforma educacional da Jornada do Futuro que prepara estudantes para uma escolha profissional mais consciente, com trilha gamificada, material didático e relatórios inteligentes para escolas — atendendo mais de 3 mil instituições no Brasil.',
      en: 'Educational platform from Jornada do Futuro that prepares students for a more conscious career choice, featuring a gamified journey, educational material and smart reports for schools — serving over 3,000 institutions across Brazil.',
    },
  },
  {
    id: 'tcgem',
    name: 'TC Gem',
    url: 'https://tcgem.com.br',
    category: 'institutional',
    locale: 'br',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    role: {
      'pt-BR': 'Desenvolvedor Front-end',
      en: 'Front-end Developer',
    },
    summary: {
      'pt-BR': 'Site institucional da TC Gem, apresentando a empresa e seus serviços.',
      en: 'Institutional website for TC Gem presenting the company and its services.',
    },
    description: {
      'pt-BR':
        'Site institucional da TC Gem com identidade visual própria, estrutura de apresentação da empresa, serviços e canais de contato, construído com foco em clareza, leveza e navegação simples.',
      en: 'Institutional website for TC Gem with its own visual identity, company presentation, services and contact channels — built with a focus on clarity, lightness and simple navigation.',
    },
  },
  {
    id: 'meucondo',
    name: 'MeuCondo Digital',
    url: 'https://meucondo.digital',
    category: 'platform',
    locale: 'br',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    role: {
      'pt-BR': 'Desenvolvedor Front-end',
      en: 'Front-end Developer',
    },
    summary: {
      'pt-BR':
        'Plataforma digital que centraliza a gestão de condomínios em um só lugar.',
      en: 'Digital platform that centralizes condominium management in one place.',
    },
    description: {
      'pt-BR':
        'Plataforma de gestão condominial que digitaliza comunicação, reservas de áreas comuns, documentos e controle financeiro, unificando a rotina de síndicos, administradoras e moradores em um único ambiente.',
      en: 'Condominium management platform that digitizes communication, common-area bookings, documents and financial control, unifying the routine of syndics, administrators and residents in a single environment.',
    },
  },
  {
    id: 'enlazaconmigo',
    name: 'Enlaza Conmigo',
    url: 'https://enlazaconmigo.com',
    category: 'platform',
    locale: 'intl',
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    role: {
      'pt-BR': 'Desenvolvedor Full-stack',
      en: 'Full-stack Developer',
    },
    summary: {
      'pt-BR':
        'Plataforma de serviços médicos, financeiros e educacionais para a comunidade latina e hispana nos Estados Unidos.',
      en: 'Platform of medical, financial and educational services for the Latin and Hispanic community in the United States.',
    },
    description: {
      'pt-BR':
        'Plataforma integral que conecta a comunidade latina nos EUA a serviços médicos, financeiros e educativos — como depósito direto de folha, telemedicina, assistência legal e educação a distância — promovendo bem-estar e crescimento pessoal e profissional.',
      en: 'All-in-one platform connecting the Latin community in the US to medical, financial and educational services — such as direct payroll deposit, telemedicine, legal assistance and distance learning — promoting well-being and personal and professional growth.',
    },
  },
  {
    id: 'deeporigin',
    name: 'Deep Origin',
    url: 'https://deeporigin.com',
    category: 'platform',
    locale: 'intl',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    role: {
      'pt-BR': 'Desenvolvedor Front-end',
      en: 'Front-end Developer',
    },
    summary: {
      'pt-BR': 'Plataforma cloud de descoberta de fármacos com IA baseada em física.',
      en: 'Cloud platform for drug discovery powered by physics-based AI.',
    },
    description: {
      'pt-BR':
        'Plataforma cloud para pesquisa biomédica que acelera a descoberta de medicamentos com IA baseada em física, docking molecular, FEP e simulação de biologia, usada por cientistas e engenheiros de biopharma em todo o mundo.',
      en: 'Cloud platform for biomedical research that accelerates drug discovery with physics-based AI, molecular docking, FEP and biology simulation — used by biopharma scientists and engineers worldwide.',
    },
  },
]
