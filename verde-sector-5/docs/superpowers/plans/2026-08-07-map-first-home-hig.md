# Map-First Home (HIG Realignment) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Sector 5 map the app Home (`/`), served by one Leaflet engine and one adaptive Apple-Maps-style sheet, deleting the duplicate `/map` and `/trees` pages.

**Architecture:** Repurpose `pages/Dashboard/Dashboard.tsx` into a full-bleed map home. The existing `Sector5TreeMap` (raw Leaflet) becomes the single engine, upgraded with muted CARTO basemap + marker clustering + selected-pin styling. A new `MapSheet` component owns the adaptive sheet: an *overview* mode (search + segmented filter + tree list + the existing role-aware panels as children) that swaps to *detail* mode when a tree is selected. Pure logic (filtering, summary, detent transitions) is extracted into tested utils matching the repo's vitest unit-test culture.

**Tech Stack:** React 19, TypeScript, react-router-dom 7, Leaflet 1.9 (raw, not react-leaflet), `leaflet.markercluster`, Vite 8, Vitest 4 (jsdom, globals). CSS in `src/styles/app.css` (HIG tokens; `hig.css` is verbatim and never hand-edited).

## Global Constraints

- **Language:** all UI copy is Romanian. Estimates keep the „estimat" label where present.
- **Offline:** every surface works offline from seed data via `TreeService`. Map **tiles** are the sole exception (network-only) and must degrade gracefully (blank/gray) without breaking the app; all **data** (pins, stats, lists) stays offline-capable.
- **Styling:** never hand-edit `src/styles/hig.css`. All new styling goes in `src/styles/app.css` using existing HIG CSS variables (`--hig-*`).
- **Accent tint:** single accent (light `#1F7A36` / dark `#30D158`), both WCAG AA. Use the existing `--hig-tint` variable; do not introduce new hex accents.
- **Do not use color alone** to signal state (HIG): pins and chips already pair color with icon/label — keep that.
- **Test culture:** logic is unit-tested with Vitest (`import { describe, it, expect } from 'vitest'`). No React Testing Library is installed — do NOT add it. UI/layout tasks are verified by `npm run build` (full `tsc -b` typecheck) plus an explicit manual acceptance checklist.
- **Test commands:** whole suite `npm test`; single file `npx vitest run <path>`; typecheck+build `npm run build`; lint `npm run lint`. Run all commands from `verde-sector-5/web-dashboard/`.
- **Branch:** `hig/map-first-home` (already checked out). Commit after every task.

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `src/utils/treeFilter.ts` | Pure tree search/filter/summary logic | **Create** |
| `src/utils/sheetDetent.ts` | Pure sheet detent state transitions | **Create** |
| `src/components/Pitch/Sector5TreeMap.tsx` | The one Leaflet engine (muted tiles, clustering, selected ring) | **Modify** |
| `src/components/Pitch/MapSheet.tsx` | Adaptive overview↔detail sheet | **Create** |
| `src/pages/Dashboard/Dashboard.tsx` | The map home shell (full-bleed map + MapSheet) | **Modify (restructure)** |
| `src/components/Layout/Layout.tsx` | Tab bar items; suppress top navbar on `/` | **Modify** |
| `src/App.tsx` | Routes (drop `/map`, `/trees`) | **Modify** |
| `src/pages/Map/Map.tsx` | Duplicate react-leaflet page | **Delete** |
| `src/pages/Trees/Trees.tsx` | Standalone list page | **Delete** |
| `src/components/Pitch/SelectedTreeSheet.tsx` | Old detail-only sheet (superseded by MapSheet) | **Delete after Task 5** |
| `src/styles/app.css` | Map-home layout, sheet detents, desktop glass panel, cluster/pin styling | **Modify** |
| `src/utils/__tests__` or `src/__tests__` | Unit tests | **Create** (tests live in `src/__tests__/`, matching repo convention) |

**Deferred (not in this plan):** `/reports` has no map/location picker today (it uses a text `address` field), so there is nothing to migrate onto the shared engine. The spec's "reuse engine in /reports" is a no-op here; revisit if a reports location picker is ever built.

---

### Task 1: Pure tree filtering + summary util

**Files:**
- Create: `src/utils/treeFilter.ts`
- Test: `src/__tests__/treeFilter.test.ts`

**Interfaces:**
- Consumes: `TreeItem` from `src/types/tree.ts`; `computeWaterStatus`, `WaterStatus` from `src/utils/treeCare.ts`.
- Produces:
  - `type QuickFilter = 'toti' | 'disponibili' | 'adoptati' | 'necesita-apa'`
  - `interface TreeFilterCriteria { search: string; species: string; quick: QuickFilter }`
  - `filterTrees(trees: TreeItem[], c: TreeFilterCriteria): TreeItem[]`
  - `treeSpeciesOptions(trees: TreeItem[]): string[]`
  - `interface TreeSummary { total: number; hydratedPct: number }`
  - `summarizeTrees(trees: TreeItem[]): TreeSummary`
  - `const DEFAULT_CRITERIA: TreeFilterCriteria`

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/treeFilter.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { filterTrees, treeSpeciesOptions, summarizeTrees, DEFAULT_CRITERIA } from '../utils/treeFilter';
import type { TreeItem } from '../types/tree';

