# DAFA Software Portfolio

Bilingual (PT-BR / EN) portfolio for **DAFA Software** — the web development studio founded by Diego Aguiar — with dark/light theme. Single-page React app inspired by the Moonex freelancer layout: whitespace-heavy, strong typographic hierarchy, modern and minimal.

## Tech Stack

- **React 19 + TypeScript** with Vite 8
- **Tailwind CSS v4** (`@tailwindcss/vite`) with semantic design tokens that switch for dark/light via a `.dark` class
- **Custom i18n** — React Context, no library (`src/i18n/`)
- **LocalFonts** — Inter Variable (body) + Space Grotesk Variable (display) via `@fontsource-variable`
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

- Sections: Hero, About (Quem somos), Services, Advantages, Projects (filterable grid + detail modal with media carousel), Contact
- Language toggle PT-BR ↔ EN (persisted in `localStorage`)
- Theme toggle dark ↔ light (defaults to system preference, persisted, no-FOUC inline script)
- Scroll-reveal animations honoring `prefers-reduced-motion`
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
├── data/               # projects.ts, services.ts, advantages.ts, site.ts
└── components/
    ├── Navbar, Footer, LanguageToggle, ThemeToggle, Icon, Reveal, SectionHeading
    └── sections/       # Hero, About, Services, Advantages, Projects, ProjectDetail, Contact
```

## Product data — project media

Each project in `src/data/projects.ts` has a `media` array (`image` | `gif` | `video`). The detail modal renders a carousel with arrows, dots, counter and keyboard navigation. Media files are pending — drop them into `public/` and fill `src` paths; empty arrays fall back to the monogram cover.

## Deployment

Static output in `dist/`. Any static host works; Vercel is the primary target.

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
