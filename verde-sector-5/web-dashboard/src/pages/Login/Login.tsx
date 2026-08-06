import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePresenter } from '../../context/PresenterContext';
import type { PitchRole } from '../../context/PresenterContext';
import { Trees, ArrowRight, UserCheck } from 'lucide-react';
import './Login.css';

interface DemoUserPreset {
  id: string;
  name: string;
  roleTitle: string;
  pitchRole: PitchRole;
  email: string;
  neighborhood: string;
  icon: string;
  badgeColor: string;
}

const DEMO_USERS: DemoUserPreset[] = [
  {
    id: 'citizen-1',
    name: 'Elena Popa',
    roleTitle: 'Cetățean Adoptator (Cotroceni)',
    pitchRole: 'CITIZEN',
    email: 'elena.popa@gmail.com',
    neighborhood: 'Cotroceni',
    icon: '🌱',
    badgeColor: '#16a34a',
  },
  {
    id: 'admin-1',
    name: 'Primăria Sector 5',
    roleTitle: 'Reprezentant Consiliu Local / ADP',
    pitchRole: 'COUNCIL_ADMIN',
    email: 'admin@sector5.ro',
    neighborhood: 'Sector 5 (Toate)',
    icon: '🏛️',
    badgeColor: '#0284c7',
  },
  {
    id: 'worker-1',
    name: 'Ion Popescu',
    roleTitle: 'Lucrător Teren ADP Sector 5',
    pitchRole: 'COUNCIL_ADMIN',
    email: 'worker1@sector5.ro',
    neighborhood: 'Rahova',
    icon: '👷',
    badgeColor: '#eab308',
  },
];

export const Login: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>(DEMO_USERS[0].id);
  const { setRole, setUserName } = usePresenter();
  const navigate = useNavigate();

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const preset = DEMO_USERS.find(u => u.id === selectedUserId) || DEMO_USERS[0];
    
    // Configure PresenterContext for quick pitch demo
    setRole(preset.pitchRole);
    setUserName(preset.name);

    // Store simple mock session
    localStorage.setItem('demo_user', JSON.stringify(preset));
    localStorage.setItem('access_token', 'demo-token');

    navigate('/');
  };

  const selectedPreset = DEMO_USERS.find(u => u.id === selectedUserId) || DEMO_USERS[0];

  return (
    <div className="auth-page">
      <div className="auth-card glass-card fade-in" style={{ maxWidth: '460px', width: '100%', padding: '32px' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="auth-logo" style={{ margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trees className="logo-icon text-accent" size={42} color="#22c55e" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0', color: '#0f172a' }}>
            Verde în Sectorul 5
          </h1>
          <p className="auth-subtitle" style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Selectează un profil demo pentru prezentarea Consiliului Local
          </p>
        </div>

        <form onSubmit={handleQuickLogin} className="auth-form">
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label htmlFor="user-type" style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              👤 Selectează Profilul de Autentificare Demo
            </label>
            
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <select
                id="user-type"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #22c55e',
                  backgroundColor: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#0f172a',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)',
                }}
              >
                {DEMO_USERS.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.icon} {user.name} — {user.roleTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Preset Preview Card */}
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#14532d' }}>
                {selectedPreset.icon} {selectedPreset.name}
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                backgroundColor: selectedPreset.badgeColor,
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '10px',
                textTransform: 'uppercase',
              }}>
                {selectedPreset.pitchRole}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#166534', marginTop: '2px' }}>
              Email: <strong>{selectedPreset.email}</strong>
            </div>
            <div style={{ fontSize: '12px', color: '#15803d', marginTop: '2px' }}>
              📍 Cartier: <strong>{selectedPreset.neighborhood}</strong>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            style={{
              width: '100%',
              backgroundColor: '#16a34a',
              color: '#ffffff',
              border: 'none',
              padding: '14px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)',
            }}
          >
            Intră în Aplicație Demo <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
          <UserCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
          Mod Pitch Demo activat pentru prezentarea la Consiliul Local
        </div>
      </div>
    </div>
  );
};

export default Login;
