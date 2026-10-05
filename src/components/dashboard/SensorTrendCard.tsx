import React, { useState } from 'react';
import { Activity, Flame, Wind, Thermometer } from 'lucide-react';

type SensorType = 'ch4' | 'co' | 'temp';

interface TrendDataset {
  label: string;
  chemical: string;
  unit: string;
  current: string;
  threshold: number;
  thresholdLabel: string;
  color: string;
  data: { time: string; value: number }[];
}

const TREND_DATA: Record<SensorType, TrendDataset> = {
  ch4: {
    label: 'Methane Concentration',
    chemical: 'CH4',
    unit: '%',
    current: '0.42%',
    threshold: 1.25,
    thresholdLabel: '1.25% Safety Limit',
    color: '#22C55E',
    data: [
      { time: '11:00', value: 0.38 },
      { time: '11:05', value: 0.39 },
      { time: '11:10', value: 0.40 },
      { time: '11:15', value: 0.41 },
      { time: '11:20', value: 0.43 },
      { time: '11:25', value: 0.42 },
      { time: '11:30', value: 0.42 },
    ],
  },
  co: {
    label: 'Carbon Monoxide',
    chemical: 'CO',
    unit: 'ppm',
    current: '14 ppm',
    threshold: 25,
    thresholdLabel: '25 ppm Caution',
    color: '#38BDF8',
    data: [
      { time: '11:00', value: 12 },
      { time: '11:05', value: 13 },
      { time: '11:10', value: 15 },
      { time: '11:15', value: 14 },
      { time: '11:20', value: 16 },
      { time: '11:25', value: 15 },
      { time: '11:30', value: 14 },
    ],
  },
  temp: {
    label: 'Underground Temperature',
    chemical: 'TEMP',
    unit: '°C',
    current: '24.6°C',
    threshold: 32,
    thresholdLabel: '32°C Ceiling',
    color: '#F59E0B',
    data: [
      { time: '11:00', value: 24.1 },
      { time: '11:05', value: 24.2 },
      { time: '11:10', value: 24.3 },
      { time: '11:15', value: 24.5 },
      { time: '11:20', value: 24.6 },
      { time: '11:25', value: 24.6 },
      { time: '11:30', value: 24.6 },
    ],
  },
};

export const SensorTrendCard: React.FC = () => {
  const [activeSensor, setActiveSensor] = useState<SensorType>('ch4');
  const [timeframe, setTimeframe] = useState<'10m' | '30m' | '1h'>('30m');

  const currentDataset = TREND_DATA[activeSensor];
  const values = currentDataset.data.map((d) => d.value);
  const minVal = Math.min(...values) * 0.9;
  const maxVal = Math.max(...values, currentDataset.threshold * 0.6) * 1.1;
  const valRange = maxVal - minVal || 1;

  const chartWidth = 500;
  const chartHeight = 140;

  const points = currentDataset.data.map((d, i) => {
    const x = (i / (currentDataset.data.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - ((d.value - minVal) / valRange) * (chartHeight - 30) - 15;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - 10} L ${points[0].x} ${chartHeight - 10} Z`;

  return (
    <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5 flex flex-col justify-between h-full">
      {/* Header: Title + Sensor Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#22344A]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#142438] border border-[#22344A] text-[#22C55E]">
            <Activity className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#F1F5F9]">
              Atmospheric Trend Analysis
            </h3>
            <p className="text-[11px] text-[#94A3B8]">
              30-minute rolling gradient for early warning detection
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 bg-[#07111F] rounded-lg border border-[#22344A]">
          {(['ch4', 'co', 'temp'] as SensorType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveSensor(type)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors uppercase ${
                activeSensor === type
                  ? 'bg-[#142438] text-[#F1F5F9] font-medium border border-[#22344A]'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Metric readout */}
      <div className="flex items-baseline justify-between pt-3 pb-1">
        <div>
          <span className="text-[11px] font-mono text-[#94A3B8] uppercase">
            {currentDataset.label}
          </span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-mono-num font-bold text-[#F1F5F9]">
              {currentDataset.current}
            </span>
            <span className="text-xs font-mono text-[#22C55E]">
              ● STABLE GRADIENT
            </span>
          </div>
        </div>

        <div className="text-right text-[11px] font-mono text-[#94A3B8]">
          <span>Safety Baseline: </span>
          <span className="text-[#F1F5F9]">{currentDataset.thresholdLabel}</span>
        </div>
      </div>

      {/* SVG Line Chart */}
      <div className="w-full h-[150px] relative mt-1 select-none">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id={`grad-${activeSensor}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={currentDataset.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={currentDataset.color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="20" y1="20" x2={chartWidth - 20} y2="20" stroke="#22344A" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="20" y1={chartHeight / 2} x2={chartWidth - 20} y2={chartHeight / 2} stroke="#22344A" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="20" y1={chartHeight - 15} x2={chartWidth - 20} y2={chartHeight - 15} stroke="#22344A" strokeWidth="0.8" />

          {/* Area fill */}
          <path d={areaPath} fill={`url(#grad-${activeSensor})`} />

          {/* Line stroke */}
          <path
            d={linePath}
            fill="none"
            stroke={currentDataset.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data point dots & time labels */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="3"
                fill={currentDataset.color}
                stroke="#101D2D"
                strokeWidth="1.5"
              />
              <text
                x={p.x}
                y={chartHeight - 2}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="9"
                fontFamily="monospace"
              >
                {p.time}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Footer Info */}
      <div className="pt-2 border-t border-[#22344A] mt-2 flex items-center justify-between text-[11px] text-[#94A3B8]">
        <span>Early trend detection: Rate variance &lt; 0.02 units/min</span>
        <span className="font-mono text-[#F1F5F9]">Pit 07 Central Sensor Mesh</span>
      </div>
    </div>
  );
};
