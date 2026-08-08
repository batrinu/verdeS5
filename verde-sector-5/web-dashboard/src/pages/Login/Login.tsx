import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePresenter } from '../../context/PresenterContext';
import type { PitchRole } from '../../context/PresenterContext';
import { Trees, ArrowRight, UserCheck } from 'lucide-react';

interface DemoUserPreset {
  id: string;
  name: string;
  roleTitle: string;
  pitchRole: PitchRole;
  email: string;
  neighborhood: string;
  icon: string;
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
  },
  {
    id: 'admin-1',
    name: 'Primăria Sector 5',
    roleTitle: 'Reprezentant Consiliu Local / ADP',
    pitchRole: 'COUNCIL_ADMIN',
    email: 'admin@sector5.ro',
    neighborhood: 'Sector 5 (Toate)',
    icon: '🏛️',
  },
  {
    id: 'worker-1',
    name: 'Ion Popescu',
    roleTitle: 'Lucrător Teren ADP Sector 5',
    pitchRole: 'COUNCIL_ADMIN',
    email: 'worker1@sector5.ro',
    neighborhood: 'Rahova',
    icon: '👷',
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
    <div className="app-auth">
      <div className="hig-card app-auth-card">
        <div className="app-auth-header">
          <div className="app-auth-logo">
            <Trees size={42} />
          </div>
          <h1>
            Verde în Sectorul 5
          </h1>
          <p className="hig-secondary">
            Selectează un profil demo pentru prezentarea Consiliului Local
          </p>
        </div>

        <form onSubmit={handleQuickLogin} className="app-auth-form">
          <div className="hig-form-row">
            <label htmlFor="user-type">
              👤 Selectează Profilul de Autentificare Demo
            </label>

            <select
              id="user-type"
              className="hig-field"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              {DEMO_USERS.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.icon} {user.name} — {user.roleTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Preset Preview Card */}
          <div className="app-auth-preview">
            <div className="app-auth-preview-top">
              <span className="app-auth-preview-name">
                {selectedPreset.icon} {selectedPreset.name}
              </span>
              <span className="hig-tag">
                {selectedPreset.pitchRole}
              </span>
            </div>
            <div className="hig-footnote hig-secondary">
              Email: <strong>{selectedPreset.email}</strong>
            </div>
            <div className="hig-footnote hig-secondary">
              📍 Cartier: <strong>{selectedPreset.neighborhood}</strong>
            </div>
          </div>

          <button
            type="submit"
            className="hig-button large"
          >
            Intră în Aplicație Demo <ArrowRight size={18} />
          </button>
        </form>

        <div className="app-auth-footer hig-footnote hig-tertiary">
          <UserCheck size={14} />
          Mod Pitch Demo activat pentru prezentarea la Consiliul Local
        </div>
      </div>
    </div>
  );
};

export default Login;
