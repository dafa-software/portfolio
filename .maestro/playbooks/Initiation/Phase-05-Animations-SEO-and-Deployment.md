# Phase 05: Animations, SEO and Deployment

This phase finishes the project: tasteful scroll animations (respecting reduced motion), production SEO/metadata (meta, Open Graph, JSON-LD, sitemap), and static deployment configuration so the site can ship to Netlify or Vercel. After this phase the site is production-buildable and deploy-ready.

Note: This playbook was reconstructed by the agent on 2026-08-28 because the original file was lost. Scope is inferred from the phase title and Phase 01 forward references.

## Tasks

- [ ] Create a scroll-reveal animation:
  - `src/hooks/useScrollReveal.ts` using `IntersectionObserver` that adds an `is-visible` class to a target element when it enters the viewport (threshold ~0.15), applied once
  - Define `.reveal` / `.reveal.is-visible` transition classes in `src/index.css` (fade + slight translate-up) and disable them under `@media (prefers-reduced-motion: reduce)`
  - Apply to section headings and project/service/advantage cards by wrapping in a small `Reveal` component (`src/components/Reveal.tsx`) — no animation library added

- [ ] Production SEO:
  - Complete the `index.html` head: `lang` reflects default locale, full title with name + role, meta description, canonical URL, Open Graph (`og:title`, `og:description`, `og:type`, `og:image`, `og:url`) and Twitter card tags, theme-color for light/dark, `preconnect` + `dns-prefetch` for static assets domain
  - Add `public/robots.txt` and `public/sitemap.xml` (with the canonical domain placeholder)
  - Add JSON-LD `Person` structured data in `index.html` (name, jobTitle, url, sameAs social links)

- [ ] Deployment configuration:
  - Add `netlify.toml` (build command `npm run build`, publish dir `dist`, SPA fallback) and document Vercel equivalently in README
  - Update `README.md`: project description, scripts (dev/lint/format/build/preview), tech stack, and deploy instructions for Netlify + Vercel
  - Confirm `npm run build` output is fully static and self-contained

- [ ] Final verification pass:
  - `npm run dev` at desktop + mobile: all 5 sections render in both languages and both themes; reveal animations trigger on scroll and do not break in reduced-motion
  - `npm run lint`, `npm run build`, `npm run format` all pass
  - Build output: confirm `dist/` contains `robots.txt`, `sitemap.xml`, and the index references the right assets
  - Playwright: load page, scroll to bottom, assert no console errors and no horizontal overflow

- [ ] Commit with message e.g. "feat: add scroll animations seo metadata and deploy config"
