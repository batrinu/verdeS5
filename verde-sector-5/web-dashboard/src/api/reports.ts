import { apiClient } from './client';
import type { Report, PaginatedResponse } from '../types';

export const getReports = (params?: any) => apiClient<PaginatedResponse<Report>>('/reports', { params });
export const getReport = (id: string) => apiClient<{ report: Report }>(`/reports/${id}`);
export const createReport = (data: Partial<Report>) => apiClient<{ report: Report }>('/reports', { method: 'POST', data });
export const updateReport = (id: string, data: Partial<Report>) => apiClient<{ report: Report }>(`/reports/${id}`, { method: 'PATCH', data });
export const deleteReport = (id: string) => apiClient<{ message: string }>(`/reports/${id}`, { method: 'DELETE' });
export const assignReport = (id: string, assignedToId: string) => apiClient<{ report: Report }>(`/reports/${id}/assign`, { method: 'POST', data: { assignedToId } });
