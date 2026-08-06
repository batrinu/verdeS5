# Apple HIG Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Night Garden visual system in `verde-sector-5/web-dashboard/` with a full Apple HIG system (light+dark, adaptive density, green tint), deleting all old CSS.

**Architecture:** One canonical stylesheet (`src/styles/hig.css`, verbatim from the apple-hig skill) plus one app layer (`src/styles/app.css`). Foundation → app shell → shared components → 12 pages one commit each → cleanup/grep gates → visual QA → docs. Old tokens (`src/index.css`) survive until the final cleanup task so unconverted pages keep working mid-migration.

**Tech Stack:** React 18 + TypeScript + Vite, react-router-dom, lucide-react icons, vitest. Plain CSS (no preprocessor). Spec: `docs/superpowers/specs/2026-08-06-apple-hig-overhaul-design.md`.

## Global Constraints

- Styling only: no functional, copy, data, route, or backend changes. All Romanian copy and „estimat" labels stay byte-identical.
- Working dir for all commands: `verde-sector-5/web-dashboard/` unless a path says otherwise. Repo root: `/home/batrinu/projects/verdeS5`.
- `src/styles/hig.css` is NEVER edited. All overrides/additions go in `src/styles/app.css`.
- One accent: green tint pair (see Task 1) on interactive elements only. Semantic `--hig-red`/`--hig-orange`/`--hig-green` reserved for tree-health/danger/warning states.
- No hardcoded colors in TSX or app.css — only `var(--hig-*)` tokens (exception: the tint hex pair defined once in app.css).
- No new borders except `--hig-separator` hairlines already provided by hig components. Radii only via `--hig-radius-*`. Spacing only via `--hig-space-*`.
- `.hig-glass` appears ONLY on: mobile tab bar, presenter/demo pill. Nowhere else.
- Inline `style={{}}` allowed ONLY for genuinely dynamic values (computed map x/y, progress `--hig-progress`, animation delays). Everything else becomes a class.
- Each page task deletes that page's `.css` file and removes its import in the same commit.
- Build gate for every task: `npx tsc -b && npx vite build` clean and `npx vitest run` green before committing.
- Do NOT deploy. Deploy is user-gated and outside this plan.

### Class mapping table (used by every conversion task)

| Old pattern | New |
|---|---|
| page/card container with bg + border | `<div class="hig-card">` (no shadow, no border) |
| stat rows / settings-like rows | `<div class="hig-list">` + `<div class="hig-list-item">label <span class="hig-spacer"/> <span class="hig-value">` |
| section titles above cards/lists | `<div class="hig-section-header">Text</div>` (tiny caps, tertiary) |
| primary CTA button | `<button class="hig-button">` |
| secondary button | `<button class="hig-button tinted">` |
| subtle/text button | `<button class="hig-button plain">` |
| destructive | `<button class="hig-button destructive">` |
| text input / select / textarea | `class="hig-field"` inside `<div class="hig-form-row"><label>…</label>…</div>` |
| toggle | `.hig-switch` markup (label > input[checkbox] + span) |
| tab-like filters | `.hig-segmented` (label > input[radio] + span) |
| pill/badge with tint | `<span class="hig-tag">` |
| count/alert badge | `<span class="hig-badge">` |
| progress bar | `<div class="hig-progress" style={{'--hig-progress': v} as React.CSSProperties}><div/></div>` (v in 0–1) |
| empty state | `.hig-empty` + `.hig-empty-icon` + `.hig-empty-title` |
| modal overlay | `<div class="hig-scrim">` + `<div class="hig-sheet">` (mobile bottom sheets: `hig-sheet bottom`) |
| dropdown menu | `.hig-menu` + `.hig-menu-item` |
| page H1 | `<h1>` (hig.css styles it 34px/700; exactly one per screen) |
| muted/secondary text | `class="hig-secondary"` / `hig-tertiary`, `hig-footnote`, `hig-caption` |
| old tokens `--bg-*`, `--color-primary-*`, `--color-text-*`, `--space-*`, `--border-radius-*`, `--shadow-*` | corresponding `--hig-*` token; glows/gradients deleted, not translated |

