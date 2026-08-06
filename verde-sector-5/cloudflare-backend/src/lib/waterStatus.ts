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
