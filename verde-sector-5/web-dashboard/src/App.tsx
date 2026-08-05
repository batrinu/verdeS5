import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PresenterProvider } from './context/PresenterContext';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import './App.css';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PresenterProvider>
          <Routes>
            {/* Main Interactive Pitch Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PresenterProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
