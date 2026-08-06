import type { TreeItem, CareAlertItem, DistrictStat } from '../types/tree';
import { API_BASE_URL } from '../config';

// 45+ Realistic Pre-seeded Sector 5 Bucharest Trees for Pitch Demo
const SEED_TREES: TreeItem[] = [
  // Cotroceni
  { id: 'tree-cot-1', code: 'S5-COT-001', species: 'Tei (Linden)', latitude: 44.4332, longitude: 26.0715, neighborhood: 'Cotroceni', healthStatus: 'EXCELLENT', isAdopted: true, nickname: 'Teiul Dr. Lister', adopterName: 'Elena Popa', lastWateredAt: new Date(Date.now() - 3600000 * 12).toISOString(), wateringsCount: 14 },
  { id: 'tree-cot-2', code: 'S5-COT-002', species: 'Arțar (Maple)', latitude: 44.4345, longitude: 26.0730, neighborhood: 'Cotroceni', healthStatus: 'GOOD', isAdopted: true, nickname: 'Arțarul Elefterie', adopterName: 'Mihai Ionescu', lastWateredAt: new Date(Date.now() - 3600000 * 48).toISOString(), wateringsCount: 8 },
  { id: 'tree-cot-3', code: 'S5-COT-003', species: 'Stejar (Oak)', latitude: 44.4320, longitude: 26.0742, neighborhood: 'Cotroceni', healthStatus: 'NEEDS_WATER', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 2 },
  { id: 'tree-cot-4', code: 'S5-COT-004', species: 'Castan (Chestnut)', latitude: 44.4310, longitude: 26.0708, neighborhood: 'Cotroceni', healthStatus: 'GOOD', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 5 },
  { id: 'tree-cot-5', code: 'S5-COT-005', species: 'Platan (Plane tree)', latitude: 44.4339, longitude: 26.0755, neighborhood: 'Cotroceni', healthStatus: 'EXCELLENT', isAdopted: true, nickname: 'Platanul Cotroceni', adopterName: 'Andra Voinea', lastWateredAt: new Date().toISOString(), wateringsCount: 19 },

  // Rahova
  { id: 'tree-rah-1', code: 'S5-RAH-010', species: 'Tei (Linden)', latitude: 44.4175, longitude: 26.0680, neighborhood: 'Rahova', healthStatus: 'NEEDS_WATER', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 1 },
  { id: 'tree-rah-2', code: 'S5-RAH-011', species: 'Plop (Poplar)', latitude: 44.4190, longitude: 26.0652, neighborhood: 'Rahova', healthStatus: 'ATTENTION_REQUIRED', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 0 },
  { id: 'tree-rah-3', code: 'S5-RAH-012', species: 'Stejar (Oak)', latitude: 44.4162, longitude: 26.0701, neighborhood: 'Rahova', healthStatus: 'EXCELLENT', isAdopted: true, nickname: 'Stejarul Rahova', adopterName: 'Andrei Stanciu', lastWateredAt: new Date(Date.now() - 3600000 * 24).toISOString(), wateringsCount: 11 },
  { id: 'tree-rah-4', code: 'S5-RAH-013', species: 'Mesteacăn (Birch)', latitude: 44.4182, longitude: 26.0624, neighborhood: 'Rahova', healthStatus: 'NEEDS_WATER', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 3 },
  { id: 'tree-rah-5', code: 'S5-RAH-014', species: 'Tei (Linden)', latitude: 44.4201, longitude: 26.0691, neighborhood: 'Rahova', healthStatus: 'NEEDS_WATER', isAdopted: true, nickname: 'Teiuț Rahova', adopterName: 'Gabriel Marin', lastWateredAt: null, wateringsCount: 4 },

  // Ferentari
  { id: 'tree-fer-1', code: 'S5-FER-020', species: 'Salcie (Willow)', latitude: 44.4021, longitude: 26.0745, neighborhood: 'Ferentari', healthStatus: 'GOOD', isAdopted: true, nickname: 'Salcia Vadul Nou', adopterName: 'Cristian Dan', lastWateredAt: new Date(Date.now() - 3600000 * 30).toISOString(), wateringsCount: 9 },
  { id: 'tree-fer-2', code: 'S5-FER-021', species: 'Tei (Linden)', latitude: 44.4055, longitude: 26.0782, neighborhood: 'Ferentari', healthStatus: 'NEEDS_WATER', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 1 },
  { id: 'tree-fer-3', code: 'S5-FER-022', species: 'Arțar (Maple)', latitude: 44.4010, longitude: 26.0712, neighborhood: 'Ferentari', healthStatus: 'ATTENTION_REQUIRED', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 0 },
  { id: 'tree-fer-4', code: 'S5-FER-023', species: 'Frasin (Ash)', latitude: 44.4040, longitude: 26.0733, neighborhood: 'Ferentari', healthStatus: 'GOOD', isAdopted: true, nickname: 'Frasinul Verde', adopterName: 'Sorin Enache', lastWateredAt: new Date().toISOString(), wateringsCount: 7 },

  // Sebastian
  { id: 'tree-seb-1', code: 'S5-SEB-030', species: 'Castan (Chestnut)', latitude: 44.4267, longitude: 26.0812, neighborhood: 'Sebastian', healthStatus: 'EXCELLENT', isAdopted: true, nickname: 'Castanul Sebastian', adopterName: 'Ana Maria', lastWateredAt: new Date().toISOString(), wateringsCount: 22 },
  { id: 'tree-seb-2', code: 'S5-SEB-031', species: 'Stejar (Oak)', latitude: 44.4278, longitude: 26.0825, neighborhood: 'Sebastian', healthStatus: 'GOOD', isAdopted: true, nickname: 'Stejarul din Parc', adopterName: 'Victor Radu', lastWateredAt: new Date(Date.now() - 3600000 * 18).toISOString(), wateringsCount: 16 },
  { id: 'tree-seb-3', code: 'S5-SEB-032', species: 'Molid (Spruce)', latitude: 44.4250, longitude: 26.0840, neighborhood: 'Sebastian', healthStatus: 'NEEDS_WATER', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 2 },

  // Izvor
  { id: 'tree-izv-1', code: 'S5-IZV-040', species: 'Tei (Linden)', latitude: 44.4312, longitude: 26.0885, neighborhood: 'Izvor', healthStatus: 'EXCELLENT', isAdopted: true, nickname: 'Teiul de pe Splai', adopterName: 'Daria M.', lastWateredAt: new Date().toISOString(), wateringsCount: 18 },
  { id: 'tree-izv-2', code: 'S5-IZV-041', species: 'Arțar (Maple)', latitude: 44.4301, longitude: 26.0862, neighborhood: 'Izvor', healthStatus: 'GOOD', isAdopted: false, nickname: null, adopterName: null, lastWateredAt: null, wateringsCount: 4 },
];

