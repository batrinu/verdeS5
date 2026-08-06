import React from 'react';
import type { CareAlertItem } from '../../types/tree';
import { Flame, Droplets, ShieldAlert, Sun, AlertTriangle, BellRing, CheckCircle2 } from 'lucide-react';

interface CitizenAlertsFeedProps {
  alerts: CareAlertItem[];
}

type AlertMeta = { Icon: React.ComponentType<{ size?: number; color?: string }>; label: string; color: string; tint: string };

const ALERT_META: Record<string, AlertMeta> = {
  HEATWAVE_DRYNESS: { Icon: Flame, label: 'Caniculă & Secetă', color: '#F87171', tint: 'rgba(248, 113, 113, 0.10)' },
  YOUNG_TREE_WATERING: { Icon: Droplets, label: 'Îngrijire Arbori Tineri', color: '#38BDF8', tint: 'rgba(56, 189, 248, 0.10)' },
  STORM_RISK: { Icon: ShieldAlert, label: 'Risc Furtună', color: '#FBBF24', tint: 'rgba(251, 191, 36, 0.10)' },
  DROUGHT_WARNING: { Icon: Sun, label: 'Avertizare Secetă', color: '#FBBF24', tint: 'rgba(251, 191, 36, 0.10)' },
};

const DEFAULT_META: AlertMeta = { Icon: AlertTriangle, label: 'Alertă Municipală', color: '#94A3B8', tint: 'rgba(148, 163, 184, 0.10)' };

export const CitizenAlertsFeed: React.FC<CitizenAlertsFeedProps> = ({ alerts }) => {
  const active = alerts.filter((a) => a.status === 'ACTIVE');

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        border: '1px solid var(--border-color)',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3
          style={{
            margin: 0,
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--color-primary-50)',
            fontFamily: 'var(--font-family-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <BellRing size={17} color="#FBBF24" /> Alerte Active în Sector 5
        </h3>
        <span
          style={{
            fontSize: '11px',
            backgroundColor: 'rgba(52, 216, 122, 0.1)',
            color: 'var(--color-primary-400)',
            padding: '4px 8px',
            borderRadius: '12px',
            fontWeight: 600,
          }}
        >
          {active.length} {active.length === 1 ? 'activă' : 'active'}
        </span>
      </div>

      {active.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <CheckCircle2 size={32} color="var(--color-primary-500)" />
          <div style={{ fontSize: '13px', lineHeight: 1.5 }}>
            Nicio alertă activă în Sectorul 5.
            <br />
            Toți arborii sunt îngrijiți. 🌳
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1, minHeight: 0 }}>
          {active.map((al) => {
            const meta = ALERT_META[al.alertType] || DEFAULT_META;
            const { Icon } = meta;
            return (
              <div
                key={al.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: meta.tint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={18} color={meta.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: meta.color }}>{meta.label}</span>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                      {new Date(al.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '1px' }}>
                    📍 {al.neighborhood}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--color-primary-50)', marginTop: '4px', lineHeight: 1.4 }}>
                    {al.message}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
