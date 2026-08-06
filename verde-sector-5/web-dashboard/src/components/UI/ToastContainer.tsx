import React, { useEffect, useState } from 'react';
import { Flame, Droplets, AlertTriangle, X, Sun, ShieldAlert } from 'lucide-react';
import type { CareAlertItem, Sector5Neighborhood } from '../../types/tree';

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
          icon: <Flame className="app-toast-icon app-toast-icon-heatwave" size={22} />,
          title: toast.title || '🔥 ALERTĂ CANICULĂ & SECETĂ',
          badgeClass: 'app-toast-badge-heatwave',
          themeClass: 'app-toast-heatwave',
        };
      case 'YOUNG_TREE_WATERING':
        return {
          icon: <Droplets className="app-toast-icon app-toast-icon-watering" size={22} />,
          title: toast.title || '💧 ÎNGRIJIRE ARBORI TINERI',
          badgeClass: 'app-toast-badge-watering',
          themeClass: 'app-toast-watering',
        };
      case 'STORM_RISK':
        return {
          icon: <ShieldAlert className="app-toast-icon app-toast-icon-storm" size={22} />,
          title: toast.title || '🌩️ AVERTIZARE FURTUNĂ',
          badgeClass: 'app-toast-badge-storm',
          themeClass: 'app-toast-storm',
        };
      case 'DROUGHT_WARNING':
        return {
          icon: <Sun className="app-toast-icon app-toast-icon-drought" size={22} />,
          title: toast.title || '☀️ AVERTIZARE SECETĂ MUNICIPALĂ',
          badgeClass: 'app-toast-badge-drought',
          themeClass: 'app-toast-drought',
        };
      default:
        return {
          icon: <AlertTriangle className="app-toast-icon app-toast-icon-default" size={22} />,
          title: toast.title || '⚠️ ALERTĂ MUNICIPALĂ SECTOR 5',
          badgeClass: 'app-toast-badge-default',
          themeClass: 'app-toast-default',
        };
    }
  };

  const config = getAlertConfig();

  return (
    <div
      className={`hig-material app-toast ${config.themeClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="alert"
      aria-live="polite"
    >
      <div className="app-toast-header">
        <div className="app-toast-icon-wrapper">{config.icon}</div>
        <div className="app-toast-title-group">
          <span className="app-toast-title">{config.title}</span>
          <span className={`app-toast-badge ${config.badgeClass}`}>
            📍 {toast.neighborhood}
          </span>
        </div>
        <button
          className="app-toast-close"
          onClick={() => onDismiss(toast.id)}
          aria-label="Închide alerta"
        >
          <X size={16} />
        </button>
      </div>

      <div className="app-toast-body">
        <p className="app-toast-message">{toast.message}</p>
      </div>

      {/* Auto-dismiss animated progress bar */}
      <div className="app-toast-progress-track">
        <div
          className={`app-toast-progress-bar ${isHovered ? 'paused' : ''}`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="app-toast-container" aria-label="Notificări în timp real">
      {toasts.map(toast => (
        <ToastItemComponent key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default ToastContainer;
