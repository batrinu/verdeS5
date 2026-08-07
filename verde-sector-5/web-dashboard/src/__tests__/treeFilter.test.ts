import { describe, it, expect } from 'vitest';
import { filterTrees, treeSpeciesOptions, summarizeTrees, DEFAULT_CRITERIA } from '../utils/treeFilter';
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

describe('filterTrees', () => {
  const trees: TreeItem[] = [
    tree({ id: 'a', species: 'Stejar', code: 'S5-C-001', neighborhood: 'Cotroceni', isAdopted: false, healthStatus: 'EXCELLENT' }),
    tree({ id: 'b', species: 'Tei', code: 'S5-R-002', neighborhood: 'Rahova', isAdopted: true, healthStatus: 'NEEDS_WATER' }),
    tree({ id: 'c', species: 'Stejar', code: 'S5-F-003', neighborhood: 'Ferentari', isAdopted: false, nickname: 'Bunicul', healthStatus: 'CRITICAL' }),
  ];

  it('returns all trees for the default criteria', () => {
    expect(filterTrees(trees, DEFAULT_CRITERIA).map(t => t.id)).toEqual(['a', 'b', 'c']);
  });

  it('matches search across species, neighborhood, code and nickname (case-insensitive)', () => {
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, search: 'bunic' }).map(t => t.id)).toEqual(['c']);
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, search: 'RAHOVA' }).map(t => t.id)).toEqual(['b']);
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, search: 's5-f' }).map(t => t.id)).toEqual(['c']);
  });

  it('quick=disponibili keeps only non-adopted; quick=adoptati only adopted', () => {
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, quick: 'disponibili' }).map(t => t.id)).toEqual(['a', 'c']);
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, quick: 'adoptati' }).map(t => t.id)).toEqual(['b']);
  });

  it('quick=necesita-apa keeps trees whose live water status is thirsty or urgent', () => {
    // 'b' (NEEDS_WATER) and 'c' (CRITICAL) resolve to thirsty/urgent; 'a' (EXCELLENT) is ok.
    const ids = filterTrees(trees, { ...DEFAULT_CRITERIA, quick: 'necesita-apa' }).map(t => t.id);
    expect(ids).toContain('b');
    expect(ids).toContain('c');
    expect(ids).not.toContain('a');
  });

  it('species filter and search compose (AND)', () => {
    expect(filterTrees(trees, { ...DEFAULT_CRITERIA, species: 'Stejar', search: 'ferentari' }).map(t => t.id)).toEqual(['c']);
  });
});

describe('treeSpeciesOptions', () => {
  it('returns unique species sorted with Romanian locale', () => {
    const trees = [tree({ species: 'Tei' }), tree({ species: 'Arțar' }), tree({ species: 'Tei' })];
    expect(treeSpeciesOptions(trees)).toEqual(['Arțar', 'Tei']);
  });
});

describe('summarizeTrees', () => {
  it('reports total and hydrated percentage (rounded)', () => {
    const trees = [
      tree({ healthStatus: 'EXCELLENT' }), // ok
      tree({ healthStatus: 'GOOD' }),      // ok
      tree({ healthStatus: 'CRITICAL' }),  // urgent
    ];
    const s = summarizeTrees(trees);
    expect(s.total).toBe(3);
    expect(s.hydratedPct).toBe(67);
  });

  it('handles an empty list without dividing by zero', () => {
    expect(summarizeTrees([])).toEqual({ total: 0, hydratedPct: 0 });
  });
});