### Per-page conversion recipe (referenced by Tasks 5–13; the steps are repeated inside each task)

Inventory → rewrite markup with the mapping table → delete the page CSS file and its import → migrate inline styles to classes in app.css (page-specific classes prefixed `app-`, e.g. `app-map-pin`) → build + test → screenshot in both themes → commit.

---

### Task 1: Foundation — hig.css, app.css, density, fonts, tint

**Files:**
- Create: `verde-sector-5/web-dashboard/src/styles/hig.css` (copy)
- Create: `verde-sector-5/web-dashboard/src/styles/app.css`
- Create: `verde-sector-5/web-dashboard/src/styles/density.ts`
- Modify: `verde-sector-5/web-dashboard/src/main.tsx` (imports)
- Modify: `verde-sector-5/web-dashboard/index.html` (body class, remove font links)

**Interfaces:**
- Produces: `--hig-tint`/`--hig-tint-contrast` green pair (both themes); `hig` class on `<body>`; `hig-desktop` class auto-toggled on `<html>`; app.css sections `/* 1. tint */`, `/* 2. app components */`, `/* 3. shell */` that later tasks append to.

- [ ] **Step 1: Verify tint contrast (the "failing test" for color)**

Write `/tmp/claude-1000/-home-batrinu-projects-verdeS5/*/scratchpad/contrast.mjs` (any scratchpad path):

```js
const pairs = [["#1F7A36", "#FFFFFF"], ["#30D158", "#04250F"]];
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
for (const [a, b] of pairs) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  const ratio = (l1 + 0.05) / (l2 + 0.05);
  console.log(a, "on", b, ratio.toFixed(2), ratio >= 4.5 ? "PASS" : "FAIL");
}
```

Run: `node contrast.mjs` — Expected: both lines PASS (≥ 4.50). If a pair fails, darken the light-mode green / darken the dark-mode contrast text by one hex step and re-run until PASS; the passing values are the ones that go into app.css below.

- [ ] **Step 2: Copy hig.css verbatim**

```bash
mkdir -p src/styles
cp /home/batrinu/.claude/skills/apple-hig/assets/hig.css src/styles/hig.css
```

- [ ] **Step 3: Create app.css with the three labeled sections**

```css
/* ==========================================================================
   verdeS5 app layer over hig.css. hig.css is never edited.
   ========================================================================== */

/* 1. TINT — the app's single accent (WCAG AA verified, see plan Task 1) */
:root {
  --hig-tint: #1F7A36;
  --hig-tint-contrast: #FFFFFF;
}
:root[data-theme="dark"] {
  --hig-tint: #30D158;
  --hig-tint-contrast: #04250F;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --hig-tint: #30D158;
    --hig-tint-contrast: #04250F;
  }
}

/* 2. APP COMPONENTS — pieces hig.css cannot cover (map, tree visuals,
   toasts, certificate). Populated by later tasks. */

/* 3. SHELL — sidebar/content grid and mobile tab bar */
.app-shell { display: flex; min-height: 100vh; }
.app-sidebar { position: sticky; top: 0; height: 100vh; flex-shrink: 0; }
.app-content { flex: 1; min-width: 0; padding: var(--hig-space-6); max-width: 1200px; }
.app-tabbar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 30;
  display: flex;
  border-top: 0.5px solid var(--hig-material-border);
  padding-bottom: env(safe-area-inset-bottom);
}
.app-tabbar-item {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  gap: 2px; min-height: 49px; padding-top: 6px;
  font-size: var(--hig-text-caption2);
  color: var(--hig-label-secondary); text-decoration: none;
}
.app-tabbar-item.active { color: var(--hig-tint); }
@media (max-width: 899px) {
  .app-sidebar { display: none; }
  .app-content { padding: var(--hig-space-4); padding-bottom: 84px; }
}
@media (min-width: 900px) {
  .app-tabbar, .app-mobile-navbar { display: none; }
}
```

- [ ] **Step 4: Create density.ts**

```ts
// Adaptive density: macOS scale on desktop-class devices, iOS scale otherwise.
const mq = window.matchMedia('(min-width: 900px) and (pointer: fine)');
const apply = (m: MediaQueryList | MediaQueryListEvent) => {
  document.documentElement.classList.toggle('hig-desktop', m.matches);
};
apply(mq);
mq.addEventListener('change', apply);
export {};
```

