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
