import React from 'react';
import { Bot, Wifi, Battery, Compass, ArrowRight, ShieldCheck, Camera } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { NavigationTab } from '../../types';

interface RoverStatusCardProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const RoverStatusCard: React.FC<RoverStatusCardProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#22344A]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#142438] border border-[#22344A] text-[#38BDF8]">
              <Bot className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F1F5F9] leading-tight">
                ROVER-01 (UGV Alpha)
              </h3>
              <p className="text-[11px] text-[#94A3B8]">
                Rugged Underground Ground Explorer
              </p>
            </div>
          </div>
          <StatusBadge status="SAFE" text="ONLINE" size="sm" />
        </div>

        {/* Rover Key Metrics */}
        <div className="space-y-3 my-3">
          {/* Battery */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#94A3B8] flex items-center gap-1.5">
                <Battery className="w-3.5 h-3.5 text-[#22C55E]" />
                Battery Charge
              </span>
              <span className="font-mono-num font-medium text-[#F1F5F9]">78%</span>
            </div>
            <div className="w-full h-1.5 bg-[#142438] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#22C55E] rounded-full"
                style={{ width: '78%' }}
              />
            </div>
          </div>

          {/* Location & Heading */}
          <div className="p-2.5 rounded-lg bg-[#07111F] border border-[#22344A] text-xs">
            <div className="text-[11px] text-[#94A3B8] font-mono uppercase mb-0.5">
              CURRENT LOCATION
            </div>
            <div className="font-medium text-[#F1F5F9] flex items-center justify-between">
              <span>Tunnel A → Section 3 (Grid X:280, Y:80)</span>
              <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
            </div>
          </div>

          {/* Communication & Signal */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-[#07111F] border border-[#22344A]">
              <div className="text-[10px] text-[#94A3B8] font-mono">SIGNAL (MESH)</div>
              <div className="font-mono-num text-[#F1F5F9] font-medium mt-0.5 flex items-center gap-1">
                <Wifi className="w-3 h-3 text-[#22C55E]" />
                <span>-58 dBm (Strong)</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-[#07111F] border border-[#22344A]">
              <div className="text-[10px] text-[#94A3B8] font-mono">VISION PAYLOAD</div>
              <div className="text-[#F1F5F9] font-medium mt-0.5 flex items-center gap-1">
                <Camera className="w-3 h-3 text-[#38BDF8]" />
                <span>FLIR / Optical</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button: clean primary gradient used sparingly */}
      <div className="pt-3 border-t border-[#22344A] mt-2">
        <button
          onClick={() => onNavigate('rover')}
          className="w-full py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#22C55E] to-[#38BDF8] hover:opacity-95 text-[#07111F] font-semibold text-xs transition-opacity flex items-center justify-center gap-1.5"
        >
          <span>Open Teleoperation Console</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
