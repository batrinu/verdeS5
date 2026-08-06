import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PresenterProvider } from './context/PresenterContext';
import { LoadingSpinner } from './components/UI/LoadingSpinner';
import './App.css';

const DashboardPage = lazy(() => import('./pages/Dashboard/Dashboard'));
const MapPage = lazy(() => import('./pages/Map/Map'));
const ReportsPage = lazy(() => import('./pages/Reports/Reports'));
const CampaignsPage = lazy(() => import('./pages/Campaigns/Campaigns'));
const TreesPage = lazy(() => import('./pages/Trees/Trees'));
const LoginPage = lazy(() => import('./pages/Login/Login'));
const RegisterPage = lazy(() => import('./pages/Register/Register'));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PresenterProvider>
          <Suspense fallback={<LoadingSpinner fullPage />}>
            <Routes>
              {/* Main Interactive Pitch Dashboard */}
              <Route path="/" element={<DashboardPage />} />

              {/* Lazy-loaded Feature Routes */}
              <Route path="/map" element={<MapPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/campaigns" element={<CampaignsPage />} />
              <Route path="/trees" element={<TreesPage />} />

              {/* Public Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </PresenterProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
