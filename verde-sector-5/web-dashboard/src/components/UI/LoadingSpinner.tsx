import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  fullPage = false
}) => {
  const spinner = <div className={`app-spinner app-spinner-${size}`} role="status" aria-label="Se încarcă" />;

  if (fullPage) {
    return <div className="app-spinner-fullpage">{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;
