# Phase 04: Contact, Polish and Responsiveness

This phase adds the final functional section (Contact) and then polishes the whole site: full responsiveness (including the mobile navigation that Phase 01 deferred), accessibility and keyboard polish, and visual consistency across both themes. After this phase the site is feature-complete in content terms.

Note: This playbook was reconstructed by the agent on 2026-08-28 because the original file was lost. Scope is inferred from the phase title and Phase 01 forward references.

## Tasks

- [ ] Extend `src/i18n/translations.ts` with typed keys for both locales:
  - Contact section eyebrow/title and intro line
  - Form labels: name, email, message; submit button; success/thanks confirmation message
  - Form validation messages (required fields, invalid email) — keep messages minimal
  - Reuse existing footer/social labels

- [ ] Create `src/components/sections/Contact.tsx`:
  - Two-column layout: left is contact info (email, social links from `src/data/site.ts`, availability note), right is a form (name, email, message)
  - Form submit: prevent default, validate locally, then show a thank-you state (no backend in this phase — no real HTTP send)
  - Honors `bg-surface`/`border-border` tokens; `id="contact"` anchor wired to the existing navbar link

- [ ] Make navigation responsive:
  - Extract the four anchor links into a shared list (Navbar owns it) and add a mobile menu: hamburger button that opens a slide-down panel listing the links + the existing toggles
  - Show the horizontal links at `md:` and the hamburger below `md`
  - Mobile menu must be keyboard accessible (button with aria-expanded, Escape closes)

- [ ] Global polish pass:
  - Consistent focus-visible ring on all interactive elements (`focus-visible:ring-2 ring-ring offset`)
  - Buttons/links share consistent hover/active states
  - Reduce motion: respect `prefers-reduced-motion` for the pulse dot and any transitions
  - Verify both themes on all sections

- [ ] Verify:
  - `npm run dev` boots; at `375px` width: hamburger menu opens, links navigate, toggles work
  - Form validates and shows the thank-you state; all labels are localized and flip with PT/EN
  - Playwright spot-check at desktop and `--mobile`: open menu, fill form, submit, confirm thank-you; check no horizontal overflow (`document.documentElement.scrollWidth <= innerWidth`)
  - `npm run lint`, `npm run build`, `npm run format` all pass

- [ ] Commit with message e.g. "feat: add contact section and responsive navigation polish"
