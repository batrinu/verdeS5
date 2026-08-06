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

  return (
    <div className="hig-card app-alert-dispatcher">
      <div className="app-widget-header">
        <h3 className="hig-headline app-widget-title">
          📢 Dispecerat Alerte Consiliul Local Sector 5
        </h3>
        <span className="hig-tag app-tag-danger">
          DISPECERAT MUNICIPAL
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="app-form-grid-2">
          <div>
            <label className="app-form-label" htmlFor="alert-target-district">
              Cartier Țintă
            </label>
            <select
              id="alert-target-district"
              className="hig-field"
              value={targetDistrict}
              onChange={(e) => setTargetDistrict(e.target.value as Sector5Neighborhood)}
            >
              <option value="Cotroceni">Cotroceni</option>
              <option value="Rahova">Rahova</option>
              <option value="Ferentari">Ferentari</option>
              <option value="Sebastian">Sebastian</option>
              <option value="Izvor">Izvor</option>
            </select>
          </div>

          <div>
            <label className="app-form-label" htmlFor="alert-type">
              Tip Alertă
            </label>
            <select
              id="alert-type"
              className="hig-field"
              value={alertType}
              onChange={(e) => setAlertType(e.target.value as any)}
            >
              <option value="HEATWAVE_DRYNESS">🔥 Caniculă / Secetă</option>
              <option value="YOUNG_TREE_WATERING">🌱 Udare Arbori Tineri</option>
              <option value="STORM_RISK">⚠️ Risc Furtună / Risc Cădere</option>
            </select>
          </div>
        </div>

        <div className="hig-form-row">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Mesaj alertă către cetățeni (ex: Solicitare udat 15 tei tineri pe Calea Rahovei)..."
            className="hig-field"
          />
        </div>

        <button type="submit" className="hig-button destructive app-full-width">
          Transmite Alertă Cetățenilor 📢
        </button>
      </form>

      <div className="app-alert-dispatcher-sent">
        <div className="hig-section-header">Alerte Active Transmise ({alerts.length})</div>
        <ul className="hig-list app-alert-sent-list">
          {alerts.map((al) => (
            <li key={al.id} className="hig-list-item app-alert-sent-item">
              <div className="app-alert-sent-row">
                <span className="hig-footnote app-alert-label">📍 {al.neighborhood}</span>
                <span className="hig-caption hig-tertiary">{new Date(al.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="hig-footnote hig-secondary">{al.message}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
