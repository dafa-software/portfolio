import type { SectorId } from './sectors'

export type ProjectCategory = 'institutional' | 'platform'
export type ProjectLocale = 'br' | 'intl'

export interface LocalizedText {
  'pt-BR': string
  en: string
}

export interface ProjectMedia {
  id: string
  type: 'image' | 'gif' | 'video'
  src: string
  alt?: LocalizedText
  poster?: string
}

export interface ProjectMetric {
  /** A plain string when identical in both languages, else one per language. */
  value: string | LocalizedText
  label: LocalizedText
}

export const metricValue = (metric: ProjectMetric, lang: keyof LocalizedText): string =>
  typeof metric.value === 'string' ? metric.value : metric.value[lang]

export interface Project {
  id: string
  name: string
  /** Omitted when the product no longer has a public site. */
  url?: string
  category: ProjectCategory
  locale: ProjectLocale
  /** A project can span several sectors; the first one is its primary sector. */
  sectors: SectorId[]
  techStack: string[]
  role: LocalizedText
  summary: LocalizedText
  description: LocalizedText
  audience: LocalizedText
  highlights: LocalizedText[]
  /** Facts taken from the product's own public site or repository. */
  metrics: ProjectMetric[]
  media: ProjectMedia[]
  historical?: boolean
  /** Shown in the hero strip. */
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'futureme',
    name: 'FutureMe',
    url: 'https://futureme.tech',
    category: 'platform',
    locale: 'br',
    sectors: ['education'],
    featured: true,
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    role: { 'pt-BR': 'CTO', en: 'CTO' },
    summary: {
      'pt-BR':
        'Plataforma de orientação profissional autodirigida e gamificada para estudantes do Ensino Médio.',
      en: 'Self-directed, gamified career guidance platform for high school students.',
    },
    description: {
      'pt-BR':
        'Plataforma educacional da Jornada do Futuro que prepara estudantes para uma escolha profissional mais consciente, com trilha gamificada, material didático e relatórios inteligentes para escolas. Atuação como CTO, liderando arquitetura, equipe e entregas técnicas.',
      en: 'Educational platform from Jornada do Futuro that prepares students for a more conscious career choice, featuring a gamified journey, educational material and smart reports for schools. Acted as CTO, leading architecture, team and technical delivery.',
    },
    audience: {
      'pt-BR':
        'Escolas de Ensino Médio, professores de Projeto de Vida, alunos e famílias.',
      en: 'High schools, life-project teachers, students and families.',
    },
    highlights: [
      {
        'pt-BR':
          'Jornada gamificada em três etapas: “O Eu”, “As Profissões” e “O Match”.',
        en: 'Gamified journey in three stages: “The Self”, “The Professions” and “The Match”.',
      },
      {
        'pt-BR':
          'Relatórios ao fim de cada série, para o aluno e para a escola, com insumos pedagógicos.',
        en: 'Reports at the end of each grade, for the student and the school, with pedagogical insight.',
      },
      {
        'pt-BR':
          'Implantação flexível: professores preparados em uma única reunião online.',
        en: 'Flexible rollout: teachers get ready in a single online meeting.',
      },
      {
        'pt-BR':
          'Implantada em 2023 na SEEDUC-RJ, com parceria formalizada em 2024 e expansão para mais colégios.',
        en: 'Rolled out in 2023 at SEEDUC-RJ, with the partnership formalized in 2024 and expanded to more schools.',
      },
    ],
    metrics: [
      {
        value: { 'pt-BR': '+3.000', en: '+3,000' },
        label: {
          'pt-BR': 'escolas atendidas em todo o Brasil',
          en: 'schools served across Brazil',
        },
      },
      {
        value: 'SEEDUC-RJ',
        label: {
          'pt-BR': 'Secretaria de Estado de Educação do RJ',
          en: 'Rio de Janeiro State Department of Education',
        },
      },
    ],
    media: [],
  },
  {
    id: 'deeporigin',
    name: 'Deep Origin',
    url: 'https://deeporigin.com',
    category: 'platform',
    locale: 'intl',
    sectors: ['biotech'],
    featured: true,
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    role: {
      'pt-BR': 'Engenheiro Front-end Sênior',
      en: 'Senior Front-end Engineer',
    },
    summary: {
      'pt-BR': 'Plataforma cloud de descoberta de fármacos com IA baseada em física.',
      en: 'Cloud platform for drug discovery powered by physics-based AI.',
    },
    description: {
      'pt-BR':
        'Plataforma cloud para pesquisa biomédica que acelera a descoberta de medicamentos com IA baseada em física, docking molecular, FEP e simulação de biologia, usada por cientistas e engenheiros de biopharma em todo o mundo. Atuação como engenheiro front-end sênior no design system e nas experiências de simulação.',
      en: 'Cloud platform for biomedical research that accelerates drug discovery with physics-based AI, molecular docking, FEP and biology simulation, used by biopharma scientists and engineers worldwide. Worked as a senior front-end engineer on the design system and simulation experiences.',
    },
    audience: {
      'pt-BR': 'Cientistas e engenheiros de biopharma em todo o mundo.',
      en: 'Biopharma scientists and engineers worldwide.',
    },
    highlights: [
      {
        'pt-BR':
          'Escopo no projeto: design system e experiências de simulação da plataforma.',
        en: 'Scope on the project: the platform design system and simulation experiences.',
      },
      {
        'pt-BR':
          'Docking molecular e triagem virtual baseados em estrutura, com previsão de poses.',
        en: 'Structure-based molecular docking and virtual screening, with pose prediction.',
      },
      {
        'pt-BR':
          'Free-energy perturbation (FEP) para prever afinidade de ligação na otimização de leads.',
        en: 'Free-energy perturbation (FEP) to predict binding affinity in lead optimization.',
      },
      {
        'pt-BR': 'Extração de estruturas moleculares a partir de PDFs.',
        en: 'Extraction of molecular structures from PDFs.',
      },
      {
        'pt-BR':
          'Três formas de acesso: assistente de IA, interface visual ponta a ponta e workflows próprios.',
        en: 'Three ways in: an AI assistant, an end-to-end visual interface and custom workflows.',
      },
    ],
    metrics: [],
    media: [],
  },
  {
    id: 'globaltouch',
    name: 'Global Touch',
    url: 'https://globaltouch.com.br',
    category: 'platform',
    locale: 'br',
    sectors: ['saas'],
    featured: true,
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    role: { 'pt-BR': 'CTO (Fractional)', en: 'CTO (Fractional)' },
    summary: {
      'pt-BR': 'Plataforma SaaS de gestão inteligente de comunidades corporativas.',
      en: 'SaaS platform for intelligent corporate community management.',
    },
    description: {
      'pt-BR':
        'Plataforma B2B que estrutura, capacita e monitora comunidades corporativas, com arquitetura de comunidade, cursos, mentorias e dashboards estratégicos, atendendo organizações como Sebrae e FGV. Atuação como CTO fractional na direção técnica do produto.',
      en: 'B2B platform that structures, empowers and monitors corporate communities, with community architecture, courses, mentoring and strategic dashboards, serving organizations such as Sebrae and FGV. Acted as fractional CTO on the product technical direction.',
    },
    audience: {
      'pt-BR': 'Organizações com comunidades corporativas e seus gestores de comunidade.',
      en: 'Organizations running corporate communities, and their community managers.',
    },
    highlights: [
      {
        'pt-BR':
          'Diagnóstico gratuito de maturidade: avalia três pilares e posiciona a comunidade em um de quatro níveis.',
        en: 'Free maturity diagnosis: scores three pillars and places a community on one of four levels.',
      },
      {
        'pt-BR':
          'Gestão centralizada, métricas de engajamento em tempo real e dashboards estratégicos.',
        en: 'Centralized management, real-time engagement metrics and strategic dashboards.',
      },
      {
        'pt-BR':
          'Formação de líderes: cursos assíncronos, mentoria e comunidade de gestores com encontros semanais.',
        en: 'Leader development: asynchronous courses, mentoring and a community of managers with weekly sessions.',
      },
    ],
    metrics: [
      {
        value: '+50',
        label: { 'pt-BR': 'clientes da plataforma', en: 'platform clients' },
      },
      {
        value: '+1k',
        label: {
          'pt-BR': 'líderes capacitados pela Global Touch',
          en: 'leaders trained by Global Touch',
        },
      },
      {
        value: '+7',
        label: {
          'pt-BR': 'anos de mercado da Global Touch',
          en: 'years in business for Global Touch',
        },
      },
    ],
    media: [],
  },
  {
    id: 'meucondo',
    name: 'MeuCondo Digital',
    url: 'https://meucondo.digital',
    category: 'platform',
    locale: 'br',
    sectors: ['proptech'],
    featured: true,
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    role: { 'pt-BR': 'Fundador', en: 'Founder' },
    summary: {
      'pt-BR':
        'Plataforma que transforma arquivos da administradora em relatórios visuais de prestação de contas para os moradores.',
      en: 'Platform that turns property-manager files into visual financial reports for residents.',
    },
    description: {
      'pt-BR':
        'Plataforma de transparência para condomínios: o síndico envia o arquivo da administradora, a IA classifica receitas e despesas por categoria e o relatório vira uma página visual, compartilhável por link, que o morador entende em um minuto. Também reúne comunicados e projetos com status e prazo visíveis. Projeto fundado por Diego Aguiar, do MVP à operação.',
      en: 'Transparency platform for condominiums: the syndic uploads the property manager file, AI sorts income and expenses into categories, and the report becomes a visual, link-shareable page residents understand in a minute. It also gathers announcements and projects with visible status and deadlines. Founded by Diego Aguiar, from MVP to operation.',
    },
    audience: {
      'pt-BR': 'Síndicos, administradoras e moradores de condomínios.',
      en: 'Syndics, property managers and condominium residents.',
    },
    highlights: [
      {
        'pt-BR':
          'Upload de PDF, Excel, CSV ou e-mail (.eml) da administradora, com detecção automática do mês.',
        en: 'Upload a PDF, Excel, CSV or email (.eml) from the property manager, with automatic month detection.',
      },
      {
        'pt-BR':
          'IA classifica receitas e despesas por categoria; o síndico revisa e publica.',
        en: 'AI sorts income and expenses into categories; the syndic reviews and publishes.',
      },
      {
        'pt-BR':
          'Relatório compartilhável por link no WhatsApp ou e-mail, acessível pelo celular.',
        en: 'Report shareable by link over WhatsApp or email, readable on a phone.',
      },
      {
        'pt-BR':
          'Comunicados organizados por data e projetos com status e prazo visíveis.',
        en: 'Announcements organized by date and projects with visible status and deadlines.',
      },
    ],
    metrics: [
      {
        value: '1 min',
        label: {
          'pt-BR': 'do arquivo da administradora ao relatório visual',
          en: 'from property-manager file to visual report',
        },
      },
      {
        value: '3',
        label: {
          'pt-BR': 'passos: enviar, revisar, publicar',
          en: 'steps: upload, review, publish',
        },
      },
    ],
    media: [],
  },
  {
    id: 'tcgem',
    name: 'TC Gem',
    url: 'https://tcgem.com.br',
    category: 'platform',
    locale: 'br',
    sectors: ['collectibles'],
    techStack: ['React', 'TypeScript', 'Python', 'Flask', 'PostgreSQL', 'Tailwind CSS'],
    role: { 'pt-BR': 'CTO', en: 'CTO' },
    summary: {
      'pt-BR':
        'Plataforma de investimento em cartas Pokémon TCG: portfólio, preços de mercado e previsões com Machine Learning.',
      en: 'Investment platform for Pokémon TCG cards: portfolio tracking, market prices and Machine Learning forecasts.',
    },
    description: {
      'pt-BR':
        'Plataforma orientada a dados para quem investe em cartas colecionáveis de Pokémon TCG. Coleta preços de mercado automaticamente, acompanha portfólio e transações com ROI, projeta tendências com Machine Learning e aponta oportunidades de compra e arbitragem, tudo em uma única interface. Atuação como CTO, da arquitetura (API em Flask, PostgreSQL, front-end em React) à operação.',
      en: 'Data-driven platform for Pokémon TCG collectible card investors. It collects market prices automatically, tracks portfolio and transactions with ROI, projects trends with Machine Learning and surfaces buying and arbitrage opportunities, all in a single interface. Acted as CTO, from architecture (Flask API, PostgreSQL, React front end) to operation.',
    },
    audience: {
      'pt-BR': 'Colecionadores e investidores de cartas Pokémon TCG no Brasil.',
      en: 'Pokémon TCG collectors and investors in Brazil.',
    },
    highlights: [
      {
        'pt-BR': 'Portfólio e histórico de transações com preço de compra e venda e ROI.',
        en: 'Portfolio and transaction history with buy and sell prices and ROI.',
      },
      {
        'pt-BR':
          'Previsões de alta e baixa, clusters de comportamento de preço e projeção de 30 dias com Prophet.',
        en: 'Up/down forecasts, price-behavior clusters and a 30-day Prophet projection.',
      },
      {
        'pt-BR':
          'Oportunidades: arbitragem entre marketplaces, lotes abaixo da mediana histórica e outliers estatísticos.',
        en: 'Opportunities: marketplace arbitrage, lots below the historical median and statistical outliers.',
      },
      {
        'pt-BR':
          'Strategy Advisor: recomendações de compra por orçamento, com frete otimizado por vendedor.',
        en: 'Strategy Advisor: buying recommendations by budget, with shipping optimized per seller.',
      },
    ],
    metrics: [
      {
        value: { 'pt-BR': '+5.000', en: '+5,000' },
        label: { 'pt-BR': 'cartas monitoradas', en: 'cards tracked' },
      },
      { value: '+70', label: { 'pt-BR': 'coleções', en: 'sets' } },
    ],
    media: [],
  },
  {
    id: 'obomatacadao',
    name: 'OBOM Atacadão',
    url: 'https://obomatacadao.com.br',
    category: 'institutional',
    locale: 'br',
    sectors: ['retail'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Headless CMS'],
    role: { 'pt-BR': 'Desenvolvedor Full-stack', en: 'Full-stack Developer' },
    summary: {
      'pt-BR':
        'Site institucional do OBOM Atacadão, atacarejo carioca nascido em 2020 em Guaratiba.',
      en: 'Institutional website for OBOM Atacadão, a Rio de Janeiro wholesale-retail chain that opened in Guaratiba in 2020.',
    },
    description: {
      'pt-BR':
        'Desenvolvimento do site institucional do OBOM Atacadão, reunindo a história e o propósito da marca, encartes, divulgação do app e do cartão próprio e canais de atendimento, com foco em performance e conversão para o público de varejo e atacado.',
      en: 'Development of the OBOM Atacadão institutional website, bringing together the brand story and purpose, flyers, app and store-card promotion and customer channels, focused on performance and conversion for both retail and wholesale audiences.',
    },
    audience: {
      'pt-BR': 'Consumidores finais, revendedores e comerciantes do Rio de Janeiro.',
      en: 'End consumers, resellers and local merchants in Rio de Janeiro.',
    },
    highlights: [
      {
        'pt-BR': 'Conteúdo institucional da marca: propósito, missão, visão e valores.',
        en: 'Brand institutional content: purpose, mission, vision and values.',
      },
      {
        'pt-BR': 'Encartes e divulgação do app e do cartão próprio.',
        en: 'Flyers plus promotion of the app and the store card.',
      },
      {
        'pt-BR': 'Página Trabalhe Conosco para recrutamento de colaboradores.',
        en: 'A careers page (Trabalhe Conosco) for recruiting staff.',
      },
      {
        'pt-BR': 'Canais de atendimento: televendas e redes sociais.',
        en: 'Customer channels: telesales and social media.',
      },
    ],
    metrics: [
      {
        value: '2020',
        label: { 'pt-BR': 'ano de fundação da rede', en: 'year the chain opened' },
      },
    ],
    media: [],
  },
  {
    id: 'jatapronto',
    name: 'Já Tá Pronto',
    category: 'platform',
    locale: 'br',
    sectors: ['education'],
    techStack: ['React', 'TypeScript', 'Node.js'],
    role: { 'pt-BR': 'CTO (Fractional)', en: 'CTO (Fractional)' },
    summary: {
      'pt-BR':
        'Marketplace educacional que conecta educadores a recursos didáticos digitais.',
      en: 'Educational marketplace connecting educators to digital teaching resources.',
    },
    description: {
      'pt-BR':
        'Plataforma marketplace para a compra e venda de recursos didáticos: autores publicam materiais e escolas e professores encontram conteúdo por série, tema e matéria. Atuação como CTO fractional na arquitetura do produto, nos fluxos de transação e na direção técnica da plataforma. Projeto histórico: a plataforma não está mais em operação.',
      en: 'Marketplace platform for buying and selling teaching resources: authors publish materials and schools and teachers find content by grade, topic and subject. Acted as fractional CTO on product architecture, transaction flows and technical direction. Historical project: the platform is no longer in operation.',
    },
    audience: {
      'pt-BR': 'Autores de materiais didáticos, professores e escolas.',
      en: 'Teaching-material authors, teachers and schools.',
    },
    highlights: [
      {
        'pt-BR': 'Autores publicam e vendem materiais didáticos digitais.',
        en: 'Authors publish and sell digital teaching materials.',
      },
      {
        'pt-BR': 'Escolas e professores encontram conteúdo por série, tema e matéria.',
        en: 'Schools and teachers find content by grade, topic and subject.',
      },
      {
        'pt-BR': 'Fluxos de transação e política de pagamentos próprios.',
        en: 'Dedicated transaction flows and payment policy.',
      },
    ],
    metrics: [],
    media: [],
    historical: true,
  },
  {
    id: 'enlazaconmigo',
    name: 'Enlaza Conmigo',
    category: 'platform',
    locale: 'intl',
    sectors: ['fintech', 'community'],
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    role: {
      'pt-BR': 'Engenheiro Full-stack Staff',
      en: 'Staff Full-stack Engineer',
    },
    summary: {
      'pt-BR':
        'Plataforma de serviços médicos, financeiros e educacionais para a comunidade latina e hispana nos Estados Unidos.',
      en: 'Platform of medical, financial and educational services for the Latin and Hispanic community in the United States.',
    },
    description: {
      'pt-BR':
        'Plataforma integral que conecta a comunidade latina nos EUA a serviços médicos, financeiros e educativos, como depósito direto de folha, telemedicina, assistência legal e educação a distância, promovendo bem-estar e crescimento pessoal e profissional. Atuação como staff full-stack, definindo padrões técnicos e entregando ponta a ponta. Projeto histórico: a plataforma não está mais acessível.',
      en: 'All-in-one platform connecting the Latin community in the US to medical, financial and educational services, such as direct payroll deposit, telemedicine, legal assistance and distance learning, promoting well-being and personal and professional growth. Worked as a staff full-stack engineer, setting technical standards and shipping end to end. Historical project: the platform is no longer available.',
    },
    audience: {
      'pt-BR': 'Comunidade latina e hispana nos Estados Unidos.',
      en: 'The Latin and Hispanic community in the United States.',
    },
    highlights: [
      {
        'pt-BR': 'Depósito direto de folha de pagamento.',
        en: 'Direct payroll deposit.',
      },
      {
        'pt-BR': 'Telemedicina e serviços médicos.',
        en: 'Telemedicine and medical services.',
      },
      {
        'pt-BR': 'Assistência legal.',
        en: 'Legal assistance.',
      },
      {
        'pt-BR': 'Educação a distância.',
        en: 'Distance learning.',
      },
    ],
    metrics: [],
    media: [],
    historical: true,
  },
]
