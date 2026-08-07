import type { TreeItem } from '../types/tree';
import { computeWaterStatus } from './treeCare';

export type QuickFilter = 'toti' | 'disponibili' | 'adoptati' | 'necesita-apa';

export interface TreeFilterCriteria {
  search: string;
  species: string; // 'toate' or an exact species name
  quick: QuickFilter;
}

export const DEFAULT_CRITERIA: TreeFilterCriteria = {
  search: '',
  species: 'toate',
  quick: 'toti',
};

export function filterTrees(trees: TreeItem[], c: TreeFilterCriteria): TreeItem[] {
  const q = c.search.trim().toLowerCase();
  return trees.filter((tree) => {
    const matchesSearch =
      !q ||
      tree.species.toLowerCase().includes(q) ||
      tree.neighborhood.toLowerCase().includes(q) ||
      tree.code.toLowerCase().includes(q) ||
      (tree.nickname?.toLowerCase().includes(q) ?? false);

    const matchesSpecies = c.species === 'toate' || tree.species === c.species;

    let matchesQuick = true;
    if (c.quick === 'disponibili') matchesQuick = !tree.isAdopted;
    else if (c.quick === 'adoptati') matchesQuick = tree.isAdopted;
    else if (c.quick === 'necesita-apa') {
      const s = computeWaterStatus(tree);
      matchesQuick = s === 'thirsty' || s === 'urgent';
    }

    return matchesSearch && matchesSpecies && matchesQuick;
  });
}

export function treeSpeciesOptions(trees: TreeItem[]): string[] {
  return Array.from(new Set(trees.map((t) => t.species))).sort((a, b) => a.localeCompare(b, 'ro'));
}

export interface TreeSummary {
  total: number;
  hydratedPct: number;
}

export function summarizeTrees(trees: TreeItem[]): TreeSummary {
  const total = trees.length;
  if (total === 0) return { total: 0, hydratedPct: 0 };
  const hydrated = trees.filter((t) => {
    const ws = computeWaterStatus(t);
    if (ws === 'ok') return true;
    // Demo/seed data often lacks lastWateredAt, yielding 'unknown'; treat healthy trees as hydrated to avoid misleading near-0% headlines.
    if (ws === 'unknown' && (t.healthStatus === 'EXCELLENT' || t.healthStatus === 'GOOD')) return true;
    return false;
  }).length;
  return { total, hydratedPct: Math.round((hydrated / total) * 100) };
}
