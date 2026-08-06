# verdeS5 — Verde în Sectorul 5

Civic tree-care platform for Sector 5, Bucharest: citizens adopt trees, log waterings
with photo proof, earn Verde Points and rewards, climb the guardian ladder, and corporate
sponsors fund groves with an ESG evidence dashboard. Built as a pitch demo for city hall —
positioning: *Sector 3 plants; Sector 5 keeps trees alive.*

## Live

| Piece | URL |
|---|---|
| Frontend (React 19 PWA, Cloudflare Pages) | https://verde-sector-5.pages.dev |
| API (Hono + Prisma on Cloudflare Workers, D1) | https://verde-sector-5-api.batrinu.workers.dev |

The frontend is local-first: everything renders from seed data + localStorage when the
API is unreachable, so the demo always works.

## Features

- **Living tree profiles** — computed water status (thirst-colored map), care timeline
  with photo proof, CO₂/shade impact estimates, first-person "messages from the tree"
- **Incentives** — Verde Points ledger, guardian levels (Prieten → Gardian Verde →
  Super-Gardian) with modeled real-world privileges, rewards catalog with voucher codes
- **Community** — neighborhood & guardian leaderboards, seasonal challenges
  („Augustul Udărilor")
- **Sponsors** — Bronze/Silver/Gold tiers, sponsored groves, ESG dashboard with
  CSRD-framed CSV export (fictional demo sponsors, labeled)

## Repository layout

```
verde-sector-5/
├── cloudflare-backend/   # Workers API — see its README for endpoints & setup
├── web-dashboard/        # Vite + React 19 PWA
└── docs/                 # Devlog (incl. pitch walkthrough), photo-storage plan
docs/superpowers/         # Design specs & implementation plans
```

Deploy runbook and gotchas: `verde-sector-5/docs/DEVLOG-2026-08-06.md`.
