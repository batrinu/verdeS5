import React from 'react';
import { usePresenter } from '../../context/PresenterContext';

export const PitchHeader: React.FC = () => {
  const {
    role,
    setRole,
    selectedNeighborhood,
    setSelectedNeighborhood,
    userPoints,
    userWaterings,
  } = usePresenter();

  return (
    <header style={{
      backgroundColor: '#0f172a',
      color: '#ffffff',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: '#22c55e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)',
        }}>
          🌿
        </div>
        <div>
          <div style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '-0.3px', background: 'linear-gradient(90deg, #4ade80, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Verde în Sectorul 5
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '-2px' }}>
            Platformă Comunitară & Registrul Spațiilor Verzi
          </div>
        </div>
      </div>

      {/* District Selector & Role Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* District Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Cartier:</span>
          <select
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            style={{
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <option value="ALL">Toate Cartierele (Sector 5)</option>
            <option value="Cotroceni">Cotroceni</option>
            <option value="Rahova">Rahova</option>
            <option value="Ferentari">Ferentari</option>
            <option value="Sebastian">Sebastian</option>
            <option value="Izvor">Izvor</option>
          </select>
        </div>

        {/* Presenter Role Toggle Bar */}
        <div style={{
          backgroundColor: '#1e293b',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid #334155',
          display: 'flex',
          gap: '4px',
        }}>
          <button
            onClick={() => setRole('CITIZEN')}
            style={{
              padding: '6px 14px',
              borderRadius: '7px',
              border: 'none',
              backgroundColor: role === 'CITIZEN' ? '#22c55e' : 'transparent',
              color: role === 'CITIZEN' ? '#ffffff' : '#94a3b8',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            👤 Mod Cetățean
          </button>

          <button
            onClick={() => setRole('COUNCIL_ADMIN')}
            style={{
              padding: '6px 14px',
              borderRadius: '7px',
              border: 'none',
              backgroundColor: role === 'COUNCIL_ADMIN' ? '#0284c7' : 'transparent',
              color: role === 'COUNCIL_ADMIN' ? '#ffffff' : '#94a3b8',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            🏛️ Mod Consiliu Local
          </button>
        </div>
      </div>

      {/* User Eco Ticker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          padding: '6px 12px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ fontSize: '14px' }}>🏆</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#4ade80' }}>
            {userPoints} EcoPuncte
          </span>
        </div>

        <div style={{
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '6px 12px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ fontSize: '14px' }}>💧</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8' }}>
            {userWaterings} Udări Logate
          </span>
        </div>
      </div>
    </header>
  );
};