- [ ] **Step 5: Wire imports and body class**

In `src/main.tsx`, ABOVE the existing `import './index.css'` line, add:

```ts
import './styles/hig.css';
import './styles/app.css';
import './styles/density';
```

(Keep `index.css` for now — it dies in Task 14.) In `index.html`: change `<body>` to `<body class="hig">`, and delete the three font lines (both `fonts.googleapis`/`fonts.gstatic` preconnects and the Bricolage+Inter stylesheet link).

- [ ] **Step 6: Verify build and app boots**

Run: `npx tsc -b && npx vite build && npx vitest run`
Expected: clean build, tests green. Start `npx vite` briefly and load `/` — pages will look mixed/odd (old dark pages, system font). That is expected mid-migration; only broken rendering (blank page, console errors) is a failure.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat(hig): foundation — hig.css, app layer, green tint (AA), adaptive density, drop webfonts"
```

---

### Task 2: App shell — Layout on sidebar/tab-bar

**Files:**
- Modify: `verde-sector-5/web-dashboard/src/components/Layout/Layout.tsx`
- Delete: `verde-sector-5/web-dashboard/src/components/Layout/Layout.css`
- Modify: `verde-sector-5/web-dashboard/src/styles/app.css` (shell additions if needed)

**Interfaces:**
- Consumes: shell classes from Task 1 (`app-shell`, `app-sidebar`, `app-content`, `app-tabbar`, `app-tabbar-item`).
- Produces: the page chrome every page task renders inside. Pages must NOT add their own outer padding/max-width — `app-content` owns it.

- [ ] **Step 1: Read the current Layout.tsx fully.** Preserve exactly: `navItems`/`adminItems` arrays (icons + Romanian labels), the role-based `allNavItems` logic, `NavLink` routing, any PresenterContext/demo-pill usage, and aria labels. Only the wrapper markup and classNames change.

- [ ] **Step 2: Rebuild the JSX on this skeleton**

```tsx
<div className="app-shell">
  {/* Desktop */}
  <aside className="app-sidebar hig-sidebar hig-material">
    <div className="app-sidebar-logo">Verde S5</div>{/* plain text, headline weight; no gradient/glow */}
    {allNavItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => `hig-sidebar-item ${isActive ? 'active' : ''}`}
      >
        <item.icon size={18} aria-hidden />
        {item.label}
      </NavLink>
    ))}
  </aside>

  <main className="app-content">
    {/* Mobile top bar */}
    <header className="app-mobile-navbar hig-navbar hig-material">
      <span />
      <span className="hig-navbar-title">{currentPageLabel}</span>
      <span />
    </header>
    <Outlet />
  </main>

  {/* Mobile bottom tab bar — the one glass surface in the shell */}
  <nav className="app-tabbar hig-glass">
    {navItems.slice(0, 5).map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) => `app-tabbar-item ${isActive ? 'active' : ''}`}
      >
        <item.icon size={22} aria-hidden />
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
</div>
```

Notes on the skeleton: `currentPageLabel` is the existing expression `allNavItems.find(item => item.path === location.pathname)?.label || 'Tablou de Comandă'` — keep it verbatim. Render each nav icon exactly the way the current code does (if `navItems` stores icon components, `<item.icon size={18} aria-hidden />`; if it stores JSX elements, clone/render that element — match the existing array shape rather than changing it). The old hamburger/mobile-drawer state (`isMobileMenuOpen`), notification bell placeholder, and avatar block are REMOVED (tab bar replaces the drawer; bell/avatar were decorative placeholders — check they carry no logic before deleting; if any carries real logic, keep it as a `hig-button plain` icon button in the navbar's right slot). Add to app.css section 3: `.app-sidebar-logo { font-size: var(--hig-text-title3); font-weight: 700; padding: var(--hig-space-3) var(--hig-space-3) var(--hig-space-4); }`

- [ ] **Step 3: Delete Layout.css and its import line.**

- [ ] **Step 4: Verify**

Run: `npx tsc -b && npx vite build && npx vitest run` — Expected: clean/green.
Run `npx vite`, check at 1280px (sidebar, macOS density) and 390px (tab bar, iOS density), both themes (toggle OS or emulate `prefers-color-scheme` in devtools). Nav works, active state green, no horizontal scroll.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(hig): app shell — HIG sidebar + glass tab bar, Layout.css deleted"
```

