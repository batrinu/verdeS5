import type { TreeItem, CareAlertItem, DistrictStat } from '../types/tree';
import { SEED_TREES } from '../data/treeSeedData';
import {
  getStoredTrees,
  saveStoredTrees,
  getStoredAlerts,
  saveStoredAlerts,
  getStoredStats,
  adoptTreeInStorage,
  waterTreeInStorage,
} from '../services/treeStorage';
import {
  fetchTreesFromApi,
  adoptTreeApi,
  waterTreeApi,
  fetchAlertsApi,
  createAlertApi,
  fetchDistrictStatsApi,
} from '../services/treeApi';

export * from '../data/treeSeedData';
export * from '../services/treeStorage';
export * from '../services/treeApi';

export const TreeService = {
  async getTrees(neighborhood?: string): Promise<TreeItem[]> {
    const apiTrees = await fetchTreesFromApi(neighborhood);
    if (apiTrees && apiTrees.length >= SEED_TREES.length) {
      saveStoredTrees(apiTrees);
      if (neighborhood && neighborhood !== 'ALL') {
        return apiTrees.filter(t => t.neighborhood.toLowerCase() === neighborhood.toLowerCase());
      }
      return apiTrees;
    }

    const storedTrees = getStoredTrees();
    if (neighborhood && neighborhood !== 'ALL') {
      return storedTrees.filter(t => t.neighborhood.toLowerCase() === neighborhood.toLowerCase());
    }
    return storedTrees;
  },

  async adoptTree(treeId: string, adopterName: string, nickname: string): Promise<TreeItem> {
    const updatedTree = adoptTreeInStorage(treeId, adopterName, nickname);
    // Fire and forget background API sync
    adoptTreeApi(treeId, adopterName, nickname).catch(() => {});
    return updatedTree;
  },

  async waterTree(
    treeId: string,
    liters: number,
    userName: string,
    photoProofUrl?: string,
    isPhotoVerified?: boolean
  ): Promise<TreeItem> {
    const updatedTree = waterTreeInStorage(treeId, liters, userName, photoProofUrl, isPhotoVerified);
    // Fire and forget background API sync
    waterTreeApi(treeId, liters, userName, photoProofUrl, isPhotoVerified).catch(() => {});
    return updatedTree;
  },

  async getAlerts(): Promise<CareAlertItem[]> {
    const apiAlerts = await fetchAlertsApi();
    if (apiAlerts) {
      saveStoredAlerts(apiAlerts);
      return apiAlerts;
    }
    return getStoredAlerts();
  },

  async createAlert(
    neighborhood: CareAlertItem['neighborhood'],
    alertType: CareAlertItem['alertType'],
    message: string
  ): Promise<CareAlertItem> {
    const newAlert: CareAlertItem = {
      id: `alert-${Date.now()}`,
      neighborhood,
      alertType,
      message,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    const currentAlerts = getStoredAlerts();
    saveStoredAlerts([newAlert, ...currentAlerts]);

    createAlertApi(neighborhood, alertType, message).catch(() => {});
    return newAlert;
  },

  async getDistrictStats(): Promise<DistrictStat[]> {
    const apiStats = await fetchDistrictStatsApi();
    if (apiStats && apiStats.length > 0) {
      return apiStats;
    }
    return getStoredStats();
  },
};
