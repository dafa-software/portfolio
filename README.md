# Dafa Portfolio

Bilingual (PT-BR / EN) full-stack developer portfolio with dark/light theme. Single-page React app inspired by the Moonex freelancer layout: whitespace-heavy, strong typographic hierarchy, modern and minimal.

## Tech Stack

- **React 19 + TypeScript** with Vite 8
- **Tailwind CSS v4** (`@tailwindcss/vite`) with semantic design tokens that switch for dark/light via a `.dark` class
- **Custom i18n** — React Context, no library (`src/i18n/`)
- **LocalFonts** — Inter Variable self-hosted via `@fontsource-variable/inter`
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

- Sections: Hero, About, Services, Advantages, Projects (filterable grid + detail modal), Contact
- Language toggle PT-BR ↔ EN (persisted in `localStorage`)
- Theme toggle dark ↔ light (defaults to system preference, persisted, no-FOUC inline script)
- Scroll-reveal animations honoring `prefers-reduced-motion`
- Accessible dialogs, keyboard navigation, focus-visible rings

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

## Deployment

Static output in `dist/`. Any static host works.

### Netlify

Repo includes `netlify.toml` (build `npm run build`, publish `dist`, SPA fallback). Connect the repo on Netlify and it deploys automatically; or:

```bash
npm run build
npx netlify deploy --prod
```

### Vercel

```bash
npm run build
npx vercel --prod
```

Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.

## To-do before launch

- Replace placeholders: `src/data/site.ts` social URLs and email.
- Add an `og-image.png` (1200×630) at the site root and update its URL in `index.html`.
- Replace the canonical domain `dafa.dev` in `index.html`, `public/sitemap.xml` and `public/robots.txt`.
- Fill `sameAs` (JSON-LD) in `index.html` with real social profile URLs.
