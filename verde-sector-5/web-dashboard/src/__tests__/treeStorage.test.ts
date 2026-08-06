import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredTrees,
  saveStoredTrees,
  getStoredAlerts,
  saveStoredAlerts,
  getStoredStats,
  saveStoredStats,
  adoptTreeInStorage,
  waterTreeInStorage,
} from '../services/treeStorage';
import { SEED_TREES, SEED_ALERTS, SEED_STATS } from '../data/treeSeedData';
import type { TreeItem, CareAlertItem, DistrictStat } from '../types/tree';

describe('treeStorage service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getStoredTrees & saveStoredTrees', () => {
    it('returns SEED_TREES when localStorage is empty and seeds localStorage', () => {
      const trees = getStoredTrees();
      expect(trees).toEqual(SEED_TREES);
      expect(localStorage.getItem('verde_s5_trees')).not.toBeNull();
    });

    it('returns stored trees when valid data is in localStorage', () => {
      const mockTrees: TreeItem[] = [
        {
          id: 'custom-tree-1',
          code: 'S5-TEST-001',
          species: 'Stejar',
          latitude: 44.4,
          longitude: 26.0,
          neighborhood: 'Cotroceni',
          healthStatus: 'GOOD',
          isAdopted: false,
          nickname: null,
          adopterName: null,
          lastWateredAt: null,
          wateringsCount: 0,
          notes: 'Test tree',
        },
      ];
      saveStoredTrees(mockTrees);
      const retrieved = getStoredTrees();
      expect(retrieved).toHaveLength(1);
      expect(retrieved[0].id).toBe('custom-tree-1');
    });

    it('falls back to SEED_TREES if stored value is invalid JSON or empty array', () => {
      localStorage.setItem('verde_s5_trees', 'invalid json');
      expect(getStoredTrees()).toEqual(SEED_TREES);

      localStorage.setItem('verde_s5_trees', '[]');
      expect(getStoredTrees()).toEqual(SEED_TREES);
    });
  });

  describe('getStoredAlerts & saveStoredAlerts', () => {
    it('returns SEED_ALERTS when localStorage is empty', () => {
      const alerts = getStoredAlerts();
      expect(alerts).toEqual(SEED_ALERTS);
      expect(localStorage.getItem('verde_s5_alerts')).not.toBeNull();
    });

    it('saves and retrieves custom care alerts', () => {
      const customAlerts: CareAlertItem[] = [
        {
          id: 'test-alert-1',
          neighborhood: 'Cotroceni',
          alertType: 'HEATWAVE_DRYNESS',
          message: 'Udati copacii test',
          status: 'ACTIVE',
          createdAt: new Date().toISOString(),
        },
      ];
      saveStoredAlerts(customAlerts);
      const retrieved = getStoredAlerts();
      expect(retrieved).toEqual(customAlerts);
    });

    it('falls back to SEED_ALERTS on corrupted data', () => {
      localStorage.setItem('verde_s5_alerts', 'corrupted');
      expect(getStoredAlerts()).toEqual(SEED_ALERTS);
    });
  });

  describe('getStoredStats & saveStoredStats', () => {
    it('returns SEED_STATS when localStorage is empty', () => {
      const stats = getStoredStats();
      expect(stats).toEqual(SEED_STATS);
      expect(localStorage.getItem('verde_s5_stats')).not.toBeNull();
    });

    it('saves and retrieves district stats', () => {
      const customStats: DistrictStat[] = [
        { neighborhood: 'Cotroceni', totalTrees: 50, adoptedTrees: 20, wateringsCount: 100, ecoPoints: 5000 },
      ];
      saveStoredStats(customStats);
      expect(getStoredStats()).toEqual(customStats);
    });
  });

  describe('adoptTreeInStorage', () => {
    it('mutates adoption status, adopter name, and nickname correctly', () => {
      const targetTreeId = 'tree-cot-3'; // Unadopted tree in SEED_TREES
      const adopterName = 'Maria Popa';
      const nickname = 'Stejarul Mariei';

      const updatedTree = adoptTreeInStorage(targetTreeId, adopterName, nickname);

      expect(updatedTree.isAdopted).toBe(true);
      expect(updatedTree.adopterName).toBe(adopterName);
      expect(updatedTree.nickname).toBe(nickname);

      // Verify persistence in localStorage
      const storedTrees = getStoredTrees();
      const storedTarget = storedTrees.find((t) => t.id === targetTreeId);
      expect(storedTarget?.isAdopted).toBe(true);
      expect(storedTarget?.adopterName).toBe(adopterName);
      expect(storedTarget?.nickname).toBe(nickname);
    });

    it('uses fallback default adopter name and nickname when blank values are provided', () => {
      const targetTreeId = 'tree-cot-3';
      const updatedTree = adoptTreeInStorage(targetTreeId, '', '');

      expect(updatedTree.isAdopted).toBe(true);
      expect(updatedTree.adopterName).toBe('Cetățean Sector 5');
      expect(updatedTree.nickname).toBe('Copacul lui Cetățean');
    });

    it('increments district adoptedTrees count in stats', () => {
      const targetTreeId = 'tree-cot-3'; // Neighborhood: Cotroceni
      const initialCotroceniStats = getStoredStats().find((s) => s.neighborhood === 'Cotroceni');
      const initialAdoptedCount = initialCotroceniStats?.adoptedTrees ?? 0;

      adoptTreeInStorage(targetTreeId, 'Ion Ionescu', 'Teiul Ion');

      const updatedStats = getStoredStats();
      const updatedCotroceni = updatedStats.find((s) => s.neighborhood === 'Cotroceni');
      expect(updatedCotroceni?.adoptedTrees).toBe(initialAdoptedCount + 1);
    });
  });

  describe('waterTreeInStorage', () => {
    it('updates lastWateredAt, wateringsCount, lastWateredBy, lastWateredLiters', () => {
      const targetTreeId = 'tree-cot-3'; // initial wateringsCount: 2
      const liters = 15;
      const userName = 'Vasile Alexe';

      const updatedTree = waterTreeInStorage(targetTreeId, liters, userName);

      expect(updatedTree.healthStatus).toBe('EXCELLENT');
      expect(updatedTree.wateringsCount).toBe(3);
      expect(updatedTree.lastWateredBy).toBe(userName);
      expect(updatedTree.lastWateredLiters).toBe(15);
      expect(updatedTree.lastWateredPhotoProof).toBeNull();
      expect(updatedTree.lastWateredPhotoVerified).toBe(false);
      expect(new Date(updatedTree.lastWateredAt!).getTime()).not.toBeNaN();
    });

    it('handles photo proof and photo verification bonus points', () => {
      const targetTreeId = 'tree-cot-3';
      const liters = 20; // 20 * 5 = 100 base points
      const photoUrl = 'https://example.com/photo.jpg';

      const initialCotroceniStats = getStoredStats().find((s) => s.neighborhood === 'Cotroceni');
      const initialPoints = initialCotroceniStats?.ecoPoints ?? 0;
      const initialWaterings = initialCotroceniStats?.wateringsCount ?? 0;

      const updatedTree = waterTreeInStorage(targetTreeId, liters, 'Ana', photoUrl, true);

      expect(updatedTree.lastWateredPhotoProof).toBe(photoUrl);
      expect(updatedTree.lastWateredPhotoVerified).toBe(true);

      const updatedStats = getStoredStats();
      const cotroceniStat = updatedStats.find((s) => s.neighborhood === 'Cotroceni');

      // Base points: 20 * 5 = 100; Photo bonus: 50 => Total earned = 150
      expect(cotroceniStat?.wateringsCount).toBe(initialWaterings + 1);
      expect(cotroceniStat?.ecoPoints).toBe(initialPoints + 150);
    });
  });
});
