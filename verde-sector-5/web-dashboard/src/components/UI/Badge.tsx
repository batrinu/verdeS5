import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  // danger reads as an alert/count — the solid .hig-badge pill.
  // everything else is a quiet tint tag, colored per variant via app-badge-* modifiers.
  if (variant === 'danger') {
    return <span className={`hig-badge app-badge ${className}`.trim()}>{children}</span>;
  }
  const variantClass = variant !== 'default' ? `app-badge-${variant}` : '';
  return (
    <span className={`hig-tag app-badge ${variantClass} ${className}`.replace(/\s+/g, ' ').trim()}>
      {children}
    </span>
  );
};

export default Badge;
