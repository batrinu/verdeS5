# Apple HIG Overhaul — verdeS5 web-dashboard

**Date:** 2026-08-06
**Status:** Approved
**Scope:** `verde-sector-5/web-dashboard/` — styling only. No functional, copy, data, or backend changes.

## Decision summary

Full Apple HIG adoption. The Night Garden visual system (forest-dark backgrounds, Living
Green branding, Bricolage Grotesque display type) is retired. The app adopts the HIG
token system wholesale: neutral system backgrounds, system grays, one font family
(system stack), light + dark themes via `prefers-color-scheme`, green as the single
tint used only for interactive elements. Adaptive density: iOS scale on touch/mobile,
macOS scale on desktop. All old CSS is fully replaced — no coexistence of two systems.

What survives unchanged: all Romanian UI copy, „estimat" labeling, offline-from-seed
behavior, role-aware navigation, presenter/demo mode behavior, all routes and
functionality, `useModalA11y`, the vitest logic suite.

## 1. Foundation

- `src/styles/hig.css` — verbatim copy of the apple-hig skill stylesheet
  (`~/.claude/skills/apple-hig/assets/hig.css`). Never hand-edited, so it stays
  replaceable/upgradeable. Imported first in `main.tsx`.
- `src/styles/app.css` — the only other stylesheet. Contains exactly three layers:
  1. Token overrides: the green tint pair (see §2).
  2. App-specific components hig.css cannot cover: tree map, tree/guardian visuals,
     toast animation, adoption certificate, chart bits.
  3. Shell scaffolding: layout grid for sidebar + content, bottom tab bar placement.
- Deleted: old `src/index.css` token system (file may remain as a 2-line import shim
  or be removed entirely), `src/App.css`, and all 23 per-page/per-component CSS files.
- `index.html`: remove the Google Fonts `<link>`/preconnects for Bricolage Grotesque
  and Inter. Font stack becomes the HIG system stack (`-apple-system,
  BlinkMacSystemFont, "Segoe UI", Roboto, …`). This removes the app's only external
  font dependency — a direct win for the works-offline rule.

## 2. Tint, color, themes

- **Tint:** a light/dark green pair, starting from Apple system green
  (`#34C759` light / `#30D158` dark). The filled-button combination
  (`--hig-tint` background + `--hig-tint-contrast` text) must pass WCAG 2.1 AA
  (≥ 4.5:1); exact hexes are locked during implementation with a computed contrast
  check, not eyeballed. Green appears **only** on interactive elements (buttons,
  links, active nav, toggles, focus rings).
- **Semantic colors:** red/orange/green from the HIG system palette are reserved for
  tree health states, danger actions, and warnings — never decoration. Stat numbers,
  badges, and headings are neutral labels.
- **Themes:** automatic via `prefers-color-scheme`; no manual toggle (hig.css already
  supports `data-theme` override if one is ever wanted). Every screen must look
  intentional in both themes.

## 3. Adaptive density

A small module in `main.tsx` watches
`matchMedia('(min-width: 900px) and (pointer: fine)')` and toggles the
`hig-desktop` class on `<html>`, live on change. Phones/tablets get the iOS scale
(17px body, 44px targets); desktop gets the macOS scale (13px body, tighter
controls). Every screen is QA'd at both densities.

## 4. App shell (Layout)

- **Desktop:** HIG translucent sidebar (`.hig-sidebar`) with the existing role-aware
  Romanian nav items and lucide icons (single icon set). Content pane opens with a
  plain large-title header — no boxed/bordered top bar.
- **Mobile:** `.hig-navbar` top bar; the existing bottom nav becomes a proper glass
  tab bar (`.hig-glass`). Glass is used on the navigation layer only — nowhere else
  except the presenter pill.
- **Presenter/demo pill:** identical behavior, restyled as a small floating glass
  control.

## 5. Shared components (built before pages)

- Merge the duplicate StatCards (`components/StatCard/` and `components/UI/StatCard`)
  into one component under `components/UI/`.
- All five modal/sheet components — AdoptTreeModal, LogWateringModal, WateringModal,
  AdoptionCertificateModal, SelectedTreeSheet — move onto the `.hig-sheet` pattern,
  keeping `useModalA11y` wiring.
- ToastContainer, EmptyState, LoadingSpinner, Badge: HIG-styled equivalents, styles
  in `app.css`, their CSS files deleted.
- App-wide: buttons → `.hig-button`, inputs → `.hig-field`, item collections →
  `.hig-list`. Hierarchy comes from the type scale and background levels
  (`--hig-bg` vs `--hig-bg-secondary`), not borders. Radii only from the token set
  (6 / 10 / 12–16px). Shadows only on true overlays (sheets, menus).

## 6. Page conversion — one commit per page

Order: Dashboard → Trees → Map → Reports + CreateReport → Campaigns → Rewards →
Community → Sponsors (list, grove, sponsor-dashboard) → Login/Register.

Each page's commit does three things atomically:
1. Rebuilds the page markup on hig/app classes.
2. Deletes the page's CSS file.
3. Migrates its inline `style={{}}` blocks to classes — only genuinely dynamic
   values (computed map positions, progress-bar widths, animation delays) may stay
   inline. Baseline: 175 inline style blocks across 19 TSX files.

## 7. Theme-aware visuals (highest risk)

`Sector5TreeMap` SVG, GuardianCard, and the adoption certificate are dark-tuned
today. They are recolored through CSS custom properties so both themes work. Tree
status colors map to the semantic palette (healthy = green, needs-water = orange,
critical = red). These components get an explicit two-theme visual review because
dark-only tuning is exactly where light-mode breakage hides.

## 8. Verification (definition of done)

- `tsc`/vite build clean; vitest suite green (logic-only tests, expected unaffected).
- Grep gates: zero references to retired tokens (`--bg-main`, `--bg-surface*`,
  `--color-primary-*`, `--color-text-*`, old `--space-*`/`--border-radius-*` names);
  zero orphaned `.css` files; no `Bricolage` or `fonts.googleapis` references.
- Browser screenshot pass: all 12 pages × light/dark × mobile/desktop density,
  reviewed against the five HIG rules (hierarchy without boxes, one accent, 8pt
  grid, type/contrast, ≥44px touch targets on the iOS scale) and AA contrast
  spot-checks.
- Docs follow the code: `DESIGN.md` rewritten for the new system, CLAUDE.md design
  block updated, devlog entry appended.
- **Deploy is a separate, user-gated step** — the shared demo is deployed only after
  the user reviews the result locally and says go.

## Out of scope

- Any backend/`cloudflare-backend` change.
- Copy changes, new features, gamification logic, data model.
- Manual theme toggle UI.
- PWA/service-worker cache changes beyond what the devlog runbook already requires
  for deploys.
