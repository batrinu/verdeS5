# Incentives & Corporate Sponsors — Design Spec

**Date:** 2026-08-06
**Status:** Approved approach A ("tree-first care graph"), pending final spec review
**Scope:** Breadth over depth — both feature areas at pitch quality, for a city-hall pitch demo

## 1. Context and goal

Verde în Sectorul 5 is a deployed demo (Cloudflare Pages + Workers + D1) where citizens
adopt trees, log waterings with photo proof, and join planting campaigns. This spec adds
the two missing halves of the engagement loop:

1. **Citizen incentives** — reasons to keep caring for adopted trees.
2. **Corporate sponsors** — a funding story: how companies pay into the system and what
   they get back.

Target audience is a **pitch to Sector 5 city hall**: mechanics must be realistic (model
how it would really work) but run entirely on demo/seed data. No real payments, no real
sponsor onboarding, no production anti-abuse.

**Positioning (from research):** Sector 3 already has a tree-*planting* app. Sector 5
differentiates on **care and survival** — the gap urban-forestry studies consistently
flag. Photo-proofed watering logs become auditable "survival evidence," which is also
what makes the sponsor product valuable (EU CSRD-driven demand for verifiable green
data). Research precedents: Gieß den Kiez (Berlin) for visible water need, Melbourne
"Treemail" for tree messages, NYC Super Stewards for the privilege ladder, Bologna/Cascais
for merchant-funded rewards, OMV Petrom × Bucharest City Hall for anchor sponsorship.

## 2. Design overview

The **tree is the hero object**. Its live profile (water need, photo care timeline,
guardian, messages, impact stats) drives citizen motivation; sponsor dashboards are
aggregations of the same care graph. Points and challenges are thin layers on top, not
the center.

## 3. Citizen experience

### 3.1 Water status (computed, per tree)

Pure function in `cloudflare-backend/src/lib/waterStatus.ts`:

- `established` — `plantingDate` more than 5 years ago → no watering prompts, shown as
  a calm "se descurcă singur" state.
- `unknown` — no `lastWateredAt` → neutral "are nevoie de o verificare" state (never a
  false "urgent").
- Otherwise compute `threshold = 7 days × speciesFactor × seasonFactor`:
  - `speciesFactor`: thirsty species (WILLOW, POPLAR, BIRCH) 0.8; hardy (OAK, PINE,
    SPRUCE, FIR) 1.3; all others 1.0.
  - `seasonFactor`: Jun–Aug 0.7; Dec–Feb 1.5; else 1.0.
  - `ok` if days since watering < threshold; `thirsty` if < 2×threshold; `urgent` beyond.

Map markers color by status (urgent = warm alert color, thirsty = amber, ok = green,
unknown/established = neutral), with a legend. The map itself shows coverage gaps —
the Berlin mechanic.

### 3.2 Care timeline & tree messages

- Tree detail renders existing `WateringLog` history (with photo proofs) as a visual
  care story, newest first.
- **`TreeMessage`**: on each watering-log creation, generate a first-person Romanian
  message from a template table keyed by (water status at time of watering, season),
  e.g. „Mulțumesc pentru apă! Îmi ajunge cam o săptămână pe căldura asta." Stored in a
  `tree_messages` table, shown on the tree profile, and mirrored as a `Notification`
  to the tree's adopter. Template-based — **no AI/LLM**.

### 3.3 Impact stats (computed)

Pure function in `cloudflare-backend/src/lib/impact.ts`. Demo-grade estimates, always
labeled „estimat" in the UI:

- Effective diameter: `trunkDiameter` cm, else `yearsSincePlanting × 2.5`, else 12.5
  (5-year default).
- `co2KgPerYear = clamp(speciesCoef × diameterCm, 2, 500)` — `speciesCoef` table in the
  same module (range ~0.8–1.5, broadleaves higher).
- `shadeM2 = diameterCm × 0.35`.

Rollups: per tree (profile), per user ("copacii tăi au absorbit X kg CO₂"), per
neighborhood and sector-wide (Dashboard).

### 3.4 Guardian ladder

Lifetime **care score** (never decreases) unlocks levels, computed by pure function in
`cloudflare-backend/src/lib/guardianLevel.ts`:

| Level | Care score | Modeled privileges (displayed, not enforced) |
|---|---|---|
| Prieten al Copacilor | 0+ | — |
| Gardian Verde | 500+ | Kit de udare gratuit (sac cu picurare), invitație la instruire |
| Super-Gardian | 2000+ | Împrumut unelte, prioritate la adopția plantărilor noi |

