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
