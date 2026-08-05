import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.125rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'success':
        return { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-success)', border: '1px solid rgba(16, 185, 129, 0.2)' };
      case 'warning':
        return { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)', border: '1px solid rgba(245, 158, 11, 0.2)' };
      case 'danger':
        return { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', border: '1px solid rgba(239, 68, 68, 0.2)' };
      case 'info':
        return { backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-info)', border: '1px solid rgba(59, 130, 246, 0.2)' };
      case 'default':
      default:
        return { backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--color-text-secondary)', border: '1px solid var(--border-color)' };
    }
  };

  return (
    <span 
      className={`badge ${className}`} 
      style={{ ...baseStyle, ...getVariantStyles() }}
    >
      {children}
    </span>
  );
};