const SEED_ALERTS: CareAlertItem[] = [
  { id: 'alert-1', neighborhood: 'Rahova', alertType: 'HEATWAVE_DRYNESS', message: 'Alerte Caniculă: 15 tei tineri pe Calea Rahovei necesită udare de urgență (15L/copac).', status: 'ACTIVE', createdAt: new Date().toISOString() },
  { id: 'alert-2', neighborhood: 'Ferentari', alertType: 'YOUNG_TREE_WATERING', message: 'Campanie de udat arborii proaspăt plantați pe Strada Vadul Nou.', status: 'ACTIVE', createdAt: new Date(Date.now() - 86400000).toISOString() },
];

const SEED_STATS: DistrictStat[] = [
  { neighborhood: 'Cotroceni', totalTrees: 145, adoptedTrees: 112, wateringsCount: 340, ecoPoints: 17000 },
  { neighborhood: 'Sebastian', totalTrees: 130, adoptedTrees: 85, wateringsCount: 260, ecoPoints: 13000 },
  { neighborhood: 'Rahova', totalTrees: 210, adoptedTrees: 95, wateringsCount: 220, ecoPoints: 11000 },
  { neighborhood: 'Ferentari', totalTrees: 180, adoptedTrees: 78, wateringsCount: 195, ecoPoints: 9750 },
  { neighborhood: 'Izvor', totalTrees: 95, adoptedTrees: 62, wateringsCount: 180, ecoPoints: 9000 },
];

