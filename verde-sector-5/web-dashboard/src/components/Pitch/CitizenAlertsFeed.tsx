import React from 'react';
import type { CareAlertItem } from '../../types/tree';
import { Flame, Droplets, ShieldAlert, Sun, AlertTriangle, BellRing, CheckCircle2 } from 'lucide-react';

interface CitizenAlertsFeedProps {
  alerts: CareAlertItem[];
}

type AlertMeta = { Icon: React.ComponentType<{ size?: number; className?: string }>; label: string; tone: 'red' | 'blue' | 'orange' | 'gray' };

const ALERT_META: Record<string, AlertMeta> = {
  HEATWAVE_DRYNESS: { Icon: Flame, label: 'Caniculă & Secetă', tone: 'red' },
  YOUNG_TREE_WATERING: { Icon: Droplets, label: 'Îngrijire Arbori Tineri', tone: 'blue' },
  STORM_RISK: { Icon: ShieldAlert, label: 'Risc Furtună', tone: 'orange' },
  DROUGHT_WARNING: { Icon: Sun, label: 'Avertizare Secetă', tone: 'orange' },
};

const DEFAULT_META: AlertMeta = { Icon: AlertTriangle, label: 'Alertă Municipală', tone: 'gray' };

export const CitizenAlertsFeed: React.FC<CitizenAlertsFeedProps> = ({ alerts }) => {
  const active = alerts.filter((a) => a.status === 'ACTIVE');

  return (
    <div className="hig-card app-alerts-feed">
      <div className="app-widget-header">
        <h3 className="hig-headline app-widget-title">
          <BellRing size={17} /> Alerte Active în Sector 5
        </h3>
        <span className="hig-tag">
          {active.length} {active.length === 1 ? 'activă' : 'active'}
        </span>
      </div>

      {active.length === 0 ? (
        <div className="hig-empty">
          <CheckCircle2 size={32} className="hig-empty-icon" />
          <div className="hig-footnote">
            Nicio alertă activă în Sectorul 5.
            <br />
            Toți arborii sunt îngrijiți. 🌳
          </div>
        </div>
      ) : (
        <ul className="hig-list app-alerts-list">
          {active.map((al) => {
            const meta = ALERT_META[al.alertType] || DEFAULT_META;
            const { Icon } = meta;
            return (
              <li key={al.id} className="hig-list-item app-alert-item">
                <span className={`app-severity-dot app-severity-${meta.tone}`} aria-hidden="true" />
                <Icon size={16} className="app-alert-icon" />
                <div className="app-alert-content">
                  <div className="app-alert-row">
                    <span className="hig-subheadline app-alert-label">{meta.label}</span>
                    <span className="hig-caption hig-tertiary">
                      {new Date(al.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="hig-footnote hig-secondary">📍 {al.neighborhood}</div>
                  <div className="hig-footnote">{al.message}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
