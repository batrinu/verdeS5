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
