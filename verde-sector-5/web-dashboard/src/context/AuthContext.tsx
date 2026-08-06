import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import * as authApi from '../api/auth';
import { setTokens, clearTokens, getToken } from '../api/client';
import { Navigate, useLocation } from 'react-router-dom';

const JWT_TOKEN_KEY = 'verde_s5_jwt_token';
const USER_KEY = 'verde_s5_user';

export const getAuthToken = (): string | null => {
  return localStorage.getItem(JWT_TOKEN_KEY) || getToken();
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  getAuthToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (err) {
        console.warn('Failed to parse saved user from localStorage', err);
      }
    }
    return null;
  });
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const activeToken = getAuthToken();
      if (!activeToken) {
        setLoading(false);
        return;
      }

      setToken(activeToken);

      try {
        const res = await authApi.getMe();
        if (res && res.user) {
          setUser(res.user);
          localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        }
      } catch (err) {
        console.warn('Failed to restore session via getMe:', err);
        clearTokens();
        localStorage.removeItem(JWT_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (data: any) => {
    const res = await authApi.login(data);
    const accessToken = res.accessToken || (res as any).token;
    if (accessToken) {
      localStorage.setItem(JWT_TOKEN_KEY, accessToken);
      setToken(accessToken);
    }
    setTokens(accessToken, res.refreshToken);
    if (res.user) {
      setUser(res.user);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }
  };

  const register = async (data: any) => {
    const res = await authApi.register(data);
    const accessToken = res.accessToken || (res as any).token;
    if (accessToken) {
      localStorage.setItem(JWT_TOKEN_KEY, accessToken);
      setToken(accessToken);
    }
    setTokens(accessToken, res.refreshToken);
    if (res.user) {
      setUser(res.user);
      localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      clearTokens();
      localStorage.removeItem(JWT_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    getAuthToken: () => getAuthToken(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ProtectedRoute = ({ children, requiredRole }: { children: ReactNode; requiredRole?: string[] }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-container">Se încarcă...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
