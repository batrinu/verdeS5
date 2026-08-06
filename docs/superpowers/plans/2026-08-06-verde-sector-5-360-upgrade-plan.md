# Verde în Sectorul 5 360° Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Verde în Sectorul 5 with decoupled tree service modules, sub-200kB Vite bundle chunking, downloadable adoption certificates, photo watering proof, municipal toast alerts, JWT session persistence, and automated Vitest coverage.

**Architecture:** The front-end React/Vite dashboard communicates with Cloudflare Workers via a modular `treeService` façade that delegates to `treeSeedData`, `treeStorage` (local storage cache), and `treeApi` (REST HTTP client). Pages are lazy-loaded with vendor chunking, while client-side HTML Canvas generates printable adoption badges.

**Tech Stack:** React 19, TypeScript, Vite 8, Leaflet, Recharts, Lucide Icons, Hono.js, Vitest.

---

### Task 1: Decouple `treeService.ts` into Modular Units

**Files:**
- Create: `verde-sector-5/web-dashboard/src/data/treeSeedData.ts`
- Create: `verde-sector-5/web-dashboard/src/services/treeStorage.ts`
- Create: `verde-sector-5/web-dashboard/src/services/treeApi.ts`
- Modify: `verde-sector-5/web-dashboard/src/api/treeService.ts`

- [ ] **Step 1: Extract seed dataset to `treeSeedData.ts`**

Extract `SEED_TREES` and `SEED_ALERTS` from `treeService.ts` into `verde-sector-5/web-dashboard/src/data/treeSeedData.ts`.

- [ ] **Step 2: Create `treeStorage.ts` for browser localStorage persistence**

Implement `getStoredTrees()`, `saveStoredTrees()`, `getStoredAlerts()`, and `saveStoredAlerts()` in `verde-sector-5/web-dashboard/src/services/treeStorage.ts`.

- [ ] **Step 3: Create `treeApi.ts` for Cloudflare Worker REST requests**

Implement `fetchTreesFromApi()`, `adoptTreeApi()`, `waterTreeApi()`, and `fetchAlertsApi()` targeting `/api/v1/*` endpoints with timeout and error throwing in `verde-sector-5/web-dashboard/src/services/treeApi.ts`.

- [ ] **Step 4: Refactor `treeService.ts` as a unified façade**

Update `verde-sector-5/web-dashboard/src/api/treeService.ts` to call `treeApi.ts` with transparent failover to `treeStorage.ts` using `treeSeedData.ts` initial values.

- [ ] **Step 5: Verify build passes cleanly**

Run: `npm --prefix verde-sector-5/web-dashboard run build`
Expected: PASS with 0 TypeScript compilation errors.

- [ ] **Step 6: Commit**

```bash
git add verde-sector-5/web-dashboard/src/
git commit -m "refactor: split monolithic treeService into seedData, storage, and api modules"
```

---

### Task 2: Configure Vite Manual Chunks & Route Lazy Loading

**Files:**
- Modify: `verde-sector-5/web-dashboard/vite.config.ts`
- Modify: `verde-sector-5/web-dashboard/src/App.tsx`

- [ ] **Step 1: Update `vite.config.ts` with `manualChunks` configuration**

Configure `build.rollupOptions.output.manualChunks` to split `leaflet`, `react-leaflet`, and `recharts` into separate vendor bundles.

- [ ] **Step 2: Implement `React.lazy()` route splitting in `App.tsx`**

Wrap page routes (`MapPage`, `ReportsPage`, `CampaignsPage`, `TreesPage`) in `React.lazy()` and `<Suspense fallback={<LoadingSpinner />}>`.

- [ ] **Step 3: Verify Vite build chunk sizes**

Run: `npm --prefix verde-sector-5/web-dashboard run build`
Expected: Output shows vendor chunks split and main entry chunk under 200 kB (no 500kB warning).

- [ ] **Step 4: Commit**

```bash
git add verde-sector-5/web-dashboard/vite.config.ts verde-sector-5/web-dashboard/src/App.tsx
git commit -m "perf: configure vite manualChunks vendor splitting and route lazy loading"
```

---

### Task 3: Implement Downloadable Citizen Adoption Certificate Modal

**Files:**
- Create: `verde-sector-5/web-dashboard/src/components/UI/AdoptionCertificateModal.tsx`
- Modify: `verde-sector-5/web-dashboard/src/pages/Map/Map.tsx`