---

### Task 3: Shared UI — StatCard merge, Badge, EmptyState, LoadingSpinner, ToastContainer

**Files:**
- Modify: `src/components/UI/StatCard.tsx`; Delete: `src/components/UI/StatCard.css`, entire `src/components/StatCard/` directory (update its importers to `components/UI/StatCard`)
- Modify: `src/components/UI/Badge.tsx`, `src/components/UI/EmptyState.tsx` (delete `EmptyState.css`), `src/components/UI/LoadingSpinner.tsx` (delete `LoadingSpinner.css`), `src/components/UI/ToastContainer.tsx` (delete `ToastContainer.css`)
- Modify: `src/styles/app.css` (section 2)

**Interfaces:**
- Consumes: hig.css classes; app.css sections.
- Produces: `<StatCard>` keeping its existing prop signature (read it first; do not change props); toast/spinner/empty/badge components keeping their prop signatures. Page tasks import these — signatures are frozen.

- [ ] **Step 1: Reconcile the two StatCards.** `grep -rn "components/StatCard\|components/UI/StatCard" src --include='*.tsx'` to find importers. Read both implementations; keep the UI/ one's props as the union (add any prop only the other had). Body becomes:

```tsx
<div className="hig-card app-stat">
  <div className="app-stat-value">{value}</div>
  <div className="app-stat-label hig-footnote hig-secondary">{label}</div>
  {/* keep existing optional icon/trend props, rendered with hig-secondary / semantic color only if the prop is a health state */}
</div>
```

app.css section 2: `.app-stat-value { font-size: var(--hig-text-title1); font-weight: 700; font-variant-numeric: tabular-nums; }` — value is NEUTRAL label color, not green.

- [ ] **Step 2: EmptyState → `.hig-empty`/`.hig-empty-icon`/`.hig-empty-title`; Badge → `.hig-tag` (tint) or `.hig-badge` (count/alert) chosen by its existing variant prop; LoadingSpinner → a single spinner ring using `--hig-fill` track + `--hig-tint` arc, sized 28px, `prefers-reduced-motion` pauses it; ToastContainer → toasts as `.hig-material` cards, slide+fade 200ms ease-out in / ease-in out.** All styles in app.css section 2, prefixed `app-`. Delete the four CSS files + imports.

- [ ] **Step 3: Verify**

`npx tsc -b && npx vite build && npx vitest run` clean/green; in the browser trigger a toast (any watering action) and view a page with stats — both themes.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat(hig): shared UI on HIG — StatCard merged, toasts/empty/spinner/badge"
```

---

### Task 4: Sheets — all five modals on hig-sheet

**Files:**
- Modify: `src/components/Pitch/AdoptTreeModal.tsx`, `src/components/Pitch/LogWateringModal.tsx`, `src/components/UI/WateringModal.tsx`, `src/components/UI/AdoptionCertificateModal.tsx` (delete its `.css`), `src/components/Pitch/SelectedTreeSheet.tsx` (delete its `.css`)
- Modify: `src/styles/app.css`

**Interfaces:**
- Consumes: `useModalA11y` (keep wiring untouched), hig-sheet/scrim classes.
- Produces: same component props; visual pattern for any later dialog.

- [ ] **Step 1: For each modal, replace the overlay/panel wrappers:** overlay div → `className="hig-scrim"` (keep existing onClick-to-close), panel div → `className="hig-sheet"` (SelectedTreeSheet: `hig-sheet bottom` under 900px — give it `app-tree-sheet` and in app.css make it `hig-sheet bottom`-styled on mobile via media query if the component can't switch classes responsively). Inside: title → `<h3>`, body text as-is, actions as `hig-button` (primary) + `hig-button plain` (cancel), destructive actions `hig-button destructive`. Forms inside → `hig-form-row` + `hig-field`. Certificate visual: move its styles into app.css section 2 as `.app-certificate*`, replacing hex colors with `--hig-*` tokens (two-theme check happens in Task 15; make it token-driven now).

- [ ] **Step 2: Verify** — build+tests clean/green; open each modal in the browser (adopt flow, watering log, tree sheet), Escape/scrim close still works, focus trap intact.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat(hig): all modals on hig-sheet pattern"
```

