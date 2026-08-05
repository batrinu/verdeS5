import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon | React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, trend }) => {
  const renderIcon = () => {
    if (React.isValidElement(icon)) return icon;
    if (typeof icon === 'function' || typeof icon === 'object') {
      const IconComp = icon as LucideIcon;
      return <IconComp className="stat-card-icon" size={20} />;
    }
    return null;
  };

  return (
    <div className="stat-card animate-slide-up">
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
        <div className="stat-card-icon-wrapper">
          {renderIcon()}
        </div>
      </div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        {description && <div className="text-muted" style={{ fontSize: '12px', marginTop: '4px' }}>{description}</div>}
        {trend && (
          <div className={`stat-card-trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            {trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(trend.value)}% {trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};
