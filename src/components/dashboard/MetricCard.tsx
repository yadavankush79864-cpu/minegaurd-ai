import React from 'react';
import { StatusLevel } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  subtitle?: string;
  value: string;
  unit?: string;
  status: StatusLevel;
  statusText?: string;
  rangeOrTarget: string;
  icon: LucideIcon;
  trendText?: string;
  trendDirection?: 'up' | 'down' | 'stable';
  note?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  subtitle,
  value,
  unit,
  status,
  statusText,
  rangeOrTarget,
  icon: Icon,
  trendText,
  note,
  onClick,
}) => {
  // Border accent glow based on status
  const borderStyles: Record<StatusLevel, string> = {
    SAFE: 'border-slate-800 hover:border-emerald-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.25)]',
    WARNING: 'border-amber-500/40 hover:border-amber-500/70 shadow-[0_4px_20px_rgba(245,158,11,0.1)]',
    CRITICAL: 'border-rose-500/50 hover:border-rose-500/80 shadow-[0_4px_20px_rgba(239,68,68,0.15)] animate-pulse',
    INFO: 'border-slate-800 hover:border-sky-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.25)]',
  };

  const iconColors: Record<StatusLevel, string> = {
    SAFE: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    WARNING: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    CRITICAL: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    INFO: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-[#172033] rounded-xl p-4 lg:p-5 border transition-all duration-200 relative overflow-hidden group ${
        borderStyles[status]
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Top subtle scanline gradient */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-600/30 to-transparent group-hover:via-emerald-400/50" />

      {/* Header: Title + Icon */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
            {subtitle || 'SYSTEM METRIC'}
          </span>
          <h3 className="font-display font-semibold text-white text-base tracking-wide">
            {title}
          </h3>
        </div>
        <div className={`p-2.5 rounded-lg border ${iconColors[status]} transition-transform group-hover:scale-105`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="my-2 flex items-baseline gap-2">
        <span className="text-3xl lg:text-4xl font-mono-num font-bold text-white tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-mono text-slate-400 font-medium">{unit}</span>
        )}
      </div>

      {/* Status Pill & Target Range */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 mt-3 text-xs">
        <StatusBadge status={status} text={statusText} size="sm" />
        <span className="font-mono text-[11px] text-slate-400">
          Target: <span className="text-slate-300 font-mono-num">{rangeOrTarget}</span>
        </span>
      </div>

      {/* Footer Info or Trend */}
      {(note || trendText) && (
        <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="truncate">{note}</span>
          {trendText && <span className="text-slate-400 font-mono">{trendText}</span>}
        </div>
      )}
    </div>
  );
};