---

### Task 5: Dashboard page (+ Pitch widgets)

**Files:**
- Modify: `src/pages/Dashboard/Dashboard.tsx` (delete `Dashboard.css`), `src/components/Pitch/PitchHeader.tsx` (delete `PitchHeader.css`), `src/components/Pitch/ChallengeWidget.tsx`, `src/components/Pitch/CitizenAlertsFeed.tsx`, `src/components/Pitch/CouncilAlertDispatcher.tsx`, `src/components/Pitch/CouncilAnalyticsBoard.tsx`, `src/components/Pitch/DistrictLeaderboard.tsx`
- Modify: `src/styles/app.css`

**Interfaces:**
- Consumes: shell (Task 2), StatCard/toasts (Task 3), sheets (Task 4).
- Produces: none (leaf).

- [ ] **Step 1: Inventory.** `grep -n 'className\|style={{' src/pages/Dashboard/Dashboard.tsx src/components/Pitch/PitchHeader.tsx src/components/Pitch/{ChallengeWidget,CitizenAlertsFeed,CouncilAlertDispatcher,CouncilAnalyticsBoard,DistrictLeaderboard}.tsx`

- [ ] **Step 2: Rewrite markup per the Global Constraints mapping table.** Page-specific rulings: exactly one `<h1>` (the page title); PitchHeader loses its gradient/hero treatment — becomes plain large-title + `hig-secondary` subtitle; presenter/demo pill keeps behavior, restyled `hig-glass` pill fixed bottom-right (`app-demo-pill` in app.css: `position: fixed; right: var(--hig-space-4); bottom: calc(84px + var(--hig-space-4)); border-radius: var(--hig-radius-full); padding: var(--hig-space-2) var(--hig-space-4); z-index: 40;`); leaderboard → `hig-list` with rank as `hig-value`; alert feeds → `hig-list` items, severity via semantic color dot (8px circle) not colored cards; charts/analytics keep their data logic, containers become `hig-card`, chart colors: series 1 = `var(--hig-tint)`, others = grays, health states = semantic.

- [ ] **Step 3: Delete `Dashboard.css` + `PitchHeader.css` and their imports. Migrate inline styles** (Dashboard/Pitch widgets are the biggest inline-style holders; only computed values like progress fractions stay, as `--hig-progress` custom-property style).

- [ ] **Step 4: Verify** — build+tests clean/green; browser: both themes × both widths; check against five HIG rules (no boxes-in-boxes, one accent, 8pt spacing, neutral stat numbers, 44px targets on mobile).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(hig): Dashboard + pitch widgets converted; Dashboard.css, PitchHeader.css deleted"
```

---

### Task 6: Trees page

**Files:** Modify `src/pages/Trees/Trees.tsx` (delete `Trees.css`); app.css.

Page-specific rulings: tree collection → `hig-list` (rows: species name, `hig-value` = health label) or grid of `hig-card` if it's currently card-based — keep whichever structure the page already uses; health states via semantic colors on a small leading dot or `hig-tag`; filters → `hig-segmented`; adopt/water actions → `hig-button small tinted`.

- [ ] **Step 1: Inventory:** `grep -n 'className\|style={{' src/pages/Trees/Trees.tsx`
- [ ] **Step 2: Rewrite markup** per the Global Constraints mapping table + rulings above.
- [ ] **Step 3: Delete `Trees.css` + its import; migrate inline styles** to `app-` classes (dynamic values only stay inline).
- [ ] **Step 4: Verify:** `npx tsc -b && npx vite build && npx vitest run` clean/green; browser check both themes × 390px/1280px.
- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat(hig): Trees page converted; Trees.css deleted"`

---

### Task 7: Map page (+ Sector5TreeMap, theme-aware)

