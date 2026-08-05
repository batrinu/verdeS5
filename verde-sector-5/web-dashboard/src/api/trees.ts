import { apiClient } from './client';
import type { Tree, PaginatedResponse } from '../types';

export const getTrees = (params?: any) => apiClient<PaginatedResponse<Tree>>('/trees', { params });
export const getTree = (id: string) => apiClient<{ tree: Tree }>(`/trees/${id}`);
export const createTree = (data: Partial<Tree>) => apiClient<{ tree: Tree }>('/trees', { method: 'POST', data });
export const updateTree = (id: string, data: Partial<Tree>) => apiClient<{ tree: Tree }>(`/trees/${id}`, { method: 'PATCH', data });
export const deleteTree = (id: string) => apiClient<{ message: string }>(`/trees/${id}`, { method: 'DELETE' });
export const adoptTree = (id: string) => apiClient<{ tree: Tree }>(`/trees/${id}/adopt`, { method: 'POST' });
export const releaseTree = (id: string) => apiClient<{ tree: Tree }>(`/trees/${id}/adopt`, { method: 'DELETE' });
export const getNearbyTrees = (lat: number, lon: number, radius?: number) => 
  apiClient<{ trees: Tree[] }>('/trees/nearby', { params: { lat, lon, radius } });
