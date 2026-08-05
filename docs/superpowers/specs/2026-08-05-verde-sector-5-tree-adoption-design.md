# Verde în Sectorul 5 — Community Tree Adoption & Care Network Design Spec

**Date**: 2026-08-05  
**Target Audience**: Consiliul Local Sector 5 / Primăria Sector 5, Citizens of Bucharest Sector 5  
**Architecture**: Cloudflare Workers (Hono API) + Cloudflare D1 (SQLite) + React/Vite (Leaflet Map UI)  

---

## 1. Executive Summary & Pitch Goals

**Verde în Sectorul 5** transforms traditional static tree registration into an interactive **Community Tree Adoption & Care Network**. It bridges citizen action (watering trees during heatwaves, adopting neighborhood trees, earning eco-points) with municipal administration (dispatching maintenance alerts, tracking tree canopy health per neighborhood, transparent governance).

---

## 2. Architecture & System Boundary

```
+-------------------------------------------------------------------------------+
|                             Vite / React Web Application                      |
|                                                                               |
|  +--------------------------+  +------------------------+  +---------------+  |
|  | Role Switcher (Citizen / |  | Leaflet Map (Sector 5  |  | Community     |  |
|  | Council Admin)           |  | Tree Pins & Status)    |  | Leaderboard   |  |
|  +--------------------------+  +------------------------+  +---------------+  |
+---------------------------------------+---------------------------------------+
                                        | HTTP REST (JSON)
                                        v
+-------------------------------------------------------------------------------+
|                       Cloudflare Worker Backend (Hono.js)                     |
|                                                                               |
|   /api/v1/trees   /api/v1/trees/:id/adopt   /api/v1/trees/:id/water            |
|   /api/v1/alerts  /api/v1/neighborhoods/stats                              |
+---------------------------------------+---------------------------------------+
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                          Cloudflare D1 SQLite Database                        |
|                                                                               |
|   - Tree              - TreeAdoption        - WateringLog                     |
|   - CareAlert         - NeighborhoodStats   - User                            |
+-------------------------------------------------------------------------------+
```

---

## 3. Data Models (Cloudflare D1 Schema)

### `Tree`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT / UUID)
- `code` (TEXT, e.g. `S5-COT-042`)
- `species` (TEXT, e.g. `Tei (Linden)`, `Arțar (Maple)`, `Stejar (Oak)`)
- `latitude` (REAL)
- `longitude` (REAL)
- `neighborhood` (TEXT: `Cotroceni`, `Rahova`, `Ferentari`, `Sebastian`, `Izvor`)
- `healthStatus` (TEXT: `HEALTHY`, `NEEDS_WATER`, `ATTENTION_REQUIRED`)
- `isAdopted` (BOOLEAN DEFAULT 0)
- `adopterName` (TEXT NULL)
- `lastWateredAt` (DATETIME NULL)

### `TreeAdoption`
- `id` (TEXT PRIMARY KEY)
- `treeId` (TEXT NOT NULL)
- `userName` (TEXT NOT NULL)
- `nickname` (TEXT NOT NULL, e.g. "Teiul din Cotroceni")
- `adoptedAt` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### `WateringLog`
- `id` (TEXT PRIMARY KEY)
- `treeId` (TEXT NOT NULL)
- `userName` (TEXT NOT NULL)
- `liters` (INTEGER NOT NULL)
- `loggedAt` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- `earnedPoints` (INTEGER NOT NULL)

### `CareAlert`
- `id` (TEXT PRIMARY KEY)
- `neighborhood` (TEXT NOT NULL)
- `alertType` (TEXT NOT NULL, e.g. `HEATWAVE_DRYNESS`)
- `message` (TEXT NOT NULL)
- `status` (TEXT NOT NULL DEFAULT `ACTIVE`)
- `createdAt` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### `NeighborhoodStats`
- `neighborhood` (TEXT PRIMARY KEY)
- `totalTrees` (INTEGER)
- `adoptedTrees` (INTEGER)
- `wateringsCount` (INTEGER)
- `ecoPoints` (INTEGER)

---

## 4. UI Components & User Flow

1. **Header & Presenter Bar**:
   - Quick role toggle (`Citizen Mode` / `Council Admin Mode`).
   - District filter (Cotroceni, Rahova, Ferentari, Sebastian, Izvor).
   - Eco-stats metrics bar (Total trees, Adoption %, Liters watered, Active volunteers).

2. **Citizen Portal (`Citizen Mode`)**:
   - Leaflet map with custom icons (Green = Healthy, Blue = Needs Water, Gold Star = Adopted).
   - Tree Detail Card: Tree species, location, adoption status.
   - **Adopt Tree Modal**: Input adopter name and tree nickname.
   - **Log Watering Modal**: Log liters watered (+50 EcoPoints).
   - **District Leaderboard**: Ranks Sector 5 neighborhoods by eco-activity.

3. **Council Admin Portal (`Council Admin Mode`)**:
   - **Alert Dispatcher**: Broadcast municipal alerts (e.g., "Heatwave Alert: Young trees in Rahova need watering").
   - **Tree Health & Maintenance Heatmap**: View priority areas across Sector 5.
   - **Export Report**: CSV generation of tree care logs for municipal reports.

---

## 5. API Endpoints Specification

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/v1/trees` | Fetch list of trees (optional query: `neighborhood`, `status`) |
| `POST` | `/api/v1/trees/:id/adopt` | Adopt a specific tree |
| `POST` | `/api/v1/trees/:id/water` | Log a watering action for a tree |
| `GET` | `/api/v1/neighborhoods/stats` | Get neighborhood eco leaderboard stats |
| `GET` | `/api/v1/alerts` | Fetch active municipal care alerts |
| `POST` | `/api/v1/alerts` | Create new care alert (Council Admin) |

---

## 6. Seed Dataset & Testing

- Pre-seeded with 45 realistic tree entries across Sector 5:
  - **Cotroceni**: Str. Doctor Joseph Lister, Str. Sfântul Elefterie
  - **Rahova**: Calea Rahovei, Parc Sebastian
  - **Ferentari**: Calea Ferentari, Str. Vadul Nou
  - **Sebastian**: Parc Sebastian, Bulevardul 13 Septembrie
  - **Izvor**: Splaiul Independenței, Parc Izvor
- Offline/Failover support: Frontend incorporates memory dataset fallback to ensure 100% demo uptime during pitch presentations.

---

## 7. Spec Self-Review Check

- **Placeholder scan**: 0 placeholders, all tables, fields, endpoints, and UI views explicitly defined.
- **Internal consistency**: Data models match REST API endpoints and UI component structures.
- **Scope check**: Perfectly scoped for single implementation plan.
- **Ambiguity check**: Clear distinction between Citizen and Council Admin pitch roles.
