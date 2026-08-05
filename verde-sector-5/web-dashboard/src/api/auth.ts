import { apiClient } from './client';
import type { User } from '../types';

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const login = (data: any) => apiClient<AuthResponse>('/auth/login', { method: 'POST', data });
export const register = (data: any) => apiClient<AuthResponse>('/auth/register', { method: 'POST', data });
export const getMe = () => apiClient<{ user: User }>('/auth/me');
export const logout = () => apiClient<{ message: string }>('/auth/logout', { method: 'POST' });
export const refreshToken = (data: any) => apiClient<{ accessToken: string }>('/auth/refresh', { method: 'POST', data });
