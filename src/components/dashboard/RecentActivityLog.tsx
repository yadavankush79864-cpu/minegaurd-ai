import React, { useState } from 'react';
import { History, Filter, Radio, Shield, Bot, Flame, HardHat } from 'lucide-react';
import { ActivityItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-01',
    timestamp: '11:28 IST',
    category: 'ROVER',
    description: 'ROVER-01 finished telemetry sweep in Tunnel A. Gas and thermal signatures within baseline.',
    location: 'Tunnel A → Section 3',
    status: 'SAFE',
  },
  {
    id: 'act-02',
    timestamp: '11:15 IST',
    category: 'VENTILATION',
    description: 'Shaft 2 auxiliary fan velocity logged at 1.8 m/s (variance -0.4 m/s vs nominal standard).',
    location: 'Ventilation Shaft 2',
    status: 'WARNING',
  },
  {
    id: 'act-03',
    timestamp: '10:55 IST',
    category: 'PERSONNEL',
    description: 'Miners W-01, W-02, W-03 verified active on RFID mesh. Designated safe assembly zone.',
    location: 'Safe Staging Corridor',
    status: 'SAFE',
  },
  {
    id: 'act-04',
    timestamp: '10:40 IST',
    category: 'TELEMETRY',
    description: 'Sub-surface acoustic wave sensors calibrated. No structural seismic anomalies detected.',
    location: 'Sub-Level 2 Grid',
    status: 'SAFE',
  },
  {
    id: 'act-05',
    timestamp: '10:15 IST',
    category: 'SAFETY',
    description: 'Automated shift hazard safety assessment generated: 0 critical alerts in current rotation.',
    location: 'Pit 07 Surface Station',
    status: 'INFO',
  },
];

export const RecentActivityLog: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'ROVER' | 'VENTILATION' | 'PERSONNEL' | 'TELEMETRY'>('ALL');

  const filtered = filter === 'ALL'
    ? INITIAL_ACTIVITIES
    : INITIAL_ACTIVITIES.filter((a) => a.category === filter);

  return (
    <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#22344A]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#142438] border border-[#22344A] text-[#38BDF8]">
            <History className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC]">
              Recent Operational Activity
            </h3>
            <p className="text-[11px] text-[#94A3B8]">
              Automated audit trail of underground sensor sweeps, vehicle movements, and safety checks
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          {(['ALL', 'ROVER', 'VENTILATION', 'PERSONNEL', 'TELEMETRY'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2 py-1 rounded transition-colors uppercase text-[10px] ${
                filter === cat
                  ? 'bg-[#142438] text-[#F8FAFC] font-medium border border-[#22344A]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Table / Timeline */}
      <div className="divide-y divide-[#22344A]/60 mt-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-[#142438]/30 rounded-lg transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="font-mono text-xs text-[#94A3B8] shrink-0 pt-0.5">
                {item.timestamp}
              </span>
              <div>
                <p className="text-xs text-[#F8FAFC] leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-[#94A3B8]">
                  <span>{item.location}</span>
                  <span className="text-[#22344A]">•</span>
                  <span className="text-[#38BDF8]">{item.category}</span>
                </div>
              </div>
            </div>

            <div className="self-end sm:self-center shrink-0">
              <StatusBadge status={item.status} size="sm" />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-8 text-center text-xs text-[#94A3B8]">
            No activity records match the selected filter.
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-[#22344A] mt-2 flex items-center justify-between text-[11px] text-[#94A3B8] font-mono">
        <span>Continuous automated logging enabled</span>
        <span>Showing {filtered.length} of {INITIAL_ACTIVITIES.length} events</span>
      </div>
    </div>
  );
};