**Files:** Modify `src/pages/Map/Map.tsx` (delete `Map.css`), `src/components/Pitch/Sector5TreeMap.tsx` (delete `Sector5TreeMap.css`); app.css.

**Interfaces:** Produces `app-map-*` classes reused by any embed of the map (Dashboard may embed it — check importers with `grep -rn Sector5TreeMap src --include='*.tsx'` and verify those pages after).

- [ ] **Step 1: Inventory both files** (same grep pattern as Task 5).
- [ ] **Step 2: Make the SVG theme-aware.** Every fill/stroke hex inside the SVG/TSX becomes a CSS variable consumed via classes: land/background → `var(--hig-bg-tertiary)`, roads/strokes → `var(--hig-separator)`, labels → `var(--hig-label-secondary)`, tree pins → semantic health colors, selected pin ring → `var(--hig-tint)`. Computed pin positions stay inline (dynamic-value exception). Define `.app-map-pin`, `.app-map-pin.warn`, `.app-map-pin.critical`, `.app-map-svg` etc. in app.css section 2.
- [ ] **Step 3: Page chrome per mapping table; delete both CSS files + imports.**
- [ ] **Step 4: Verify** — build/tests; browser BOTH themes deliberately (this is the highest light-mode-breakage risk in the plan): pins legible, no dark-baked rectangles, selected state green.
- [ ] **Step 5: Commit** `feat(hig): Map + Sector5TreeMap theme-aware; Map.css, Sector5TreeMap.css deleted`

---

### Task 8: Reports + CreateReport pages

**Files:** Modify `src/pages/Reports/Reports.tsx` (delete `Reports.css`), `src/pages/Reports/CreateReport.tsx` (delete `CreateReport.css`); app.css.

Page-specific rulings: report list → `hig-list` with status as `hig-tag` (semantic color only for urgent/danger); CreateReport form → `hig-form-row`/`hig-field` throughout, photo-upload dropzone → dashed `--hig-separator` border on `--hig-fill-quaternary` (`app-dropzone`), submit → `hig-button large` full-width on mobile; validation errors → `hig-footnote` in `--hig-red` under the field.

- [ ] **Step 1: Inventory:** `grep -n 'className\|style={{' src/pages/Reports/Reports.tsx src/pages/Reports/CreateReport.tsx`
- [ ] **Step 2: Rewrite both pages' markup** per the mapping table + rulings above.
- [ ] **Step 3: Delete `Reports.css` and `CreateReport.css` + imports; migrate inline styles** to `app-` classes (dynamic values only stay inline).
- [ ] **Step 4: Verify:** `npx tsc -b && npx vite build && npx vitest run` clean/green; browser: submit-report flow end-to-end, both themes × 390px/1280px.
- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat(hig): Reports + CreateReport converted; their CSS deleted"`

---

### Task 9: Campaigns page

**Files:** Modify `src/pages/Campaigns/Campaigns.tsx` (delete `Campaigns.css`); app.css.

Page-specific rulings: campaign cards → `hig-card` with title `<h3>`, meta `hig-footnote hig-secondary`, participation progress → `hig-progress` (dynamic `--hig-progress` inline), join CTA → `hig-button tinted`; „estimat" labels untouched.

- [ ] **Step 1: Inventory:** `grep -n 'className\|style={{' src/pages/Campaigns/Campaigns.tsx`
- [ ] **Step 2: Rewrite markup** per the mapping table + rulings above.
- [ ] **Step 3: Delete `Campaigns.css` + import; migrate inline styles** to `app-` classes (dynamic values only stay inline).
- [ ] **Step 4: Verify:** `npx tsc -b && npx vite build && npx vitest run` clean/green; browser check both themes × 390px/1280px.
- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat(hig): Campaigns converted; Campaigns.css deleted"`

---

### Task 10: Rewards page

**Files:** Modify `src/pages/Rewards/Rewards.tsx` (delete `Rewards.css`); app.css.

Page-specific rulings (quiet gamification): points/level → neutral `app-stat` numbers, NOT green, no glow; badges/achievements grid → `hig-card` cells with grayscale-when-locked (`filter: grayscale(1); opacity: .45` on `.app-reward.locked`); reward claim buttons → `hig-button small tinted`; progress to next level → `hig-progress`.

