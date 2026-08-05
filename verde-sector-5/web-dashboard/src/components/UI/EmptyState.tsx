import React from 'react';
import type { LucideIcon } from 'lucide-react';
import './EmptyState.css';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon: Icon, 
  title, 
  description,
  action
}) => {
  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-state-icon-wrapper">
        <Icon className="empty-state-icon" size={48} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};
