import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PresenterProvider } from './context/PresenterContext';
import { LoadingSpinner } from './components/UI/LoadingSpinner';
import { Layout } from './components/Layout/Layout';

const DashboardPage = lazy(() => import('./pages/Dashboard/Dashboard'));
const ReportsPage = lazy(() => import('./pages/Reports/Reports'));
const CreateReportPage = lazy(() => import('./pages/Reports/CreateReport'));
const CampaignsPage = lazy(() => import('./pages/Campaigns/Campaigns'));
const RewardsPage = lazy(() => import('./pages/Rewards/Rewards'));
const CommunityPage = lazy(() => import('./pages/Community/Community'));
const SponsorsPage = lazy(() => import('./pages/Sponsors/Sponsors'));
const SponsorGrovePage = lazy(() => import('./pages/Sponsors/SponsorGrove'));
const SponsorDashboardPage = lazy(() => import('./pages/Sponsors/SponsorDashboard'));
const LoginPage = lazy(() => import('./pages/Login/Login'));
const RegisterPage = lazy(() => import('./pages/Register/Register'));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PresenterProvider>
          <Suspense fallback={<LoadingSpinner fullPage />}>
            <Routes>
              <Route element={<Layout />}>
                {/* Main Interactive Pitch Dashboard */}
                <Route path="/" element={<DashboardPage />} />

                {/* Lazy-loaded Feature Routes */}
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/reports/create" element={<CreateReportPage />} />
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/sponsors" element={<SponsorsPage />} />
                <Route path="/sponsors/:slug" element={<SponsorGrovePage />} />
                <Route path="/sponsor-dashboard" element={<SponsorDashboardPage />} />
              </Route>

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
