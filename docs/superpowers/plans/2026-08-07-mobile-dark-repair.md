# Mobile & Dark Repair Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the six verified mobile/dark defects in the shipped HIG system (spec: `docs/superpowers/specs/2026-08-07-mobile-dark-repair-design.md`).

**Architecture:** Repair pass on `src/styles/app.css` + `Layout.tsx`/`PitchHeader.tsx`/`Trees.tsx`. No new files except none; hig.css untouched. Every task gates on real-browser screenshots at 390×844 and ~1280px in both themes.

**Tech Stack:** React 18 + Vite, plain CSS, claude-in-chrome browser tooling for verification.

## Global Constraints

- Working dir: `verde-sector-5/web-dashboard/` in `/home/batrinu/projects/verdeS5`. Branch: work directly on `main` is FORBIDDEN — execution creates branch `mobile-dark-repair` first.
- `src/styles/hig.css` NEVER edited. All CSS fixes in `app.css` (tokens only, no hardcoded colors, no new borders without existing precedent).
- Styling/markup only. Romanian copy byte-identical EXCEPT the five sanctioned tab labels: `Acasă` (/), `Hartă` (/map), `Rapoarte` (/reports), `Recompense` (/rewards), `Sponsori` (/sponsors).
- Demo pill behavior untouched (it is portaled to `<body>` from PitchHeader).
- Build gate per task: `npx tsc -b && npx vite build && npx vitest run` clean/green.
- **Screenshot gate per task (mandatory):** dev server `npx vite --port 5199`; claude-in-chrome: resize to 390×844, screenshot affected pages in dark (`document.documentElement.setAttribute('data-theme','dark')`) and light (`'light'`), then resize ~1280×900 and spot-check. If screenshots cannot be captured (renderer timeout: wait 3s and retry once), the task is BLOCKED, not done. Note: with the OS in one scheme, the `data-theme` attribute override may render mixed until Task 5 lands — judge layout on the forced theme, judge color fidelity on the OS-matching theme.
- Staging: NEVER `git add -A`/`git add .` — stage explicit paths. Commit messages end with two newlines then `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Nav-link colors — kill the all-green chrome

**Files:**
- Modify: `src/styles/app.css` (shell section 3)

**Interfaces:**
- Consumes: existing classes `app-tabbar-item`, `hig-sidebar-item` on `<NavLink>` (renders `<a>`).
- Produces: anchors with those classes render label colors, tint only when `.active`. Later tasks assume this.

- [ ] **Step 1: Add the overrides to app.css section 3 (shell)**

```css
/* .hig a (0,1,1) outcolors class-only selectors on anchors; pin nav chrome */
a.app-tabbar-item { color: var(--hig-label-secondary); }
a.app-tabbar-item.active { color: var(--hig-tint); }
a.hig-sidebar-item { color: var(--hig-label); }
a.hig-sidebar-item.active { color: var(--hig-tint); }
```

- [ ] **Step 2: Sweep for other affected anchors**

Run: `grep -rn '<Link\|<NavLink\|<a ' src --include='*.tsx' | grep -v 'hig-button\|app-tabbar-item\|hig-sidebar-item'` — for each hit whose className implies non-tint text (e.g. a card-row link), add an `a.<class>` color pin in app.css next to that component's rules. Links that SHOULD be tint (inline text links) are left alone. List every decision in the report.

- [ ] **Step 3: Build gate** — `npx tsc -b && npx vite build && npx vitest run` clean/green.

- [ ] **Step 4: Screenshot gate** — 390×844: `/` and `/trees`; inactive tab items must render gray, only the active one green; sidebar check at 1280px. Both themes.

- [ ] **Step 5: Commit** — `git add src/styles/app.css` → `fix(hig): nav anchors use label colors — .hig a specificity pinned`

---

### Task 2: Mobile chrome — navbar full-bleed, hide app-name h1, tab labels

**Files:**
- Modify: `src/components/Layout/Layout.tsx`
- Modify: `src/components/Pitch/PitchHeader.tsx` (only if the header wraps more than the h1 — see Step 2)
- Modify: `src/styles/app.css` (section 3)

**Interfaces:**
- Consumes: Task 1's anchor colors.
- Produces: new wrapper `div.app-main` between shell and content; `main.app-content` now inside it. `navItems` entries gain optional `tabLabel: string`. Task 3 restyles `.app-content` padding — it relies on this structure.

- [ ] **Step 1: Restructure Layout.tsx so the navbar escapes content padding**

```tsx
<div className="app-shell">
  <aside className="app-sidebar hig-sidebar hig-material">…unchanged…</aside>
  <div className="app-main">
    <header className="app-mobile-navbar hig-navbar hig-material">
      <span />
      <span className="hig-navbar-title">{currentPageLabel}</span>
      <span />
    </header>
    <main className="app-content">
      <Outlet />
    </main>
  </div>
  <nav className="app-tabbar hig-glass">
    {tabBarItems.map((item) => (
      <NavLink key={item.path} to={item.path}
        className={({ isActive }) => `app-tabbar-item ${isActive ? 'active' : ''}`}>
        <item.icon size={22} aria-hidden />
        <span>{item.tabLabel ?? item.label}</span>
      </NavLink>
    ))}
  </nav>
