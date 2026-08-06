import type { TreeItem, CareAlertItem, DistrictStat } from '../types/tree';
import { SEED_TREES, SEED_ALERTS, SEED_STATS } from '../data/treeSeedData';

const TREES_STORAGE_KEY = 'verde_s5_trees';
const ALERTS_STORAGE_KEY = 'verde_s5_alerts';
const STATS_STORAGE_KEY = 'verde_s5_stats';

function isLocalStorageAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

export function getStoredTrees(): TreeItem[] {
  if (!isLocalStorageAvailable()) return SEED_TREES;
  try {
    const raw = localStorage.getItem(TREES_STORAGE_KEY);
    if (!raw) {
      saveStoredTrees(SEED_TREES);
      return SEED_TREES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    saveStoredTrees(SEED_TREES);
    return SEED_TREES;
  } catch {
    return SEED_TREES;
  }
}

export function saveStoredTrees(trees: TreeItem[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(TREES_STORAGE_KEY, JSON.stringify(trees));
  } catch (err) {
    console.error('Failed to save trees to localStorage:', err);
  }
}

export function getStoredAlerts(): CareAlertItem[] {
  if (!isLocalStorageAvailable()) return SEED_ALERTS;
  try {
    const raw = localStorage.getItem(ALERTS_STORAGE_KEY);
    if (!raw) {
      saveStoredAlerts(SEED_ALERTS);
      return SEED_ALERTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    saveStoredAlerts(SEED_ALERTS);
    return SEED_ALERTS;
  } catch {
    return SEED_ALERTS;
  }
}

export function saveStoredAlerts(alerts: CareAlertItem[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
  } catch (err) {
    console.error('Failed to save alerts to localStorage:', err);
  }
}

export function getStoredStats(): DistrictStat[] {
  if (!isLocalStorageAvailable()) return SEED_STATS;
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) {
      saveStoredStats(SEED_STATS);
      return SEED_STATS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    saveStoredStats(SEED_STATS);
    return SEED_STATS;
  } catch {
    return SEED_STATS;
  }
}

export function saveStoredStats(stats: DistrictStat[]): void {
  if (!isLocalStorageAvailable()) return;
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save stats to localStorage:', err);
  }
}

export function adoptTreeInStorage(treeId: string, adopterName: string, nickname: string): TreeItem {
  const currentTrees = getStoredTrees();
  const currentStats = getStoredStats();

  const updatedTrees = currentTrees.map(t => {
    if (t.id === treeId) {
      return {
        ...t,
        isAdopted: true,
        adopterName: adopterName || 'Cetățean Sector 5',
        nickname: nickname || t.nickname || `Copacul lui ${adopterName || 'Cetățean'}`,
      };
    }
    return t;
  });

  const targetTree = updatedTrees.find(t => t.id === treeId);
  if (targetTree) {
    const updatedStats = currentStats.map(s =>
      s.neighborhood === targetTree.neighborhood
        ? { ...s, adoptedTrees: s.adoptedTrees + 1 }
        : s
    );
    saveStoredStats(updatedStats);
  }

  saveStoredTrees(updatedTrees);
  return targetTree || currentTrees.find(t => t.id === treeId) || currentTrees[0];
}

export function waterTreeInStorage(
  treeId: string,
  liters: number = 10,
  userName: string = 'Cetățean',
  photoProofUrl?: string,
  isPhotoVerified?: boolean
): TreeItem {
  const currentTrees = getStoredTrees();
  const currentStats = getStoredStats();

  const basePoints = liters * 5;
  const photoBonus = isPhotoVerified ? 50 : 0;
  const totalEarnedPoints = basePoints + photoBonus;

  const updatedTrees = currentTrees.map(t => {
    if (t.id === treeId) {
      return {
        ...t,
        healthStatus: 'EXCELLENT' as const,
        lastWateredAt: new Date().toISOString(),
        wateringsCount: (t.wateringsCount || 0) + 1,
        lastWateredBy: userName,
        lastWateredLiters: liters,
        lastWateredPhotoProof: photoProofUrl || null,
        lastWateredPhotoVerified: isPhotoVerified || false,
      };
    }
    return t;
  });

  const targetTree = updatedTrees.find(t => t.id === treeId);
  if (targetTree) {
    const updatedStats = currentStats.map(s =>
      s.neighborhood === targetTree.neighborhood
        ? {
            ...s,
            wateringsCount: s.wateringsCount + 1,
            ecoPoints: s.ecoPoints + totalEarnedPoints,
          }
        : s
    );
    saveStoredStats(updatedStats);
  }

  saveStoredTrees(updatedTrees);
  return targetTree || currentTrees.find(t => t.id === treeId) || currentTrees[0];
}
