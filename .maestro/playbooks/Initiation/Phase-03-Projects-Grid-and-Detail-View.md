# Phase 03: Projects Grid and Detail View

This phase turns the real project data from Phase 01 (`src/data/projects.ts` with the 6 real showcases) into a browsable portfolio: a filterable grid of project cards and a detail view that reveals the full bilingual description. It builds on the established i18n system, theme tokens, and Moonex aesthetic. The detail view is implemented as an accessible modal dialog — no router library is added.

Note: This playbook was reconstructed by the agent on 2026-08-28 because the original file was lost. Scope is inferred from the phase title and Phase 01 forward references.

## Tasks

- [ ] Extend `src/i18n/translations.ts` with typed keys for both locales:
  - Projects section eyebrow/title and intro line
  - Filter labels: All, Institutional, Platforms (+ locale filter: Brazil, International if kept simple)
  - Card: live demo / details button, "Visit site" link label, modal close label, role label

- [ ] Create `src/components/sections/Projects.tsx`:
  - Section header (eyebrow, title, intro) via `useLanguage`
  - Filter bar: buttons for All / Institutional / Platform, plus Brazil / International, marking active state with `bg-primary text-primary-foreground`
  - Responsive grid of cards (1/2 columns; 3 on large) built from `projects` filtered by active category and locale
  - Each card shows: a CSS placeholder cover (gradient + initials, no stock imagery), name, category badge, localized `summary`, and tech stack chips
  - Clicking a card opens the detail modal (card is a button)

- [ ] Create `src/components/sections/ProjectDetail.tsx` — accessible modal dialog:
  - `role="dialog"` + `aria-modal`, Escape to close, click-outside to close, focus management (focus the dialog on open, restore focus on close)
  - Shows: name, category + locale badges, role (localized), full localized `description`, tech stack chips, and a "Visit site" external link to `project.url`
  - Close button with localized label; `useEffect` to lock body scroll while open

- [ ] Wire `Projects` (with `id="projects"`) and the `ProjectDetail` modal into `src/App.tsx` between Advantages and the Footer; keep modal state local to `Projects.tsx` (or lift to App only if needed)

- [ ] Verify:
  - `npm run dev` boots clean; grid shows 6 projects filtered correctly by category and locale
  - Opening a card shows the modal with the full localized description; Escape/backdrop/close all dismiss it
  - Language toggle re-renders grid + modal text between PT-BR and EN; theme toggle renders both themes cleanly
  - Playwright spot-check: filter to "Institutional" shows 2 cards; open OBOM detail; Escape; switch language; open again
  - `npm run lint`, `npm run build`, `npm run format` all pass

- [ ] Commit with message e.g. "feat: add filterable projects grid with detail modal"
