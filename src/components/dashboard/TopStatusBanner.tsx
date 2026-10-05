import React from 'react';
import { Shield, AlertTriangle, ArrowUpRight, Radio } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { NavigationTab } from '../../types';

interface TopStatusBannerProps {
  onNavigate: (tab: NavigationTab) => void;
  pendingAlertsCount: number;
}

export const TopStatusBanner: React.FC<TopStatusBannerProps> = ({
  onNavigate,
  pendingAlertsCount,
}) => {
  return (
    <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-4 lg:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Overall Mine Status */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-lg bg-[#142438] border border-[#22344A] flex items-center justify-center text-[#22C55E] shrink-0">
          <Shield className="w-5 h-5 text-[#22C55E]" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8]">
              OVERALL MINE STATUS
            </span>
            <span className="text-[#22344A]">•</span>
            <span className="text-[11px] font-mono text-[#94A3B8]">PIT 07 CENTRAL</span>
          </div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-semibold text-[#F1F5F9] tracking-tight">
              SAFE
            </h2>
            <StatusBadge status="SAFE" text="ALL SYSTEMS NOMINAL" size="sm" />
          </div>
        </div>
      </div>

      {/* Right: Active Alerts Metric & Shortcut */}
      <div className="flex items-center gap-3 sm:gap-6 border-t md:border-t-0 md:border-l border-[#22344A] pt-3 md:pt-0 md:pl-6">
        <div>
          <span className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-0.5">
            ACTIVE ALERTS
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-mono-num font-bold text-[#F1F5F9]">
              {pendingAlertsCount}
            </span>
            <span className="text-xs text-[#94A3B8]">Requires Review</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('hazards')}
          className="ml-auto md:ml-0 px-3.5 py-2 rounded-lg bg-[#142438] hover:bg-[#1A2E46] border border-[#22344A] text-xs font-medium text-[#F1F5F9] flex items-center gap-1.5 transition-colors"
        >
          <span>View Hazard Queue</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#38BDF8]" />
        </button>
      </div>
    </div>
  );
};
