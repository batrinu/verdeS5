import React, { useState } from 'react';
import type { CareAlertItem, Sector5Neighborhood } from '../../types/tree';

interface CouncilAlertDispatcherProps {
  alerts: CareAlertItem[];
  onCreateAlert: (neighborhood: Sector5Neighborhood, alertType: any, message: string) => void;
}

export const CouncilAlertDispatcher: React.FC<CouncilAlertDispatcherProps> = ({ alerts, onCreateAlert }) => {
  const [targetDistrict, setTargetDistrict] = useState<Sector5Neighborhood>('Rahova');
  const [alertType, setAlertType] = useState<'HEATWAVE_DRYNESS' | 'YOUNG_TREE_WATERING' | 'STORM_RISK'>('HEATWAVE_DRYNESS');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onCreateAlert(targetDistrict, alertType, message);
    setMessage('');
  };

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface-elevated)',
    color: 'var(--color-primary-50)',
    fontSize: '13px',
    outline: 'none',
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-surface)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(248, 113, 113, 0.15)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#F87171', fontFamily: 'var(--font-family-heading)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📢 Dispecerat Alerte Consiliul Local Sector 5
        </h3>
        <span style={{ fontSize: '11px', backgroundColor: 'rgba(248, 113, 113, 0.1)', color: '#F87171', padding: '4px 8px', borderRadius: '12px', fontWeight: 700 }}>
          DISPECERAT MUNICIPAL
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              Cartier Țintă
            </label>
            <select
              value={targetDistrict}
              onChange={(e) => setTargetDistrict(e.target.value as Sector5Neighborhood)}
              style={selectStyle}
            >
              <option value="Cotroceni">Cotroceni</option>
              <option value="Rahova">Rahova</option>
              <option value="Ferentari">Ferentari</option>
              <option value="Sebastian">Sebastian</option>
              <option value="Izvor">Izvor</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '4px' }}>
              Tip Alertă
            </label>
            <select
              value={alertType}
              onChange={(e) => setAlertType(e.target.value as any)}
              style={selectStyle}
            >
              <option value="HEATWAVE_DRYNESS">🔥 Caniculă / Secetă</option>
              <option value="YOUNG_TREE_WATERING">🌱 Udare Arbori Tineri</option>
              <option value="STORM_RISK">⚠️ Risc Furtună / Risc Cădere</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesaj alertă către cetățeni (ex: Solicitare udat 15 tei tineri pe Calea Rahovei)..."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--color-primary-50)',
              fontSize: '13px',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#F87171',
            color: '#ffffff',
            border: 'none',
            padding: '10px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(248, 113, 113, 0.25)',
            transition: 'all 0.2s ease',
          }}
        >
          Transmite Alertă Cetățenilor 📢
        </button>
      </form>

      <div style={{ borderTop: '1px solid rgba(248, 113, 113, 0.15)', paddingTop: '12px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#F87171', marginBottom: '8px' }}>
          Alerte Active Transmise ({alerts.length}):
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
          {alerts.map((al) => (
            <div key={al.id} style={{ backgroundColor: 'rgba(248, 113, 113, 0.06)', border: '1px solid rgba(248, 113, 113, 0.12)', borderRadius: '8px', padding: '8px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, color: '#F87171' }}>
                <span>📍 {al.neighborhood}</span>
                <span>{new Date(al.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                {al.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