const tree = (overrides: Partial<TreeItem>): TreeItem => ({
  id: 'tree-x',
  code: 'S5-X-000',
  species: 'Tei',
  latitude: 44.4,
  longitude: 26.1,
  neighborhood: 'Izvor',
  healthStatus: 'GOOD',
  isAdopted: false,
  wateringsCount: 0,
  ...overrides,
});

describe('filterTrees', () => {
  const trees: TreeItem[] = [
    tree({ id: 'a', species: 'Stejar', code: 'S5-C-001', neighborhood: 'Cotroceni', isAdopted: false, healthStatus: 'EXCELLENT' }),
    tree({ id: 'b', species: 'Tei', code: 'S5-R-002', neighborhood: 'Rahova', isAdopted: true, healthStatus: 'NEEDS_WATER' }),
    tree({ id: 'c', species: 'Stejar', code: 'S5-F-003', neighborhood: 'Ferentari', isAdopted: false, nickname: 'Bunicul', healthStatus: 'CRITICAL' }),
  ];

  it('returns all trees for the default criteria', () => {
    expect(filterTrees(trees, DEFAULT_CRITERIA).map(t => t.id)).toEqual(['a', 'b', 'c']);
  });

  it('matches search across species, neighborhood, code and nickname (case-insensitive)', () => {
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, search: 'bunic' }).map(t => t.id)).toEqual(['c']);
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, search: 'RAHOVA' }).map(t => t.id)).toEqual(['b']);
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, search: 's5-f' }).map(t => t.id)).toEqual(['c']);
  });

  it('quick=disponibili keeps only non-adopted; quick=adoptati only adopted', () => {
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, quick: 'disponibili' }).map(t => t.id)).toEqual(['a', 'c']);
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, quick: 'adoptati' }).map(t => t.id)).toEqual(['b']);
  });

  it('quick=necesita-apa keeps trees whose live water status is thirsty or urgent', () => {
    // 'b' (NEEDS_WATER) and 'c' (CRITICAL) resolve to thirsty/urgent; 'a' (EXCELLENT) is ok.
    const ids = filterTrees(trees, { ...DEFAULT_CRITERIA, quick: 'necesita-apa' }).map(t => t.id);
    expect(ids).toContain('b');
    expect(ids).toContain('c');
    expect(ids).not.toContain('a');
  });

  it('species filter and search compose (AND)', () => {
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, species: 'Stejar', search: 'ferentari' }).map(t => t.id)).toEqual(['c']);
  });
});

describe('treeSpeciesOptions', () => {
  it('returns unique species sorted with Romanian locale', () => {
    const trees = [tree({ species: 'Tei' }), tree({ species: 'Arțar' }), tree({ species: 'Tei' })];
    expect(treeSpeciesOptions(trees)).toEqual(['Arțar', 'Tei']);
  });
});

