import React from 'react';
import { Activity, Gauge, Flame, Wind, Droplets, Thermometer, Compass } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface SensorItem {
  id: string;
  name: string;
  formula: string;
  value: string;
  unit: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  statusText: string;
  normalRange: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STAGE1_DEMO_SENSORS: SensorItem[] = [
  {
    id: 'ch4',
    name: 'Methane Gas',
    formula: 'CH4',
    value: '0.42',
    unit: '%',
    status: 'SAFE',
    statusText: 'NORMAL',
    normalRange: '< 1.25%',
    icon: Flame,
  },
  {
    id: 'co',
    name: 'Carbon Monoxide',
    formula: 'CO',
    value: '14',
    unit: 'ppm',
    status: 'SAFE',
    statusText: 'NORMAL',
    normalRange: '< 25 ppm',
    icon: Wind,
  },
  {
    id: 'o2',
    name: 'Oxygen Concentration',
    formula: 'O2',
    value: '20.8',
    unit: '%',
    status: 'SAFE',
    statusText: 'OPTIMAL',
    normalRange: '19.5 - 23.5%',
    icon: Gauge,
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    formula: 'CO2',
    value: '420',
    unit: 'ppm',
    status: 'SAFE',
    statusText: 'NORMAL',
    normalRange: '< 1000 ppm',
    icon: Wind,
  },
  {
    id: 'temp',
    name: 'Mine Temperature',
    formula: 'TEMP',
    value: '24.6',
    unit: '°C',
    status: 'SAFE',
    statusText: 'NOMINAL',
    normalRange: '18 - 32 °C',
    icon: Thermometer,
  },
  {
    id: 'humidity',
    name: 'Relative Humidity',
    formula: 'RH',
    value: '68.2',
    unit: '%',
    status: 'SAFE',
    statusText: 'MODERATE',
    normalRange: '40 - 85%',
    icon: Droplets,
  },
  {
    id: 'pressure',
    name: 'Atmospheric Pressure',
    formula: 'BARO',
    value: '1014.2',
    unit: 'hPa',
    status: 'SAFE',
    statusText: 'STABLE',
    normalRange: '980 - 1040 hPa',
    icon: Compass,
  },
];

interface TelemetrySummaryCardProps {
  onViewAllSensors?: () => void;
}

export const TelemetrySummaryCard: React.FC<TelemetrySummaryCardProps> = ({ onViewAllSensors }) => {
  return (
    <div className="bg-[#172033] rounded-xl border border-slate-800 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-base">
              Underground Atmospheric Telemetry
            </h3>
            <p className="text-[11px] text-slate-400">
              Live multi-gas and climate baseline transmitted from Pit 07 sensors
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
            SIMULATED DEMO TELEMETRY
          </span>
        </div>
      </div>

      {/* Grid of gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {STAGE1_DEMO_SENSORS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="p-3 rounded-lg bg-[#111827] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {s.formula}
                </span>
                <Icon className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="my-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono-num font-bold text-white">
                    {s.value}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{s.unit}</span>
                </div>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{s.name}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                <StatusBadge status={s.status} text={s.statusText} size="sm" />
                <span className="text-[9px] font-mono text-slate-400 truncate">
                  {s.normalRange}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 font-mono">
          Stage 3 & 4 will add live tick streaming and historical time-series charts.
        </span>
        {onViewAllSensors && (
          <button
            onClick={onViewAllSensors}
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            Launch Full Sensor Console →
          </button>
        )}
      </div>
    </div>
  );
};