- [ ] **Step 1: Inventory:** `grep -n 'className\|style={{' src/pages/Rewards/Rewards.tsx`
- [ ] **Step 2: Rewrite markup** per the mapping table + rulings above.
- [ ] **Step 3: Delete `Rewards.css` + import; migrate inline styles** to `app-` classes (dynamic values only stay inline).
- [ ] **Step 4: Verify:** `npx tsc -b && npx vite build && npx vitest run` clean/green; browser check both themes × 390px/1280px.
- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat(hig): Rewards converted; Rewards.css deleted"`

---

### Task 11: Community page

**Files:** Modify `src/pages/Community/Community.tsx` (delete `Community.css`); app.css.

Page-specific rulings: leaderboard → `hig-list` (rank number `hig-value` tabular-nums, top-3 get `hig-tag` not gold/silver colors); activity feed → `hig-list` with `hig-footnote hig-secondary` timestamps; avatars → 28px circle `--hig-fill` with initials.

- [ ] **Step 1: Inventory:** `grep -n 'className\|style={{' src/pages/Community/Community.tsx`
- [ ] **Step 2: Rewrite markup** per the mapping table + rulings above.
- [ ] **Step 3: Delete `Community.css` + import; migrate inline styles** to `app-` classes (dynamic values only stay inline).
- [ ] **Step 4: Verify:** `npx tsc -b && npx vite build && npx vitest run` clean/green; browser check both themes × 390px/1280px.
- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat(hig): Community converted; Community.css deleted"`

---

### Task 12: Sponsors pages ×3 (+ GuardianCard, TreeCareDetails)

**Files:** Modify `src/pages/Sponsors/Sponsors.tsx`, `SponsorGrove.tsx`, `SponsorDashboard.tsx` (delete `Sponsors.css`), `src/components/Pitch/GuardianCard.tsx` (delete `GuardianCard.css`), `src/components/Pitch/TreeCareDetails.tsx` (delete `TreeCareDetails.css`); app.css.

The three pages convert in one commit (they share `Sponsors.css`). Page-specific rulings: sponsor tiles → `hig-card` with plain logo/name (no ESG-y gradients); grove tree grid → `hig-card` cells reusing map-pin semantic colors; GuardianCard → `hig-card` with `hig-list` rows inside, theme-aware via tokens only; sponsor CTA (keep its exact Romanian copy) → `hig-button large`; TreeCareDetails care-history → `hig-list`, watering timestamps `hig-footnote hig-secondary`.

- [ ] **Step 1: Inventory:** `grep -n 'className\|style={{' src/pages/Sponsors/*.tsx src/components/Pitch/GuardianCard.tsx src/components/Pitch/TreeCareDetails.tsx`
- [ ] **Step 2: Rewrite all five files' markup** per the mapping table + rulings above.
- [ ] **Step 3: Delete `Sponsors.css`, `GuardianCard.css`, `TreeCareDetails.css` + imports; migrate inline styles** to `app-` classes (dynamic values only stay inline).
- [ ] **Step 4: Verify:** `npx tsc -b && npx vite build && npx vitest run` clean/green; browser: `/sponsors`, one `/sponsors/:slug` grove, `/sponsor-dashboard`, both themes × 390px/1280px; GuardianCard explicitly in LIGHT mode.
- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat(hig): Sponsors x3 + GuardianCard + TreeCareDetails converted; their CSS deleted"`

---

### Task 13: Login + Register pages

**Files:** Modify `src/pages/Login/Login.tsx` (delete `Login.css`), `src/pages/Register/Register.tsx` (delete `Register.css`); app.css.

Page-specific rulings: these render outside the shell (check App.tsx routing) — center a single card (`hig-card` max-width 380px, margin auto, class `app-auth`) on `--hig-bg`; fields → `hig-form-row`/`hig-field`; submit → `hig-button large` full-width; link to the other auth page → plain tinted link.

