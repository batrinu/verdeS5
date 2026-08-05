import { apiClient } from './client';
import type { PlantingCampaign, PaginatedResponse } from '../types';

export const getCampaigns = (params?: any) => apiClient<PaginatedResponse<PlantingCampaign>>('/campaigns', { params });
export const getCampaign = (id: string) => apiClient<{ campaign: PlantingCampaign }>(`/campaigns/${id}`);
export const createCampaign = (data: Partial<PlantingCampaign>) => apiClient<{ campaign: PlantingCampaign }>('/campaigns', { method: 'POST', data });
export const joinCampaign = (id: string) => apiClient<{ campaign: PlantingCampaign }>(`/campaigns/${id}/join`, { method: 'POST' });
export const leaveCampaign = (id: string) => apiClient<{ campaign: PlantingCampaign }>(`/campaigns/${id}/join`, { method: 'DELETE' });
