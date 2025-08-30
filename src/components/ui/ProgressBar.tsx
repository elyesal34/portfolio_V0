import React from 'react';

interface ProgressBarProps {
  level: number;
  levelColor: string;
  label: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  level,
  levelColor,
  label,
  className = '',
}) => {
  const safeLevel = Math.min(Math.max(0, level), 100);

  return (
    <div 
      className={`w-full bg-gray-200 rounded-full h-2 mb-1 ${className}`}
      role="progressbar"
      aria-valuenow={safeLevel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progression de la compétence ${label}`}
    >
      <div 
        className={`h-2 rounded-full transition-all duration-300 ${levelColor}`}
        style={{ width: `${safeLevel}%` }}
      />
    </div>
  );
};

export default ProgressBar;