- [ ] **Step 1: Inventory:** `grep -n 'className\|style={{' src/pages/Login/Login.tsx src/pages/Register/Register.tsx`
- [ ] **Step 2: Rewrite both pages' markup** per the mapping table + rulings above.
- [ ] **Step 3: Delete `Login.css` and `Register.css` + imports; migrate inline styles** to `app-` classes (dynamic values only stay inline).
- [ ] **Step 4: Verify:** `npx tsc -b && npx vite build && npx vitest run` clean/green; browser: login + register forms, both themes × 390px/1280px.
- [ ] **Step 5: Commit:** `git add -A && git commit -m "feat(hig): Login + Register converted; their CSS deleted"`

---

### Task 14: Final cleanup — kill old tokens, grep gates

**Files:**
- Delete: `src/index.css`, `src/App.css`
- Modify: `src/main.tsx` (remove `import './index.css'`), `src/App.tsx` (remove `import './App.css'` if present)

- [ ] **Step 1: Delete the two files and their imports.**

- [ ] **Step 2: Grep gates — every command must output 0**

```bash
grep -rn --include='*.tsx' --include='*.css' -e '--bg-main' -e '--bg-surface' -e '--color-primary-' -e '--color-text-' -e '--border-radius-' -e '--shadow-glow' src | grep -v styles/hig.css | wc -l
grep -rn 'Bricolage\|fonts.googleapis\|fonts.gstatic' src index.html | wc -l
find src -name '*.css' ! -path '*styles*' | wc -l
```

Also re-count inline styles: `grep -rn 'style={{' src --include='*.tsx' | grep -v -e '--hig-progress' -e 'transform' -e 'left:' -e 'top:' -e 'animationDelay' | wc -l` — target 0; each surviving hit must be a genuinely dynamic value (audit any non-zero result line by line; static ones get classes).

- [ ] **Step 3: Verify** — `npx tsc -b && npx vite build && npx vitest run` clean/green; app boots, every route renders.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore(hig): delete Night Garden tokens — index.css/App.css gone, grep gates clean"
```

---

### Task 15: Visual QA — 12 pages × 2 themes × 2 densities

**Files:** none (findings become fix commits).

- [ ] **Step 1:** Run `npx vite`. With browser tooling (chrome-devtools MCP: `emulate` for `prefers-color-scheme`, `resize_page` 390px and 1280px), screenshot every route (`/`, `/map`, `/reports`, `/reports` create flow, `/campaigns`, `/trees`, `/rewards`, `/community`, `/sponsors`, `/sponsors/:slug` for one seed sponsor, `/sponsor-dashboard`, `/login`, `/register`) in light+dark at both widths.
- [ ] **Step 2:** Review each against: hierarchy without boxes/borders; green only on interactive; 8pt spacing; text ≥13px AA contrast; ≥44px touch targets at iOS density; exactly one h1; glass only on tab bar + demo pill. Extra scrutiny: Map SVG, GuardianCard, certificate in LIGHT mode.
- [ ] **Step 3:** Fix findings directly (app.css or the page TSX), one commit per themed batch of fixes: `fix(hig): visual QA — <what>`.

---

### Task 16: Docs — DESIGN.md, CLAUDE.md, devlog

**Files:**
- Modify: `/home/batrinu/projects/verdeS5/DESIGN.md` (rewrite: HIG system — token source `src/styles/hig.css` + `app.css`, tint pair with final hexes, system font stack, light+dark, adaptive density rule, five HIG rules as the page-building checklist)
- Modify: `/home/batrinu/projects/verdeS5/CLAUDE.md` (Design Context block: replace Night Garden bullet with the HIG system description; keep register/strategy/Romanian-copy/offline lines)
- Modify: `verde-sector-5/docs/DEVLOG-2026-08-06.md` (append entry: what changed, why, the grep gates, deploy still pending)

- [ ] **Step 1: Write all three; keep PRODUCT.md untouched.**
- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "docs: DESIGN.md/CLAUDE.md/devlog reflect Apple HIG system"
```

- [ ] **Step 3: STOP.** Report completion to the user with local preview instructions (`npx vite`). Deploy ONLY when the user has reviewed and explicitly says go (runbook: `verde-sector-5/docs/DEVLOG-2026-08-06.md`).
