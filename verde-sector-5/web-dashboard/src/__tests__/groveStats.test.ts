import { describe, it, expect } from 'vitest';
import { computeGroveStats } from '../pages/Sponsors/SponsorDashboard';
import type { TreeItem } from '../types/tree';

const tree = (overrides: Partial<TreeItem>): TreeItem => ({
  id: 'tree-x',
  code: 'S5-X-000',
  species: 'Tei',
  latitude: 44.4,
  longitude: 26.1,
  neighborhood: 'Izvor',
  healthStatus: 'GOOD',
  isAdopted: false,
  wateringsCount: 0,
  ...overrides,
});

describe('computeGroveStats', () => {
  it('aggregates survival, health, and watering totals across a grove (3 trees: DEAD, EXCELLENT×5, NEEDS_WATER×2)', () => {
    const trees: TreeItem[] = [
      tree({ id: 't1', healthStatus: 'DEAD', wateringsCount: 0 }),
      tree({ id: 't2', healthStatus: 'EXCELLENT', wateringsCount: 5 }),
      tree({ id: 't3', healthStatus: 'NEEDS_WATER', wateringsCount: 2 }),
    ];

    const stats = computeGroveStats(trees);

    expect(stats.treeCount).toBe(3);
    expect(stats.aliveCount).toBe(2);
    expect(stats.survivalRate).toBe(67);
    expect(stats.healthyRate).toBe(33);
    expect(stats.wateringsCount).toBe(7);
  });

  it('handles an empty grove without dividing by zero', () => {
    const stats = computeGroveStats([]);
    expect(stats).toEqual({
      treeCount: 0,
      aliveCount: 0,
      survivalRate: 0,
      healthyRate: 0,
      wateringsCount: 0,
      co2KgPerYear: 0,
      shadeM2: 0,
    });
  });
});