// In-memory demo store for presentation fallback
let localTrees = [...SEED_TREES];
let localAlerts = [...SEED_ALERTS];
let localStats = [...SEED_STATS];

export const TreeService = {
  async getTrees(neighborhood?: string): Promise<TreeItem[]> {
    try {
      const url = neighborhood && neighborhood !== 'ALL'
        ? `${API_BASE_URL}/trees?neighborhood=${neighborhood}`
        : `${API_BASE_URL}/trees`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.trees && data.trees.length > 0) return data.trees;
      }
    } catch {
      // Fallback to local memory store during offline/demo mode
    }

    if (neighborhood && neighborhood !== 'ALL') {
      return localTrees.filter(t => t.neighborhood.toLowerCase() === neighborhood.toLowerCase());
    }
    return localTrees;
  },

  async adoptTree(treeId: string, adopterName: string, nickname: string): Promise<TreeItem> {
    try {
      const res = await fetch(`${API_BASE_URL}/trees/${treeId}/adopt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adopterName, nickname }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tree) return data.tree;
      }
    } catch {
      // Fallback update
    }

    localTrees = localTrees.map(t => {
      if (t.id === treeId) {
        return {
          ...t,
          isAdopted: true,
          adopterName: adopterName || 'Cetățean Sector 5',
          nickname: nickname || t.nickname || `Copacul lui ${adopterName}`,
        };
      }
      return t;
    });

    const target = localTrees.find(t => t.id === treeId);
    if (target) {
      // Increment neighborhood adopted tree stats
      localStats = localStats.map(s => s.neighborhood === target.neighborhood ? { ...s, adoptedTrees: s.adoptedTrees + 1 } : s);
    }
    return target!;
  },

  async waterTree(treeId: string, liters: number, userName: string): Promise<TreeItem> {
    try {
      const res = await fetch(`${API_BASE_URL}/trees/${treeId}/water`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liters, userName }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.tree) return data.tree;
      }
    } catch {
      // Fallback
    }

    localTrees = localTrees.map(t => {
      if (t.id === treeId) {
        return {
          ...t,
          healthStatus: 'EXCELLENT',
          lastWateredAt: new Date().toISOString(),
          wateringsCount: (t.wateringsCount || 0) + 1,
        };
      }
      return t;
    });

    const target = localTrees.find(t => t.id === treeId);
    if (target) {
      localStats = localStats.map(s => s.neighborhood === target.neighborhood ? {
        ...s,
        wateringsCount: s.wateringsCount + 1,
        ecoPoints: s.ecoPoints + 50,
      } : s);
    }
    return target!;
  },

  async getAlerts(): Promise<CareAlertItem[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/alerts`);
      if (res.ok) {
        const data = await res.json();
        if (data.alerts) return data.alerts;
      }
    } catch {}
    return localAlerts;
  },

  async createAlert(neighborhood: any, alertType: any, message: string): Promise<CareAlertItem> {
    const newAlert: CareAlertItem = {
      id: `alert-${Date.now()}`,
      neighborhood,
      alertType,
      message,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlert),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.alert) return data.alert;
      }
    } catch {}

    localAlerts = [newAlert, ...localAlerts];
    return newAlert;
  },

  async getDistrictStats(): Promise<DistrictStat[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/neighborhoods/stats`);
      if (res.ok) {
        const data = await res.json();
        if (data.stats && data.stats.length > 0) return data.stats;
      }
    } catch {}
    return localStats;
  },
};
