import React, { useState } from 'react';
import { 
  ShieldAlert, 
  MapPin, 
  Bot, 
  Users, 
  Compass, 
  CheckCircle2, 
  Flame, 
  AlertTriangle,
  Radio,
  ArrowRight,
  Send
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface EmergencyConsoleProps {
  onNavigateToTab?: (tab: string) => void;
}

export const EmergencyConsole: React.FC<EmergencyConsoleProps> = ({ onNavigateToTab }) => {
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [roverDispatched, setRoverDispatched] = useState<boolean>(false);
  const [missionStarted, setMissionStarted] = useState<boolean>(false);
  const [actionFeedback, setActionFeedback] = useState<string>('');

  const handleDispatch = () => {
    setRoverDispatched(true);
    setActionFeedback('Command confirmed: ROVER-01 rerouted to Tunnel B, Section 4 with high-frequency thermal telemetry.');
  };

  const handleStartMission = () => {
    setMissionStarted(true);
    setActionFeedback('Tactical Mission #MSN-401 created: Tunnel B atmospheric containment & personnel extraction route.');
  };

  return (
    <div className="space-y-6">
      {/* High-priority Emergency Header */}
      <div className="bg-[#101D2D] border-l-4 border-l-[#EF4444] border-y border-r border-[#22344A] rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] shrink-0">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 px-2 py-0.5 rounded">
                  CRITICAL INCIDENT #INC-204
                </span>
                <span className="text-xs font-mono text-[#94A3B8]">
                  TIME ELAPSED: 18m
                </span>
              </div>
              <h1 className="text-2xl font-bold text-[#F8FAFC] tracking-tight">
                High Methane & Airflow Variance Detected
              </h1>
              <p className="text-sm text-[#94A3B8] mt-1 font-mono">
                Location: <strong className="text-[#F8FAFC]">Tunnel B · Section 4 (Shaft 2 Intersection)</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge
              status={acknowledged ? 'INFO' : 'CRITICAL'}
              text={acknowledged ? 'ACKNOWLEDGED' : 'HIGH PRIORITY RESPONSE'}
              pulsing={!acknowledged}
            />
          </div>
        </div>

        {/* Action feedback toast */}
        {actionFeedback && (
          <div className="mt-4 p-3 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-xs text-[#38BDF8] flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22C55E]" />
            <span>{actionFeedback}</span>
          </div>
        )}
      </div>

      {/* Incident Diagnostic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Incident Details & Action Toolbar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Toolbar */}
          <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5">
            <h3 className="text-xs font-mono uppercase text-[#94A3B8] tracking-wider mb-3">
              EMERGENCY OPERATIONAL ACTIONS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Action 1: View Location */}
              <button
                type="button"
                onClick={() => onNavigateToTab?.('map')}
                className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] hover:border-[#38BDF8] text-left transition-colors group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#F8FAFC] mb-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                    View Location
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-[#94A3B8]">Inspect Tunnel B coordinate grid on digital map</p>
              </button>

              {/* Action 2: Dispatch Rover */}
              <button
                type="button"
                onClick={handleDispatch}
                disabled={roverDispatched}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  roverDispatched
                    ? 'bg-[#142438] border-[#22C55E]/50 opacity-80'
                    : 'bg-[#07111F] border-[#22344A] hover:border-[#22C55E]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#F8FAFC] mb-1">
                  <span className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#22C55E]" />
                    {roverDispatched ? 'Rover Dispatched' : 'Dispatch Rover'}
                  </span>
                  {roverDispatched && <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />}
                </div>
                <p className="text-[11px] text-[#94A3B8]">Send ROVER-01 on automated forward sweep</p>
              </button>

              {/* Action 3: View Workers */}
              <button
                type="button"
                onClick={() => onNavigateToTab?.('workers')}
                className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] hover:border-[#38BDF8] text-left transition-colors group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#F8FAFC] mb-1">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
                    View Workers
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-[#94A3B8]">Check 3 active miners distance from hotspot</p>
              </button>

              {/* Action 4: Start Mission */}
              <button
                type="button"
                onClick={handleStartMission}
                disabled={missionStarted}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  missionStarted
                    ? 'bg-[#142438] border-[#38BDF8]/50 opacity-80'
                    : 'bg-[#07111F] border-[#22344A] hover:border-[#38BDF8]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold text-[#F8FAFC] mb-1">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                    {missionStarted ? 'Mission Initialized' : 'Start Mission'}
                  </span>
                  {missionStarted && <CheckCircle2 className="w-3 h-3 text-[#38BDF8]" />}
                </div>
                <p className="text-[11px] text-[#94A3B8]">Formulate tactical containment operation</p>
              </button>

              {/* Action 5: Acknowledge Alert */}
              <button
                type="button"
                onClick={() => {
                  setAcknowledged(true);
                  setActionFeedback('Incident #INC-204 acknowledged by Control Room Commander.');
                }}
                className={`p-3 rounded-lg border text-left transition-colors sm:col-span-2 ${
                  acknowledged
                    ? 'bg-[#142438] border-[#22C55E]/40 text-[#22C55E]'
                    : 'bg-[#142438] border-[#22344A] hover:border-[#EF4444] text-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                    {acknowledged ? 'Incident Acknowledged' : 'Acknowledge Emergency Protocol'}
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">Log operator receipt and initiate evacuation siren check</p>
              </button>
            </div>
          </div>

          {/* Telemetry Snapshot for Affected Area */}
          <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5">
            <h3 className="text-xs font-mono uppercase text-[#94A3B8] tracking-wider mb-3">
              LOCAL TELEMETRY SNAPSHOT • TUNNEL B SECTION 4
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A]">
                <span className="text-[10px] font-mono text-[#94A3B8]">METHANE (CH4)</span>
                <div className="text-xl font-mono-num font-bold text-[#F59E0B] mt-0.5">0.58%</div>
                <span className="text-[10px] text-[#F59E0B]">Elevated (+0.16%)</span>
              </div>
              <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A]">
                <span className="text-[10px] font-mono text-[#94A3B8]">AIR VELOCITY</span>
                <div className="text-xl font-mono-num font-bold text-[#F59E0B] mt-0.5">1.8 m/s</div>
                <span className="text-[10px] text-[#F59E0B]">Below 2.2 m/s standard</span>
              </div>
              <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A]">
                <span className="text-[10px] font-mono text-[#94A3B8]">TEMPERATURE</span>
                <div className="text-xl font-mono-num font-bold text-[#F8FAFC] mt-0.5">26.2 °C</div>
                <span className="text-[10px] text-[#22C55E]">Within upper limit</span>
              </div>
              <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A]">
                <span className="text-[10px] font-mono text-[#94A3B8]">CARBON MONOXIDE</span>
                <div className="text-xl font-mono-num font-bold text-[#F8FAFC] mt-0.5">16 ppm</div>
                <span className="text-[10px] text-[#22C55E]">Below 25 ppm limit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Asset Status during Emergency */}
        <div className="space-y-6">
          {/* Rover Position Card */}
          <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#22344A]">
              <span className="text-xs font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-[#22C55E]" />
                Scout Rover Alpha
              </span>
              <StatusBadge status="SAFE" text="READY" size="sm" />
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Distance to Hotspot:</span>
                <span className="font-mono-num text-[#F8FAFC]">140 meters</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Battery Level:</span>
                <span className="font-mono-num text-[#22C55E]">78%</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Obstacles En Route:</span>
                <span className="font-mono text-[#F8FAFC]">None reported</span>
              </div>
            </div>
          </div>

          {/* Workers in Affected Zone */}
          <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#22344A]">
              <span className="text-xs font-semibold text-[#F8FAFC] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
                Personnel Triage
              </span>
              <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-1.5 py-0.5 rounded">
                SAFE DISTANCE
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <p className="text-[#94A3B8] leading-relaxed">
                All 3 logged miners (W-01, W-02, W-03) are verified in <strong>Tunnel A & Safe Haven S-01</strong>, separated by fire damper bulkhead.
              </p>
              <div className="pt-2 border-t border-[#22344A] text-[11px] font-mono text-[#38BDF8]">
                Evacuation route: Main Haulage Corridor Clear
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