</div>
```

Add `tabLabel` to the five tab items in `navItems` (exact strings from Global Constraints): `/` → `tabLabel: 'Acasă'`; `/map`, `/reports`, `/rewards`, `/sponsors` already have single-word labels — set `tabLabel` identical to `label` on those four for uniformity of the field. Everything else in the file (icons, full labels, `tabBarItems` path list, `currentPageLabel`) stays byte-identical.

app.css section 3 — replace the old `.app-shell`/`.app-content` pairing with:

```css
.app-shell { display: flex; min-height: 100vh; }
.app-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.app-mobile-navbar { border-bottom: 0.5px solid var(--hig-material-border); }
.app-tabbar-item span { white-space: nowrap; font-size: var(--hig-text-caption2); }
```

(`.app-content` padding is Task 3's job; leave its current rule in place this task.)

- [ ] **Step 2: Hide the app-name h1 on mobile**

Inspect `PitchHeader.tsx`: if `.app-pitch-header` contains only the `<h1>` (demo pill is portaled), add to app.css:

```css
@media (max-width: 899px) { .app-pitch-header { display: none; } }
```

If it wraps anything else pages rely on (live-status strip), scope the hide to the `<h1>` element instead and say so in the report.

- [ ] **Step 3: Build gate** — clean/green.

- [ ] **Step 4: Screenshot gate** — 390×844 both themes on `/`, `/trees`, `/rewards`: navbar edge-to-edge with centered short title, NO giant "Verde în Sectorul 5" heading, tab labels on one line ("Acasă" not "Tablou de Comandă"). 1280px: sidebar + PitchHeader h1 still present, unchanged.

- [ ] **Step 5: Commit** — `git add src/components/Layout/Layout.tsx src/components/Pitch/PitchHeader.tsx src/styles/app.css` → `fix(hig): mobile chrome — full-bleed navbar, app h1 hidden on mobile, tab labels`

---

### Task 3: One inset system — aligned edges, no doubled padding

**Files:**
- Modify: `src/styles/app.css` (sections 1 and throughout)

**Interfaces:**
- Consumes: Task 2's `.app-main` structure.
- Produces: `--app-inset` token; `.app-content` owns ALL horizontal padding. Pages/components must not set their own horizontal page-level padding.

- [ ] **Step 1: Define the token and apply it**

In app.css section 1 (after the tint block):

```css
:root { --app-inset: var(--hig-space-4); }
@media (min-width: 900px) { :root { --app-inset: var(--hig-space-6); } }
```

`.app-content` rule becomes `padding: var(--hig-space-4) var(--app-inset) 0; max-width: 1200px;` with the existing mobile `padding-bottom: 84px` retained in the ≤899px block.

- [ ] **Step 2: Strip doubled horizontal padding/margins**

Run: `grep -n 'padding\|margin' src/styles/app.css | grep -i 'app-.*page\|app-.*content\|app-.*root'` and audit every hit: any rule adding horizontal padding/margin at page-container level is removed (vertical gaps stay). Known mandatory removal: the `@media (max-width: 768px)` `.app-dashboard-content` padding rule (parked finding). List every removed declaration in the report.

- [ ] **Step 3: De-border the texture**

Remove the left border on the tree-voice quote (`.app-tree-message` family) → `font-style: italic; color: var(--hig-label-secondary);`. Then run `grep -n 'border' src/styles/app.css | grep -v 'border-radius\|--hig-material-border\|var(--hig-separator)\|none'` and justify or remove each remaining decorative border in the report.

- [ ] **Step 4: Build gate** — clean/green.

- [ ] **Step 5: Screenshot gate** — 390×844 both themes on `/`, `/trees`, `/campaigns`, `/rewards`: navbar title, page `<h2>`, cards, and list groups all share ONE left edge; no horizontal scroll; 1280px unchanged rhythm.

- [ ] **Step 6: Commit** — `git add src/styles/app.css` → `fix(hig): single --app-inset system; doubled paddings and decorative borders removed`

---

### Task 4: Segmented-control misuse — Trees water filter to select

**Files:**
- Modify: `src/pages/Trees/Trees.tsx`
- Modify: `src/styles/app.css` (delete orphaned segmented-filter rules if any)

**Interfaces:**
- Consumes: existing `filterStatus` state (`'toate' | WaterStatus`) and `setFilterStatus` — unchanged.
- Produces: none.

- [ ] **Step 1: Convert the 5-option `.hig-segmented` radiogroup to a select**

Mirror the adjacent species select exactly (same `hig-field` class, same wrapper), option copy byte-identical to the current radio labels („Orice stare de udare", „Hidratat", „Însetat", „Udare urgentă", „Necesită verificare"), `value={filterStatus}` / `onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}` preserving the exact state values.

- [ ] **Step 2: Audit remaining segmented controls** — `grep -rn 'hig-segmented' src --include='*.tsx'`: any with >3 options gets the same conversion; 2–3-option ones (Dashboard Hartă/Clasament) stay. Report the inventory.

- [ ] **Step 3: Build gate** — clean/green; then browser: change the filter on `/trees`, confirm the tree list filters identically to before.

- [ ] **Step 4: Screenshot gate** — 390×844 both themes `/trees`: no wrapped control rows; filters read as a clean form stack.

- [ ] **Step 5: Commit** — `git add src/pages/Trees/Trees.tsx src/styles/app.css` → `fix(hig): water-status filter to hig-field select — segmented never wraps`

---

### Task 5: Dark texture + theme-override completeness

**Files:**
- Modify: `src/styles/app.css` (section 1 + targeted surface rules)

**Interfaces:**
- Consumes: everything prior.
- Produces: complete `data-theme` override parity; consistent dark elevation.

- [ ] **Step 1: Diff the two dark blocks in hig.css (read-only)**

Extract custom-property names set inside `:root[data-theme="dark"] { … }` and inside the `@media (prefers-color-scheme: dark)` block of `src/styles/hig.css` (script them out via node/ctx — sets A and B). For every token in one set but not the other, add the missing side to app.css section 1: a `:root[data-theme="dark"]` block and a `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { … } }` block using hig.css's own dark values verbatim (copying a hig.css value is not a "hardcoded color" violation — it is token parity). Also add the symmetric light-escape: for every dark-set token, ensure `:root[data-theme="light"]` restores the light value if hig.css doesn't already.

- [ ] **Step 2: Verify override parity in the browser**

With OS scheme ≠ forced attribute both ways: force `data-theme='light'` under OS-dark and screenshot `/trees` — page background MUST be light `#F2F2F7`, cards white; force `'dark'` under OS-light — background `#000`, cards `#1C1C1E`. No mixed surfaces.