Level + progress ring shown on Dashboard ("my guardian card") and next to the guardian's
name on tree profiles. Privileges are the NYC Super Stewards mechanic: escalating
authority/equipment, not stickers.

### 3.5 Verde Points (thin layer)

- **Earning** happens inside existing write paths only: watering log creation (+50 —
  matches existing `WateringLog.earnedPoints` default) and campaign join (+100).
  Action enum: `WATERING`, `CAMPAIGN_JOIN`, `REDEMPTION` (negative).
- **Ledger** (`points_events`) is the source of truth. Two derived numbers:
  `pointsBalance` = earned − spent (spendable); `careScore` = earned only (drives
  level — spending never demotes). Both cached on `User`, recomputed on write.
- **Rewards catalog**: ~6 seeded items (merchant-donated vouchers, watering kits,
  event tickets) with point costs and stock. Merchant-funded framing (Bologna/Cascais):
  near-zero cost to city hall.
- **Redemption**: deduct + issue voucher code `VS5-XXXX-XXXX` in one D1 batch.

### 3.6 Community: leaderboard + seasonal challenge

- Leaderboards: neighborhoods ranked by watering count (grouped by `Tree.neighborhood`
  — see §5 note) and top users ranked by points earned. Window = the active challenge
  window when one is live, else all-time.
- One seeded challenge: **„Augustul Udărilor"** — 500 waterings across Sector 5,
  2026-08-01 → 2026-08-31, sponsored by the gold sponsor. Widget on Dashboard and
  Community page: progress bar, per-neighborhood breakdown, „susținut de [sponsor]".
  Progress computed live from `WateringLog` counts in the window.

## 4. Sponsor experience

### 4.1 Tiers

