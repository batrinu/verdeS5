# Map-First Home — Apple HIG Realignment

**Date:** 2026-08-07
**Status:** Approved design → ready for implementation plan
**Scope:** `verde-sector-5/web-dashboard/` (frontend only)

## Problem

The interactive map is the core of the product, but today it is fragmented and un-HIG:

- The map renders on **two pages with two different engines**:
  - Home `/` (`pages/Dashboard`) embeds `components/Pitch/Sector5TreeMap.tsx` (raw Leaflet) with a `SelectedTreeSheet` bottom sheet.
  - `/map` (`pages/Map/Map.tsx`) is a **react-leaflet** page with a left filter sidebar, page header, and Leaflet `Popup` bubbles.
- That means two marker/icon systems, two legends, two popup/detail patterns — double the code and drift.
- `/trees` is a third, separate list view of the same trees.
- The `/map` layout is the least HIG-aligned surface in the app: a column of filter dropdowns, a boxed (non-edge-to-edge) map, and a page header consuming vertical space.

**Goal:** collapse to **one full-screen, map-centric surface** built around Apple's Maps HIG and iOS 26 (Liquid Glass) layout conventions, and delete the duplication.

## Authoritative guidance applied

Fetched live from Apple, 2026-08-07:

- **Maps HIG** (`developer.apple.com/design/human-interface-guidelines/maps`):
  make the map interactive; **noninteractive elements that obscure the map break expectations**; **offer search + category filters**; use the **muted emphasis style when info-rich content overlays the map**; **cluster overlapping points of interest** and expand on zoom; **clearly style the selected element**.
- **iOS 26 / Liquid Glass** layout conventions:
  controls **float above** content (not in a sidebar column); content is **edge-to-edge** with scroll-edge fade; the tab bar is an **inset floating pill**; detail lives in **sheets**.

## Decisions (locked with the user)

1. **Map IS Home (`/`)** — the app opens directly onto the full-screen map. No separate landing dashboard.
2. **One adaptive sheet** (Apple Maps model) — a single persistent sheet that is *overview* by default and swaps to *tree detail* on selection.
3. **Desktop** — the sheet is presented as a **translucent glass panel floating over the left** of the map (macOS Maps); the map fills the rest edge-to-edge. Nav sidebar stays.
4. **Route cleanup** — **delete `/map`**; **fold `/trees`** into the sheet's full-height list; **keep `/reports`** but have it **reuse the one shared map engine** for its location picker.
5. **Controls live in the sheet** — the map carries only zoom + locate. Search + segmented filters live in the sheet header (no floating search island).
6. **Full HIG rendering** — **muted basemap** + **pin clustering**.

## Information architecture & navigation

| Route | Before | After |
|---|---|---|
| `/` | Dashboard (stats) + embedded `Sector5TreeMap` | **Full-screen map home**; stats move into the sheet |
| `/map` | react-leaflet page + filter sidebar | **Deleted** |
| `/trees` | standalone list page | **Deleted**; list folded into the sheet |
| `/reports` | own flow | **Kept**; reuses the shared map engine for location picking |
| others | — | unchanged (`/rewards`, `/community`, `/sponsors`, `/campaigns`, auth) |

- **Mobile tab bar** loses `/map`: `Acasă (/) · Rapoarte (/reports) · Recompense (/rewards) · Sponsori (/sponsors)`. The `Acasă` icon becomes the map/pin glyph.
- **Desktop nav sidebar** is unchanged (macOS-style sidebar is HIG-compliant).
- On the map home, the **solid mobile top navbar is suppressed** so the map runs edge-to-edge under the status bar, using an iOS 26 scroll-edge fade instead of a chrome band. (The top navbar remains on non-map routes.)

## The map home — layer anatomy (mobile)

```
┌─ status bar (fade, no solid band) ─┐
│        muted basemap               │
│      ● clusters / green-amber-red pins
│                        [ + ]       │  zoom
│                        [ − ]       │
│                        [ ◉ ]       │  locate  (only floating map chrome)
│  ╭──────────────────────────────╮  │
│  │ ▁ 4.182 copaci · 87% hidratați │  │  sheet PEEK
│  ╰──────────────────────────────╯  │
│      ( floating glass tab bar )    │  inset, above the sheet peek
└────────────────────────────────────┘
```

The only elements floating on the map are zoom + locate. The peek and tab bar are thin and inset so the map is never permanently obscured (Apple Maps rule).

## The adaptive sheet

