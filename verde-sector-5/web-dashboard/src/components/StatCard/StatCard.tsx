import React from 'react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
        {icon && <div className="stat-card-icon">{icon}</div>}
      </div>
      <div className="stat-card-body">
        <div className="stat-card-value">{value}</div>
        {trend && (
          <div className={`stat-card-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
