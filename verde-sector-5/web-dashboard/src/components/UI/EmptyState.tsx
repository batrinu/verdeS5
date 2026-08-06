import React from 'react';
import type { LucideIcon } from 'lucide-react';

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
    <div className="hig-empty app-empty">
      <Icon className="hig-empty-icon" size={44} />
      <h3 className="hig-empty-title">{title}</h3>
      <p className="app-empty-description hig-footnote hig-secondary">{description}</p>
      {action && <div className="app-empty-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