- [ ] **Step 3: Dark elevation audit**

At 390px dark, per page (`/`, `/trees`, `/campaigns`, `/rewards`, `/community`, `/sponsors`): cards/list groups sit on `--hig-bg-secondary`; any surface that additionally carries a hairline outline around an elevated background loses the hairline (background contrast does the work); control tracks (segmented, fields) use `--hig-fill-*`. Fix in app.css; list each change.

- [ ] **Step 4: Build gate** — clean/green.

- [ ] **Step 5: Screenshot gate** — the §Step 2 four cross-forcing screenshots plus 390×844 dark of the six pages above; 1280px dark spot-check.

- [ ] **Step 6: Commit** — `git add src/styles/app.css` → `fix(hig): data-theme override parity + dark elevation cleanup`

---

### Task 6: Acceptance matrix + fix wave

**Files:** findings become fixes in the files above.

- [ ] **Step 1: Matrix** — 390×844, BOTH themes: `/`, `/map`, `/reports`, `/campaigns`, `/trees`, `/rewards`, `/community`, `/sponsors`, `/sponsors/solaris-energia`, `/sponsor-dashboard`, `/login`, `/register` (12 screenshots × 2). Review each against the five HIG rules + "one left edge" + tab bar integrity. Then 1280px light+dark spot-check of `/`, `/trees`, `/sponsors` for desktop regressions.
- [ ] **Step 2: Fix confirmed findings** (styling-only, same constraints), one commit per themed batch: `fix(hig): acceptance — <what>`.
- [ ] **Step 3: Build gate after final fix** — clean/green.
- [ ] **Step 4: Report** the full matrix verdicts; anything unfixable or out-of-scope is listed explicitly. STOP — user previews locally; deploy only on explicit go.
