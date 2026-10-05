import React from 'react';
import { StatusLevel } from '../../types';

interface StatusBadgeProps {
  status: StatusLevel;
  text?: string;
  size?: 'sm' | 'md';
  pulsing?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  size = 'md',
  pulsing = false,
}) => {
  const label = text || status;

  const config: Record<StatusLevel, { dot: string; text: string; bg: string; border: string; pulse: string }> = {
    SAFE: {
      dot: 'bg-[#22C55E]',
      text: 'text-[#22C55E]',
      bg: 'bg-[#22C55E]/10',
      border: 'border-[#22C55E]/20',
      pulse: 'bg-[#22C55E]/40',
    },
    WARNING: {
      dot: 'bg-[#F59E0B]',
      text: 'text-[#F59E0B]',
      bg: 'bg-[#F59E0B]/10',
      border: 'border-[#F59E0B]/20',
      pulse: 'bg-[#F59E0B]/40',
    },
    CRITICAL: {
      dot: 'bg-[#EF4444]',
      text: 'text-[#EF4444]',
      bg: 'bg-[#EF4444]/10',
      border: 'border-[#EF4444]/20',
      pulse: 'bg-[#EF4444]/40',
    },
    INFO: {
      dot: 'bg-[#38BDF8]',
      text: 'text-[#38BDF8]',
      bg: 'bg-[#38BDF8]/10',
      border: 'border-[#38BDF8]/20',
      pulse: 'bg-[#38BDF8]/40',
    },
  };

  const current = config[status] || config.INFO;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-mono-num font-medium rounded-md border tracking-wide uppercase ${current.bg} ${current.text} ${current.border} ${sizeClasses[size]}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulsing && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.pulse}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${current.dot}`} />
      </span>
      <span>{label}</span>
    </span>
  );
};
