import { apiClient } from './client';
import type { GreenSpace, PaginatedResponse } from '../types';

export const getGreenSpaces = (params?: any) => apiClient<PaginatedResponse<GreenSpace>>('/green-spaces', { params });
export const getGreenSpace = (id: string) => apiClient<{ greenSpace: GreenSpace }>(`/green-spaces/${id}`);
export const createGreenSpace = (data: Partial<GreenSpace>) => apiClient<{ greenSpace: GreenSpace }>('/green-spaces', { method: 'POST', data });
export const updateGreenSpace = (id: string, data: Partial<GreenSpace>) => apiClient<{ greenSpace: GreenSpace }>(`/green-spaces/${id}`, { method: 'PATCH', data });
export const deleteGreenSpace = (id: string) => apiClient<{ message: string }>(`/green-spaces/${id}`, { method: 'DELETE' });