One persistent sheet, three detents, two content modes. Built by promoting today's `SelectedTreeSheet` into a general map sheet.

**Overview mode (default)**

- **Peek:** grabber + one summary line — `4.182 copaci · 87% hidratați`.
- **Half:** `🔍 Caută copac` search field · segmented filter `Toți · Disponibili · Adoptați · Necesită apă` · stat cards (the pitch "wow", relocated here) · a "copaci din apropiere" list.
- **Full:** the complete, scrollable tree list (the former `/trees`).

**Detail mode (tap a pin or a list row)** — the *same* sheet swaps content:

- `‹ Înapoi` chevron → returns to overview.
- Tree header (`Stejar "Bunicul" · adoptat · cod`) + water-status chip.
- Actions: `💧 Udă` · `🌱 Adoptă` / `📜 Certificat`.
- Photos / history / adopter — reusing existing `SelectedTreeSheet` content.

Selecting a pin also applies a **selected style** (ring + color) per HIG and pans the pin above the sheet.

**Copy** is Romanian; estimates keep the „estimat" label where present. Segmented filter labels: `Toți`, `Disponibili`, `Adoptați`, `Necesită apă`.

## Desktop adaptation

- Same sheet **component**, different **presentation**: a translucent Liquid-Glass panel docked-floating over the left of the map; map fills the remaining area edge-to-edge behind it.
- Detents collapse to two states on desktop (compact / expanded).
- Nav sidebar remains to the left of the panel.
- Responsive switch is presentation-only — content model (overview ↔ detail) is identical across breakpoints.

## Map rendering — one engine

- **Keep** `components/Pitch/Sector5TreeMap.tsx` (raw Leaflet + `SelectedTreeSheet`) as the single engine.
- **Delete** `pages/Map/Map.tsx` (react-leaflet) and its duplicated icon/popup/legend code. Remove the `/map` route and lazy import in `App.tsx`.
- **Muted basemap** — swap the OSM tile layer for a muted/desaturated style (e.g. CARTO Positron) so hydration-colored pins are the hero.
  - **Caveat:** map tiles are inherently online. Only the **basemap imagery** requires network; seed **data** (pins, stats, list) stays offline-capable per the project constraint. Tiles must degrade gracefully (blank/gray) offline without breaking the app.
- **Clustering** — add `leaflet.markercluster`: clusters at low zoom, fan out on zoom-in.
- Pins colored by water status (ok / needs-water / urgent / unknown); selected pin gets a ring.

## De-duplication summary

- Two map engines → one.
- Two legends → one small glass key on the map + filters in the sheet.
- Filter-dropdown sidebar → sheet segmented filters.
- `/map` route deleted · `/trees` page deleted · Dashboard-as-landing removed.

## Non-goals (YAGNI)

- No routing/turn-by-turn directions.
- No backend, API, schema, or auth changes.
- No offline **tile** caching (only data stays offline-capable).
- No migration off Leaflet to a new mapping library.
- No redesign of non-map routes beyond the tab-bar item change and top-navbar suppression on `/`.

## HIG scorecard moved by this work

edge-to-edge content ✅ · controls float / don't obscure the map ✅ · muted emphasis for info-rich overlay ✅ · pin clustering ✅ · selected-state styling ✅ · search + category filter ✅ · adaptive sheet for detail ✅ · single source of truth ✅.

## Affected files (indicative, for the plan phase)

- `src/App.tsx` — remove `/map` route + `MapPage` lazy import; `/` renders the map home.
- `src/pages/Map/Map.tsx` — **delete**.
- `src/pages/Trees/Trees.tsx` — **delete** (list logic moves into the sheet).
- `src/pages/Dashboard/Dashboard.tsx` — becomes the map home shell (or is replaced by a new `pages/Home` map surface); stat cards relocate into the sheet.
- `src/components/Pitch/Sector5TreeMap.tsx` — muted tiles + clustering + selected-pin styling; shared by home and `/reports`.
- `src/components/Pitch/SelectedTreeSheet.tsx` — generalized into the adaptive overview/detail sheet.
- `src/components/Layout/Layout.tsx` — tab-bar items (drop `/map`, map glyph for `Acasă`); suppress solid top navbar on `/`.
- `src/styles/app.css` — sheet detents, floating glass panel (desktop), muted-map + cluster styling, edge-to-edge map home. `hig.css` stays verbatim (never hand-edited).
- `src/pages/Reports/*` — location picker reuses `Sector5TreeMap`.