| Tier | Model | What they get in-app |
|---|---|---|
| BRONZE — Contributor la recompense | Funds/donates rewards | Logo on catalog items + redemption confirmation („Recompensă oferită de X") |
| SILVER — Sponsor de crâng | Linked to a `Grove` (named group of trees) | Public grove page (map of their trees, live care stats, photo gallery); name on member trees' profiles |
| GOLD — Sponsor principal de campanie | Underwrites a `PlantingCampaign` (OMV Petrom model) | Campaign branding, employee-volunteering signup block, campaign trees auto-roll into a sponsored grove; named seasonal challenge |

### 4.2 ESG dashboard (the differentiator)

Per-sponsor route aggregating **their** trees' care graph:

- Survival rate = trees with `healthStatus ≠ DEAD` / total.
- Healthy rate = share with `EXCELLENT | GOOD`.
- Photo-proofed care-action count, watering coverage over time (simple monthly series),
  CO₂/shade totals.
- **CSV export** (`?format=csv`), labeled CSRD-ready evidence. Columns: treeId,
  nickname, species, latitude, longitude, healthStatus, wateringsCount, lastWateredAt,
  photoProofCount, co2KgPerYear.

Pitch line: „vânzătorii de plantări vând certificate; noi vindem dovada supraviețuirii."
At pitch depth there is **no sponsor auth** — a demo sponsor selector on the dashboard
page.

### 4.3 Public sponsors page

„Partenerii Sectorului Verde" — all sponsors by tier, linking to grove/campaign pages.
Companies get visibility, not just data.

### 4.4 Demo sponsors are fictional

Three invented brands, one per tier, each labeled „sponsor demonstrativ" in the UI, with
generated inline-SVG logos (no real companies on a public demo without consent):
Gold „Solaris Energia", Silver „Panifica București", Bronze „Bicicleta Albastră".

## 5. Data model (D1/Prisma — all additive migrations)

New tables:

- **`sponsors`** — id, name, slug (unique), tier (`BRONZE|SILVER|GOLD`), logoSvg,
  description, website, createdAt.
- **`groves`** — id, name, description, sponsorId?, createdAt; plus `trees.groveId` FK.
- **`rewards`** — id, title, description, merchantName, sponsorId?, costPoints, stock,
  active, createdAt.
- **`redemptions`** — id, userId, rewardId, code, status (`ISSUED|USED`), createdAt.
- **`points_events`** — id, userId, action (`WATERING|CAMPAIGN_JOIN|REDEMPTION`),
  points (signed int), refType, refId, createdAt. Index on (userId, createdAt).
- **`tree_messages`** — id, treeId, text, createdAt. Index on treeId.
- **`challenges`** — id, name, description, metric (`WATERINGS`), goal, startsAt,
  endsAt, sponsorId?.

Modified tables: `trees.groveId`, `planting_campaigns.sponsorId`,
`users.pointsBalance` + `users.careScore` (cached, ledger is source of truth).

Computed, never stored: water status, impact, guardian level, challenge progress,
sponsor dashboard aggregates.

**Neighborhood note:** leaderboards group by `Tree.neighborhood`
(COTROCENI|RAHOVA|FERENTARI|SEBASTIAN|IZVOR), **not** `User.neighborhood`, whose value
list differs in the current schema. This avoids depending on that inconsistency;
aligning `User.neighborhood` is out of scope.

## 6. API surface (Hono, `/api/v1`, existing auth/role patterns)

New routes:

| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | `/sponsors` | public | Tier-grouped list for public page |
| GET | `/sponsors/:slug` | public | Sponsor + grove/campaign public page data |
| GET | `/sponsors/:slug/dashboard` | public (demo) | ESG aggregates; `?format=csv` for export |
| GET | `/rewards` | public | Catalog |
| POST | `/rewards/:id/redeem` | citizen+ | Atomic redeem; returns voucher code |
| GET | `/leaderboard` | public | `?scope=neighborhoods\|users`, seasonal window |
| GET | `/challenges/current` | public | Active challenge + progress + breakdown |
| GET | `/users/me/impact` | owner | Points, level + progress, my trees' impact |
| GET | `/trees/:id/messages` | public | Tree's message feed |

Enriched existing routes: tree list/detail/nearby responses gain `waterStatus` and
`impact` (computed on read). Watering-log creation additionally writes: points event,
cached counters, tree message, notification. Campaign join writes a points event.

Error handling:

- Redeem: 400 `insufficient_points` / `out_of_stock`; balance check + deduct + code
  issue in one D1 batch (no double-spend window).
- Missing measurement data → defaults per §3.1/§3.3, never 500s.
- Empty grove/sponsor dashboards → zeroed aggregates with valid shape, not errors.

## 7. Frontend (web-dashboard)

Extended pages:

- **Trees detail** — water-status badge, care timeline, tree messages, impact card,
  guardian display (level next to name).
- **Map** — thirst-colored markers + legend (keep existing dark-popup styling and
  a11y/reduced-motion behavior).
- **Dashboard** — challenge widget, sector impact rollups, my guardian card
  (level ring, points balance).

New pages/routes:

- **`/rewards`** — catalog grid, redeem modal (honest failure states), „voucherele mele"
  list with codes.
- **`/community`** — leaderboards + active challenge detail.
- **`/sponsors`** — public tier list; **`/sponsors/:slug`** — grove page (map subset,
  stats, photo gallery).
- **`/sponsor-dashboard`** — ESG view with demo sponsor selector + CSV download.

All new surfaces follow the existing „Modern Earth Forest" dark design language
(`src/index.css` tokens) and are added to the **seed fallback in `src/data/`** so the
deployed demo renders fully with the API unreachable.

## 8. Demo data (seed)

- 3 fictional sponsors (§4.4) with inline-SVG logos.
- 2 groves carved from existing seeded trees; gold sponsor linked to one campaign whose
  trees form its grove.
- ~6 rewards across the three framings (vouchers, kits, tickets).
- 1 active challenge („Augustul Udărilor", §3.6).
- Backfilled care history: watering logs (with existing demo photos), points events,
  cached counters, and tree messages for several demo users — enough that leaderboards
  show a real ranking, at least one user sits at Gardian Verde and one at Super-Gardian,
  and the ESG dashboard shows non-trivial aggregates on first load.

## 9. Testing

- **Unit tests (backend)**: `waterStatus`, `impact`, `guardianLevel` pure functions;
  ledger math (balance vs care score; redemption deduction; insufficient-balance and
  out-of-stock rejections).
- **Route tests**: redemption path (success + both failure modes).
- **Frontend**: existing setup; smoke test for the redeem flow component.
- Typecheck on both packages; manual pitch-walkthrough checklist added to the devlog.

## 10. Out of scope (deliberate)

Real payments or sponsor billing; sponsor authentication; merchant onboarding flows;
fraud/anti-abuse beyond the atomic redemption guard; weather-API-driven water need;
AI-generated tree messages; admin CRUD UIs for sponsors/rewards/challenges (seed data
covers the pitch); aligning `User.neighborhood` values; R2 photo migration (separate
plan in `photo-storage.md`).