describe('summarizeTrees', () => {
  it('reports total and hydrated percentage (rounded)', () => {
    const trees = [
      tree({ healthStatus: 'EXCELLENT' }), // ok
      tree({ healthStatus: 'GOOD' }),      // ok
      tree({ healthStatus: 'CRITICAL' }),  // urgent
    ];
    const s = summarizeTrees(trees);
    expect(s.total).toBe(3);
    expect(s.hydratedPct).toBe(67);
  });

  it('handles an empty list without dividing by zero', () => {
    expect(summarizeTrees([])).toEqual({ total: 0, hydratedPct: 0 });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/__tests__/treeFilter.test.ts`
Expected: FAIL — `Failed to resolve import '../utils/treeFilter'` (module does not exist yet).

- [ ] **Step 3: Write the implementation**

Create `src/utils/treeFilter.ts`:

```ts
import type { TreeItem } from '../types/tree';
import { computeWaterStatus } from './treeCare';

export type QuickFilter = 'toti' | 'disponibili' | 'adoptati' | 'necesita-apa';

export interface TreeFilterCriteria {
  search: string;
  species: string; // 'toate' or an exact species name
  quick: QuickFilter;
}

export const DEFAULT_CRITERIA: TreeFilterCriteria = {
  search: '',
  species: 'toate',
  quick: 'toti',
};

export function filterTrees(trees: TreeItem[], c: TreeFilterCriteria): TreeItem[] {
  const q = c.search.trim().toLowerCase();
  return trees.filter((tree) => {
    const matchesSearch =
      !q ||
      tree.species.toLowerCase().includes(q) ||
      tree.neighborhood.toLowerCase().includes(q) ||
      tree.code.toLowerCase().includes(q) ||
      (tree.nickname?.toLowerCase().includes(q) ?? false);

    const matchesSpecies = c.species === 'toate' || tree.species === c.species;

    let matchesQuick = true;
    if (c.quick === 'disponibili') matchesQuick = !tree.isAdopted;
    else if (c.quick === 'adoptati') matchesQuick = tree.isAdopted;
    else if (c.quick === 'necesita-apa') {
      const s = computeWaterStatus(tree);
      matchesQuick = s === 'thirsty' || s === 'urgent';
    }

    return matchesSearch && matchesSpecies && matchesQuick;
  });
}

export function treeSpeciesOptions(trees: TreeItem[]): string[] {
  return Array.from(new Set(trees.map((t) => t.species))).sort((a, b) => a.localeCompare(b, 'ro'));
}

export interface TreeSummary {
  total: number;
  hydratedPct: number;
}

export function summarizeTrees(trees: TreeItem[]): TreeSummary {
  const total = trees.length;
  if (total === 0) return { total: 0, hydratedPct: 0 };
  const hydrated = trees.filter((t) => computeWaterStatus(t) === 'ok').length;
  return { total, hydratedPct: Math.round((hydrated / total) * 100) };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/__tests__/treeFilter.test.ts`
Expected: PASS (all cases). If `necesita-apa` fails, open `src/utils/treeCare.ts` and confirm which `TreeHealthStatus` values map to `thirsty`/`urgent`; the test only asserts EXCELLENT=ok and CRITICAL≠ok, which holds for any sane mapping.

- [ ] **Step 5: Commit**

```bash
git add src/utils/treeFilter.ts src/__tests__/treeFilter.test.ts
git commit -m "feat(map): pure tree filter/summary util (search, quick filter, hydrated %)"
```

---

### Task 2: Pure sheet-detent transition util

**Files:**
- Create: `src/utils/sheetDetent.ts`
- Test: `src/__tests__/sheetDetent.test.ts`

**Interfaces:**
- Produces:
  - `type Detent = 'peek' | 'half' | 'full'`
  - `nextDetent(current: Detent, direction: 'up' | 'down'): Detent`
  - `const DETENTS: readonly Detent[]`

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/sheetDetent.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { nextDetent } from '../utils/sheetDetent';

describe('nextDetent', () => {
  it('steps up peek -> half -> full and clamps at full', () => {
    expect(nextDetent('peek', 'up')).toBe('half');
    expect(nextDetent('half', 'up')).toBe('full');
    expect(nextDetent('full', 'up')).toBe('full');
  });

  it('steps down full -> half -> peek and clamps at peek', () => {
    expect(nextDetent('full', 'down')).toBe('half');
    expect(nextDetent('half', 'down')).toBe('peek');
    expect(nextDetent('peek', 'down')).toBe('peek');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/__tests__/sheetDetent.test.ts`
Expected: FAIL — cannot resolve `../utils/sheetDetent`.

- [ ] **Step 3: Write the implementation**

Create `src/utils/sheetDetent.ts`:

```ts
export type Detent = 'peek' | 'half' | 'full';

export const DETENTS: readonly Detent[] = ['peek', 'half', 'full'] as const;

export function nextDetent(current: Detent, direction: 'up' | 'down'): Detent {
  const i = DETENTS.indexOf(current);
  const j = direction === 'up' ? Math.min(i + 1, DETENTS.length - 1) : Math.max(i - 1, 0);
  return DETENTS[j];
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/__tests__/sheetDetent.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/sheetDetent.ts src/__tests__/sheetDetent.test.ts
git commit -m "feat(map): pure sheet detent transition util"
```

---

### Task 3: Upgrade the one engine — muted tiles, clustering, selected ring

**Files:**
- Modify: `src/components/Pitch/Sector5TreeMap.tsx`
- Modify: `package.json` (add `leaflet.markercluster` + types)

**Interfaces:**
- Consumes: existing `buildTreeIcon`, `computeWaterStatus`, `waterStatusLabel`, `TreeItem`.
- Produces (new prop on `Sector5TreeMapProps`): `selectedTreeId?: string | null`. All existing props/behaviour (`trees`, `selectedNeighborhood`, `onSelectTree`, `onAdoptClick`, `onWaterClick`) are preserved unchanged.

- [ ] **Step 1: Install the clustering dependency**

Run:
```bash
npm install leaflet.markercluster@^1.5.3
npm install -D @types/leaflet.markercluster@^1.5.5
```
Expected: both packages added to `package.json`; `npm test` still green.

- [ ] **Step 2: Add cluster + muted-tile imports**

At the top of `src/components/Pitch/Sector5TreeMap.tsx`, directly under the existing `import 'leaflet/dist/leaflet.css';` (or the Leaflet import), add:

```ts
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
```

- [ ] **Step 3: Add refs for the cluster group and markers**

Inside the component, next to the existing `mapInstanceRef` (around line 83), add:

```ts
const markerClusterRef = useRef<L.MarkerClusterGroup | null>(null);
const markersByIdRef = useRef<Map<string, L.Marker>>(new Map());
```

- [ ] **Step 4: Add the `selectedTreeId` prop**

In `interface Sector5TreeMapProps` add `selectedTreeId?: string | null;`, and destructure it in the component signature (default `null`):

```ts
export const Sector5TreeMap: React.FC<Sector5TreeMapProps> = ({
  trees,
  selectedNeighborhood = 'ALL',
  selectedTreeId = null,
  onSelectTree,
  onAdoptClick,
  onWaterClick,
}) => {
```

- [ ] **Step 5: Swap OSM tiles for the muted CARTO basemap**

Replace the existing tile layer (currently `L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: ... }).addTo(map);`) with:

```ts
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  subdomains: 'abcd',
  maxZoom: 20,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map);
```

- [ ] **Step 6: Route markers through a cluster group**

Immediately after the tile layer, create the cluster group and a fresh markers map:

```ts
const markerCluster = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 48,
  iconCreateFunction: (cluster) =>
    L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'app-map-cluster',
      iconSize: L.point(36, 36),
    }),
});
markerClusterRef.current = markerCluster;
const markersById = new Map<string, L.Marker>();
markersByIdRef.current = markersById;
```

Then, in the `trees.forEach((tree) => { ... })` body, change the marker creation from `.addTo(map)` to build the marker without attaching, and after the popup + click bindings register it with the cluster and the id map. Specifically:

- Change `const marker = L.marker([...], { ... }).addTo(map);` to `const marker = L.marker([...], { ... });` (drop `.addTo(map)`).
- At the very end of the `forEach` body (after `marker.on('click', () => onSelectTree(tree));`), add:

```ts
markerCluster.addLayer(marker);
markersById.set(tree.id, marker);
```

Finally, after the `forEach` loop closes, add the cluster group to the map:

```ts
map.addLayer(markerCluster);
```

- [ ] **Step 7: Add a lightweight selection effect (ring + pan, no full re-init)**

After the existing main `useEffect(..., [trees, selectedNeighborhood, onSelectTree, onAdoptClick, onWaterClick])`, add a second effect. Do **not** add `selectedTreeId` to the main effect's deps (that would rebuild the whole map on every selection and reset the viewport):

```ts
useEffect(() => {
  const cluster = markerClusterRef.current;
  const markers = markersByIdRef.current;
  if (!cluster) return;

  // Clear any previous selection ring.
  markers.forEach((m) => m.getElement()?.classList.remove('is-selected'));

  if (!selectedTreeId) return;
  const marker = markers.get(selectedTreeId);
  if (!marker) return;

  // Expand the enclosing cluster, then ring the marker once it is on the map.
  cluster.zoomToShowLayer(marker, () => {
    marker.getElement()?.classList.add('is-selected');
  });
}, [selectedTreeId, trees]);
```

- [ ] **Step 8: Typecheck and build**

Run: `npm run build`
Expected: PASS. If TypeScript reports `Property 'markerClusterGroup' does not exist on type 'typeof L'`, confirm Step 1 installed `@types/leaflet.markercluster` and that the side-effect import in Step 2 is present.

- [ ] **Step 9: Manual acceptance check**

Run: `npm run dev`, open the current Home. Confirm:
- Basemap is the pale/muted CARTO style (not saturated OSM green).
- At district-wide zoom, nearby pins collapse into round count clusters (`●12`); zooming in fans them out.
- Colored tree pins still reflect water status.
- (Selection ring is exercised in Task 5 once `selectedTreeId` is wired; for now just confirm no console errors.)

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json src/components/Pitch/Sector5TreeMap.tsx
git commit -m "feat(map): muted CARTO basemap + marker clustering + selected-pin ring on the one engine"
```

---

### Task 4: The adaptive MapSheet (overview ↔ detail)

**Files:**
- Create: `src/components/Pitch/MapSheet.tsx`

**Interfaces:**
- Consumes: `filterTrees`, `treeSpeciesOptions`, `summarizeTrees`, `TreeFilterCriteria`, `QuickFilter` (Task 1); `Detent`, `nextDetent` (Task 2); `TreeItem`; `computeWaterStatus`, `waterStatusLabel` from `treeCare`.
- Produces: `MapSheet` React component with this exact prop contract (Task 5 depends on it):

```ts
interface MapSheetProps {
  trees: TreeItem[];
  selectedTree: TreeItem | null;
  criteria: TreeFilterCriteria;
  onCriteriaChange: (c: TreeFilterCriteria) => void;
  onSelectTree: (tree: TreeItem) => void;
  onBack: () => void;                       // detail -> overview
  onAdoptClick: (tree: TreeItem) => void;
  onWaterClick: (tree: TreeItem) => void;
  onCertClick?: (tree: TreeItem) => void;
  children?: React.ReactNode;               // role-aware panels, shown in the overview 'full' detent
}
```

- [ ] **Step 1: Create the component**

Create `src/components/Pitch/MapSheet.tsx`. The sheet is `overview` when `selectedTree` is null, otherwise `detail`. Detent is local state (peek/half/full); the grabber cycles it via `nextDetent`. The segmented quick filter uses the exact Romanian labels from the spec.

```tsx
import React, { useMemo, useState } from 'react';
import type { TreeItem } from '../../types/tree';
import {
  filterTrees,
  treeSpeciesOptions,
  summarizeTrees,
  type TreeFilterCriteria,
  type QuickFilter,
} from '../../utils/treeFilter';
import { nextDetent, type Detent } from '../../utils/sheetDetent';
import { computeWaterStatus, waterStatusLabel } from '../../utils/treeCare';
import { ChevronLeft, Search } from 'lucide-react';

interface MapSheetProps {
  trees: TreeItem[];
  selectedTree: TreeItem | null;
  criteria: TreeFilterCriteria;
  onCriteriaChange: (c: TreeFilterCriteria) => void;
  onSelectTree: (tree: TreeItem) => void;
  onBack: () => void;
  onAdoptClick: (tree: TreeItem) => void;
  onWaterClick: (tree: TreeItem) => void;
  onCertClick?: (tree: TreeItem) => void;
  children?: React.ReactNode;
}

const QUICK_FILTERS: { value: QuickFilter; label: string }[] = [
  { value: 'toti', label: 'Toți' },
  { value: 'disponibili', label: 'Disponibili' },
  { value: 'adoptati', label: 'Adoptați' },
  { value: 'necesita-apa', label: 'Necesită apă' },
];

export const MapSheet: React.FC<MapSheetProps> = ({
  trees,
  selectedTree,
  criteria,
  onCriteriaChange,
  onSelectTree,
  onBack,
  onAdoptClick,
  onWaterClick,
  onCertClick,
  children,
}) => {
  const [detent, setDetent] = useState<Detent>('peek');

  const filtered = useMemo(() => filterTrees(trees, criteria), [trees, criteria]);
  const species = useMemo(() => treeSpeciesOptions(trees), [trees]);
  const summary = useMemo(() => summarizeTrees(trees), [trees]);

  const mode: 'overview' | 'detail' = selectedTree ? 'detail' : 'overview';

  return (
    <section
      className="app-map-sheet"
      data-detent={detent}
      data-mode={mode}
      aria-label={mode === 'detail' ? 'Detalii copac' : 'Prezentare generală hartă'}
    >
      <button
        type="button"
        className="app-map-sheet-grabber"
        aria-label={detent === 'full' ? 'Restrânge panoul' : 'Extinde panoul'}
        onClick={() => setDetent((d) => nextDetent(d, d === 'full' ? 'down' : 'up'))}
      />

      {mode === 'detail' && selectedTree ? (
        <div className="app-map-sheet-body">
          <button type="button" className="app-map-sheet-back" onClick={onBack}>
            <ChevronLeft size={18} aria-hidden="true" /> Înapoi
          </button>
          <header className="app-map-sheet-detail-head">
            <span className="app-sheet-tree-card-label">
              {selectedTree.neighborhood} · {selectedTree.code}
            </span>
            <h2 className="app-sheet-tree-card-name">
              {selectedTree.nickname || selectedTree.species}
            </h2>
            <p className="hig-secondary">
              {selectedTree.isAdopted
                ? `Îngrijit de: ${selectedTree.adopterName ?? '—'}`
                : `Specie: ${selectedTree.species}`}{' '}
              · {waterStatusLabel(computeWaterStatus(selectedTree))}
            </p>
          </header>
          <div className="app-sheet-actions">
            {!selectedTree.isAdopted && (
              <button className="hig-button" onClick={() => onAdoptClick(selectedTree)}>
                🌱 Adoptă
              </button>
            )}
            <button className="hig-button" onClick={() => onWaterClick(selectedTree)}>
              💧 Udă
            </button>
            {selectedTree.isAdopted && onCertClick && (
              <button className="hig-button" onClick={() => onCertClick(selectedTree)}>
                📜 Certificat
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="app-map-sheet-body">
          <p className="app-map-sheet-summary">
            {summary.total.toLocaleString('ro-RO')} copaci · {summary.hydratedPct}% hidratați
          </p>

          <div className="app-map-sheet-search">
            <Search size={16} aria-hidden="true" />
            <input
              type="text"
              className="hig-field"
              placeholder="Caută copac, cartier sau cod…"
              aria-label="Caută copaci"
              value={criteria.search}
              onChange={(e) => onCriteriaChange({ ...criteria, search: e.target.value })}
            />
          </div>

          <div className="app-map-sheet-segmented" role="tablist" aria-label="Filtre rapide">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.value}
                role="tab"
                aria-selected={criteria.quick === f.value}
                className={`app-segmented-item ${criteria.quick === f.value ? 'active' : ''}`}
                onClick={() => onCriteriaChange({ ...criteria, quick: f.value })}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            className="hig-field app-map-sheet-species"
            aria-label="Filtrează după specie"
            value={criteria.species}
            onChange={(e) => onCriteriaChange({ ...criteria, species: e.target.value })}
          >
            <option value="toate">Orice specie</option>
            {species.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <ul className="app-map-sheet-list">
            {filtered.map((tree) => (
              <li key={tree.id}>
                <button className="app-map-sheet-list-row" onClick={() => onSelectTree(tree)}>
                  <span className={`app-map-sheet-dot status-${computeWaterStatus(tree)}`} aria-hidden="true" />
                  <span className="app-map-sheet-list-name">{tree.nickname || tree.species}</span>
                  <span className="hig-secondary">{tree.neighborhood} · {tree.code}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Role-aware panels (stats, council analytics, challenges) rendered by the host. */}
          <div className="app-map-sheet-panels">{children}</div>
        </div>
      )}
    </section>
  );
};
```

- [ ] **Step 2: Typecheck**

Run: `npm run build`
Expected: PASS. If `lucide-react` has no `ChevronLeft`/`Search` export at v1.28, substitute the nearest exported icon (check `node_modules/lucide-react`); both are standard exports.

- [ ] **Step 3: Commit**

```bash
git add src/components/Pitch/MapSheet.tsx
git commit -m "feat(map): adaptive MapSheet (overview search/filter/list <-> tree detail)"
```

---

### Task 5: Restructure Dashboard into the full-bleed map home

**Files:**
- Modify: `src/pages/Dashboard/Dashboard.tsx`

**Interfaces:**
- Consumes: `Sector5TreeMap` (now with `selectedTreeId`), `MapSheet` (Task 4), `DEFAULT_CRITERIA` + `TreeFilterCriteria` (Task 1).
- Preserves: all existing state, `loadData`, presenter usage, modal targets (`adoptTreeModalTarget`, `waterTreeModalTarget`, cert modal), toast wiring, and the role-aware panel components (`StatsBoard`/`ChallengeWidget`/`CouncilAnalyticsBoard`/`CouncilAlertDispatcher` — whatever the file currently renders in its right column).

This task re-parents existing pieces; it does not rewrite their logic.

- [ ] **Step 1: Remove the split-screen scaffolding**

In `src/pages/Dashboard/Dashboard.tsx`:
- Delete the `type MobileTab = 'MAP' | 'DETAILS';` type and the `mobileTab` state + its setter.
- Delete the `app-view-tabs` mobile tab switcher block and the `app-dashboard-grid` / `app-map-column` / right-column wrapper markup — but KEEP the role-aware panel components that lived inside the right column (you will re-render them as `MapSheet` children in Step 3).
- Remove the `import { SelectedTreeSheet } ...` and its `<SelectedTreeSheet .../>` usage (MapSheet replaces it).
- Add imports:

```ts
import { MapSheet } from '../../components/Pitch/MapSheet';
import { DEFAULT_CRITERIA, type TreeFilterCriteria } from '../../utils/treeFilter';
```

- [ ] **Step 2: Add filter-criteria state**

Next to the existing `const [selectedTree, setSelectedTree] = useState<TreeItem | null>(null);` add:

```ts
const [criteria, setCriteria] = useState<TreeFilterCriteria>(DEFAULT_CRITERIA);
```

- [ ] **Step 3: Replace the return markup with the map-home shell**

Replace the top-level render (the `<div className="app-dashboard">…</div>` split layout) with a full-bleed map + sheet. Keep `PitchHeader`, the offline banner, `ToastContainer`, and all modals exactly as they are. Structure:

```tsx
return (
  <div className="app-map-home">
    <PitchHeader />

    {isOffline && (
      <div className="app-offline-banner" role="status">
        📡 Mod offline — nu ne-am putut conecta la server, afișăm date demonstrative locale.
      </div>
    )}

    <div className="app-map-home-canvas">
      <Sector5TreeMap
        trees={trees}
        selectedNeighborhood={selectedNeighborhood}
        selectedTreeId={selectedTree?.id ?? null}
        onSelectTree={(tree) => setSelectedTree(tree)}
        onAdoptClick={(tree) => setAdoptTreeModalTarget(tree)}
        onWaterClick={(tree) => setWaterTreeModalTarget(tree)}
      />
    </div>

    <MapSheet
      trees={trees}
      selectedTree={selectedTree}
      criteria={criteria}
      onCriteriaChange={setCriteria}
      onSelectTree={(tree) => setSelectedTree(tree)}
      onBack={() => setSelectedTree(null)}
      onAdoptClick={(tree) => setAdoptTreeModalTarget(tree)}
      onWaterClick={(tree) => setWaterTreeModalTarget(tree)}
      onCertClick={(tree) => setAdoptionCertModalTree(tree)}
    >
      {/* Re-parented role-aware panels, unchanged. Render the same components the
          old right column rendered, gated by the same `role` checks. Example: */}
      {role === 'COUNCIL' ? (
        <>
          <CouncilAnalyticsBoard stats={stats} />
          <CouncilAlertDispatcher alerts={alerts} onCreateAlert={handleCreateAlert} />
        </>
      ) : (
        <>
          <StatsBoard /* existing props */ />
          <ChallengeWidget /* existing props */ />
        </>
      )}
    </MapSheet>

    {/* Keep all existing modals exactly as before: AdoptTreeModal, LogWateringModal,
        AdoptionCertificateModal, and <ToastContainer .../>. */}
  </div>
);
```

Note: match the exact component names, props, and `role` values already in the file (e.g. `role === 'COUNCIL'` vs another literal) — copy them verbatim from the current right-column JSX. Do not invent props.

- [ ] **Step 4: Typecheck and build**

Run: `npm run build`
Expected: PASS. Fix any now-unused imports (e.g. the removed `Map`/`Trophy`/`BarChart3`/`MapPin` lucide icons if they were only used by the deleted tab switcher) — remove them so `oxlint` stays clean.

- [ ] **Step 5: Run existing unit tests**

Run: `npm test`
Expected: PASS (no logic changed; this guards against accidental breakage).

- [ ] **Step 6: Manual acceptance check**

`npm run dev`, open `/`. Confirm:
- The map fills the screen; the sheet peeks at the bottom showing `N copaci · X% hidratați`.
- Dragging/tapping the grabber expands the sheet (peek→half→full); search + segmented filter + species select + tree list appear; the role panels appear at full detent.
- Tapping a pin or a list row switches the sheet to that tree's detail with a working `‹ Înapoi`; the selected pin shows a ring; Adoptă/Udă/Certificat open the existing modals.

- [ ] **Step 7: Commit**

```bash
git add src/pages/Dashboard/Dashboard.tsx
git commit -m "feat(map): map-first Home — full-bleed map + MapSheet, panels re-parented into the sheet"
```

---

### Task 6: Route + nav cleanup, delete duplicates

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Layout/Layout.tsx`
- Delete: `src/pages/Map/Map.tsx`, `src/pages/Trees/Trees.tsx`, `src/components/Pitch/SelectedTreeSheet.tsx`

**Interfaces:** none produced; this removes routes/files. The build (`tsc -b`) is the safety net for dangling imports.

- [ ] **Step 1: Remove the dead routes and lazy imports in `App.tsx`**

- Delete `const MapPage = lazy(() => import('./pages/Map/Map'));` and `const TreesPage = lazy(() => import('./pages/Trees/Trees'));`.
- Delete the `<Route path="/map" element={<MapPage />} />` and `<Route path="/trees" element={<TreesPage />} />` lines.
- Leave `<Route path="/" element={<DashboardPage />} />` (Dashboard is now the map home).

- [ ] **Step 2: Update the nav + tab bar in `Layout.tsx`**

In the `navItems` array, remove the `/trees` entry. Change the Home entry's icon to the map pin glyph:

```ts
{ path: '/', label: 'Tablou de Comandă', icon: MapPin, tabLabel: 'Acasă' },
```
(Import `MapPin` from `lucide-react` if not already imported; drop the now-unused `Map`/`Trees` icon imports.)

The `tabBarItems` array already lists `['/', '/map', '/reports', '/rewards', '/sponsors']`. Change it to drop `/map`:

```ts
const tabBarItems = ['/', '/reports', '/rewards', '/sponsors'].map(
  (path) => navItems.find((item) => item.path === path)!,
);
```

- [ ] **Step 3: Suppress the solid mobile top navbar on the map home**

In `Layout.tsx`, the mobile top bar (`app-mobile-navbar`) currently renders on every route. Gate it so it does not render on `/` (the edge-to-edge map runs under the status bar there):

```tsx
{location.pathname !== '/' && (
  <header className="app-mobile-navbar hig-navbar hig-material">
    <span />
    <span className="hig-navbar-title">{currentPageLabel}</span>
    <span />
  </header>
)}
```

- [ ] **Step 4: Delete the superseded files**

```bash
git rm src/pages/Map/Map.tsx src/pages/Trees/Trees.tsx src/components/Pitch/SelectedTreeSheet.tsx
```

- [ ] **Step 5: Typecheck, lint, test**

Run: `npm run build && npm run lint && npm test`
Expected: all PASS. `tsc -b` will fail loudly if anything still imports `Map`, `Trees`, or `SelectedTreeSheet` — fix every reported importer (there should be none after Task 5 removed the `SelectedTreeSheet` usage). Grep to be sure:

```bash
grep -rn "pages/Map/Map\|pages/Trees/Trees\|SelectedTreeSheet" src || echo "clean"
```

- [ ] **Step 6: Manual acceptance check**

`npm run dev`:
- Visiting `/map` or `/trees` now falls through to the `*` route and redirects to `/` (the map home).
- Mobile tab bar shows exactly `Acasă · Rapoarte · Recompense · Sponsori`, with a pin glyph for Acasă.
- The map home has no solid top bar; other routes still do.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor(map): delete duplicate /map + /trees, drop dead routes, map glyph + no top bar on Home"
```

---

### Task 7: Styling — edge-to-edge map, sheet detents, desktop glass panel, cluster/pin

**Files:**
- Modify: `src/styles/app.css`

**Interfaces:** none; pure presentation for the class hooks introduced in Tasks 3–6 (`app-map-home`, `app-map-home-canvas`, `app-map-sheet[data-detent][data-mode]`, `app-map-sheet-*`, `app-segmented-item`, `app-map-cluster`, `.tree-marker-icon.is-selected`).

- [ ] **Step 1: Add the map-home + sheet + desktop styles**

Append to `src/styles/app.css` (use existing `--hig-*` tokens; keep `hig.css` untouched):

```css
/* ============================================================
   Map-first Home (HIG realignment)
   ============================================================ */
.app-map-home { position: relative; height: 100dvh; overflow: hidden; }
.app-map-home-canvas { position: absolute; inset: 0; }
.app-map-home-canvas .app-sector5-map,
.app-map-home-canvas .app-sector5-map-canvas { height: 100%; width: 100%; }

/* Muted-cluster bubble */
.app-map-cluster {
  display: flex; align-items: center; justify-content: center;
  background: var(--hig-tint); color: #fff; font-weight: 700;
  border-radius: 999px; box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  border: 2px solid var(--hig-bg);
}

/* Selected pin ring */
.tree-marker-icon.is-selected { filter: drop-shadow(0 0 0 var(--hig-tint)); }
.tree-marker-icon.is-selected svg { outline: 3px solid var(--hig-tint); outline-offset: 1px; border-radius: 50%; }

/* Adaptive sheet (mobile = bottom sheet) */
.app-map-sheet {
  position: absolute; left: 0; right: 0; bottom: 0;
  background: var(--hig-bg); border-top-left-radius: var(--hig-radius-lg);
  border-top-right-radius: var(--hig-radius-lg);
  box-shadow: 0 -2px 16px rgba(0,0,0,0.18);
  display: flex; flex-direction: column;
  transition: height 0.28s cubic-bezier(0.32, 0.72, 0, 1);
  z-index: 500;
}
.app-map-sheet[data-detent="peek"] { height: 96px; }
.app-map-sheet[data-detent="half"] { height: 50dvh; }
.app-map-sheet[data-detent="full"] { height: calc(100dvh - env(safe-area-inset-top) - 24px); }
.app-map-sheet-grabber {
  align-self: center; width: 36px; height: 5px; margin: 8px 0;
  border: none; border-radius: 3px; background: var(--hig-fill); cursor: pointer;
}
.app-map-sheet-body { flex: 1; min-height: 0; overflow-y: auto; padding: 0 var(--hig-space-3) var(--hig-space-4); }
.app-map-sheet-summary { font-weight: 600; margin: 0 0 var(--hig-space-2); }
.app-map-sheet-search { display: flex; align-items: center; gap: 6px; margin-bottom: var(--hig-space-2); }
.app-map-sheet-search .hig-field { flex: 1; }

/* Segmented quick filter */
.app-map-sheet-segmented { display: flex; gap: 2px; background: var(--hig-fill); border-radius: var(--hig-radius-md); padding: 2px; margin-bottom: var(--hig-space-2); }
.app-segmented-item { flex: 1; border: none; background: transparent; padding: 6px 8px; border-radius: calc(var(--hig-radius-md) - 2px); font-size: var(--hig-text-footnote); color: var(--hig-label); cursor: pointer; white-space: nowrap; }
.app-segmented-item.active { background: var(--hig-bg); font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.12); }

.app-map-sheet-species { width: 100%; margin-bottom: var(--hig-space-2); }
.app-map-sheet-list { list-style: none; margin: 0; padding: 0; }
.app-map-sheet-list-row { display: flex; align-items: center; gap: 8px; width: 100%; background: none; border: none; padding: 10px 4px; border-bottom: 0.5px solid var(--hig-material-border); text-align: left; cursor: pointer; }
.app-map-sheet-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.app-map-sheet-dot.status-ok { background: var(--hig-tint); }
.app-map-sheet-dot.status-thirsty { background: var(--hig-orange, #FF9500); }
.app-map-sheet-dot.status-urgent { background: var(--hig-red, #FF3B30); }
.app-map-sheet-dot.status-unknown { background: var(--hig-fill); }
.app-map-sheet-list-name { font-weight: 600; }
.app-map-sheet-back { display: inline-flex; align-items: center; gap: 4px; background: none; border: none; color: var(--hig-tint); font-weight: 600; padding: 4px 0; cursor: pointer; }
.app-map-sheet-panels { margin-top: var(--hig-space-3); }

/* Desktop: sheet becomes a floating glass panel over the left (macOS Maps). */
@media (min-width: 768px) {
  .app-map-sheet {
    left: var(--hig-space-4); right: auto; bottom: var(--hig-space-4); top: var(--hig-space-4);
    width: 360px; height: auto; border-radius: var(--hig-radius-lg);
    box-shadow: 0 4px 24px rgba(0,0,0,0.22);
  }
  .app-map-sheet[data-detent="peek"],
  .app-map-sheet[data-detent="half"],
  .app-map-sheet[data-detent="full"] { height: auto; }
  .app-map-sheet-grabber { display: none; }
}
```

- [ ] **Step 2: Reconcile Leaflet control positions**

Confirm the default Leaflet zoom control (top-left) is not hidden behind `PitchHeader`. If it overlaps, nudge it:

```css
.app-map-home-canvas .leaflet-top.leaflet-left { margin-top: 8px; }
```
Add only if the manual check shows an overlap.

- [ ] **Step 3: Build + lint**

Run: `npm run build && npm run lint`
Expected: PASS.

- [ ] **Step 4: Manual acceptance check (mobile + desktop widths)**

`npm run dev`. At a narrow width (≤767px): sheet is a bottom sheet with three working detents; map is edge-to-edge; tab bar floats above the peek. At ≥768px: sheet is a floating rounded glass panel on the left, map fills the rest; no grabber. Verify light **and** dark themes (toggle), and that the muted basemap keeps pin colors legible (WCAG AA) in both.

- [ ] **Step 5: Commit**

```bash
git add src/styles/app.css
git commit -m "style(map): edge-to-edge map home, sheet detents, desktop floating glass panel, cluster/pin styling"
```

---

## Self-Review

**Spec coverage:**
- Map IS Home (`/`) → Task 5 (restructure Dashboard) + Task 6 (routing).
- One adaptive sheet (overview↔detail) → Task 4 (MapSheet) + Task 2 (detent util).
- Desktop floating glass panel → Task 7 (`@media (min-width: 768px)`).
- Delete `/map`, fold `/trees` into the sheet list → Task 6 (deletes) + Task 4 (list) + Task 1 (filter logic ported from `/trees`).
- Keep `/reports`, reuse engine → **deferred with reason** (Reports has no map picker today; documented under File Structure).
- Controls in the sheet, map carries only zoom/locate → Task 4 (search/filter in sheet) + Task 7 (no floating search); Leaflet default zoom control retained.
- Muted basemap + clustering → Task 3.
- Selected-pin styling → Task 3 (ring) + Task 7 (CSS).
- Tab bar drops `/map`, map glyph for Acasă; top navbar suppressed on `/` → Task 6.
- One engine (keep `Sector5TreeMap`, delete `Map.tsx`) → Task 3 + Task 6.

**Placeholder scan:** UI-composition tasks (3–7) intentionally use `npm run build` + manual acceptance instead of RTL assertions, because no component-test harness exists in the repo (stated in Global Constraints). All *logic* has real failing-first tests (Tasks 1–2). No "TODO"/"handle edge cases"/"similar to Task N" placeholders remain; every code step carries actual code.

**Type consistency:** `TreeFilterCriteria`/`QuickFilter`/`DEFAULT_CRITERIA` (Task 1) are consumed unchanged by MapSheet (Task 4) and Dashboard (Task 5). `Detent`/`nextDetent` (Task 2) used in Task 4. `Sector5TreeMap`'s new `selectedTreeId` prop (Task 3) is passed in Task 5. `MapSheet` prop names in Task 4's contract match the callsite in Task 5 exactly (`onBack`, `onCriteriaChange`, `onCertClick`, `children`).

**Risk notes for the executor:**
- Task 5 is the largest edit and depends on the *current* role/panel component names in `Dashboard.tsx` — copy them verbatim; do not invent props.
- CARTO tiles are a new external host; if a CSP/allowlist blocks `basemaps.cartocdn.com`, the map will be blank offline (acceptable per constraints) but should also be added to any tile allowlist for production.
