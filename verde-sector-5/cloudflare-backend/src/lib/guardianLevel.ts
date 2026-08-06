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
