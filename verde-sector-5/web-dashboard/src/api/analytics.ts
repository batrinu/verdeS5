import { apiClient } from './client';

export const getDashboard = () => apiClient<any>('/analytics/dashboard');
export const exportReports = (params?: any) => apiClient<any>('/analytics/export', { params });
export const getActivity = () => apiClient<any>('/analytics/activity');
