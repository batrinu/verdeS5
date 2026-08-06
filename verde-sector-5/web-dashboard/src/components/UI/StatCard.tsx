import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardTrendObject {
  value: number;
  label: string;
  isPositive: boolean;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon | React.ReactNode;
  description?: string;
  /** Either a health-state object ({ value, label, isPositive }) or a plain string label (with trendUp). */
  trend?: StatCardTrendObject | string;
  trendUp?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, trend, trendUp }) => {
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    if (typeof icon === 'function' || typeof icon === 'object') {
      const IconComp = icon as LucideIcon;
      return <IconComp size={18} />;
    }
    return null;
  };

  const renderTrend = () => {
    if (!trend) return null;
    const isPositive = typeof trend === 'string' ? !!trendUp : trend.isPositive;
    const label = typeof trend === 'string' ? trend : `${Math.abs(trend.value)}% ${trend.label}`;
    return (
      <div className={`app-stat-trend ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="hig-card app-stat">
      {icon && <div className="app-stat-icon">{renderIcon()}</div>}
      <div className="app-stat-value">{value}</div>
      <div className="app-stat-label hig-footnote hig-secondary">{title}</div>
      {description && <div className="app-stat-description hig-footnote hig-secondary">{description}</div>}
      {renderTrend()}
    </div>
  );
};

export default StatCard;
