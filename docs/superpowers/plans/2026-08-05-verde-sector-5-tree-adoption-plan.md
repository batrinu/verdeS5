# Implementation Plan: Verde în Sectorul 5 — Community Tree Adoption & Care Network

**Target Spec**: [`docs/superpowers/specs/2026-08-05-verde-sector-5-tree-adoption-design.md`](file:///home/batrinu/projects/verdeS5/docs/superpowers/specs/2026-08-05-verde-sector-5-tree-adoption-design.md)  
**Date**: 2026-08-05  

---

## Task Breakdown & Execution Phases

### Phase 1: Database & Backend API Extensions (Cloudflare Worker + D1)

- [ ] **Task 1.1: Database Schema Update**
  - Update `prisma/schema.prisma` in `cloudflare-backend` to include models for `TreeAdoption`, `WateringLog`, `CareAlert`, and `NeighborhoodStats`.
  - Generate D1 migration / schema SQL files.

- [ ] **Task 1.2: Backend API Routes Implementation**
  - Update/implement routes in `cloudflare-backend/src/routes/`:
    - `trees.ts`: Support adoption, watering, and status queries.
    - `alerts.ts`: Create and list municipal alerts.
    - `neighborhoods.ts`: Fetch district leaderboard metrics.

- [ ] **Task 1.3: Realistic Sector 5 Seed Data**
  - Seed database with 45+ trees located across Cotroceni, Rahova, Ferentari, Sebastian, and Izvor with realistic GPS coordinates, health statuses, and initial adoption records.

---

### Phase 2: Frontend Data Layer & Pitch State Management

- [ ] **Task 2.1: Types & API Service**
  - Define TypeScript types in `web-dashboard/src/types/tree.ts`.
  - Implement `web-dashboard/src/api/treeService.ts` for fetching/updating trees, waterings, and alerts, featuring an automated local seed fallback for 100% pitch presentation reliability.

- [ ] **Task 2.2: Presenter Role Context**
  - Create `PresenterContext` (`Citizen View` vs `Council Admin View`) allowing seamless live switching during the city council presentation.

---

### Phase 3: Interactive Leaflet Map & Citizen Adoption UI

- [ ] **Task 3.1: Sector 5 Interactive Map Component**
  - Build `Sector5Map.tsx` with Leaflet map tiles, customized tree markers (Healthy 🌿, Needs Water 💧, Adopted 🌟), and neighborhood boundary filters.

- [ ] **Task 3.2: Tree Adoption & Care Modals**
  - Build `TreeDetailModal.tsx`, `AdoptTreeModal.tsx`, and `LogWateringModal.tsx` for citizen tree adoption and watering entries (+50 EcoPoints).

- [ ] **Task 3.3: Community Leaderboard Widget**
  - Build `DistrictLeaderboard.tsx` displaying rankings across Cotroceni, Rahova, Ferentari, Sebastian, and Izvor.

---

### Phase 4: Council Admin Portal & Executive Dashboard

- [ ] **Task 4.1: Municipal Alert Dispatcher**
  - Build `CouncilAlertDispatcher.tsx` enabling city officials to push heatwave watering alerts to citizens.

- [ ] **Task 4.2: Council Analytics & CSV Audit Export**
  - Build `CouncilAnalyticsDashboard.tsx` with real-time statistics and 1-click CSV report export for council meetings.

- [ ] **Task 4.3: Modern Glassmorphism Styling**
  - Refine CSS with vibrant green/emerald accents, dark mode pitch UI, smooth micro-animations, and responsive layout.

---

### Phase 5: Build Verification & Pitch Dry-Run

- [ ] **Task 5.1: Typecheck & Build**
  - Run `npm run typecheck` and `npm run build` in both `cloudflare-backend` and `web-dashboard`.

- [ ] **Task 5.2: End-to-End Pitch Simulation**
  - Verify complete workflow: Citizen adopting a tree in Rahova -> Logging watering -> Earning points -> Switching to Council Admin view -> Pushing a municipal alert -> Exporting audit CSV.
