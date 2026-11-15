# DAFA Software Portfolio

Bilingual (PT-BR / EN) portfolio for **DAFA Software** — the web development studio founded by Diego Aguiar — with dark/light theme. Single-page React app inspired by the Moonex freelancer layout: whitespace-heavy, strong typographic hierarchy, modern and minimal.

## Tech Stack

- **React 19 + TypeScript** with Vite 8
- **Tailwind CSS v4** (`@tailwindcss/vite`) with semantic design tokens that switch for dark/light via a `.dark` class
- **Custom i18n** — React Context, no library (`src/i18n/`)
- **LocalFonts** — Space Grotesk Variable (display) + Manrope Variable (body) + JetBrains Mono Variable (labels/numbers) via `@fontsource-variable`
- **Lint / Format** — Oxlint + Prettier

## Scripts

```bash
npm run dev       # start dev server (Vite HMR)
npm run build     # type-check + production build to dist/
npm run lint      # Oxlint
npm run format    # Prettier (write)
npm run format:check
npm run preview   # preview the production build
```

## Features

- Sections: Hero, About (Quem somos), Services, Advantages, Projects (filterable work list + detail modal with media carousel), Contact
- Language toggle PT-BR ↔ EN (persisted in `localStorage`)
- Theme toggle dark ↔ light (defaults to system preference, persisted, no-FOUC inline script)
- Editorial design system: mono overlines/index numbers, numbered section headers, hairline dividers
- Scroll-reveal animations (below fold only, honoring `prefers-reduced-motion`)
- Accessible dialogs, keyboard navigation, focus-visible rings
- Contact form opens the visitor's email app via `mailto:` (no backend)

## Project structure

```
src/
├── main.tsx            # provider hierarchy: ThemeProvider > LanguageProvider
├── App.tsx             # shell: Navbar > sections > Footer
├── index.css           # Tailwind import + design tokens + reveal styles
├── i18n/               # translations + LanguageContext/LanguageProvider/useLanguage
├── theme/              # ThemeContext/ThemeProvider/useTheme
├── data/               # projects.ts, sectors.ts, services.ts, advantages.ts, nav.ts, site.ts
├── hooks/              # useActiveSection (scroll spy), useProjectHash (#projects/:id)
└── components/
    ├── Navbar, Footer, LanguageToggle, ThemeToggle, Icon, Reveal, Section, SectionHeader
    ├── features/       # process/ProcessTabs, projects/ProjectCard+ProjectFilters, contact/ContactProgress, home/FeaturedProjects, about/FounderPanel
    └── sections/       # Hero, About, Process, Projects, ProjectDetail, Contact
```

## Product data — project media

Each project in `src/data/projects.ts` has a `media` array (`image` | `gif` | `video`). The detail modal renders a carousel with arrows, dots, counter and keyboard navigation. Media files are pending — drop them into `public/` and fill `src` paths; empty arrays simply omit the cover band (cards and the detail sheet are text-first).

Each project also carries `sectors` (one or more ids from `src/data/sectors.ts`, first is primary), `audience`, `highlights`, `metrics` and an optional `featured` flag that puts it in the hero strip. `metrics` should only hold facts taken from the product's own public site or repository, and `url` is omitted for products that are no longer online.

## Deployment

Static output in `dist/`. Any static host works; Vercel is the primary target.

### Docker

`Dockerfile` builds the site with Node and serves `dist/` through unprivileged nginx (`docker/nginx.conf.template`). The container listens on **5174**, the same port as `npm run dev` and `npm run preview`.

```bash
docker build -t dafa-portfolio .
docker run --rm -p 5174:5174 dafa-portfolio
```

`PORT` is substituted into the nginx config at startup, so hosts that inject their own port (Cloud Run, for example) work without a rebuild: `docker run --rm -e PORT=3000 -p 3000:3000 dafa-portfolio`.

### Vercel

Repo includes `vercel.json` (framework preset **vite**, build `npm run build`, output `dist`). Connect the repo on Vercel for automatic deploys, or:

```bash
npm run build
npx vercel --prod
```

## To-do before launch

- Buy a domain and replace the canonical `dafa.dev` in `index.html`, `public/sitemap.xml` and `public/robots.txt`.
- Add an `og-image.png` (1200×630) at the site root and update its URL in `index.html`.
- Fill `sameAs` (JSON-LD) in `index.html` and the social URLs in `src/data/site.ts` with real profiles.
- Add real project media (images/gifs/videos) to the `media` arrays in `src/data/projects.ts`.
