import React from 'react';
import { Flame, Thermometer, Wind, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { StatusLevel } from '../../types';

interface SensorCardProps {
  name: string;
  chemical: string;
  value: string;
  unit: string;
  changeText: string;
  trend: 'up' | 'down' | 'stable';
  status: StatusLevel;
  statusLabel: string;
  safeRange: string;
  sparklinePoints: number[];
  icon: React.ComponentType<{ className?: string }>;
}

const MiniSparkline: React.FC<{ points: number[]; strokeColor: string }> = ({
  points,
  strokeColor,
}) => {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 120;
  const height = 28;

  const path = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EnvironmentalRow: React.FC = () => {
  const sensors: SensorCardProps[] = [
    {
      name: 'METHANE',
      chemical: 'CH4',
      value: '0.42',
      unit: '%',
      changeText: '↑ 0.05% vs 1h',
      trend: 'up',
      status: 'SAFE',
      statusLabel: 'NORMAL',
      safeRange: '< 1.25% Limit',
      sparklinePoints: [0.38, 0.39, 0.41, 0.40, 0.42, 0.42, 0.43, 0.42],
      icon: Flame,
    },
    {
      name: 'TEMPERATURE',
      chemical: 'TEMP',
      value: '24.6',
      unit: '°C',
      changeText: '↑ 0.2°C vs 1h',
      trend: 'up',
      status: 'SAFE',
      statusLabel: 'OPTIMAL',
      safeRange: '18 - 32 °C Safe Zone',
      sparklinePoints: [24.1, 24.2, 24.3, 24.5, 24.4, 24.6, 24.6, 24.6],
      icon: Thermometer,
    },
    {
      name: 'OXYGEN CONCENTRATION',
      chemical: 'O2',
      value: '20.8',
      unit: '%',
      changeText: '↓ 0.1% vs 1h',
      trend: 'down',
      status: 'SAFE',
      statusLabel: 'OPTIMAL',
      safeRange: '19.5% - 23.5% Safe Range',
      sparklinePoints: [20.9, 20.9, 20.8, 20.8, 20.7, 20.8, 20.8, 20.8],
      icon: Wind,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sensors.map((sensor) => {
        const Icon = sensor.icon;
        const strokeColor =
          sensor.status === 'SAFE'
            ? '#22C55E'
            : sensor.status === 'WARNING'
            ? '#F59E0B'
            : '#EF4444';

        return (
          <div
            key={sensor.chemical}
            className="bg-[#101D2D] border border-[#22344A] rounded-xl p-4 flex flex-col justify-between"
          >
            {/* Header: Label + Icon */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#F1F5F9] tracking-wider uppercase">
                  {sensor.name}
                </span>
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  ({sensor.chemical})
                </span>
              </div>
              <div className="p-1.5 rounded-md bg-[#142438] border border-[#22344A] text-[#94A3B8]">
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Middle: Number + Sparkline */}
            <div className="flex items-baseline justify-between gap-2 my-1">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl lg:text-3xl font-mono-num font-bold text-[#F1F5F9]">
                    {sensor.value}
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">{sensor.unit}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#94A3B8] mt-0.5">
                  {sensor.trend === 'up' && (
                    <TrendingUp className="w-3 h-3 text-[#38BDF8]" />
                  )}
                  {sensor.trend === 'down' && (
                    <TrendingDown className="w-3 h-3 text-[#38BDF8]" />
                  )}
                  {sensor.trend === 'stable' && (
                    <Minus className="w-3 h-3 text-[#94A3B8]" />
                  )}
                  <span>{sensor.changeText}</span>
                </div>
              </div>

              {/* Sparkline chart */}
              <div className="pt-2">
                <MiniSparkline points={sensor.sparklinePoints} strokeColor={strokeColor} />
              </div>
            </div>

            {/* Footer: Status pill + Safe limit */}
            <div className="pt-3 border-t border-[#22344A]/80 mt-3 flex items-center justify-between text-xs">
              <StatusBadge status={sensor.status} text={sensor.statusLabel} size="sm" />
              <span className="text-[11px] font-mono text-[#94A3B8]">
                {sensor.safeRange}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
