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
