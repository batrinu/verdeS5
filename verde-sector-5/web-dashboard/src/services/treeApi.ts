import type { TreeItem, CareAlertItem, DistrictStat } from '../types/tree';
import { API_BASE_URL } from '../config';

export async function fetchTreesFromApi(neighborhood?: string): Promise<TreeItem[] | null> {
  try {
    const url = neighborhood && neighborhood !== 'ALL'
      ? `${API_BASE_URL}/trees?neighborhood=${encodeURIComponent(neighborhood)}`
      : `${API_BASE_URL}/trees`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.trees)) {
        return data.trees;
      }
    }
  } catch (err) {
    console.warn('API fetchTrees error:', err);
  }
  return null;
}

export async function adoptTreeApi(treeId: string, adopterName: string, nickname: string): Promise<TreeItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/trees/${encodeURIComponent(treeId)}/adopt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adopterName, nickname }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.tree || data;
    }
  } catch (err) {
    console.warn('API adoptTree error:', err);
  }
  return null;
}

export async function waterTreeApi(
  treeId: string,
  liters: number,
  userName: string,
  photoProofUrl?: string,
  isPhotoVerified?: boolean
): Promise<TreeItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/trees/${encodeURIComponent(treeId)}/water`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ liters, userName, photoProofUrl, isPhotoVerified }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.tree || data;
    }
  } catch (err) {
    console.warn('API waterTree error:', err);
  }
  return null;
}

export async function fetchAlertsApi(): Promise<CareAlertItem[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.alerts)) {
        return data.alerts;
      }
    }
  } catch (err) {
    console.warn('API fetchAlerts error:', err);
  }
  return null;
}

export async function createAlertApi(
  neighborhood: CareAlertItem['neighborhood'],
  alertType: CareAlertItem['alertType'],
  message: string
): Promise<CareAlertItem | null> {
  try {
    const newAlert: CareAlertItem = {
      id: `alert-${Date.now()}`,
      neighborhood,
      alertType,
      message,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
    const res = await fetch(`${API_BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAlert),
    });
    if (res.ok) {
      const data = await res.json();
      return data.alert || newAlert;
    }
  } catch (err) {
    console.warn('API createAlert error:', err);
  }
  return null;
}

export async function fetchDistrictStatsApi(): Promise<DistrictStat[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/neighborhoods/stats`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.stats) && data.stats.length > 0) {
        return data.stats;
      }
    }
  } catch (err) {
    console.warn('API fetchDistrictStats error:', err);
  }
  return null;
}
