# Mobile & Dark Repair Pass — verdeS5 web-dashboard

**Date:** 2026-08-07
**Status:** Approved (Approach A)
**Scope:** `verde-sector-5/web-dashboard/` — repair pass on the shipped Apple HIG system.
Desktop layout is sound and stays as-is except where a fix is inherently shared.

## Why

The HIG overhaul shipped without any reviewer ever seeing a true narrow viewport
(browser tooling pinned the viewport during QA). At 390–400px, in both themes, the
app exhibits six verified defects (screenshots taken 2026-08-07 on the deployed
build). This spec fixes those six. It is a repair pass, not a redesign.

## The six defects and their fixes

### 1. Triple header stack on mobile
Every shell page renders: mobile navbar (page title) + PitchHeader's fixed 34px
app-name `<h1>` (wraps to 3 lines at 390px) + the page's own `<h2>` + subtitle.

**Fix:** On mobile (<900px), the navbar owns the title and PitchHeader's `<h1>`
(and its subtitle strip, if any) is hidden via CSS (`display: none` under the
existing 899px breakpoint). Desktop rendering unchanged. The demo pill is portaled
to `<body>` and MUST remain functional on all widths. Accessibility note: on
mobile the heading outline then starts at the page's `<h2>`; accepted for now.

### 2. Green chrome everywhere (specificity bug)
`hig.css` has `.hig a { color: var(--hig-tint) }` (specificity 0,1,1). Anchor-based
nav items (`a.app-tabbar-item`, `a.hig-sidebar-item`) have 0,1,0 selectors, so ALL
nav links render tint green, active or not. Same bug family as the fixed
`a.hig-button`.

**Fix (app.css only — hig.css is never edited):** add
`a.app-tabbar-item { color: var(--hig-label-secondary); }`,
`a.app-tabbar-item.active { color: var(--hig-tint); }`,
`a.hig-sidebar-item { color: var(--hig-label); }`,
`a.hig-sidebar-item.active { color: var(--hig-tint); }`.
Then sweep for any other anchor styled by a class that expects non-tint text
(one grep for `<a`/`<Link`/`<NavLink` + className) and fix the same way.

### 3. Tab bar layout
Labels wrap ("Tablou de Comandă" → two lines), items misalign.

**Fix:** tab items get short mobile labels — sanctioned NEW Romanian copy, exactly:
`Acasă` (/), `Hartă` (/map), `Rapoarte` (/reports), `Recompense` (/rewards),
`Sponsori` (/sponsors). Implemented as a `tabLabel` field on the nav item objects
(sidebar keeps the full labels). Tab items: `white-space: nowrap`, centered column,
`font-size: var(--hig-text-caption2)`, min-height 49px + safe-area padding as today.

### 4. Segmented control misuse
Trees' water-status filter puts 5 options in `.hig-segmented`, which wraps to two
rows. Segmented controls must never wrap and max out at ~3 options on mobile.

**Fix:** convert the water-status filter to a `<select class="hig-field">`
(mirroring the adjacent species select) with the same state values and byte-identical
option copy. Audit the app for any other `.hig-segmented` with >3 options or
observed wrapping (Dashboard's 2-option Hartă/Clasament stays segmented).

### 5. Misaligned insets and boxed chrome
The mobile navbar renders as an inset floating box; navbar/title/content use
different left/right insets; duplicate paddings persist (e.g. the parked ≤768px
`.app-dashboard-content` stack); the tree-voice quote keeps a left border.

**Fix:**
- Navbar goes edge-to-edge: restructure `Layout.tsx` so the mobile navbar sits
  outside `main.app-content`'s padding (full-bleed bar with `hig-material`,
  hairline bottom separator only), title centered.
- One inset system: define `--app-inset` (`--hig-space-4` mobile /
  `--hig-space-6` desktop) consumed by `app-content`; remove per-page/per-component
  horizontal paddings and margins that double it (includes resolving the parked
  ≤768px `.app-dashboard-content` duplicate). Every top-level element on a page
  aligns to the same left edge.
- Remove the quote left border (`.app-tree-message` family): italic +
  `--hig-label-secondary` instead. Sweep for any other decorative borders that
  crept in.

### 6. Dark-theme texture and override completeness
Pure `#000` + near-black cards with hairline boxes reads flat/cheap; and forcing
`data-theme` produced mixed-theme rendering, meaning the attribute override path
diverges from the media-query path somewhere.

**Fix:**
- Keep Apple's dark values (no invented ramp) but ensure elevation reads:
  cards/list groups consistently on `--hig-bg-secondary`, page on `--hig-bg`,
  no redundant hairlines around already-elevated surfaces, controls (segmented
  track, fields) on `--hig-fill-*` not bespoke fills.
- Audit `hig.css`'s `:root[data-theme="dark"]` block vs its
  `@media (prefers-color-scheme: dark)` block; any token present in one but not
  the other gets a completing override in app.css section 1 (hig.css untouched).
  Same check for the `data-theme="light"` escape from OS-dark.

## Constraints (unchanged from the overhaul)

- `src/styles/hig.css` is never edited; all fixes land in `app.css` (tokens only,
  no hardcoded colors, no new borders without existing precedent) or component TSX.
- Styling/markup only. No data-logic, handler, or route changes. Romanian copy
  byte-identical EXCEPT the five sanctioned tab labels in §3.
- Prop signatures frozen; demo pill behavior untouched.

## Verification discipline (the part that failed last time)

- **Every task verifies in a real browser at 390×844 AND ~1280px, in BOTH themes,
  with actual screenshots** — claude-in-chrome `resize_window` works now (verified
  2026-08-07); a task whose screenshots can't be captured is not done, it is
  BLOCKED. Dark theme via OS/emulated `prefers-color-scheme` where possible, not
  only the `data-theme` attribute (see §6).
- Build gates as before: `npx tsc -b && npx vite build && npx vitest run` per task.
- Final acceptance: screenshot matrix of all shell pages at 390px light+dark
  reviewed against the five HIG rules, plus a desktop spot-check that nothing
  regressed.
- Deploy only on explicit user go, after they preview.

## Out of scope

- Desktop layout changes beyond shared fixes (§2, §5 inset tokens, §6).
- Per-page mobile recomposition (Approach C), the dead `/reports/create` route,
  sponsor-dashboard data wiring, PWA/cache config.
