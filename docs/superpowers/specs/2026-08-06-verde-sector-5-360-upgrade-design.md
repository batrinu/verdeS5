# Verde în Sectorul 5 — 360° Comprehensive Upgrade Design Spec

**Date**: 2026-08-06  
**Target Audience**: Consiliul Local Sector 5 / Primăria Sector 5, Citizens of Bucharest Sector 5  
**Architecture**: Cloudflare Workers (Hono API) + Cloudflare D1 (SQLite) + React/Vite (Leaflet Map UI + Recharts)  

---

## 1. Executive Summary & Upgrade Goals

This design specification details a 360° balanced upgrade across three core pillars:
1. **Architecture & Decoupling**: Modularizing monolithic files (`treeService.ts`), implementing Vite bundle chunk splitting (reducing main entry bundle from ~796 kB to < 200 kB).
2. **Pitch Presentation & Citizen Gamification**: Introducing downloadable **Tree Adoption Digital Certificates** (canvas/SVG generated), a **Photo Proof Upload Simulator** for tree watering actions, and a real-time **Toast Notification Alert Engine**.
3. **Production Backend & D1 Synchronization**: Hardening JWT authentication token persistence (`AuthContext`), wiring live REST API sync between Vite web-dashboard and Hono Cloudflare Worker backend with graceful local offline caching.

---

## 2. System Architecture & Module Boundaries

```
+-----------------------------------------------------------------------------------+
|                            Vite / React Web Dashboard                             |
|                                                                                   |
|  +------------------------+  +--------------------------+  +-------------------+  |
|  | Citizen / Admin Router |  | Leaflet Map & Filters    |  | Gamification Hub  |  |
|  | (Lazy Loaded Chunks)   |  | (Cotroceni, Rahova, etc) |  | (Certificates)    |  |
|  +-----------+------------+  +------------+-------------+  +---------+---------+  |
+--------------|----------------------------|--------------------------|------------+
               v                            v                          v
+-----------------------------------------------------------------------------------+
|                        Unified treeService Façade                                 |
|                                                                                   |
|  +--------------------------+  +-------------------------+  +------------------+  |
|  | treeSeedData.ts          |  | treeStorage.ts          |  | treeApi.ts       |  |
|  | (Static Sector 5 Seeds)  |  | (Browser Caching Engine)|  | (Cloudflare REST)|  |
|  +--------------------------+  +-------------------------+  +------------------+  |
+-------------------------------------------+---------------------------------------+
                                            | HTTP REST (JSON)
                                            v
+-----------------------------------------------------------------------------------+
|                      Cloudflare Worker Backend (Hono.js)                          |
|                                                                                   |
|   /api/v1/auth/*     /api/v1/trees/*     /api/v1/alerts/*     /api/v1/stats       |
+-------------------------------------------+---------------------------------------+
                                            | Prisma D1 Adapter
                                            v
+-----------------------------------------------------------------------------------+
|                         Cloudflare D1 SQLite Database                             |
|   (Trees, TreeAdoptions, CareAlerts, WateringLogs, Users, NeighborhoodStats)      |
+-----------------------------------------------------------------------------------+
```

---

## 3. Pillar Breakdown & Specifications

### Pillar 1: Architecture & Decoupling
- **`treeService.ts` Modularization**:
  - `src/data/treeSeedData.ts`: 50 detailed Sector 5 tree records and default municipal alerts.
  - `src/services/treeStorage.ts`: Handles local storage read/write for offline adoption and watering logs.
  - `src/services/treeApi.ts`: REST client connecting to Hono API endpoints with proper headers and JWT tokens.
  - `src/api/treeService.ts`: Re-exports a clean façade interface that manages live network fetch with automatic offline fallback to `treeStorage.ts`.
- **Vite Bundle Optimization**:
  - `vite.config.ts`: Add `build.rollupOptions.output.manualChunks` splitting `leaflet`, `react-leaflet`, and `recharts` into separate async vendor chunks.
  - `App.tsx`: Wrap heavy pages (`MapPage`, `ReportsPage`, `CampaignsPage`) in `React.lazy()` and `<Suspense fallback={<LoadingSpinner />}>`.

### Pillar 2: Pitch Presentation & Citizen Gamification
- **Tree Adoption Certificate**:
  - Citizen modal triggers a "Download Adoption Certificate" action upon tree adoption.
  - Dynamic Client-side HTML Canvas/SVG renderer generating a high-res printable certificate with tree species, unique tree code (e.g., `S5-COT-001`), adopter name, date, and Sector 5 official seal badge.
- **Watering Action Photo Verification**:
  - Modal for logging tree watering includes a drag-and-drop / file selector for photo verification.
  - Simulates instant image verification (+50 EcoPoints bonus) with preview thumbnail.
- **Municipal Alert Toast System**:
  - Real-time toast system notifying citizens upon entering heatwave regions or when new alerts are dispatched by Council Admins.

### Pillar 3: Production Backend & D1 Synchronization
- **JWT Auth & Session Persistence**:
  - Update `AuthContext.tsx` to store JWT tokens in `localStorage` upon login/register.
  - Attach `Authorization: Bearer <token>` to `treeApi.ts` requests.
- **Cloudflare D1 Sync Engine**:
  - Verify Hono `/api/v1/trees`, `/api/v1/trees/:id/adopt`, `/api/v1/trees/:id/water`, and `/api/v1/alerts` routes.
  - Ensure full synchronization between D1 database and React state when backend is active, with seamless local offline storage fallback.

---

## 4. Error Handling, Reliability & Testing Strategy

- **Graceful Failover**: If backend fetch fails (e.g. offline demo mode), `treeService` switches silently to local storage without user interruption or console errors.
- **Automated Vitest Suite**:
  - Add `vitest` to `web-dashboard`.
  - Unit tests for `treeStorage.ts` state mutation methods.
  - Integration tests for `treeService.ts` API synchronization and fallback logic.

---

## 5. Spec Self-Review

- **Placeholder scan**: 0 placeholders. All components, endpoints, and file paths are fully specified.
- **Internal consistency**: Data models match Hono backend routes and React component needs.
- **Scope check**: Perfectly balanced across Architecture, Pitch Gamification, and Production Persistence.
