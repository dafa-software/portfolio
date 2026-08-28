# Phase 02: About, Services and Advantages

This phase extends the phase-01 shell with the three mid-page sections that give the portfolio its substance: About (the freelancer), Services (what is offered), and Advantages (why the client should hire). It reuses the existing i18n system, the semantic theme tokens (dark/light toggle), and the Moonex-style whitespace-heavy aesthetic already established. No user decisions are required; the agent works autonomously from the specs below.

Note: This playbook was reconstructed by the agent on 2026-08-28 because the original file was lost (see status). Scope is inferred from the phase title and Phase 01 forward references.

## Tasks

- [ ] Create `src/data/services.ts` with a typed `Service` interface and 4–6 real services (e.g. Web Development, Web Applications/Platforms, UI/UX Implementation, Maintenance, SEO/Performance, Landing Pages), each with icon name, `title` and `description` in both PT-BR and EN via the existing `LocalizedText` type

- [ ] Create `src/data/advantages.ts` with a typed `Advantage` interface and 4–6 advantages (e.g. Performance-first, Clean and maintainable code, Responsive design, SEO-ready, Clear communication, On-time delivery), each with icon name and `title` + `description` localized in PT-BR and EN

- [ ] Extend `src/i18n/translations.ts` with typed keys for both locales covering:
  - About: section eyebrow/title, bio paragraphs (2), stats labels (e.g. years of experience, projects delivered, clients served)
  - Services: section eyebrow/title, intro line
  - Advantages: section eyebrow/title, intro line

- [ ] Create `src/components/sections/About.tsx`:
  - Two-column layout biased toward whitespace: left side a stylized monogram/photo placeholder card (CSS-styled, no stock imagery), right side the bio + stats row
  - Uses `useLanguage` for all copy; honors `bg-surface`/`bg-background`/`border-border` tokens so it renders correctly in both themes

- [ ] Create `src/components/sections/Services.tsx`:
  - Grid of service cards (1/2/3 columns responsive) built from `services` data, each card with a small icon (inline SVG), title, and description
  - Uses `useLanguage`; cards use `bg-surface`, `border-border`, hover lift via `transition-transform` + `hover:-translate-y-1`

- [ ] Create `src/components/sections/Advantages.tsx`:
  - Layout of advantage cards (from `advantages` data) with icons, title, description
  - Contrasting background treatment (e.g. `bg-surface` band) to add rhythm between sections

- [ ] Wire the three sections into `src/App.tsx` between Hero and Footer, in order: About (`id="about"` already on Hero — rename carefully so About takes the `#about` anchor), Services (`id="services"`), Advantages
  - Keep Hero's anchor behavior consistent: the navbar link `nav.about` must scroll to the About section content, so move `id="about"` from Hero to About (Hero keeps no id or uses `id="home"`)

- [ ] Verify:
  - `npm run dev` boots with no console errors
  - All three sections render in PT-BR and flip to EN via the language toggle
  - Both themes render correctly (dark/light)
  - `npm run lint`, `npm run build`, `npm run format` all pass
  - Playwright spot-check: snapshot shows section headings in PT-BR; toggle to EN re-renders them

- [ ] Commit with message e.g. "feat: add about services and advantages sections"