- [ ] **Step 1: Create `AdoptionCertificateModal.tsx` canvas renderer**

Build an HTML5 Canvas generator rendering an official Bucharest Sector 5 Tree Adoption Certificate with adopter name, tree nickname, tree code, species, district, date, and seal design, with a "Download PNG" button.

- [ ] **Step 2: Wire modal open action upon tree adoption in `Map.tsx`**

Add a "View Adoption Certificate" button inside `Map.tsx` tree detail popup when tree `isAdopted` is true.

- [ ] **Step 3: Verify build**

Run: `npm --prefix verde-sector-5/web-dashboard run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add verde-sector-5/web-dashboard/src/components/UI/AdoptionCertificateModal.tsx verde-sector-5/web-dashboard/src/pages/Map/Map.tsx
git commit -m "feat: add downloadable citizen adoption digital certificate modal"
```

---

### Task 4: Add Photo Proof Verification Simulator to Tree Watering Modal

**Files:**
- Modify: `verde-sector-5/web-dashboard/src/components/UI/WateringModal.tsx` (or `Map.tsx`)

- [ ] **Step 1: Add photo upload dropzone input to watering modal**

Add file input for photo upload in watering dialog, generating a thumbnail preview and adding +50 EcoPoints bonus badge.

- [ ] **Step 2: Connect photo state to tree watering action**

Pass photo upload flag to `waterTree` service call.

- [ ] **Step 3: Verify build**

Run: `npm --prefix verde-sector-5/web-dashboard run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add verde-sector-5/web-dashboard/src/
git commit -m "feat: add photo proof verification simulator to tree watering modal"
```

---

### Task 5: Implement Municipal Heatwave Toast Notification Engine

**Files:**
- Create: `verde-sector-5/web-dashboard/src/components/UI/ToastContainer.tsx`
- Modify: `verde-sector-5/web-dashboard/src/pages/Map/Map.tsx`

- [ ] **Step 1: Create Toast Notification context & container**

Create `ToastContainer.tsx` to display active heatwave care alerts in bottom right corner with auto-dismiss.

- [ ] **Step 2: Trigger toast notification when browsing active alert districts**

When user filters by district with active alert (e.g. Rahova heatwave alert), dispatch toast notification.

- [ ] **Step 3: Commit**

```bash
git add verde-sector-5/web-dashboard/src/components/UI/ToastContainer.tsx verde-sector-5/web-dashboard/src/pages/Map/Map.tsx
git commit -m "feat: add real-time municipal heatwave alert toast system"
```

---

### Task 6: Harden JWT Auth Token Persistence in `AuthContext`

**Files:**
- Modify: `verde-sector-5/web-dashboard/src/context/AuthContext.tsx`
- Modify: `verde-sector-5/web-dashboard/src/services/treeApi.ts`

- [ ] **Step 1: Persist JWT token in `localStorage` in `AuthContext.tsx`**

Save JWT token on successful login/register, restoring session state on page refresh.

- [ ] **Step 2: Attach Authorization header in `treeApi.ts`**

Include `Authorization: Bearer ${token}` header for mutation calls to Cloudflare backend.

- [ ] **Step 3: Commit**

```bash
git add verde-sector-5/web-dashboard/src/context/AuthContext.tsx verde-sector-5/web-dashboard/src/services/treeApi.ts
git commit -m "feat: persist JWT auth session and attach Bearer headers to API requests"
```

---

### Task 7: Set Up Vitest & Automated Unit Test Suite

**Files:**
- Create: `verde-sector-5/web-dashboard/vitest.config.ts`
- Create: `verde-sector-5/web-dashboard/src/__tests__/treeStorage.test.ts`
- Modify: `verde-sector-5/web-dashboard/package.json`

- [ ] **Step 1: Add `vitest` dependency and test script in `package.json`**

Add `"test": "vitest run"` script to `package.json`.

- [ ] **Step 2: Write unit tests in `treeStorage.test.ts`**

Test tree adopt, watering log, and localStorage retrieval in `treeStorage.test.ts`.

- [ ] **Step 3: Run Vitest test suite**

Run: `npm --prefix verde-sector-5/web-dashboard test`
Expected: PASS (100% tests passing).

- [ ] **Step 4: Commit**

```bash
git add verde-sector-5/web-dashboard/
git commit -m "test: add Vitest setup and unit test suite for treeStorage service"
```
