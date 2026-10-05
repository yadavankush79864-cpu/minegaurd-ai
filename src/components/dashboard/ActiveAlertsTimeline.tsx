import React, { useState } from 'react';
import { Bell, Check, ChevronRight } from 'lucide-react';
import { StatusLevel } from '../../types';

interface AlertItem {
  id: string;
  severity: StatusLevel;
  title: string;
  location: string;
  time: string;
  acknowledged: boolean;
}

const INITIAL_TIMELINE_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    severity: 'WARNING',
    title: 'Airflow velocity slight variance in Shaft 2',
    location: 'Tunnel B · 11:15',
    time: '11:15',
    acknowledged: false,
  },
  {
    id: 'alt-2',
    severity: 'SAFE',
    title: 'Methane baseline stable across main haulage',
    location: 'Tunnel A · 11:02',
    time: '11:02',
    acknowledged: false,
  },
  {
    id: 'alt-3',
    severity: 'INFO',
    title: 'Rover reached checkpoint Section 3',
    location: 'Tunnel A · 10:55',
    time: '10:55',
    acknowledged: true,
  },
];

interface ActiveAlertsTimelineProps {
  onViewAll?: () => void;
  onCountChange?: (count: number) => void;
}

export const ActiveAlertsTimeline: React.FC<ActiveAlertsTimelineProps> = ({
  onViewAll,
  onCountChange,
}) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_TIMELINE_ALERTS);

  const toggleAcknowledge = (id: string) => {
    const updated = alerts.map((a) =>
      a.id === id ? { ...a, acknowledged: !a.acknowledged } : a
    );
    setAlerts(updated);
    if (onCountChange) {
      onCountChange(updated.filter((a) => !a.acknowledged).length);
    }
  };

  const pendingCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#22344A]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#142438] border border-[#22344A] text-[#F59E0B]">
              <Bell className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F1F5F9]">
                Active Alerts Timeline
              </h3>
              <p className="text-[11px] text-[#94A3B8]">
                Real-time incident & operational events
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#142438] text-[#F1F5F9] border border-[#22344A]">
            {pendingCount} Pending
          </span>
        </div>

        {/* Timeline list */}
        <div className="space-y-3 mt-4">
          {alerts.map((alert) => {
            const dotColor =
              alert.severity === 'CRITICAL'
                ? 'bg-[#EF4444]'
                : alert.severity === 'WARNING'
                ? 'bg-[#F59E0B]'
                : alert.severity === 'SAFE'
                ? 'bg-[#22C55E]'
                : 'bg-[#38BDF8]';

            const textColor =
              alert.severity === 'CRITICAL'
                ? 'text-[#EF4444]'
                : alert.severity === 'WARNING'
                ? 'text-[#F59E0B]'
                : alert.severity === 'SAFE'
                ? 'text-[#22C55E]'
                : 'text-[#38BDF8]';

            return (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                  alert.acknowledged
                    ? 'bg-[#07111F]/50 border-[#22344A]/50 opacity-60'
                    : 'bg-[#07111F] border-[#22344A] hover:border-[#334862]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColor}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold tracking-wider ${textColor}`}>
                        {alert.severity}
                      </span>
                      <span className="text-[11px] text-[#94A3B8] font-mono">
                        {alert.location}
                      </span>
                    </div>
                    <p className="text-xs text-[#F1F5F9] mt-0.5 leading-snug">
                      {alert.title}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleAcknowledge(alert.id)}
                  className={`text-[11px] font-medium px-2 py-1 rounded transition-colors shrink-0 flex items-center gap-1 border ${
                    alert.acknowledged
                      ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                      : 'bg-[#142438] text-[#94A3B8] border-[#22344A] hover:text-[#F1F5F9]'
                  }`}
                >
                  {alert.acknowledged ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Ack</span>
                    </>
                  ) : (
                    <span>Ack</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer shortcut */}
      <div className="pt-3 border-t border-[#22344A] mt-4 flex items-center justify-between text-xs">
        <span className="text-[11px] text-[#94A3B8] font-mono">
          Auto-escalation active in Stage 6
        </span>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-medium text-[#38BDF8] hover:text-[#7DD3FC] flex items-center gap-1 transition-colors"
          >
            <span>All Alerts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
