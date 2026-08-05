export type TreeHealthStatus = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'NEEDS_WATER' | 'ATTENTION_REQUIRED' | 'CRITICAL' | 'DEAD';

export type Sector5Neighborhood = 'Cotroceni' | 'Rahova' | 'Ferentari' | 'Sebastian' | 'Izvor';

export interface TreeItem {
  id: string;
  code: string;
  species: string;
  latitude: number;
  longitude: number;
  neighborhood: Sector5Neighborhood;
  healthStatus: TreeHealthStatus;
  isAdopted: boolean;
  nickname?: string | null;
  adopterName?: string | null;
  lastWateredAt?: string | null;
  wateringsCount?: number;
  notes?: string | null;
}

export interface WateringLogEntry {
  id: string;
  treeId: string;
  userName: string;
  liters: number;
  loggedAt: string;
  earnedPoints: number;
}

export interface CareAlertItem {
  id: string;
  neighborhood: Sector5Neighborhood;
  alertType: 'HEATWAVE_DRYNESS' | 'YOUNG_TREE_WATERING' | 'STORM_RISK';
  message: string;
  status: 'ACTIVE' | 'RESOLVED';
  createdAt: string;
}

export interface DistrictStat {
  neighborhood: Sector5Neighborhood;
  totalTrees: number;
  adoptedTrees: number;
  wateringsCount: number;
  ecoPoints: number;
}
