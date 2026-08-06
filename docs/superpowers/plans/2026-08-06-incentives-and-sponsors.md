# Citizen Incentives & Corporate Sponsors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the tree-first care-graph incentive loop (water status, impact stats, guardian ladder, points, challenge) and the three-tier corporate sponsor system (groves, ESG dashboard, reward pool) to the deployed Verde în Sectorul 5 pitch demo.

**Architecture:** Backend adds pure calculator libs + new Hono routes + additive D1 migrations; earning hooks live inside the existing watering/campaign handlers. Frontend follows the established local-first pattern: seed data + localStorage + optional API, with new Pitch components on the Dashboard and four new lazy-loaded pages. Spec: `docs/superpowers/specs/2026-08-06-incentives-and-sponsors-design.md`.

**Tech Stack:** Cloudflare Workers, Hono 4, Prisma 5 + D1 adapter, Zod, jose (backend); React 19, react-router-dom 7, react-leaflet, Vite 8, vitest 4 (frontend).

## Global Constraints

- Working dir roots: backend `verde-sector-5/cloudflare-backend/`, frontend `verde-sector-5/web-dashboard/`. All paths below are relative to these.
- All UI copy is Romanian, matching existing tone (e.g. „Udare înregistrată!"). Impact numbers are always labeled „estimat".
- All new UI uses the existing dark-theme tokens from `src/index.css` (`--bg-surface`, `--color-primary-*`, `--border-color`) — no new colors, no white backgrounds.
- Demo sponsors are FICTIONAL and labeled „sponsor demonstrativ": Gold „Solaris Energia", Silver „Panifica București", Bronze „Bicicleta Albastră".
- Point values: watering +50 base (existing `liters*5 + photo bonus 50` stays for display), campaign join +100. Guardian thresholds: Prieten 0+, Gardian Verde 500+, Super-Gardian 2000+.
- D1 migrations are additive only — never rewrite migrations 0001–0003. New: `0004_incentives_sponsors.sql`, `0005_incentives_seed.sql`.
- Backend tests use vitest, pure-function tests only (no Miniflare). Run from `cloudflare-backend/`: `npx vitest run`. Frontend: `npm test` (vitest, jsdom).
- Never break the offline demo: every new page/component must render fully from seed data with the API unreachable.
- The `Date.now()` pattern for IDs (`` `toast-${Date.now()}` ``) is the existing convention — follow it in frontend code.
- Commit after every task; messages follow existing style (`feat:`, `fix:`, `docs:`).

---

### Task 1: Backend vitest harness + water-status calculator

**Files:**
- Modify: `cloudflare-backend/package.json` (add vitest devDependency + test script)
- Create: `cloudflare-backend/vitest.config.ts`
- Create: `cloudflare-backend/src/lib/waterStatus.ts`
- Test: `cloudflare-backend/src/lib/__tests__/waterStatus.test.ts`

**Interfaces:**
- Consumes: nothing (pure module).
- Produces: `type WaterStatus = 'established' | 'unknown' | 'ok' | 'thirsty' | 'urgent'`; `computeWaterStatus(input: { species: string; plantingDate?: Date | null; lastWateredAt?: Date | null; now?: Date }): WaterStatus`. Tasks 10 and 11 import both.

- [ ] **Step 1: Add vitest**

In `cloudflare-backend/package.json` add to `"scripts"`: `"test": "vitest run"` and to `"devDependencies"`: `"vitest": "^4.1.10"`. Run: `npm install`

Create `cloudflare-backend/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/__tests__/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 2: Write the failing test**

Create `src/lib/__tests__/waterStatus.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { computeWaterStatus } from '../waterStatus';

const JULY = new Date('2026-07-15T12:00:00Z');
const JANUARY = new Date('2026-01-15T12:00:00Z');
const daysAgo = (n: number, from: Date) => new Date(from.getTime() - n * 86400000);

describe('computeWaterStatus', () => {
  it('returns established for trees planted more than 5 years ago', () => {
    expect(computeWaterStatus({
      species: 'LIME',
      plantingDate: new Date('2018-04-01'),
      lastWateredAt: null,
      now: JULY,
    })).toBe('established');
  });

  it('returns unknown when never watered and not established', () => {
    expect(computeWaterStatus({
      species: 'LIME',
      plantingDate: new Date('2025-04-01'),
      lastWateredAt: null,
      now: JULY,
    })).toBe('unknown');
  });

  it('summer LIME: ok under 4.9 days, thirsty under 9.8, urgent after', () => {
    // threshold = 7 * 1.0 (LIME) * 0.7 (summer) = 4.9 days
    const base = { species: 'LIME', plantingDate: new Date('2025-04-01'), now: JULY };
    expect(computeWaterStatus({ ...base, lastWateredAt: daysAgo(3, JULY) })).toBe('ok');
    expect(computeWaterStatus({ ...base, lastWateredAt: daysAgo(6, JULY) })).toBe('thirsty');
    expect(computeWaterStatus({ ...base, lastWateredAt: daysAgo(11, JULY) })).toBe('urgent');
  });

  it('hardy species last longer: OAK threshold is 7*1.3*0.7 = 6.37 days in summer', () => {
    const base = { species: 'OAK', plantingDate: new Date('2025-04-01'), now: JULY };
    expect(computeWaterStatus({ ...base, lastWateredAt: daysAgo(6, JULY) })).toBe('ok');
  });

  it('thirsty species dry out faster: WILLOW threshold is 7*0.8*0.7 = 3.92 days', () => {
    const base = { species: 'WILLOW', plantingDate: new Date('2025-04-01'), now: JULY };
    expect(computeWaterStatus({ ...base, lastWateredAt: daysAgo(5, JULY) })).toBe('thirsty');
  });

  it('winter stretches the threshold: LIME in January is 7*1.0*1.5 = 10.5 days', () => {
    const base = { species: 'LIME', plantingDate: new Date('2025-04-01'), now: JANUARY };
    expect(computeWaterStatus({ ...base, lastWateredAt: daysAgo(9, JANUARY) })).toBe('ok');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/waterStatus.test.ts`
Expected: FAIL — cannot resolve `../waterStatus`.

- [ ] **Step 4: Write the implementation**

Create `src/lib/waterStatus.ts`:

```ts
// Water-need heuristic (spec §3.1). Demo-grade: species factor × season factor,
// no weather API. All inputs optional so missing data degrades to calm states.
export type WaterStatus = 'established' | 'unknown' | 'ok' | 'thirsty' | 'urgent';

const THIRSTY_SPECIES = new Set(['WILLOW', 'POPLAR', 'BIRCH']);
const HARDY_SPECIES = new Set(['OAK', 'PINE', 'SPRUCE', 'FIR']);
const BASE_INTERVAL_DAYS = 7;
const ESTABLISHED_YEARS = 5;
const DAY_MS = 86400000;

function speciesFactor(species: string): number {
  if (THIRSTY_SPECIES.has(species)) return 0.8;
  if (HARDY_SPECIES.has(species)) return 1.3;
  return 1.0;
}

function seasonFactor(now: Date): number {
  const month = now.getUTCMonth(); // 0-indexed
  if (month >= 5 && month <= 7) return 0.7;  // Jun–Aug
  if (month === 11 || month <= 1) return 1.5; // Dec–Feb
  return 1.0;
}

export function computeWaterStatus(input: {
  species: string;
  plantingDate?: Date | null;
  lastWateredAt?: Date | null;
  now?: Date;
}): WaterStatus {
  const now = input.now ?? new Date();
  if (input.plantingDate && now.getTime() - input.plantingDate.getTime() > ESTABLISHED_YEARS * 365.25 * DAY_MS) {
    return 'established';
  }
  if (!input.lastWateredAt) return 'unknown';
  const thresholdDays = BASE_INTERVAL_DAYS * speciesFactor(input.species) * seasonFactor(now);
  const daysSince = (now.getTime() - input.lastWateredAt.getTime()) / DAY_MS;
  if (daysSince < thresholdDays) return 'ok';
  if (daysSince < 2 * thresholdDays) return 'thirsty';
  return 'urgent';
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/waterStatus.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 6: Typecheck and commit**

Run: `npm run typecheck` — expected clean.

```bash
git add package.json package-lock.json vitest.config.ts src/lib/waterStatus.ts src/lib/__tests__/waterStatus.test.ts
git commit -m "feat(api): water-status calculator + backend vitest harness"
```

---

### Task 2: Impact calculator

**Files:**
- Create: `cloudflare-backend/src/lib/impact.ts`
- Test: `cloudflare-backend/src/lib/__tests__/impact.test.ts`

**Interfaces:**
- Consumes: nothing (pure module).
- Produces: `computeImpact(input: { species: string; trunkDiameter?: number | null; plantingDate?: Date | null; now?: Date }): { co2KgPerYear: number; shadeM2: number }`. Tasks 10 and 11 import it.

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/impact.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { computeImpact } from '../impact';

const NOW = new Date('2026-07-15T12:00:00Z');

describe('computeImpact', () => {
  it('uses trunk diameter directly when present', () => {
    // OAK coef 1.5 × 20cm = 30 kg/yr; shade 20 × 0.35 = 7 m²
    expect(computeImpact({ species: 'OAK', trunkDiameter: 20, now: NOW }))
      .toEqual({ co2KgPerYear: 30, shadeM2: 7 });
  });

  it('estimates diameter from age when diameter missing (2.5 cm/yr)', () => {
    // 4 years × 2.5 = 10cm; LIME coef 1.2 → 12 kg/yr; shade 3.5 m²
    expect(computeImpact({ species: 'LIME', plantingDate: new Date('2022-07-15'), now: NOW }))
      .toEqual({ co2KgPerYear: 12, shadeM2: 3.5 });
  });

  it('falls back to 12.5cm default when both diameter and age missing', () => {
    // OTHER coef 1.0 × 12.5 = 12.5 kg/yr
    expect(computeImpact({ species: 'OTHER', now: NOW }))
      .toEqual({ co2KgPerYear: 12.5, shadeM2: 4.4 });
  });

  it('clamps CO2 to [2, 500]', () => {
    expect(computeImpact({ species: 'OAK', trunkDiameter: 1000, now: NOW }).co2KgPerYear).toBe(500);
    expect(computeImpact({ species: 'FIR', trunkDiameter: 1, now: NOW }).co2KgPerYear).toBe(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/impact.test.ts`
Expected: FAIL — cannot resolve `../impact`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/impact.ts`:

```ts
// Demo-grade impact estimates (spec §3.3). Always label output „estimat" in UI.
const SPECIES_COEF: Record<string, number> = {
  OAK: 1.5, MAPLE: 1.3, CHESTNUT: 1.3, POPLAR: 1.4, LIME: 1.2, ASH: 1.2,
  WILLOW: 1.1, BIRCH: 1.0, PINE: 0.9, SPRUCE: 0.9, FIR: 0.9, OTHER: 1.0,
};
const GROWTH_CM_PER_YEAR = 2.5;
const DEFAULT_DIAMETER_CM = 12.5; // ≈ 5-year-old tree
const YEAR_MS = 365.25 * 86400000;

const round1 = (n: number) => Math.round(n * 10) / 10;

export function computeImpact(input: {
  species: string;
  trunkDiameter?: number | null;
  plantingDate?: Date | null;
  now?: Date;
}): { co2KgPerYear: number; shadeM2: number } {
  const now = input.now ?? new Date();
  let diameterCm = input.trunkDiameter ?? null;
  if (diameterCm == null && input.plantingDate) {
    const years = (now.getTime() - input.plantingDate.getTime()) / YEAR_MS;
    diameterCm = Math.max(1, years * GROWTH_CM_PER_YEAR);
  }
  if (diameterCm == null) diameterCm = DEFAULT_DIAMETER_CM;
  const coef = SPECIES_COEF[input.species] ?? SPECIES_COEF.OTHER;
  const co2 = Math.min(500, Math.max(2, coef * diameterCm));
  return { co2KgPerYear: round1(co2), shadeM2: round1(diameterCm * 0.35) };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/impact.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/impact.ts src/lib/__tests__/impact.test.ts
git commit -m "feat(api): tree impact calculator (CO2 + shade estimates)"
```

---

### Task 3: Guardian ladder calculator

**Files:**
- Create: `cloudflare-backend/src/lib/guardianLevel.ts`
- Test: `cloudflare-backend/src/lib/__tests__/guardianLevel.test.ts`

**Interfaces:**
- Consumes: nothing (pure module).
- Produces: `type GuardianLevel = { key: 'PRIETEN' | 'GARDIAN' | 'SUPER_GARDIAN'; title: string; minScore: number }`; `guardianLevelFor(careScore: number): GuardianLevel`; `nextLevelProgress(careScore: number): { next: GuardianLevel | null; progress: number }` (progress in 0..1, `next: null` at top level). Task 11 imports these.

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/guardianLevel.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { guardianLevelFor, nextLevelProgress } from '../guardianLevel';

describe('guardianLevelFor', () => {
  it('maps care score to levels at 0 / 500 / 2000', () => {
    expect(guardianLevelFor(0).key).toBe('PRIETEN');
    expect(guardianLevelFor(499).key).toBe('PRIETEN');
    expect(guardianLevelFor(500).key).toBe('GARDIAN');
    expect(guardianLevelFor(1999).key).toBe('GARDIAN');
    expect(guardianLevelFor(2000).key).toBe('SUPER_GARDIAN');
  });

  it('has Romanian titles', () => {
    expect(guardianLevelFor(0).title).toBe('Prieten al Copacilor');
    expect(guardianLevelFor(500).title).toBe('Gardian Verde');
    expect(guardianLevelFor(2000).title).toBe('Super-Gardian');
  });
});

describe('nextLevelProgress', () => {
  it('reports progress toward the next threshold', () => {
    expect(nextLevelProgress(250)).toEqual({ next: expect.objectContaining({ key: 'GARDIAN' }), progress: 0.5 });
    expect(nextLevelProgress(1250)).toEqual({ next: expect.objectContaining({ key: 'SUPER_GARDIAN' }), progress: 0.5 });
  });

  it('returns null next at the top level', () => {
    expect(nextLevelProgress(2500)).toEqual({ next: null, progress: 1 });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/guardianLevel.test.ts`
Expected: FAIL — cannot resolve `../guardianLevel`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/guardianLevel.ts`:

```ts
// Guardian ladder (spec §3.4). careScore = lifetime earned points, never
// reduced by redemptions — spending must not demote anyone.
export type GuardianLevel = {
  key: 'PRIETEN' | 'GARDIAN' | 'SUPER_GARDIAN';
  title: string;
  minScore: number;
};

export const GUARDIAN_LEVELS: GuardianLevel[] = [
  { key: 'PRIETEN', title: 'Prieten al Copacilor', minScore: 0 },
  { key: 'GARDIAN', title: 'Gardian Verde', minScore: 500 },
  { key: 'SUPER_GARDIAN', title: 'Super-Gardian', minScore: 2000 },
];

export function guardianLevelFor(careScore: number): GuardianLevel {
  let current = GUARDIAN_LEVELS[0];
  for (const level of GUARDIAN_LEVELS) {
    if (careScore >= level.minScore) current = level;
  }
  return current;
}

export function nextLevelProgress(careScore: number): { next: GuardianLevel | null; progress: number } {
  const current = guardianLevelFor(careScore);
  const idx = GUARDIAN_LEVELS.findIndex(l => l.key === current.key);
  const next = GUARDIAN_LEVELS[idx + 1] ?? null;
  if (!next) return { next: null, progress: 1 };
  const span = next.minScore - current.minScore;
  return { next, progress: (careScore - current.minScore) / span };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/guardianLevel.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/guardianLevel.ts src/lib/__tests__/guardianLevel.test.ts
git commit -m "feat(api): guardian ladder calculator"
```

---

### Task 4: Tree-message composer

**Files:**
- Create: `cloudflare-backend/src/lib/treeMessages.ts`
- Test: `cloudflare-backend/src/lib/__tests__/treeMessages.test.ts`

**Interfaces:**
- Consumes: `WaterStatus` from `./waterStatus`.
- Produces: `composeTreeMessage(input: { nickname?: string | null; waterStatusBefore: WaterStatus; month: number; liters: number }): string` (month 0-indexed). Task 7 imports it.

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/treeMessages.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { composeTreeMessage } from '../treeMessages';

describe('composeTreeMessage', () => {
  it('thanks urgently-thirsty trees with relief, mentioning liters', () => {
    const msg = composeTreeMessage({ nickname: 'Teiul Prosper', waterStatusBefore: 'urgent', month: 6, liters: 15 });
    expect(msg).toBe('Uf, chiar aveam nevoie! Cei 15 litri m-au salvat de arșiță. — Teiul Prosper');
  });

  it('is calmer for ok trees', () => {
    const msg = composeTreeMessage({ nickname: null, waterStatusBefore: 'ok', month: 6, liters: 10 });
    expect(msg).toBe('Mulțumesc pentru apă! Pe căldura asta, orice strop contează.');
  });

  it('uses the winter variant in December–February', () => {
    const msg = composeTreeMessage({ nickname: null, waterStatusBefore: 'ok', month: 0, liters: 10 });
    expect(msg).toBe('Mulțumesc! Iarna beau mai puțin, dar grija ta mă ține puternic.');
  });

  it('signs with the nickname when present', () => {
    const msg = composeTreeMessage({ nickname: 'Stejarul Rahova', waterStatusBefore: 'thirsty', month: 4, liters: 10 });
    expect(msg.endsWith('— Stejarul Rahova')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/treeMessages.test.ts`
Expected: FAIL — cannot resolve `../treeMessages`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/treeMessages.ts`:

```ts
// First-person „vocea copacului" messages (spec §3.2). Template-based, no AI.
import type { WaterStatus } from './waterStatus';

const isSummer = (month: number) => month >= 5 && month <= 7;
const isWinter = (month: number) => month === 11 || month <= 1;

export function composeTreeMessage(input: {
  nickname?: string | null;
  waterStatusBefore: WaterStatus;
  month: number; // 0-indexed
  liters: number;
}): string {
  const { waterStatusBefore, month, liters } = input;
  let body: string;
  if (waterStatusBefore === 'urgent') {
    body = `Uf, chiar aveam nevoie! Cei ${liters} litri m-au salvat de arșiță.`;
  } else if (waterStatusBefore === 'thirsty') {
    body = `Începeam să mă usuc — mulțumesc pentru cei ${liters} litri!`;
  } else if (isWinter(month)) {
    body = 'Mulțumesc! Iarna beau mai puțin, dar grija ta mă ține puternic.';
  } else if (isSummer(month)) {
    body = 'Mulțumesc pentru apă! Pe căldura asta, orice strop contează.';
  } else {
    body = 'Mulțumesc pentru apă! Cresc frumos datorită ție.';
  }
  return input.nickname ? `${body} — ${input.nickname}` : body;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/__tests__/treeMessages.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/treeMessages.ts src/lib/__tests__/treeMessages.test.ts
git commit -m "feat(api): template-based tree message composer"
```

---

### Task 5: Schema + migration 0004

**Files:**
- Modify: `cloudflare-backend/prisma/schema.prisma` (append new models; add fields to `User`, `Tree`, `PlantingCampaign`)
- Create: `cloudflare-backend/migrations/0004_incentives_sponsors.sql`

**Interfaces:**
- Consumes: existing schema (models `User`, `Tree`, `PlantingCampaign` — read the file first).
- Produces: Prisma models `Sponsor`, `Grove`, `Reward`, `Redemption`, `PointsEvent`, `TreeMessage`, `Challenge`; fields `User.pointsBalance`, `User.careScore`, `Tree.groveId`, `PlantingCampaign.sponsorId`. Tasks 6–12 use these via `prisma.<model>`.

- [ ] **Step 1: Append models to `prisma/schema.prisma`**

Add to the existing `User` model body: `pointsBalance Int @default(0)` and `careScore Int @default(0)`, plus relations `pointsEvents PointsEvent[]` and `redemptions Redemption[]`.
Add to the existing `Tree` model body: `grove Grove? @relation(fields: [groveId], references: [id])`, `groveId String?`, and relation `messages TreeMessage[]`.
Add to the existing `PlantingCampaign` model body: `sponsor Sponsor? @relation(fields: [sponsorId], references: [id])`, `sponsorId String?`.

Append at the end of the file:

```prisma
model Sponsor {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  tier        String   // BRONZE | SILVER | GOLD
  logoSvg     String?
  description String?
  website     String?
  createdAt   DateTime @default(now())

  groves      Grove[]
  rewards     Reward[]
  campaigns   PlantingCampaign[]
  challenges  Challenge[]

  @@map("sponsors")
}

model Grove {
  id          String   @id @default(cuid())
  name        String
  description String?
  sponsor     Sponsor? @relation(fields: [sponsorId], references: [id])
  sponsorId   String?
  createdAt   DateTime @default(now())

  trees       Tree[]

  @@map("groves")
}

model Reward {
  id           String   @id @default(cuid())
  title        String
  description  String?
  merchantName String
  sponsor      Sponsor? @relation(fields: [sponsorId], references: [id])
  sponsorId    String?
  costPoints   Int
  stock        Int      @default(10)
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())

  redemptions  Redemption[]

  @@map("rewards")
}

model Redemption {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  reward    Reward   @relation(fields: [rewardId], references: [id])
  rewardId  String
  code      String   @unique
  status    String   @default("ISSUED") // ISSUED | USED
  createdAt DateTime @default(now())

  @@map("redemptions")
  @@index([userId])
}

model PointsEvent {
  id        String   @id @default(cuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  action    String   // WATERING | CAMPAIGN_JOIN | REDEMPTION
  points    Int      // signed: negative for REDEMPTION
  refType   String?
  refId     String?
  createdAt DateTime @default(now())

  @@map("points_events")
  @@index([userId, createdAt])
}

model TreeMessage {
  id        String   @id @default(cuid())
  tree      Tree     @relation(fields: [treeId], references: [id], onDelete: Cascade)
  treeId    String
  text      String
  createdAt DateTime @default(now())

  @@map("tree_messages")
  @@index([treeId])
}

model Challenge {
  id          String   @id @default(cuid())
  name        String
  description String?
  metric      String   @default("WATERINGS")
  goal        Int
  startsAt    DateTime
  endsAt      DateTime
  sponsor     Sponsor? @relation(fields: [sponsorId], references: [id])
  sponsorId   String?

  @@map("challenges")
}
```

- [ ] **Step 2: Write migration `migrations/0004_incentives_sponsors.sql`**

```sql
-- Incentives + sponsors (spec §5). Additive only.
CREATE TABLE sponsors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tier TEXT NOT NULL,
  logoSvg TEXT,
  description TEXT,
  website TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groves (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  sponsorId TEXT REFERENCES sponsors(id),
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rewards (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  merchantName TEXT NOT NULL,
  sponsorId TEXT REFERENCES sponsors(id),
  costPoints INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10,
  active INTEGER NOT NULL DEFAULT 1,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE redemptions (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  rewardId TEXT NOT NULL REFERENCES rewards(id),
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'ISSUED',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_redemptions_user ON redemptions(userId);

CREATE TABLE points_events (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES users(id),
  action TEXT NOT NULL,
  points INTEGER NOT NULL,
  refType TEXT,
  refId TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_points_events_user_time ON points_events(userId, createdAt);

CREATE TABLE tree_messages (
  id TEXT PRIMARY KEY,
  treeId TEXT NOT NULL REFERENCES trees(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_tree_messages_tree ON tree_messages(treeId);

CREATE TABLE challenges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  metric TEXT NOT NULL DEFAULT 'WATERINGS',
  goal INTEGER NOT NULL,
  startsAt DATETIME NOT NULL,
  endsAt DATETIME NOT NULL,
  sponsorId TEXT REFERENCES sponsors(id)
);

ALTER TABLE users ADD COLUMN pointsBalance INTEGER NOT NULL DEFAULT 0;
ALTER TABLE users ADD COLUMN careScore INTEGER NOT NULL DEFAULT 0;
ALTER TABLE trees ADD COLUMN groveId TEXT REFERENCES groves(id);
ALTER TABLE planting_campaigns ADD COLUMN sponsorId TEXT REFERENCES sponsors(id);
```

- [ ] **Step 3: Apply locally and regenerate the client**

Run from `cloudflare-backend/`:
```bash
npx wrangler d1 migrations apply verde-sector-5-db --local
npm run db:generate
npm run typecheck
```
Expected: migration applies cleanly; typecheck passes. Do NOT run with `--remote` — production migration happens at final deploy (Task 21).

- [ ] **Step 4: Run all tests still green**

Run: `npx vitest run`
Expected: PASS (Tasks 1–4 suites).

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma migrations/0004_incentives_sponsors.sql
git commit -m "feat(db): sponsors, groves, rewards, points ledger, tree messages, challenges"
```

---

### Task 6: Points ledger lib + optional-auth middleware

**Files:**
- Create: `cloudflare-backend/src/lib/points.ts`
- Modify: `cloudflare-backend/src/routes/auth.ts` (add `optionalJwtMiddleware` export next to the existing `jwtMiddleware` at the bottom of the file)
- Test: `cloudflare-backend/src/lib/__tests__/points.test.ts`

**Interfaces:**
- Consumes: Prisma client instance (passed in), existing `JWT_SECRET_KEY` constant and `jwtVerify` import already present in `routes/auth.ts`.
- Produces:
  - `POINTS = { WATERING: 50, CAMPAIGN_JOIN: 100 } as const`
  - `awardPoints(prisma, opts: { userId: string; action: 'WATERING' | 'CAMPAIGN_JOIN'; points: number; refType?: string; refId?: string }): Promise<void>` — creates the ledger row and increments both `pointsBalance` and `careScore`.
  - `redeemCheck(balance: number, cost: number, stock: number, active: boolean): 'ok' | 'insufficient_points' | 'out_of_stock'`
  - `generateVoucherCode(): string` — format `VS5-XXXX-XXXX` (A–Z, 0–9).
  - `optionalJwtMiddleware` — sets `c.set('user', …)` when a valid Bearer token is present; always calls `next()` (never 401s).

  Tasks 7 and 8 import these.

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/points.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { redeemCheck, generateVoucherCode, POINTS } from '../points';

describe('redeemCheck', () => {
  it('accepts when balance covers cost and stock exists', () => {
    expect(redeemCheck(500, 300, 5, true)).toBe('ok');
  });
  it('rejects insufficient balance', () => {
    expect(redeemCheck(200, 300, 5, true)).toBe('insufficient_points');
  });
  it('rejects zero stock and inactive rewards', () => {
    expect(redeemCheck(500, 300, 0, true)).toBe('out_of_stock');
    expect(redeemCheck(500, 300, 5, false)).toBe('out_of_stock');
  });
});

describe('generateVoucherCode', () => {
  it('matches VS5-XXXX-XXXX with uppercase alphanumerics', () => {
    for (let i = 0; i < 20; i++) {
      expect(generateVoucherCode()).toMatch(/^VS5-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    }
  });
});

describe('POINTS', () => {
  it('has the spec values', () => {
    expect(POINTS.WATERING).toBe(50);
    expect(POINTS.CAMPAIGN_JOIN).toBe(100);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/__tests__/points.test.ts`
Expected: FAIL — cannot resolve `../points`.

- [ ] **Step 3: Write `src/lib/points.ts`**

```ts
// Verde Points ledger (spec §3.5). points_events is the source of truth;
// users.pointsBalance / users.careScore are caches updated in the same call.
export const POINTS = { WATERING: 50, CAMPAIGN_JOIN: 100 } as const;

export async function awardPoints(
  prisma: any,
  opts: { userId: string; action: 'WATERING' | 'CAMPAIGN_JOIN'; points: number; refType?: string; refId?: string }
): Promise<void> {
  await prisma.pointsEvent.create({
    data: {
      userId: opts.userId,
      action: opts.action,
      points: opts.points,
      refType: opts.refType ?? null,
      refId: opts.refId ?? null,
    },
  });
  await prisma.user.update({
    where: { id: opts.userId },
    data: {
      pointsBalance: { increment: opts.points },
      careScore: { increment: opts.points },
    },
  });
}

export function redeemCheck(
  balance: number,
  cost: number,
  stock: number,
  active: boolean
): 'ok' | 'insufficient_points' | 'out_of_stock' {
  if (!active || stock <= 0) return 'out_of_stock';
  if (balance < cost) return 'insufficient_points';
  return 'ok';
}

const CODE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function generateVoucherCode(): string {
  const block = () =>
    Array.from({ length: 4 }, () => CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]).join('');
  return `VS5-${block()}-${block()}`;
}
```

- [ ] **Step 4: Add `optionalJwtMiddleware` to `src/routes/auth.ts`**

Append directly after the existing `roleMiddleware` export (before `export default auth;`), reusing the module's existing `jwtVerify` import and `JWT_SECRET_KEY` constant:

```ts
// Like jwtMiddleware, but anonymous requests pass through without a user.
// Used on public write endpoints (tree watering) so logged-in citizens still
// earn points while the pitch demo keeps working unauthenticated.
export const optionalJwtMiddleware = async (c: any, next: any) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY));
      if (payload?.sub) {
        c.set('user', {
          id: payload.sub as string,
          email: (payload as any).email,
          role: (payload as any).role,
        });
      }
    }
  } catch {
    // invalid/expired token on an optional route: proceed anonymously
  }
  await next();
};
```

- [ ] **Step 5: Run tests + typecheck**

Run: `npx vitest run && npm run typecheck`
Expected: all suites PASS; typecheck clean.

- [ ] **Step 6: Commit**

```bash
git add src/lib/points.ts src/lib/__tests__/points.test.ts src/routes/auth.ts
git commit -m "feat(api): points ledger helpers + optional-auth middleware"
```

---

### Task 7: Wire earning into watering + campaign join

**Files:**
- Modify: `cloudflare-backend/src/routes/trees.ts` (the `trees.post('/:id/water', …)` handler, currently at lines 250–308)
- Modify: `cloudflare-backend/src/routes/campaigns.ts` (the `campaigns.post('/:id/join', …)` handler)

**Interfaces:**
- Consumes: `optionalJwtMiddleware` (Task 6), `awardPoints`, `POINTS` (Task 6), `composeTreeMessage` (Task 4), `computeWaterStatus` (Task 1), Prisma models `TreeMessage`, `PointsEvent` (Task 5).
- Produces: watering response gains `treeMessage` (string). No signature changes otherwise — existing frontend clients keep working.

- [ ] **Step 1: Update the water handler in `trees.ts`**

Add imports at the top of the file:

```ts
import { optionalJwtMiddleware } from './auth';
import { awardPoints, POINTS } from '../lib/points';
import { composeTreeMessage } from '../lib/treeMessages';
import { computeWaterStatus } from '../lib/waterStatus';
```

Change the route registration from `trees.post('/:id/water', async (c) => {` to `trees.post('/:id/water', optionalJwtMiddleware, async (c) => {`.

Inside the handler, after the existing `const wateringLog = await prisma.wateringLog.create({ … });` block and before `return c.json(…)`, add:

```ts
    // Voice of the tree (spec §3.2): status BEFORE this watering drives the tone.
    const statusBefore = computeWaterStatus({
      species: tree.species,
      plantingDate: tree.plantingDate,
      lastWateredAt: tree.lastWateredAt,
    });
    const treeMessage = composeTreeMessage({
      nickname: tree.nickname,
      waterStatusBefore: statusBefore,
      month: new Date().getMonth(),
      liters,
    });
    await prisma.treeMessage.create({
      data: { treeId: id, text: treeMessage },
    }).catch(() => {});

    // Notify the adopter that their tree "wrote" to them.
    if (tree.adoptedById) {
      await prisma.notification.create({
        data: {
          userId: tree.adoptedById,
          title: 'Mesaj de la copacul tău 🌳',
          message: treeMessage,
          notificationType: 'TREE_MESSAGE',
          relatedObjectId: id,
          relatedObjectType: 'TREE',
        },
      }).catch(() => {});
    }

    // Personal points only for authenticated citizens (spec §3.5); anonymous
    // waterings still count for the tree, neighborhood and challenge.
    const user = c.get('user');
    if (user?.id) {
      await awardPoints(prisma, {
        userId: user.id,
        action: 'WATERING',
        points: earnedPoints,
        refType: 'WATERING_LOG',
        refId: wateringLog.id,
      }).catch((err) => console.error('awardPoints failed:', err));
    }
```

Change the return statement to include the message: `return c.json({ tree: updatedTree, wateringLog, treeMessage });`

- [ ] **Step 2: Update the join handler in `campaigns.ts`**

Add import at the top: `import { awardPoints, POINTS } from '../lib/points';`

In `campaigns.post('/:id/join', …)`, after the existing `prisma.notification.create({ … })` call and before `return c.json({ message: 'Successfully joined campaign' });`, add:

```ts
    await awardPoints(prisma, {
      userId: user.id,
      action: 'CAMPAIGN_JOIN',
      points: POINTS.CAMPAIGN_JOIN,
      refType: 'PLANTING_CAMPAIGN',
      refId: campaign.id,
    }).catch((err) => console.error('awardPoints failed:', err));
```

- [ ] **Step 3: Verify by hand against local dev**

Run: `npm run dev` (wrangler dev on :8787, Miniflare D1), then in another terminal:

```bash
curl -s -X POST http://localhost:8787/api/v1/trees/tree-demo-1/water \
  -H "Content-Type: application/json" -d '{"liters": 15, "userName": "Test"}'
```
Expected: JSON response containing `"treeMessage"` with a Romanian first-person string; no 500. (Anonymous → no points rows; that's correct.)

- [ ] **Step 4: Typecheck + tests, commit**

Run: `npm run typecheck && npx vitest run` — expected clean/PASS.

```bash
git add src/routes/trees.ts src/routes/campaigns.ts
git commit -m "feat(api): earn points + tree messages on watering and campaign join"
```

---

### Task 8: Rewards routes (catalog + atomic redemption)

**Files:**
- Create: `cloudflare-backend/src/routes/rewards.ts`
- Modify: `cloudflare-backend/src/index.ts` (import + `app.route('/api/v1/rewards', rewardRoutes);` after the existing route mounts)

**Interfaces:**
- Consumes: `jwtMiddleware` (existing), `redeemCheck`, `generateVoucherCode` (Task 6), models `Reward`, `Redemption`, `PointsEvent`, `User` (Task 5), `AppEnv` from `../types/hono`.
- Produces: `GET /api/v1/rewards` → `{ rewards: Reward[] }` (active only); `POST /api/v1/rewards/:id/redeem` → `{ redemption: { id, code, rewardTitle, costPoints, createdAt }, pointsBalance }` or 400 `{ error: 'insufficient_points' | 'out_of_stock' }`. Frontend Task 18 mirrors these shapes.

- [ ] **Step 1: Write `src/routes/rewards.ts`**

```ts
import { Hono } from 'hono';
import { jwtMiddleware } from './auth';
import { AppEnv } from '../types/hono';
import { redeemCheck, generateVoucherCode } from '../lib/points';

const rewards = new Hono<AppEnv>();

// Public catalog
rewards.get('/', async (c) => {
  const prisma = c.get('prisma');
  try {
    const items = await prisma.reward.findMany({
      where: { active: true },
      orderBy: { costPoints: 'asc' },
      include: { sponsor: { select: { id: true, name: true, slug: true, tier: true } } },
    });
    return c.json({ rewards: items });
  } catch (error) {
    console.error('Get rewards error:', error);
    return c.json({ error: 'Failed to fetch rewards' }, 500);
  }
});

// Redeem — atomic via guarded updateMany (no double-spend window on D1).
rewards.post('/:id/redeem', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  const id = c.req.param('id');

  try {
    const reward = await prisma.reward.findUnique({ where: { id } });
    if (!reward) return c.json({ error: 'Reward not found' }, 404);

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) return c.json({ error: 'Unauthorized' }, 401);

    const verdict = redeemCheck(dbUser.pointsBalance, reward.costPoints, reward.stock, reward.active);
    if (verdict !== 'ok') return c.json({ error: verdict }, 400);

    // Guarded decrements: each returns count=0 if the precondition no longer
    // holds (concurrent redeem), so we never go negative.
    const balanceUpdate = await prisma.user.updateMany({
      where: { id: user.id, pointsBalance: { gte: reward.costPoints } },
      data: { pointsBalance: { decrement: reward.costPoints } },
    });
    if (balanceUpdate.count === 0) return c.json({ error: 'insufficient_points' }, 400);

    const stockUpdate = await prisma.reward.updateMany({
      where: { id: reward.id, stock: { gt: 0 }, active: true },
      data: { stock: { decrement: 1 } },
    });
    if (stockUpdate.count === 0) {
      // Refund the balance we already took.
      await prisma.user.update({
        where: { id: user.id },
        data: { pointsBalance: { increment: reward.costPoints } },
      });
      return c.json({ error: 'out_of_stock' }, 400);
    }

    const redemption = await prisma.redemption.create({
      data: { userId: user.id, rewardId: reward.id, code: generateVoucherCode() },
    });
    await prisma.pointsEvent.create({
      data: {
        userId: user.id,
        action: 'REDEMPTION',
        points: -reward.costPoints,
        refType: 'REDEMPTION',
        refId: redemption.id,
      },
    });

    const updated = await prisma.user.findUnique({ where: { id: user.id } });
    return c.json({
      redemption: {
        id: redemption.id,
        code: redemption.code,
        rewardTitle: reward.title,
        costPoints: reward.costPoints,
        createdAt: redemption.createdAt,
      },
      pointsBalance: updated?.pointsBalance ?? 0,
    }, 201);
  } catch (error) {
    console.error('Redeem error:', error);
    return c.json({ error: 'Failed to redeem reward' }, 500);
  }
});

export default rewards;
```

- [ ] **Step 2: Mount in `src/index.ts`**

Add `import rewardRoutes from './routes/rewards';` with the other route imports and `app.route('/api/v1/rewards', rewardRoutes);` after the `neighborhoods` mount.

- [ ] **Step 3: Typecheck + tests**

Run: `npm run typecheck && npx vitest run`
Expected: clean/PASS. (Redemption math is covered by the `redeemCheck` unit tests from Task 6; the guarded-updateMany flow is exercised in the Task 12 smoke check once seed users exist.)

- [ ] **Step 4: Commit**

```bash
git add src/routes/rewards.ts src/index.ts
git commit -m "feat(api): rewards catalog + atomic redemption with voucher codes"
```

---

### Task 9: Sponsors routes (public pages + ESG dashboard + CSV)

**Files:**
- Create: `cloudflare-backend/src/routes/sponsors.ts`
- Modify: `cloudflare-backend/src/index.ts` (mount `/api/v1/sponsors`)

**Interfaces:**
- Consumes: `computeImpact` (Task 2), models `Sponsor`, `Grove` (Task 5).
- Produces:
  - `GET /api/v1/sponsors` → `{ sponsors: Array<{ id, name, slug, tier, logoSvg, description, website }> }`
  - `GET /api/v1/sponsors/:slug` → `{ sponsor, groves: Array<{ id, name, description, trees: Tree[] }>, campaigns }`
  - `GET /api/v1/sponsors/:slug/dashboard` → `{ sponsor: { name, slug, tier }, stats: { treeCount, aliveCount, survivalRate, healthyRate, wateringsCount, photoProofCount, co2KgPerYear, shadeM2 }, monthlyWaterings: Array<{ month: string, count: number }> }`; with `?format=csv` → `text/csv` per-tree rows (spec §4.2 columns).

  Frontend Task 20 mirrors these shapes.

- [ ] **Step 1: Write `src/routes/sponsors.ts`**

```ts
import { Hono } from 'hono';
import { AppEnv } from '../types/hono';
import { computeImpact } from '../lib/impact';

const sponsors = new Hono<AppEnv>();

const TIER_ORDER: Record<string, number> = { GOLD: 0, SILVER: 1, BRONZE: 2 };

sponsors.get('/', async (c) => {
  const prisma = c.get('prisma');
  try {
    const all = await prisma.sponsor.findMany();
    all.sort((a: any, b: any) => (TIER_ORDER[a.tier] ?? 9) - (TIER_ORDER[b.tier] ?? 9));
    return c.json({ sponsors: all });
  } catch (error) {
    console.error('Get sponsors error:', error);
    return c.json({ error: 'Failed to fetch sponsors' }, 500);
  }
});

sponsors.get('/:slug', async (c) => {
  const prisma = c.get('prisma');
  const slug = c.req.param('slug');
  try {
    const sponsor = await prisma.sponsor.findUnique({
      where: { slug },
      include: {
        groves: { include: { trees: true } },
        campaigns: true,
      },
    });
    if (!sponsor) return c.json({ error: 'Sponsor not found' }, 404);
    const { groves, campaigns, ...rest } = sponsor;
    return c.json({ sponsor: rest, groves, campaigns });
  } catch (error) {
    console.error('Get sponsor error:', error);
    return c.json({ error: 'Failed to fetch sponsor' }, 500);
  }
});

// ESG dashboard (spec §4.2): survival evidence aggregated from the care graph.
sponsors.get('/:slug/dashboard', async (c) => {
  const prisma = c.get('prisma');
  const slug = c.req.param('slug');
  try {
    const sponsor = await prisma.sponsor.findUnique({
      where: { slug },
      include: { groves: { include: { trees: { include: { wateringLogs: true } } } } },
    });
    if (!sponsor) return c.json({ error: 'Sponsor not found' }, 404);

    const trees = sponsor.groves.flatMap((g: any) => g.trees);
    const aliveCount = trees.filter((t: any) => t.healthStatus !== 'DEAD').length;
    const healthyCount = trees.filter((t: any) => t.healthStatus === 'EXCELLENT' || t.healthStatus === 'GOOD').length;
    const logs = trees.flatMap((t: any) => t.wateringLogs);
    const photoProofCount = logs.filter((l: any) => l.photoProof).length;

    let co2 = 0, shade = 0;
    for (const t of trees) {
      const impact = computeImpact({ species: t.species, trunkDiameter: t.trunkDiameter, plantingDate: t.plantingDate });
      co2 += impact.co2KgPerYear;
      shade += impact.shadeM2;
    }

    // Simple monthly watering series, last 6 months incl. current.
    const monthlyWaterings: Array<{ month: string; count: number }> = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const count = logs.filter((l: any) => {
        const at = new Date(l.loggedAt);
        return at.getFullYear() === d.getFullYear() && at.getMonth() === d.getMonth();
      }).length;
      monthlyWaterings.push({ month: key, count });
    }

    if (c.req.query('format') === 'csv') {
      const header = 'treeId,nickname,species,latitude,longitude,healthStatus,wateringsCount,lastWateredAt,photoProofCount,co2KgPerYear';
      const rows = trees.map((t: any) => {
        const impact = computeImpact({ species: t.species, trunkDiameter: t.trunkDiameter, plantingDate: t.plantingDate });
        const tLogs = t.wateringLogs as any[];
        const photoCount = tLogs.filter((l) => l.photoProof).length;
        // Escape double quotes so nicknames can't break the CSV shape.
        const nickname = `"${String(t.nickname ?? '').replace(/"/g, '""')}"`;
        return [t.id, nickname, t.species, t.latitude, t.longitude, t.healthStatus,
          tLogs.length, t.lastWateredAt ? new Date(t.lastWateredAt).toISOString() : '',
          photoCount, impact.co2KgPerYear].join(',');
      });
      return c.text([header, ...rows].join('\n'), 200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="esg-${slug}.csv"`,
      });
    }

    return c.json({
      sponsor: { name: sponsor.name, slug: sponsor.slug, tier: sponsor.tier },
      stats: {
        treeCount: trees.length,
        aliveCount,
        survivalRate: trees.length ? Math.round((aliveCount / trees.length) * 100) : 0,
        healthyRate: trees.length ? Math.round((healthyCount / trees.length) * 100) : 0,
        wateringsCount: logs.length,
        photoProofCount,
        co2KgPerYear: Math.round(co2 * 10) / 10,
        shadeM2: Math.round(shade * 10) / 10,
      },
      monthlyWaterings,
    });
  } catch (error) {
    console.error('Sponsor dashboard error:', error);
    return c.json({ error: 'Failed to build sponsor dashboard' }, 500);
  }
});

export default sponsors;
```

- [ ] **Step 2: Mount in `src/index.ts`**

`import sponsorRoutes from './routes/sponsors';` and `app.route('/api/v1/sponsors', sponsorRoutes);`

- [ ] **Step 3: Typecheck, commit**

Run: `npm run typecheck` — expected clean.

```bash
git add src/routes/sponsors.ts src/index.ts
git commit -m "feat(api): sponsor pages + ESG dashboard with CSV export"
```

---

### Task 10: Community routes (leaderboard + current challenge)

**Files:**
- Create: `cloudflare-backend/src/routes/community.ts`
- Modify: `cloudflare-backend/src/index.ts` (the file exports two named routers; mount one at `/api/v1/leaderboard` and the other at `/api/v1/challenges`)

**Interfaces:**
- Consumes: models `Challenge`, `WateringLog`, `Tree`, `User`, `PointsEvent` (Task 5).
- Produces:
  - `GET /api/v1/leaderboard?scope=neighborhoods|users` → `{ scope, window: { startsAt, endsAt } | null, entries: Array<{ rank, name, value }> }` (neighborhoods: value = watering count; users: value = points earned).
  - `GET /api/v1/challenges/current` → `{ challenge: (Challenge & { sponsorName?: string }) | null, progress: { total: number, goal: number, byNeighborhood: Array<{ neighborhood, count }> } | null }`.

  Frontend Tasks 17/19 mirror these shapes.

- [ ] **Step 1: Write `src/routes/community.ts`** (two exported routers, one file — they share the window helper)

```ts
import { Hono } from 'hono';
import { AppEnv } from '../types/hono';

async function activeChallenge(prisma: any) {
  const now = new Date();
  const all = await prisma.challenge.findMany({ include: { sponsor: { select: { name: true, slug: true } } } });
  return all.find((ch: any) => new Date(ch.startsAt) <= now && now <= new Date(ch.endsAt)) ?? null;
}

export const leaderboard = new Hono<AppEnv>();

leaderboard.get('/', async (c) => {
  const prisma = c.get('prisma');
  const scope = c.req.query('scope') === 'users' ? 'users' : 'neighborhoods';
  try {
    const challenge = await activeChallenge(prisma);
    const window = challenge
      ? { startsAt: challenge.startsAt, endsAt: challenge.endsAt }
      : null;
    const loggedAtFilter = window
      ? { loggedAt: { gte: new Date(window.startsAt), lte: new Date(window.endsAt) } }
      : {};

    if (scope === 'neighborhoods') {
      // Group waterings by the TREE's neighborhood (spec §5 note).
      const logs = await prisma.wateringLog.findMany({
        where: loggedAtFilter,
        include: { tree: { select: { neighborhood: true } } },
      });
      const counts = new Map<string, number>();
      for (const log of logs) {
        const hood = log.tree?.neighborhood ?? 'Sector 5';
        counts.set(hood, (counts.get(hood) ?? 0) + 1);
      }
      const entries = [...counts.entries()]
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .map((e, i) => ({ rank: i + 1, ...e }));
      return c.json({ scope, window, entries });
    }

    // users: positive points earned in window
    const createdAtFilter = window
      ? { createdAt: { gte: new Date(window.startsAt), lte: new Date(window.endsAt) } }
      : {};
    const events = await prisma.pointsEvent.findMany({
      where: { points: { gt: 0 }, ...createdAtFilter },
      include: { user: { select: { name: true, email: true } } },
    });
    const byUser = new Map<string, { name: string; value: number }>();
    for (const ev of events) {
      const key = ev.userId;
      const name = ev.user?.name || ev.user?.email || 'Cetățean';
      const prev = byUser.get(key) ?? { name, value: 0 };
      byUser.set(key, { name, value: prev.value + ev.points });
    }
    const entries = [...byUser.values()]
      .sort((a, b) => b.value - a.value)
      .slice(0, 20)
      .map((e, i) => ({ rank: i + 1, ...e }));
    return c.json({ scope, window, entries });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return c.json({ error: 'Failed to build leaderboard' }, 500);
  }
});

export const challenges = new Hono<AppEnv>();

challenges.get('/current', async (c) => {
  const prisma = c.get('prisma');
  try {
    const challenge = await activeChallenge(prisma);
    if (!challenge) return c.json({ challenge: null, progress: null });

    const logs = await prisma.wateringLog.findMany({
      where: { loggedAt: { gte: new Date(challenge.startsAt), lte: new Date(challenge.endsAt) } },
      include: { tree: { select: { neighborhood: true } } },
    });
    const counts = new Map<string, number>();
    for (const log of logs) {
      const hood = log.tree?.neighborhood ?? 'Sector 5';
      counts.set(hood, (counts.get(hood) ?? 0) + 1);
    }
    return c.json({
      challenge: { ...challenge, sponsorName: challenge.sponsor?.name },
      progress: {
        total: logs.length,
        goal: challenge.goal,
        byNeighborhood: [...counts.entries()]
          .map(([neighborhood, count]) => ({ neighborhood, count }))
          .sort((a, b) => b.count - a.count),
      },
    });
  } catch (error) {
    console.error('Challenge error:', error);
    return c.json({ error: 'Failed to fetch challenge' }, 500);
  }
});
```

- [ ] **Step 2: Mount both in `src/index.ts`**

```ts
import { leaderboard as leaderboardRoutes, challenges as challengeRoutes } from './routes/community';
```
and after the existing mounts:
```ts
app.route('/api/v1/leaderboard', leaderboardRoutes);
app.route('/api/v1/challenges', challengeRoutes);
```

- [ ] **Step 3: Typecheck, commit**

Run: `npm run typecheck` — expected clean.

```bash
git add src/routes/community.ts src/index.ts
git commit -m "feat(api): leaderboard + current-challenge endpoints"
```

---

### Task 11: Tree/user response enrichment + tree messages endpoint

**Files:**
- Modify: `cloudflare-backend/src/routes/trees.ts` (GET `/`, GET `/:id`; add GET `/:id/messages`)
- Modify: `cloudflare-backend/src/routes/users.ts` (add GET `/me/impact`)

**Interfaces:**
- Consumes: `computeWaterStatus` (Task 1), `computeImpact` (Task 2), `guardianLevelFor`, `nextLevelProgress` (Task 3), `jwtMiddleware` (existing).
- Produces:
  - Tree objects in `GET /trees` and `GET /trees/:id` responses gain `waterStatus: WaterStatus` and `impact: { co2KgPerYear, shadeM2 }`.
  - `GET /trees/:id/messages` → `{ messages: Array<{ id, text, createdAt }> }` (newest first, max 20).
  - `GET /users/me/impact` (auth) → `{ pointsBalance, careScore, level: GuardianLevel, next: GuardianLevel | null, progress: number, trees: Array<{ id, nickname, waterStatus, impact }>, totals: { co2KgPerYear, shadeM2 } }`.

  Frontend Tasks 16/17 mirror these shapes.

- [ ] **Step 1: Add an enrichment helper in `trees.ts`**

Near the top of `trees.ts` (after imports — `computeWaterStatus` is already imported from Task 7; also add `import { computeImpact } from '../lib/impact';`):

```ts
// Spec §6: computed on read, never stored.
function enrichTree<T extends { species: string; plantingDate?: Date | null; lastWateredAt?: Date | null; trunkDiameter?: number | null }>(tree: T) {
  return {
    ...tree,
    waterStatus: computeWaterStatus({
      species: tree.species,
      plantingDate: tree.plantingDate,
      lastWateredAt: tree.lastWateredAt,
    }),
    impact: computeImpact({
      species: tree.species,
      trunkDiameter: tree.trunkDiameter,
      plantingDate: tree.plantingDate,
    }),
  };
}
```

In `GET /` change the response line to `return c.json({ trees: trees.map(enrichTree), pagination: { … } });` (keep the existing pagination object). In `GET /:id` change to `return c.json({ tree: enrichTree(tree) });`

- [ ] **Step 2: Add the messages endpoint in `trees.ts`** (register it BEFORE the `/:id` GET route to avoid param shadowing — place it directly above `trees.get('/:id', …)`)

```ts
// Voice-of-the-tree feed (spec §3.2)
trees.get('/:id/messages', async (c) => {
  const prisma = c.get('prisma');
  const id = c.req.param('id');
  try {
    const messages = await prisma.treeMessage.findMany({
      where: { treeId: id },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { id: true, text: true, createdAt: true },
    });
    return c.json({ messages });
  } catch (error) {
    console.error('Get tree messages error:', error);
    return c.json({ error: 'Failed to fetch tree messages' }, 500);
  }
});
```

- [ ] **Step 3: Add `GET /me/impact` in `users.ts`**

Read `users.ts` first to match its imports/structure, then register BEFORE any `/:id` route:

```ts
import { computeWaterStatus } from '../lib/waterStatus';
import { computeImpact } from '../lib/impact';
import { guardianLevelFor, nextLevelProgress } from '../lib/guardianLevel';
```

```ts
// My guardian card (spec §6)
users.get('/me/impact', jwtMiddleware, async (c) => {
  const prisma = c.get('prisma');
  const user = c.get('user');
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { adoptedTrees: true },
    });
    if (!dbUser) return c.json({ error: 'User not found' }, 404);

    const trees = dbUser.adoptedTrees.map((t: any) => ({
      id: t.id,
      nickname: t.nickname,
      waterStatus: computeWaterStatus({ species: t.species, plantingDate: t.plantingDate, lastWateredAt: t.lastWateredAt }),
      impact: computeImpact({ species: t.species, trunkDiameter: t.trunkDiameter, plantingDate: t.plantingDate }),
    }));
    const totals = trees.reduce(
      (acc: any, t: any) => ({
        co2KgPerYear: Math.round((acc.co2KgPerYear + t.impact.co2KgPerYear) * 10) / 10,
        shadeM2: Math.round((acc.shadeM2 + t.impact.shadeM2) * 10) / 10,
      }),
      { co2KgPerYear: 0, shadeM2: 0 }
    );
    const { next, progress } = nextLevelProgress(dbUser.careScore);
    return c.json({
      pointsBalance: dbUser.pointsBalance,
      careScore: dbUser.careScore,
      level: guardianLevelFor(dbUser.careScore),
      next,
      progress,
      trees,
      totals,
    });
  } catch (error) {
    console.error('Me impact error:', error);
    return c.json({ error: 'Failed to build impact summary' }, 500);
  }
});
```

- [ ] **Step 4: Typecheck + tests, commit**

Run: `npm run typecheck && npx vitest run` — expected clean/PASS.

```bash
git add src/routes/trees.ts src/routes/users.ts
git commit -m "feat(api): waterStatus+impact enrichment, tree messages feed, my-impact endpoint"
```

---

### Task 12: Demo seed migration 0005

**Files:**
- Create: `cloudflare-backend/migrations/0005_incentives_seed.sql`

**Interfaces:**
- Consumes: tables from Task 5; existing seeded trees/users from migrations 0001–0002 (inspect `0002_seed.sql` first for existing user/tree ids — reference REAL ids from that file; the tree ids below like `tree-cot-1` match the frontend seed convention used by the water endpoint's create-on-demand path).
- Produces: 3 sponsors, 2 groves, 6 rewards, 1 challenge, demo points/care history. Slugs: `solaris-energia`, `panifica-bucuresti`, `bicicleta-albastra` (Tasks 13/20 reference these).

- [ ] **Step 1: Inspect the existing seed**

Run: `grep -n "INSERT INTO users\|INSERT INTO trees" migrations/0002_seed.sql | head -20`
Note the real user ids/emails and tree ids. Adjust the `userId`/`treeId` values below to reference rows that actually exist (fall back to inserting two demo citizens if 0002 has none).

- [ ] **Step 2: Write `migrations/0005_incentives_seed.sql`**

Use this content, correcting FK ids per Step 1:

```sql
-- Demo data for the pitch (spec §8). Fictional sponsors, labeled in UI.
INSERT INTO sponsors (id, name, slug, tier, description, website) VALUES
  ('sponsor-solaris', 'Solaris Energia', 'solaris-energia', 'GOLD',
   'Sponsor demonstrativ — companie fictivă de energie regenerabilă. Susține campania „Augustul Udărilor" și crângul Solaris.', 'https://example.com/solaris'),
  ('sponsor-panifica', 'Panifica București', 'panifica-bucuresti', 'SILVER',
   'Sponsor demonstrativ — brutărie fictivă de cartier. Sponsorizează Crângul Sebastian.', 'https://example.com/panifica'),
  ('sponsor-bicicleta', 'Bicicleta Albastră', 'bicicleta-albastra', 'BRONZE',
   'Sponsor demonstrativ — magazin fictiv de biciclete. Contribuie la fondul de recompense.', 'https://example.com/bicicleta');

INSERT INTO groves (id, name, description, sponsorId) VALUES
  ('grove-solaris', 'Crângul Solaris — Parcul Izvor', 'Aliniament susținut de Solaris Energia (demo).', 'sponsor-solaris'),
  ('grove-sebastian', 'Crângul Sebastian', 'Zona de nord a Parcului Sebastian, susținută de Panifica București (demo).', 'sponsor-panifica');

-- Attach existing seeded trees to groves (ids from 0002_seed.sql — verify!).
UPDATE trees SET groveId = 'grove-solaris'  WHERE id IN ('tree-izv-1','tree-izv-2','tree-izv-3','tree-izv-4','tree-izv-5');
UPDATE trees SET groveId = 'grove-sebastian' WHERE id IN ('tree-seb-1','tree-seb-2','tree-seb-3','tree-seb-4','tree-seb-5');

INSERT INTO rewards (id, title, description, merchantName, sponsorId, costPoints, stock) VALUES
  ('reward-sac-udare', 'Sac de udare lentă (Tree Gator)', 'Kit care udă copacul 6–8 ore. Ridicare de la sediul Primăriei.', 'Primăria Sectorului 5', NULL, 400, 20),
  ('reward-voucher-paine', 'Voucher 20 lei — Panifica', 'Reducere la orice produs de panificație.', 'Panifica București', 'sponsor-panifica', 300, 30),
  ('reward-service-bicicleta', 'Revizie gratuită bicicletă', 'Verificare completă la Bicicleta Albastră.', 'Bicicleta Albastră', 'sponsor-bicicleta', 500, 10),
  ('reward-bilet-gradina', 'Bilet Grădina Botanică', 'Intrare gratuită pentru doi.', 'Grădina Botanică', NULL, 250, 40),
  ('reward-manusi', 'Set mănuși + unelte de grădinărit', 'Pentru gardienii care plantează.', 'Primăria Sectorului 5', NULL, 350, 15),
  ('reward-workshop', 'Atelier de îngrijire a copacilor', 'Instruire cu peisagiștii primăriei — pas spre Super-Gardian.', 'Primăria Sectorului 5', 'sponsor-solaris', 600, 12);

INSERT INTO challenges (id, name, description, metric, goal, startsAt, endsAt, sponsorId) VALUES
  ('challenge-august-2026', 'Augustul Udărilor',
   '500 de udări în tot Sectorul 5 în luna august. Cartierul câștigător primește un micro-grant pentru un proiect verde.',
   'WATERINGS', 500, '2026-08-01T00:00:00Z', '2026-08-31T23:59:59Z', 'sponsor-solaris');

-- Care history so leaderboards/levels look alive (spec §8). Requires demo
-- citizens; insert if 0002 lacks them (password hash copied from an existing
-- seeded user so demo logins keep working).
INSERT INTO points_events (id, userId, action, points, refType, createdAt) VALUES
  ('pe-elena-1', 'user-citizen-elena', 'WATERING', 550, 'BACKFILL', datetime('now', '-20 days')),
  ('pe-elena-2', 'user-citizen-elena', 'CAMPAIGN_JOIN', 100, 'BACKFILL', datetime('now', '-12 days')),
  ('pe-elena-3', 'user-citizen-elena', 'WATERING', 150, 'BACKFILL', datetime('now', '-2 days')),
  ('pe-mihai-1', 'user-citizen-mihai', 'WATERING', 2100, 'BACKFILL', datetime('now', '-40 days')),
  ('pe-mihai-2', 'user-citizen-mihai', 'WATERING', 250, 'BACKFILL', datetime('now', '-5 days'));
UPDATE users SET pointsBalance = 800,  careScore = 800  WHERE id = 'user-citizen-elena';
UPDATE users SET pointsBalance = 2350, careScore = 2350 WHERE id = 'user-citizen-mihai';

INSERT INTO tree_messages (id, treeId, text, createdAt) VALUES
  ('tm-1', 'tree-izv-1', 'Mulțumesc pentru apă! Pe căldura asta, orice strop contează. — Teiul de pe Splai', datetime('now', '-2 days')),
  ('tm-2', 'tree-seb-1', 'Uf, chiar aveam nevoie! Cei 15 litri m-au salvat de arșiță. — Castanul Sebastian', datetime('now', '-1 days')),
  ('tm-3', 'tree-izv-3', 'Începeam să mă usuc — mulțumesc pentru cei 10 litri! — Stejarul Parlamentului', datetime('now', '-6 hours'));

-- Gold tier (spec §4.1): anchor sponsor underwrites a campaign. Verify a
-- campaign row exists in 0002_seed.sql and use its real id; skip if none.
UPDATE planting_campaigns SET sponsorId = 'sponsor-solaris'
WHERE id = (SELECT id FROM planting_campaigns ORDER BY createdAt LIMIT 1);
```

Adjust `user-citizen-elena` / `user-citizen-mihai` and the tree ids to real ids found in Step 1; if trees with those ids don't exist in the local DB, insert minimal rows for them first (species/coords like the water endpoint's create-on-demand defaults).

- [ ] **Step 3: Apply locally + smoke-check the new endpoints**

```bash
npx wrangler d1 migrations apply verde-sector-5-db --local
npm run dev &
sleep 3
curl -s http://localhost:8787/api/v1/sponsors | head -c 400; echo
curl -s http://localhost:8787/api/v1/rewards | head -c 400; echo
curl -s http://localhost:8787/api/v1/challenges/current | head -c 400; echo
curl -s "http://localhost:8787/api/v1/sponsors/solaris-energia/dashboard" | head -c 600; echo
curl -s "http://localhost:8787/api/v1/sponsors/solaris-energia/dashboard?format=csv" | head -3
```

Then smoke-test the authed redemption path end-to-end (spec §9 "route test": use a citizen from `0002_seed.sql` — check its email/password there; README suggests password `password`):

```bash
TOKEN=$(curl -s -X POST http://localhost:8787/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<citizen-email-from-0002>","password":"password"}' | sed 's/.*"accessToken":"\([^"]*\)".*/\1/')
curl -s -X POST http://localhost:8787/api/v1/rewards/reward-bilet-gradina/redeem \
  -H "Authorization: Bearer $TOKEN"; echo
kill %1
```
Expected: 3 sponsors; 6 rewards; the August challenge with progress; dashboard stats with non-zero treeCount; CSV header + rows; the redemption returns a `VS5-…` code and decremented `pointsBalance` (or `insufficient_points` if that citizen has < 250 — in that case redeem as the backfilled high-score user instead).

- [ ] **Step 4: Commit**

```bash
git add migrations/0005_incentives_seed.sql
git commit -m "feat(db): demo seed — sponsors, groves, rewards, challenge, care history"
```

---

### Task 13: Frontend data layer (types + seed + storage + api)

**Files:**
- Create: `web-dashboard/src/types/gamification.ts`
- Create: `web-dashboard/src/data/gamificationSeedData.ts`
- Create: `web-dashboard/src/services/gamificationStorage.ts`
- Create: `web-dashboard/src/services/gamificationApi.ts`
- Test: `web-dashboard/src/__tests__/gamificationStorage.test.ts`

**Interfaces:**
- Consumes: `TreeItem` ids from `src/data/treeSeedData.ts` (e.g. `tree-izv-1`); localStorage patterns from `src/services/treeStorage.ts`; fetch patterns from `src/services/treeApi.ts` (`API_BASE_URL` from `../config`, return `null` on failure).
- Produces (all imported by Tasks 15–20):

```ts
// types/gamification.ts
export type SponsorTier = 'BRONZE' | 'SILVER' | 'GOLD';
export interface SponsorItem { id: string; name: string; slug: string; tier: SponsorTier; logoSvg: string; description: string; website?: string; }
export interface GroveItem { id: string; name: string; description: string; sponsorId: string; treeIds: string[]; }
export interface RewardItem { id: string; title: string; description: string; merchantName: string; sponsorId?: string | null; costPoints: number; stock: number; }
export interface RedemptionItem { id: string; rewardId: string; rewardTitle: string; code: string; createdAt: string; }
export interface ChallengeItem { id: string; name: string; description: string; goal: number; startsAt: string; endsAt: string; sponsorId: string; }
export interface LeaderUserItem { name: string; neighborhood: string; points: number; waterings: number; }
```

- `gamificationStorage.ts`: `getRewards(): RewardItem[]`, `getRedemptions(): RedemptionItem[]`, `redeemReward(rewardId: string, balance: number): { ok: true; redemption: RedemptionItem } | { ok: false; error: 'insufficient_points' | 'out_of_stock' | 'not_found' }`, `generateVoucherCode(): string` (format `VS5-XXXX-XXXX`).
- `gamificationApi.ts`: `fetchRewardsApi(): Promise<RewardItem[] | null>`, `fetchSponsorsApi(): Promise<SponsorItem[] | null>`, `fetchChallengeApi(): Promise<{ challenge: ChallengeItem; progress: { total: number; goal: number; byNeighborhood: Array<{ neighborhood: string; count: number }> } } | null>` — same try/catch-null shape as `treeApi.ts`.
- `gamificationSeedData.ts`: `SEED_SPONSORS: SponsorItem[]` (the 3 fictional sponsors, `logoSvg` = small self-contained `<svg>` strings ~200 chars: Solaris = sun disc, Panifica = wheat/bread shape, Bicicleta = wheel), `SEED_GROVES: GroveItem[]` (`grove-solaris` → `['tree-izv-1'..'tree-izv-5']`, `grove-sebastian` → `['tree-seb-1'..'tree-seb-5']`), `SEED_REWARDS: RewardItem[]` (the same 6 items as migration 0005, same ids/costs/stock), `SEED_CHALLENGE: ChallengeItem` (`challenge-august-2026`, goal 500, `2026-08-01`→`2026-08-31`, sponsor `sponsor-solaris`), `SEED_LEADER_USERS: LeaderUserItem[]` (8 entries reusing adopter names from `treeSeedData.ts`, points 2350 down to 180, Mihai Ionescu top with 2350).

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/gamificationStorage.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest';
import { getRewards, getRedemptions, redeemReward } from '../services/gamificationStorage';
import { SEED_REWARDS } from '../data/gamificationSeedData';

beforeEach(() => localStorage.clear());

describe('gamificationStorage', () => {
  it('serves the seed catalog on first load', () => {
    expect(getRewards()).toEqual(SEED_REWARDS);
  });

  it('redeems: issues a VS5 code, decrements stock, records the redemption', () => {
    const reward = SEED_REWARDS[0];
    const result = redeemReward(reward.id, reward.costPoints + 100);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.redemption.code).toMatch(/^VS5-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
      expect(result.redemption.rewardTitle).toBe(reward.title);
    }
    expect(getRewards().find(r => r.id === reward.id)!.stock).toBe(reward.stock - 1);
    expect(getRedemptions()).toHaveLength(1);
  });

  it('rejects insufficient balance without touching stock', () => {
    const reward = SEED_REWARDS[0];
    const result = redeemReward(reward.id, reward.costPoints - 1);
    expect(result).toEqual({ ok: false, error: 'insufficient_points' });
    expect(getRewards().find(r => r.id === reward.id)!.stock).toBe(reward.stock);
  });

  it('rejects when stock is exhausted', () => {
    const reward = SEED_REWARDS[0];
    for (let i = 0; i < reward.stock; i++) redeemReward(reward.id, 99999);
    expect(redeemReward(reward.id, 99999)).toEqual({ ok: false, error: 'out_of_stock' });
  });

  it('rejects unknown rewards', () => {
    expect(redeemReward('nope', 99999)).toEqual({ ok: false, error: 'not_found' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run from `web-dashboard/`: `npm test`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the four files**

Write `types/gamification.ts` exactly as in Interfaces. Write `data/gamificationSeedData.ts` with full literal data — ids MUST match migration 0005: `sponsor-solaris`, `sponsor-panifica`, `sponsor-bicicleta`, `grove-solaris`, `grove-sebastian`, `reward-*`, `challenge-august-2026`. Reward titles/descriptions/merchants/costs/stock are copied verbatim from the migration. Use these exact logo SVGs and leaderboard entries:

```ts
const LOGO_SOLARIS = '<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="7" fill="#fbbf24"/><g stroke="#fbbf24" stroke-width="2" stroke-linecap="round"><line x1="16" y1="2" x2="16" y2="7"/><line x1="16" y1="25" x2="16" y2="30"/><line x1="2" y1="16" x2="7" y2="16"/><line x1="25" y1="16" x2="30" y2="16"/><line x1="6" y1="6" x2="9.5" y2="9.5"/><line x1="22.5" y1="22.5" x2="26" y2="26"/><line x1="26" y1="6" x2="22.5" y2="9.5"/><line x1="9.5" y1="22.5" x2="6" y2="26"/></g></svg>';
const LOGO_PANIFICA = '<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><ellipse cx="16" cy="18" rx="12" ry="8" fill="#d6a35c"/><path d="M8 15 Q16 9 24 15" stroke="#8a5a2b" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="12" y1="14" x2="12" y2="22" stroke="#8a5a2b" stroke-width="1.5"/><line x1="16" y1="13" x2="16" y2="23" stroke="#8a5a2b" stroke-width="1.5"/><line x1="20" y1="14" x2="20" y2="22" stroke="#8a5a2b" stroke-width="1.5"/></svg>';
const LOGO_BICICLETA = '<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12" fill="none" stroke="#60a5fa" stroke-width="2.5"/><g stroke="#60a5fa" stroke-width="1.5"><line x1="16" y1="4" x2="16" y2="28"/><line x1="4" y1="16" x2="28" y2="16"/><line x1="8" y1="8" x2="24" y2="24"/><line x1="24" y1="8" x2="8" y2="24"/></g><circle cx="16" cy="16" r="2.5" fill="#60a5fa"/></svg>';

export const SEED_LEADER_USERS: LeaderUserItem[] = [
  { name: 'Mihai Ionescu', neighborhood: 'Cotroceni', points: 2350, waterings: 44 },
  { name: 'Ana Maria', neighborhood: 'Sebastian', points: 1480, waterings: 22 },
  { name: 'Alexandru D.', neighborhood: 'Izvor', points: 1320, waterings: 25 },
  { name: 'Elena Popa', neighborhood: 'Cotroceni', points: 800, waterings: 14 },
  { name: 'Carmen Enache', neighborhood: 'Sebastian', points: 720, waterings: 20 },
  { name: 'Andrei Stanciu', neighborhood: 'Rahova', points: 540, waterings: 11 },
  { name: 'Florin Nistor', neighborhood: 'Ferentari', points: 410, waterings: 12 },
  { name: 'Daria M.', neighborhood: 'Izvor', points: 180, waterings: 18 },
];
``` Write `services/gamificationStorage.ts` following the `treeStorage.ts` localStorage pattern (keys `verde_s5_rewards`, `verde_s5_redemptions`; `redeemReward` re-reads stored rewards, applies the checks in order not_found → out_of_stock → insufficient_points, then persists both the decremented catalog and the new redemption with `id: \`redemption-${Date.now()}\``). Write `services/gamificationApi.ts` mirroring `treeApi.ts` (try/fetch/return-null; GETs only).

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (new suite + existing `treeStorage.test.ts`).

- [ ] **Step 5: Typecheck + commit**

Run: `npm run build` — expected clean.

```bash
git add src/types/gamification.ts src/data/gamificationSeedData.ts src/services/gamificationStorage.ts src/services/gamificationApi.ts src/__tests__/gamificationStorage.test.ts
git commit -m "feat(web): gamification data layer (types, seed, storage, api)"
```

---

### Task 14: Frontend care calculators

**Files:**
- Create: `web-dashboard/src/utils/treeCare.ts`
- Test: `web-dashboard/src/__tests__/treeCare.test.ts`

**Interfaces:**
- Consumes: `TreeItem` from `../types/tree` (frontend trees have Romanian species names and NO plantingDate/trunkDiameter — the calculators account for that).
- Produces (imported by Tasks 15–17, 19–20):

```ts
export type WaterStatus = 'unknown' | 'ok' | 'thirsty' | 'urgent';
export function computeWaterStatus(tree: Pick<TreeItem, 'species' | 'lastWateredAt' | 'healthStatus'>, now?: Date): WaterStatus
export function waterStatusColor(status: WaterStatus): string          // CSS color string
export function waterStatusLabel(status: WaterStatus): string          // Romanian label
export function computeImpact(species: string): { co2KgPerYear: number; shadeM2: number }
export function guardianLevelFor(careScore: number): { key: string; title: string; minScore: number }
export function nextLevelProgress(careScore: number): { nextTitle: string | null; progress: number }
```

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/treeCare.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { computeWaterStatus, computeImpact, guardianLevelFor, nextLevelProgress, waterStatusLabel } from '../utils/treeCare';

const JULY = new Date('2026-07-15T12:00:00Z');
const daysAgo = (n: number) => new Date(JULY.getTime() - n * 86400000).toISOString();

describe('computeWaterStatus (frontend)', () => {
  it('uses lastWateredAt when present: Tei summer threshold 4.9 days', () => {
    expect(computeWaterStatus({ species: 'Tei', lastWateredAt: daysAgo(3), healthStatus: 'GOOD' }, JULY)).toBe('ok');
    expect(computeWaterStatus({ species: 'Tei', lastWateredAt: daysAgo(6), healthStatus: 'GOOD' }, JULY)).toBe('thirsty');
    expect(computeWaterStatus({ species: 'Tei', lastWateredAt: daysAgo(11), healthStatus: 'GOOD' }, JULY)).toBe('urgent');
  });

  it('hardy Stejar lasts longer than thirsty Salcie', () => {
    expect(computeWaterStatus({ species: 'Stejar', lastWateredAt: daysAgo(6), healthStatus: 'GOOD' }, JULY)).toBe('ok');
    expect(computeWaterStatus({ species: 'Salcie', lastWateredAt: daysAgo(5), healthStatus: 'GOOD' }, JULY)).toBe('thirsty');
  });

  it('falls back to healthStatus when never watered', () => {
    expect(computeWaterStatus({ species: 'Tei', lastWateredAt: null, healthStatus: 'NEEDS_WATER' }, JULY)).toBe('thirsty');
    expect(computeWaterStatus({ species: 'Tei', lastWateredAt: null, healthStatus: 'ATTENTION_REQUIRED' }, JULY)).toBe('urgent');
    expect(computeWaterStatus({ species: 'Tei', lastWateredAt: null, healthStatus: 'CRITICAL' }, JULY)).toBe('urgent');
    expect(computeWaterStatus({ species: 'Tei', lastWateredAt: null, healthStatus: 'GOOD' }, JULY)).toBe('unknown');
  });

  it('has Romanian labels', () => {
    expect(waterStatusLabel('thirsty')).toBe('Însetat');
    expect(waterStatusLabel('urgent')).toBe('Udare urgentă');
  });
});

describe('computeImpact (frontend, fixed 12.5cm demo diameter)', () => {
  it('Stejar: 1.5 × 12.5 = 18.8 kg/yr', () => {
    expect(computeImpact('Stejar')).toEqual({ co2KgPerYear: 18.8, shadeM2: 4.4 });
  });
  it('unknown species uses coef 1.0', () => {
    expect(computeImpact('Magnolie')).toEqual({ co2KgPerYear: 12.5, shadeM2: 4.4 });
  });
});

describe('guardian ladder (frontend mirror)', () => {
  it('matches backend thresholds', () => {
    expect(guardianLevelFor(499).title).toBe('Prieten al Copacilor');
    expect(guardianLevelFor(500).title).toBe('Gardian Verde');
    expect(guardianLevelFor(2000).title).toBe('Super-Gardian');
    expect(nextLevelProgress(250)).toEqual({ nextTitle: 'Gardian Verde', progress: 0.5 });
    expect(nextLevelProgress(2500)).toEqual({ nextTitle: null, progress: 1 });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `../utils/treeCare` not found.

- [ ] **Step 3: Write `src/utils/treeCare.ts`**

```ts
// Frontend mirror of the backend calculators (deliberate duplication: the two
// packages share no code and use different species vocabularies — Romanian
// display names here, Prisma enums on the API).
import type { TreeItem } from '../types/tree';

export type WaterStatus = 'unknown' | 'ok' | 'thirsty' | 'urgent';

const THIRSTY_SPECIES = new Set(['Salcie', 'Plop', 'Mesteacăn']);
const HARDY_SPECIES = new Set(['Stejar', 'Pin', 'Molid', 'Brad']);
const DAY_MS = 86400000;

const speciesFactor = (s: string) => (THIRSTY_SPECIES.has(s) ? 0.8 : HARDY_SPECIES.has(s) ? 1.3 : 1.0);
const seasonFactor = (now: Date) => {
  const m = now.getUTCMonth();
  return m >= 5 && m <= 7 ? 0.7 : m === 11 || m <= 1 ? 1.5 : 1.0;
};

export function computeWaterStatus(
  tree: Pick<TreeItem, 'species' | 'lastWateredAt' | 'healthStatus'>,
  now: Date = new Date()
): WaterStatus {
  if (!tree.lastWateredAt) {
    if (tree.healthStatus === 'NEEDS_WATER') return 'thirsty';
    if (tree.healthStatus === 'ATTENTION_REQUIRED' || tree.healthStatus === 'CRITICAL') return 'urgent';
    return 'unknown';
  }
  const threshold = 7 * speciesFactor(tree.species) * seasonFactor(now);
  const days = (now.getTime() - new Date(tree.lastWateredAt).getTime()) / DAY_MS;
  if (days < threshold) return 'ok';
  if (days < 2 * threshold) return 'thirsty';
  return 'urgent';
}

export function waterStatusColor(status: WaterStatus): string {
  switch (status) {
    case 'ok': return '#4ade80';
    case 'thirsty': return '#fbbf24';
    case 'urgent': return '#f87171';
    default: return '#94a3b8';
  }
}

export function waterStatusLabel(status: WaterStatus): string {
  switch (status) {
    case 'ok': return 'Hidratat';
    case 'thirsty': return 'Însetat';
    case 'urgent': return 'Udare urgentă';
    default: return 'Necesită verificare';
  }
}

const SPECIES_COEF: Record<string, number> = {
  Stejar: 1.5, Arțar: 1.3, Castan: 1.3, Plop: 1.4, Tei: 1.2, Frasin: 1.2,
  Platan: 1.4, Salcie: 1.1, Mesteacăn: 1.0, Pin: 0.9, Molid: 0.9, Brad: 0.9,
};
const DEMO_DIAMETER_CM = 12.5;
const round1 = (n: number) => Math.round(n * 10) / 10;

export function computeImpact(species: string): { co2KgPerYear: number; shadeM2: number } {
  const coef = SPECIES_COEF[species] ?? 1.0;
  return { co2KgPerYear: round1(coef * DEMO_DIAMETER_CM), shadeM2: round1(DEMO_DIAMETER_CM * 0.35) };
}

const LEVELS = [
  { key: 'PRIETEN', title: 'Prieten al Copacilor', minScore: 0 },
  { key: 'GARDIAN', title: 'Gardian Verde', minScore: 500 },
  { key: 'SUPER_GARDIAN', title: 'Super-Gardian', minScore: 2000 },
];

export function guardianLevelFor(careScore: number) {
  return LEVELS.reduce((acc, l) => (careScore >= l.minScore ? l : acc), LEVELS[0]);
}

export function nextLevelProgress(careScore: number): { nextTitle: string | null; progress: number } {
  const current = guardianLevelFor(careScore);
  const next = LEVELS[LEVELS.findIndex(l => l.key === current.key) + 1] ?? null;
  if (!next) return { nextTitle: null, progress: 1 };
  return { nextTitle: next.title, progress: (careScore - current.minScore) / (next.minScore - current.minScore) };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/utils/treeCare.ts src/__tests__/treeCare.test.ts
git commit -m "feat(web): frontend water-status, impact and guardian calculators"
```

---

### Task 15: Map thirst colors + legend

**Files:**
- Modify: `web-dashboard/src/components/Pitch/Sector5TreeMap.tsx`

**Interfaces:**
- Consumes: `computeWaterStatus`, `waterStatusColor`, `waterStatusLabel` (Task 14).
- Produces: no new exports — visual change only. Markers colored by water status; legend rendered as a map overlay.

- [ ] **Step 1: Read the component**

Read `Sector5TreeMap.tsx` fully. Find where the marker icon/color is derived (currently keyed off `healthStatus` and/or adoption). Note the existing marker-label pattern from commit `a3b2357` („descriptive map-marker labels") — keep accessibility text intact.

- [ ] **Step 2: Color markers by water status**

For each tree marker, compute `const status = computeWaterStatus(tree);` and use `waterStatusColor(status)` as the marker fill/border color (keep the existing shape/size and adopted-tree affordances). Append `waterStatusLabel(status)` to the marker's accessible label/title (e.g. „Teiul Prosper — Udare urgentă").

- [ ] **Step 3: Add a legend overlay**

Inside the map container JSX (sibling to the map, absolutely positioned bottom-left), add:

```tsx
<div className="map-water-legend" role="note" aria-label="Legendă stare hidratare">
  {(['ok', 'thirsty', 'urgent', 'unknown'] as const).map(s => (
    <span key={s} className="legend-item">
      <span className="legend-dot" style={{ background: waterStatusColor(s) }} aria-hidden="true" />
      {waterStatusLabel(s)}
    </span>
  ))}
</div>
```

Style in the component's CSS (or `SelectedTreeSheet.css` sibling pattern — create `Sector5TreeMap.css` if none exists): dark surface (`var(--bg-surface)`), 1px `var(--border-color)` border, 8px radius, 11px font, dots 10px round. Must not overlap Leaflet attribution; hide on very small screens is NOT allowed (a11y) — stack vertically instead.

- [ ] **Step 4: Verify visually**

Run: `npm run dev`, open http://localhost:3000, check: markers show 4 distinct colors matching the legend; select `Rahova` (many never-watered seed trees) and confirm amber/red dominate; popup/sheet still opens.

- [ ] **Step 5: Test suite + commit**

Run: `npm test && npm run build` — expected PASS/clean.

```bash
git add src/components/Pitch/Sector5TreeMap.tsx src/components/Pitch/*.css
git commit -m "feat(web): thirst-colored map markers with legend"
```

---

### Task 16: Tree sheet care details (status, impact, message, guardian)

**Files:**
- Create: `web-dashboard/src/components/Pitch/TreeCareDetails.tsx`
- Create: `web-dashboard/src/components/Pitch/TreeCareDetails.css`
- Modify: `web-dashboard/src/components/Pitch/SelectedTreeSheet.tsx` (render `<TreeCareDetails tree={tree} />` in the sheet body, above the action buttons)

**Interfaces:**
- Consumes: `computeWaterStatus`, `waterStatusColor`, `waterStatusLabel`, `computeImpact` (Task 14); `TreeItem`.
- Produces: `TreeCareDetails: React.FC<{ tree: TreeItem }>` — also reused by Task 20's grove page.

- [ ] **Step 1: Write `TreeCareDetails.tsx`**

```tsx
import React from 'react';
import type { TreeItem } from '../../types/tree';
import { computeWaterStatus, waterStatusColor, waterStatusLabel, computeImpact } from '../../utils/treeCare';
import { Droplets, Leaf, Sun, MessageCircle } from 'lucide-react';
import './TreeCareDetails.css';

// Composes the „living profile" strip for a selected tree (spec §3.1–§3.3):
// water status, estimated impact, latest voice-of-the-tree message, guardian.
function latestMessage(tree: TreeItem): string | null {
  if (!tree.lastWateredAt) return null;
  const hours = (Date.now() - new Date(tree.lastWateredAt).getTime()) / 3600000;
  if (hours > 72) return null;
  const name = tree.nickname ? ` — ${tree.nickname}` : '';
  return `Mulțumesc pentru apă! Cresc frumos datorită ție.${name}`;
}

export const TreeCareDetails: React.FC<{ tree: TreeItem }> = ({ tree }) => {
  const status = computeWaterStatus(tree);
  const impact = computeImpact(tree.species);
  const message = latestMessage(tree);

  return (
    <div className="tree-care-details">
      <div className="care-row">
        <span
          className="water-status-badge"
          style={{ borderColor: waterStatusColor(status), color: waterStatusColor(status) }}
        >
          <Droplets size={13} aria-hidden="true" /> {waterStatusLabel(status)}
        </span>
        {tree.isAdopted && tree.adopterName && (
          <span className="guardian-line">Gardian: {tree.adopterName}</span>
        )}
      </div>

      <div className="impact-row" aria-label="Impact estimat">
        <span className="impact-chip"><Leaf size={13} aria-hidden="true" /> ~{impact.co2KgPerYear} kg CO₂/an</span>
        <span className="impact-chip"><Sun size={13} aria-hidden="true" /> ~{impact.shadeM2} m² umbră</span>
        <span className="impact-note">estimat</span>
      </div>

      {message && (
        <blockquote className="tree-message">
          <MessageCircle size={13} aria-hidden="true" />
          <span>{message}</span>
        </blockquote>
      )}

      {tree.lastWateredAt && (
        <div className="last-care" aria-label="Ultima îngrijire">
          <span className="last-care-label">Ultima îngrijire:</span>
          <span>
            {new Date(tree.lastWateredAt).toLocaleDateString('ro-RO')}
            {tree.lastWateredBy ? ` — ${tree.lastWateredBy}` : ''}
            {tree.lastWateredLiters ? `, ${tree.lastWateredLiters}L` : ''}
          </span>
          {tree.lastWateredPhotoProof && (
            <img className="last-care-photo" src={tree.lastWateredPhotoProof} alt="Dovadă foto a udării" />
          )}
        </div>
      )}
    </div>
  );
};
```

`.last-care` in the CSS: 12px muted row; `.last-care-photo` 44px square, radius 6px, `object-fit: cover`.

- [ ] **Step 2: Write `TreeCareDetails.css`**

Dark-theme styling with existing tokens: `.tree-care-details` gap 8px column flex; `.water-status-badge` pill with 1px colored border, transparent bg, 12px font; `.impact-chip` subtle `var(--bg-surface)` chip with `var(--border-color)` border; `.impact-note` 10px muted italic; `.tree-message` left-border accent (`var(--color-primary-500)` if defined in `src/index.css` — read the token names and use what exists), italic, 12px.

- [ ] **Step 3: Mount inside `SelectedTreeSheet.tsx`**

Read the file; render `<TreeCareDetails tree={tree} />` after the tree title/species block and before the action buttons. Keep the existing `useModalA11y` behavior untouched.

- [ ] **Step 4: Verify visually + commit**

Run: `npm run dev` — select a tree on the map: sheet shows status pill, two impact chips with „estimat", message for recently-watered trees. Then `npm test && npm run build`.

```bash
git add src/components/Pitch/TreeCareDetails.tsx src/components/Pitch/TreeCareDetails.css src/components/Pitch/SelectedTreeSheet.tsx
git commit -m "feat(web): living tree profile — status, impact, tree voice in sheet"
```

---

### Task 17: PresenterContext extension + guardian card + challenge widget

**Files:**
- Modify: `web-dashboard/src/context/PresenterContext.tsx`
- Create: `web-dashboard/src/components/Pitch/GuardianCard.tsx`
- Create: `web-dashboard/src/components/Pitch/ChallengeWidget.tsx`
- Create: `web-dashboard/src/components/Pitch/GuardianCard.css` (shared by both new components)
- Modify: `web-dashboard/src/pages/Dashboard/Dashboard.tsx` (render both in the citizen column, above `<DistrictLeaderboard …/>`)

**Interfaces:**
- Consumes: `guardianLevelFor`, `nextLevelProgress` (Task 14); `SEED_CHALLENGE`, `SEED_SPONSORS` (Task 13); `fetchChallengeApi` (Task 13); `usePresenter` (existing).
- Produces:
  - PresenterContext gains: `lifetimePoints: number` (init **780** so Elena starts as Gardian Verde), `spendPoints(amount: number): boolean` (false + no-op if `userPoints < amount`; true + decrements `userPoints` otherwise). `addPoints` now increments BOTH `userPoints` and `lifetimePoints`. Existing fields unchanged.
  - `GuardianCard: React.FC` (no props — reads context), `ChallengeWidget: React.FC<{ detailed?: boolean }>` — reused by Task 19.

- [ ] **Step 1: Extend `PresenterContext.tsx`**

Add to the interface and provider:

```tsx
  lifetimePoints: number;
  spendPoints: (amount: number) => boolean;
```

```tsx
  const [lifetimePoints, setLifetimePoints] = useState<number>(780);

  const addPoints = (amount: number) => {
    setUserPoints(prev => prev + amount);
    setLifetimePoints(prev => prev + amount);
  };

  const spendPoints = (amount: number): boolean => {
    if (userPoints < amount) return false;
    setUserPoints(prev => prev - amount);
    return true;
  };
```

Also change the initial `userPoints` from 350 to **780** so balance and lifetime start consistent. Pass both new values through the provider.

- [ ] **Step 2: Write `GuardianCard.tsx`**

```tsx
import React from 'react';
import { usePresenter } from '../../context/PresenterContext';
import { guardianLevelFor, nextLevelProgress } from '../../utils/treeCare';
import { Shield, Droplets, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import './GuardianCard.css';

// „My guardian card" (spec §3.4): level, progress to next, balance, privileges.
const PRIVILEGES: Record<string, string> = {
  PRIETEN: 'Următorul nivel: kit de udare gratuit + instruire',
  GARDIAN: 'Ai dreptul la kit de udare gratuit și instruire',
  SUPER_GARDIAN: 'Împrumut unelte + prioritate la adopția plantărilor noi',
};

export const GuardianCard: React.FC = () => {
  const { userName, userPoints, lifetimePoints, userWaterings } = usePresenter();
  const level = guardianLevelFor(lifetimePoints);
  const { nextTitle, progress } = nextLevelProgress(lifetimePoints);
  const NEXT_THRESHOLD: Record<string, number> = { PRIETEN: 500, GARDIAN: 2000 };
  const remaining = nextTitle ? NEXT_THRESHOLD[level.key] - lifetimePoints : 0;

  return (
    <section className="guardian-card" aria-label="Cardul meu de gardian">
      <header className="guardian-header">
        <Shield size={16} aria-hidden="true" />
        <div>
          <strong>{userName}</strong>
          <span className="guardian-level-title">{level.title}</span>
        </div>
      </header>

      <div
        className="guardian-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={nextTitle ? `Progres spre ${nextTitle}` : 'Nivel maxim atins'}
      >
        <div className="guardian-progress-fill" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
      <p className="guardian-next">
        {nextTitle ? `${lifetimePoints} puncte — încă ${remaining} până la ${nextTitle}` : 'Nivel maxim — mulțumim!'}
      </p>
      <p className="guardian-privilege">{PRIVILEGES[level.key]}</p>

      <footer className="guardian-stats">
        <span><Droplets size={13} aria-hidden="true" /> {userWaterings} udări</span>
        <span><Coins size={13} aria-hidden="true" /> {userPoints} EcoPuncte</span>
        <Link to="/rewards" className="guardian-rewards-link">Recompense →</Link>
      </footer>
    </section>
  );
};
```

- [ ] **Step 2b: Add `SectorImpactStrip`** (spec §7 „sector impact rollups") — append to `GuardianCard.tsx` (same file, shares the CSS):

```tsx
import type { TreeItem } from '../../types/tree';
import { computeImpact } from '../../utils/treeCare';

// Sector-level impact rollup, computed from the visible trees. Demo-grade.
export const SectorImpactStrip: React.FC<{ trees: TreeItem[] }> = ({ trees }) => {
  const totals = trees.reduce(
    (acc, t) => {
      const i = computeImpact(t.species);
      return { co2: acc.co2 + i.co2KgPerYear, shade: acc.shade + i.shadeM2 };
    },
    { co2: 0, shade: 0 }
  );
  return (
    <p className="sector-impact-strip" aria-label="Impact estimat al copacilor afișați">
      🌍 Copacii afișați absorb ~{Math.round(totals.co2)} kg CO₂/an și oferă ~{Math.round(totals.shade)} m² de umbră <em>(estimat)</em>
    </p>
  );
};
```

(Merge the imports with the ones already at the top of the file.) `.sector-impact-strip`: 12px muted strip on the card surface, 8px padding.

- [ ] **Step 3: Write `ChallengeWidget.tsx`**

```tsx
import React, { useEffect, useState } from 'react';
import { SEED_CHALLENGE, SEED_SPONSORS } from '../../data/gamificationSeedData';
import { fetchChallengeApi } from '../../services/gamificationApi';
import { Target } from 'lucide-react';
import './GuardianCard.css';

// Seasonal challenge (spec §3.6). Local-first: seed values render immediately,
// live API numbers replace them when reachable.
export const ChallengeWidget: React.FC<{ detailed?: boolean }> = ({ detailed = false }) => {
  const [total, setTotal] = useState<number>(187); // seed demo progress
  const [byNeighborhood, setByNeighborhood] = useState<Array<{ neighborhood: string; count: number }>>([
    { neighborhood: 'Cotroceni', count: 58 },
    { neighborhood: 'Sebastian', count: 47 },
    { neighborhood: 'Izvor', count: 36 },
    { neighborhood: 'Rahova', count: 26 },
    { neighborhood: 'Ferentari', count: 20 },
  ]);

  useEffect(() => {
    fetchChallengeApi().then(data => {
      if (data?.progress) {
        setTotal(data.progress.total);
        if (data.progress.byNeighborhood.length > 0) setByNeighborhood(data.progress.byNeighborhood);
      }
    });
  }, []);

  const goal = SEED_CHALLENGE.goal;
  const pct = Math.min(100, Math.round((total / goal) * 100));
  const sponsor = SEED_SPONSORS.find(s => s.id === SEED_CHALLENGE.sponsorId);

  return (
    <section className="challenge-widget" aria-label={`Provocarea: ${SEED_CHALLENGE.name}`}>
      <header className="challenge-header">
        <Target size={16} aria-hidden="true" />
        <strong>{SEED_CHALLENGE.name}</strong>
      </header>
      <div className="challenge-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="challenge-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="challenge-numbers">{total} / {goal} udări în Sectorul 5</p>
      {detailed && (
        <ol className="challenge-hoods">
          {byNeighborhood.map(h => (
            <li key={h.neighborhood}><span>{h.neighborhood}</span><span>{h.count}</span></li>
          ))}
        </ol>
      )}
      {sponsor && <p className="challenge-sponsor">susținut de {sponsor.name} <em>(sponsor demonstrativ)</em></p>}
    </section>
  );
};
```

- [ ] **Step 4: Write `GuardianCard.css`**

Both components: card surface `var(--bg-surface)`, `var(--border-color)` 1px border, 12px radius, 14px padding, column gap 8px. Progress tracks: 8px tall, radius 999, muted track, fill `linear-gradient` in the primary green ramp. `.challenge-hoods` two-column rows, muted numbers. `.challenge-sponsor` 11px muted, `em` normal-style. Respect `prefers-reduced-motion` (no animated width transitions when set).

- [ ] **Step 5: Mount on the Dashboard**

In `Dashboard.tsx`, import `GuardianCard`, `SectorImpactStrip` and `ChallengeWidget`, then change the citizen persona block to:

```tsx
              <>
                <GuardianCard />
                <ChallengeWidget />
                <SectorImpactStrip trees={trees} />
                <DistrictLeaderboard
                  stats={stats}
                  selectedNeighborhood={selectedNeighborhood}
                  onSelectNeighborhood={() => {}}
                />
                <CitizenAlertsFeed alerts={alerts} />
              </>
```

- [ ] **Step 6: Verify + commit**

Run: `npm run dev` — citizen view shows guardian card (Gardian Verde at 780) + challenge bar; water a tree → points AND progress feel live (points go up via `addPoints`). Then `npm test && npm run build`.

```bash
git add src/context/PresenterContext.tsx src/components/Pitch/GuardianCard.tsx src/components/Pitch/ChallengeWidget.tsx src/components/Pitch/GuardianCard.css src/pages/Dashboard/Dashboard.tsx
git commit -m "feat(web): guardian card + seasonal challenge widget on dashboard"
```

---

### Task 18: Rewards page

**Files:**
- Create: `web-dashboard/src/pages/Rewards/Rewards.tsx`
- Create: `web-dashboard/src/pages/Rewards/Rewards.css`
- Modify: `web-dashboard/src/App.tsx` (lazy route `/rewards`)
- Modify: `web-dashboard/src/components/Pitch/PitchHeader.tsx` (nav links to `/rewards`, `/community`, `/sponsors` — read the header first and follow its existing nav/link pattern; add all three links in this task so Tasks 19–20 don't touch the header again)

**Interfaces:**
- Consumes: `getRewards`, `getRedemptions`, `redeemReward` (Task 13), `usePresenter` with `spendPoints`/`userPoints` (Task 17), `SEED_SPONSORS` (Task 13), `useModalA11y` (existing hook — read it and use it the way `WateringModal` does).
- Produces: default-exported `Rewards` page component.

- [ ] **Step 1: Write `Rewards.tsx`**

```tsx
import React, { useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { usePresenter } from '../../context/PresenterContext';
import { getRewards, getRedemptions, redeemReward } from '../../services/gamificationStorage';
import { SEED_SPONSORS } from '../../data/gamificationSeedData';
import type { RewardItem, RedemptionItem } from '../../types/gamification';
import { Coins, Gift, Ticket } from 'lucide-react';
import './Rewards.css';

// Rewards catalog + redemption (spec §3.5). Local-first: catalog and voucher
// codes work fully offline; merchant vouchers are demo data.
const Rewards: React.FC = () => {
  const { userPoints, spendPoints } = usePresenter();
  const [rewards, setRewards] = useState<RewardItem[]>(getRewards());
  const [redemptions, setRedemptions] = useState<RedemptionItem[]>(getRedemptions());
  const [confirmTarget, setConfirmTarget] = useState<RewardItem | null>(null);
  const [issued, setIssued] = useState<RedemptionItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sponsorName = (id?: string | null) => SEED_SPONSORS.find(s => s.id === id)?.name;

  const handleRedeem = (reward: RewardItem) => {
    setError(null);
    if (userPoints < reward.costPoints) {
      setError('Nu ai destule EcoPuncte pentru această recompensă.');
      setConfirmTarget(null);
      return;
    }
    const result = redeemReward(reward.id, userPoints);
    if (!result.ok) {
      setError(result.error === 'out_of_stock'
        ? 'Stoc epuizat — încearcă altă recompensă.'
        : 'Nu s-a putut emite voucherul. Încearcă din nou.');
      setConfirmTarget(null);
      return;
    }
    spendPoints(reward.costPoints);
    setRewards(getRewards());
    setRedemptions(getRedemptions());
    setConfirmTarget(null);
    setIssued(result.redemption);
  };

  return (
    <div className="rewards-root">
      <PitchHeader />
      <main className="rewards-main">
        <header className="rewards-header">
          <h1><Gift size={20} aria-hidden="true" /> Recompense</h1>
          <p className="rewards-balance"><Coins size={15} aria-hidden="true" /> {userPoints} EcoPuncte disponibile</p>
          <p className="rewards-hint">Punctele cheltuite nu îți scad nivelul de gardian.</p>
        </header>

        {error && <p className="rewards-error" role="alert">{error}</p>}

        <div className="rewards-grid">
          {rewards.map(r => (
            <article key={r.id} className="reward-card">
              <h3>{r.title}</h3>
              <p className="reward-desc">{r.description}</p>
              <p className="reward-merchant">
                {r.merchantName}
                {sponsorName(r.sponsorId) && <span className="reward-sponsor"> · oferit de {sponsorName(r.sponsorId)} (demo)</span>}
              </p>
              <footer className="reward-footer">
                <span className="reward-cost"><Coins size={13} aria-hidden="true" /> {r.costPoints}</span>
                <span className="reward-stock">{r.stock > 0 ? `${r.stock} disponibile` : 'stoc epuizat'}</span>
                <button
                  className="btn-redeem"
                  disabled={r.stock <= 0 || userPoints < r.costPoints}
                  onClick={() => setConfirmTarget(r)}
                >
                  Revendică
                </button>
              </footer>
            </article>
          ))}
        </div>

        <section className="my-vouchers" aria-label="Voucherele mele">
          <h2><Ticket size={16} aria-hidden="true" /> Voucherele mele</h2>
          {redemptions.length === 0 ? (
            <p className="vouchers-empty">Niciun voucher încă — revendică prima ta recompensă!</p>
          ) : (
            <ul>
              {redemptions.map(v => (
                <li key={v.id}>
                  <code className="voucher-code">{v.code}</code>
                  <span>{v.rewardTitle}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {confirmTarget && (
        <div className="reward-modal-backdrop" role="dialog" aria-modal="true" aria-label="Confirmă revendicarea">
          <div className="reward-modal">
            <h3>Revendici „{confirmTarget.title}"?</h3>
            <p>Costă {confirmTarget.costPoints} EcoPuncte. Rămâi cu {userPoints - confirmTarget.costPoints}.</p>
            <div className="reward-modal-actions">
              <button className="btn-secondary" onClick={() => setConfirmTarget(null)}>Renunță</button>
              <button className="btn-redeem" onClick={() => handleRedeem(confirmTarget)}>Confirmă</button>
            </div>
          </div>
        </div>
      )}

      {issued && (
        <div className="reward-modal-backdrop" role="dialog" aria-modal="true" aria-label="Voucher emis">
          <div className="reward-modal">
            <h3>🎉 Voucher emis!</h3>
            <p>{issued.rewardTitle}</p>
            <code className="voucher-code voucher-code-big">{issued.code}</code>
            <p className="voucher-note">Arată codul la partener. Valabil 30 de zile (demo).</p>
            <div className="reward-modal-actions">
              <button className="btn-redeem" onClick={() => setIssued(null)}>Am notat codul</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;
```

Wire the two modals through `useModalA11y` exactly the way `LogWateringModal` does (read it first — focus trap + Escape close are required by the existing a11y conventions).

- [ ] **Step 2: Write `Rewards.css`**

Dark tokens throughout; `.rewards-grid` responsive `repeat(auto-fill, minmax(240px, 1fr))`; `.reward-card` surface card; `.btn-redeem` primary-green filled button, disabled state muted; `.reward-modal-backdrop` fixed overlay `rgba(0,0,0,.6)`; `.reward-modal` centered dark card (NO white background — the killed seam from the devlog); `.voucher-code-big` 20px letter-spaced. Mobile: single-column grid, modal max-width 92vw.

- [ ] **Step 3: Route + nav**

In `App.tsx`: `const RewardsPage = lazy(() => import('./pages/Rewards/Rewards'));` and `<Route path="/rewards" element={<RewardsPage />} />`. In `PitchHeader.tsx`: add nav links „Recompense" → `/rewards`, „Comunitate" → `/community`, „Sponsori" → `/sponsors` following the header's existing link markup.

- [ ] **Step 4: Verify + commit**

`npm run dev`: redeem a 300-point voucher → balance drops, code `VS5-…` shown, voucher listed, stock decremented; guardian level on Dashboard unchanged (lifetime intact). Insufficient balance → button disabled. `npm test && npm run build` — PASS/clean.

```bash
git add src/pages/Rewards src/App.tsx src/components/Pitch/PitchHeader.tsx
git commit -m "feat(web): rewards catalog + voucher redemption page"
```

---

### Task 19: Community page (leaderboards + challenge detail)

**Files:**
- Create: `web-dashboard/src/pages/Community/Community.tsx`
- Create: `web-dashboard/src/pages/Community/Community.css`
- Modify: `web-dashboard/src/App.tsx` (lazy route `/community`)

**Interfaces:**
- Consumes: `ChallengeWidget` (Task 17, rendered with `detailed`), `SEED_LEADER_USERS` (Task 13), `TreeService.getDistrictStats()` (existing), `DistrictStat` type.
- Produces: default-exported `Community` page.

- [ ] **Step 1: Write `Community.tsx`**

```tsx
import React, { useEffect, useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { ChallengeWidget } from '../../components/Pitch/ChallengeWidget';
import { TreeService } from '../../api/treeService';
import { SEED_LEADER_USERS } from '../../data/gamificationSeedData';
import type { DistrictStat } from '../../types/tree';
import { guardianLevelFor } from '../../utils/treeCare';
import { Trophy, Users } from 'lucide-react';
import './Community.css';

// Community hub (spec §3.6): neighborhood + top-guardian leaderboards around
// the active challenge. Local-first via TreeService and seed leaders.
const Community: React.FC = () => {
  const [stats, setStats] = useState<DistrictStat[]>([]);

  useEffect(() => {
    TreeService.getDistrictStats().then(setStats);
  }, []);

  const rankedHoods = [...stats].sort((a, b) => b.wateringsCount - a.wateringsCount);

  return (
    <div className="community-root">
      <PitchHeader />
      <main className="community-main">
        <header className="community-header">
          <h1><Users size={20} aria-hidden="true" /> Comunitate</h1>
          <p>Cartierele și gardienii care țin Sectorul 5 verde.</p>
        </header>

        <ChallengeWidget detailed />

        <div className="community-boards">
          <section className="board" aria-label="Clasament cartiere">
            <h2><Trophy size={16} aria-hidden="true" /> Cartiere — udări</h2>
            <ol>
              {rankedHoods.map((s, i) => (
                <li key={s.neighborhood} className={i === 0 ? 'board-first' : ''}>
                  <span className="board-rank">{i + 1}</span>
                  <span className="board-name">{s.neighborhood}</span>
                  <span className="board-value">{s.wateringsCount} udări</span>
                </li>
              ))}
            </ol>
            <p className="board-note">Cartierul câștigător al provocării primește un micro-grant pentru un proiect verde.</p>
          </section>

          <section className="board" aria-label="Top gardieni">
            <h2><Trophy size={16} aria-hidden="true" /> Top gardieni</h2>
            <ol>
              {SEED_LEADER_USERS.map((u, i) => (
                <li key={u.name} className={i === 0 ? 'board-first' : ''}>
                  <span className="board-rank">{i + 1}</span>
                  <span className="board-name">
                    {u.name}
                    <em className="board-level">{guardianLevelFor(u.points).title}</em>
                  </span>
                  <span className="board-value">{u.points} p</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Community;
```

- [ ] **Step 2: Write `Community.css`**

Dark tokens; `.community-boards` two-column grid collapsing to one under 768px; `.board` surface card; `.board-first` subtle gold-tinted left border; `.board-level` block 10px muted under the name; rows as flex with rank chip.

- [ ] **Step 3: Route**

In `App.tsx`: `const CommunityPage = lazy(() => import('./pages/Community/Community'));` and `<Route path="/community" element={<CommunityPage />} />`.

- [ ] **Step 4: Verify + commit**

`npm run dev` → `/community`: challenge with per-neighborhood detail, both boards populated offline. `npm test && npm run build` — PASS/clean.

```bash
git add src/pages/Community src/App.tsx
git commit -m "feat(web): community page — leaderboards + challenge detail"
```

---

### Task 20: Sponsors pages + ESG dashboard

**Files:**
- Create: `web-dashboard/src/pages/Sponsors/Sponsors.tsx` (public tier list)
- Create: `web-dashboard/src/pages/Sponsors/SponsorGrove.tsx` (public grove page, route `/sponsors/:slug`)
- Create: `web-dashboard/src/pages/Sponsors/SponsorDashboard.tsx` (ESG view, route `/sponsor-dashboard`)
- Create: `web-dashboard/src/pages/Sponsors/Sponsors.css` (shared)
- Modify: `web-dashboard/src/App.tsx` (three lazy routes)

**Interfaces:**
- Consumes: `SEED_SPONSORS`, `SEED_GROVES` (Task 13), `fetchSponsorsApi` (Task 13), `TreeService.getTrees()` (existing), `computeWaterStatus`, `computeImpact`, `waterStatusLabel` (Task 14), `TreeCareDetails` (Task 16), `useParams`/`Link` from react-router-dom.
- Produces: three default-exported pages. ESG aggregation helper `computeGroveStats(trees: TreeItem[]): { treeCount; aliveCount; survivalRate; healthyRate; wateringsCount; co2KgPerYear; shadeM2 }` exported from `SponsorDashboard.tsx` (pure — unit-testable).

**Tier labels (all three pages):** GOLD → „Sponsor principal de campanie", SILVER → „Sponsor de crâng", BRONZE → „Contributor la recompense". Every sponsor name is followed by „(sponsor demonstrativ)" at first mention per page.

- [ ] **Step 1: Write `Sponsors.tsx`** — header „Partenerii Sectorului Verde"; sponsors sorted GOLD→SILVER→BRONZE; each card: `logoSvg` via `<span dangerouslySetInnerHTML={{ __html: s.logoSvg }} aria-hidden="true" />` (safe: seed-only literal SVGs, never user input — add this as a code comment), name + tier label + description; GOLD/SILVER cards link to `/sponsors/:slug`; footer CTA card „Devino partener — contactează Primăria Sectorului 5". Try `fetchSponsorsApi()` on mount and replace seed list when it returns non-null.

- [ ] **Step 2: Write `SponsorGrove.tsx`** — resolve `slug` via `useParams` against seed sponsors (unknown slug → friendly „Sponsor negăsit" empty state with link back). Find their groves from `SEED_GROVES`, resolve `treeIds` against `TreeService.getTrees()` results. Render: sponsor header (logo, tier label, description), grove stats strip (tree count, alive %, total waterings from `wateringsCount`), then the tree list — each tree row shows nickname/species/neighborhood + `<TreeCareDetails tree={tree} />`. For GOLD sponsors additionally render a campaign block (spec §4.1): „Campania «Augustul Udărilor» — susținută de Solaris Energia" with a static „Zi de voluntariat pentru angajați — înscrieri prin HR" line and a link to `/community`. No map on this page (YAGNI — the main map already shows these trees).

- [ ] **Step 3: Write `SponsorDashboard.tsx`** — demo sponsor `<select>` (GOLD + SILVER sponsors only; label „Alege sponsorul (demo — fără autentificare)"). Compute stats from grove trees:

```tsx
export function computeGroveStats(trees: TreeItem[]) {
  const aliveCount = trees.filter(t => t.healthStatus !== 'DEAD').length;
  const healthyCount = trees.filter(t => t.healthStatus === 'EXCELLENT' || t.healthStatus === 'GOOD').length;
  const wateringsCount = trees.reduce((n, t) => n + (t.wateringsCount || 0), 0);
  let co2 = 0, shade = 0;
  for (const t of trees) {
    const i = computeImpact(t.species);
    co2 += i.co2KgPerYear; shade += i.shadeM2;
  }
  const pct = (n: number) => (trees.length ? Math.round((n / trees.length) * 100) : 0);
  return {
    treeCount: trees.length,
    aliveCount,
    survivalRate: pct(aliveCount),
    healthyRate: pct(healthyCount),
    wateringsCount,
    co2KgPerYear: Math.round(co2 * 10) / 10,
    shadeM2: Math.round(shade * 10) / 10,
  };
}
```

Render stat tiles (Rată de supraviețuire %, Copaci sănătoși %, Udări dovedite cu foto, CO₂ estimat/an, Umbră estimată) + a tree table (id, nickname, species, status via `waterStatusLabel`, waterings). CSV download button builds the spec §4.2 columns client-side:

```tsx
const downloadCsv = () => {
  const header = 'treeId,nickname,species,latitude,longitude,healthStatus,wateringsCount,lastWateredAt,photoProofCount,co2KgPerYear';
  const rows = trees.map(t => {
    const nickname = `"${(t.nickname ?? '').replace(/"/g, '""')}"`;
    return [t.id, nickname, t.species, t.latitude, t.longitude, t.healthStatus,
      t.wateringsCount || 0, t.lastWateredAt ?? '', t.lastWateredPhotoProof ? 1 : 0,
      computeImpact(t.species).co2KgPerYear].join(',');
  });
  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `esg-${selectedSlug}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
```

Label the button „Export CSV — dovezi pentru raportare (CSRD)". Include the pitch line as a subtitle: „Nu vindem certificate de plantare — vindem dovada supraviețuirii."

- [ ] **Step 4: Add a `computeGroveStats` unit test**

Append to `src/__tests__/treeCare.test.ts` (or a new `groveStats.test.ts`): 3 trees (one DEAD, one EXCELLENT with 5 waterings, one NEEDS_WATER with 2) → `treeCount: 3, aliveCount: 2, survivalRate: 67, healthyRate: 33, wateringsCount: 7`. Run `npm test` — PASS.

- [ ] **Step 5: Routes**

In `App.tsx` add lazy imports and `<Route path="/sponsors" …/>`, `<Route path="/sponsors/:slug" …/>`, `<Route path="/sponsor-dashboard" …/>`. Also add a link „Dashboard ESG (demo)" on the Sponsors page pointing to `/sponsor-dashboard`.

- [ ] **Step 6: Verify + commit**

`npm run dev`: `/sponsors` shows 3 tiers with logos; Solaris grove page lists 5 Izvor trees with care details; ESG dashboard shows plausible stats and downloads a well-formed CSV (open it: header + 5 rows). All offline. `npm test && npm run build` — PASS/clean.

```bash
git add src/pages/Sponsors src/App.tsx src/__tests__
git commit -m "feat(web): sponsor tier pages, grove page, ESG dashboard with CSV export"
```

---

### Task 21: Final verification + devlog + deploy

**Files:**
- Modify: `verde-sector-5/docs/DEVLOG-2026-08-06.md` (append pitch-walkthrough checklist)

**Interfaces:** consumes everything; produces the deployed demo.

- [ ] **Step 1: Full local verification**

```bash
cd verde-sector-5/cloudflare-backend && npm run typecheck && npx vitest run
cd ../web-dashboard && npm test && npm run build && npm run lint
```
Expected: all PASS/clean. Fix anything that fails before proceeding.

- [ ] **Step 2: Append the pitch walkthrough to the devlog**

Add a `## Pitch walkthrough — incentives & sponsors (2026-08-06)` section: numbered demo script (1. map thirst colors → 2. select thirsty tree, show status+impact → 3. water it, see tree message + points → 4. guardian card progress → 5. challenge widget → 6. /community boards → 7. /rewards redeem a voucher → 8. /sponsors tiers → 9. Solaris grove → 10. ESG dashboard + CSV download), plus the fallback note: everything works offline via seed data.

- [ ] **Step 3: Deploy (per devlog runbook)**

```bash
cd verde-sector-5/cloudflare-backend
npx wrangler d1 migrations apply verde-sector-5-db --remote
npx wrangler deploy
cd ../web-dashboard
npm run build
npx wrangler pages deploy dist --project-name verde-sector-5 --branch main --commit-dirty true
```
Then verify live: `curl -s https://verde-sector-5-api.batrinu.workers.dev/api/v1/sponsors | head -c 300` returns the 3 sponsors; open https://verde-sector-5.pages.dev in a fresh/incognito window (PWA cache!) and click through the walkthrough.

- [ ] **Step 4: Commit + push**

```bash
git add verde-sector-5/docs/DEVLOG-2026-08-06.md
git commit -m "docs: pitch walkthrough for incentives + sponsors"
git push origin main
```

---

## Execution notes

- Tasks 1–4 are independent of each other; Tasks 5→6→7 are sequential; Tasks 8–11 depend on 5–6 and are mutually independent; Task 12 needs 5. Frontend: 13→14 then 15–20 (17 before 18/19; 16 before 20). Task 21 last.
- Every task's implementer must read the files they modify before editing — the plan quotes anchors, not exact current line contents.





