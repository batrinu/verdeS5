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
