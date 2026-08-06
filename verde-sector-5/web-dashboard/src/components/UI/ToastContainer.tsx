import React, { useEffect, useState } from 'react';
import { Flame, Droplets, AlertTriangle, X, Sun, ShieldAlert } from 'lucide-react';
import type { CareAlertItem, Sector5Neighborhood } from '../../types/tree';
import './ToastContainer.css';

export type ToastAlert = Omit<Partial<CareAlertItem>, 'neighborhood' | 'alertType'> & {
  id: string;
  neighborhood: Sector5Neighborhood | string;
  alertType?: 'HEATWAVE_DRYNESS' | 'YOUNG_TREE_WATERING' | 'STORM_RISK' | 'DROUGHT_WARNING' | string;
  message: string;
  title?: string;
  autoDismissMs?: number;
};

interface ToastContainerProps {
  toasts: ToastAlert[];
  onDismiss: (id: string) => void;
}

const ToastItemComponent: React.FC<{
  toast: ToastAlert;
  onDismiss: (id: string) => void;
}> = ({ toast, onDismiss }) => {
  const duration = toast.autoDismissMs ?? 5000;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast.id, duration, isHovered, onDismiss]);

  const getAlertConfig = () => {
    switch (toast.alertType) {
      case 'HEATWAVE_DRYNESS':
        return {
          icon: <Flame className="toast-icon toast-icon-heatwave" size={22} />,
          title: toast.title || '🔥 ALERTĂ CANICULĂ & SECETĂ',
          badgeClass: 'badge-heatwave',
          themeClass: 'toast-theme-heatwave',
        };
      case 'YOUNG_TREE_WATERING':
        return {
          icon: <Droplets className="toast-icon toast-icon-watering" size={22} />,
          title: toast.title || '💧 ÎNGRIJIRE ARBORI TINERI',
          badgeClass: 'badge-watering',
          themeClass: 'toast-theme-watering',
        };
      case 'STORM_RISK':
        return {
          icon: <ShieldAlert className="toast-icon toast-icon-storm" size={22} />,
          title: toast.title || '🌩️ AVERTIZARE FURTUNĂ',
          badgeClass: 'badge-storm',
          themeClass: 'toast-theme-storm',
        };
      case 'DROUGHT_WARNING':
        return {
          icon: <Sun className="toast-icon toast-icon-drought" size={22} />,
          title: toast.title || '☀️ AVERTIZARE SECETĂ MUNICIPALĂ',
          badgeClass: 'badge-drought',
          themeClass: 'toast-theme-drought',
        };
      default:
        return {
          icon: <AlertTriangle className="toast-icon toast-icon-default" size={22} />,
          title: toast.title || '⚠️ ALERTĂ MUNICIPALĂ SECTOR 5',
          badgeClass: 'badge-default',
          themeClass: 'toast-theme-default',
        };
    }
  };

  const config = getAlertConfig();

  return (
    <div
      className={`toast-banner ${config.themeClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-header">
        <div className="toast-icon-wrapper">{config.icon}</div>
        <div className="toast-title-badge-group">
          <span className="toast-title">{config.title}</span>
          <span className={`toast-neighborhood-badge ${config.badgeClass}`}>
            📍 {toast.neighborhood}
          </span>
        </div>
        <button
          className="toast-close-btn"
          onClick={() => onDismiss(toast.id)}
          aria-label="Închide alerta"
        >
          <X size={16} />
        </button>
      </div>

      <div className="toast-body">
        <p className="toast-message">{toast.message}</p>
      </div>

      {/* Auto-dismiss animated progress bar */}
      <div className="toast-progress-bar-container">
        <div
          className={`toast-progress-bar ${isHovered ? 'paused' : ''}`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container-wrapper" aria-label="Notificări în timp real">
      {toasts.map(toast => (
        <ToastItemComponent key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default ToastContainer;
