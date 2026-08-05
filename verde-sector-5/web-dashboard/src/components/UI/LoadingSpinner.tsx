import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  fullPage = false 
}) => {
  const spinner = (
    <div className={`spinner-container ${size}`}>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
      <div className="spinner-ring"></div>
    </div>
  );

  if (fullPage) {
    return <div className="spinner-fullpage">{spinner}</div>;
  }

  return spinner;
};
