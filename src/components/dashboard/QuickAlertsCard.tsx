import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck, BellRing, ChevronRight } from 'lucide-react';
import { QuickAlert } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface QuickAlertsCardProps {
  onViewAllHazards?: () => void;
}

const INITIAL_ALERTS: QuickAlert[] = [
  {
    id: 'alt-101',
    code: 'ALRT-CH4-01',
    title: 'Methane baseline stable in Sector 3',
    location: 'Tunnel A → Section 3',
    time: '11:28 AM',
    severity: 'SAFE',
    type: 'Atmospheric Gas Check',
    acknowledged: false,
  },
  {
    id: 'alt-102',
    code: 'WARN-VENT-04',
    title: 'Airflow velocity slight variance in Shaft 2',
    location: 'Junction 2 / Ventilation Shaft',
    time: '11:15 AM',
    severity: 'WARNING',
    type: 'Ventilation Velocity',
    acknowledged: false,
  },
  {
    id: 'alt-103',
    code: 'SYS-LINK-09',
    title: 'Rover-01 acoustic echo test completed',
    location: 'Tunnel B → Sub-level 4',
    time: '10:55 AM',
    severity: 'INFO',
    type: 'Telemetry Ping',
    acknowledged: true,
  },
];

export const QuickAlertsCard: React.FC<QuickAlertsCardProps> = ({ onViewAllHazards }) => {
  const [alerts, setAlerts] = useState<QuickAlert[]>(INITIAL_ALERTS);

  const toggleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: !a.acknowledged } : a))
    );
  };

  const activeCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="bg-[#172033] rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-base">
                Operational Alert Queue
              </h3>
              <p className="text-[11px] text-slate-400">
                Live monitoring notifications from underground sensors & telemetry
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {activeCount} Pending
          </span>
        </div>

        {/* Alerts list */}
        <div className="space-y-2.5">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                alert.acknowledged
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : 'bg-[#111827] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  <StatusBadge status={alert.severity} size="sm" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-slate-200">
                      {alert.code}
                    </span>
                    <span className="text-[11px] text-slate-500">• {alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 font-medium">{alert.title}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Loc: {alert.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => toggleAcknowledge(alert.id)}
                  className={`text-xs px-2.5 py-1 rounded font-medium transition-colors border ${
                    alert.acknowledged
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40 hover:bg-emerald-900/50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {alert.acknowledged ? 'Acknowledged' : 'Acknowledge'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 font-mono">
          System will escalate unacknowledged high hazards in Stage 6
        </span>
        {onViewAllHazards && (
          <button
            onClick={onViewAllHazards}
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors"
          >
            <span>View Hazard Console</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
