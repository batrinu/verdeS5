import { API_BASE_URL } from '../config';

const TOKEN_KEY = 'verde_s5_token';
const REFRESH_TOKEN_KEY = 'verde_s5_refresh_token';

export const setTokens = (token: string, refreshToken?: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

interface RequestOptions extends RequestInit {
  data?: any;
  params?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  status: number;
  data: any;
  constructor(status: number, data: any) {
    super(data?.message || data?.error || 'API Error');
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { data, params, ...customConfig } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customConfig.headers,
  };

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    ...customConfig,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const executeRequest = async (currentConfig: RequestInit): Promise<Response> => {
    const response = await fetch(url, currentConfig);

    if (response.status === 401 && !url.includes('/auth/refresh')) {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        throw new ApiError(401, { message: 'Unauthorized' });
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (!refreshRes.ok) {
            clearTokens();
            throw new Error('Refresh failed');
          }

          const refreshData = await refreshRes.json();
          setTokens(refreshData.token, refreshData.refreshToken);
          isRefreshing = false;
          onRefreshed(refreshData.token);
        } catch (error) {
          isRefreshing = false;
          clearTokens();
          throw new ApiError(401, { message: 'Session expired' });
        }
      }

      // Wait for refresh
      const newToken = await new Promise<string>((resolve) => {
        subscribeTokenRefresh(resolve);
      });

      return fetch(url, {
        ...currentConfig,
        headers: {
          ...currentConfig.headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    }

    return response;
  };

  const response = await executeRequest(config);

  let responseData;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  }

  if (!response.ok) {
    throw new ApiError(response.status, responseData);
  }

  return responseData as T;
}
