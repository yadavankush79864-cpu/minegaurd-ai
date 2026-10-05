import React, { useState } from 'react';
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  Bot, 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  Compass, 
  Wifi, 
  Battery, 
  ArrowRight 
} from 'lucide-react';
import { MapMarkerDetail, StatusLevel } from '../../types';
import { StatusBadge } from '../common/StatusBadge';

interface MineMapProps {
  onExpand?: () => void;
  onNavigateToModule?: (tab: string) => void;
}

const MARKER_DETAILS: Record<string, MapMarkerDetail> = {
  'rover-01': {
    id: 'ROVER-01',
    type: 'rover',
    title: 'UGV Alpha Scout (Rover-01)',
    location: 'Tunnel A → Section 3 (Grid X:280, Y:80)',
    status: 'SAFE',
    details: [
      { label: 'Battery Level', value: '78% (Estimated 4.2h remaining)' },
      { label: 'Mesh Signal', value: '-58 dBm (Strong Sub-Surface Link)' },
      { label: 'Atmospheric Array', value: 'CH4: 0.42%, CO: 14 ppm, O2: 20.8%' },
      { label: 'Optics & Thermal', value: 'FLIR Lepton 3.5 + IR Illuminator Active' },
      { label: 'Motor Status', value: 'Nominal (Track Temp: 28°C)' },
    ],
    recommendedAction: 'Ready for waypoint patrol or dispatch to branch sectors.',
  },
  'worker-01': {
    id: 'WORKER-01',
    type: 'worker',
    title: 'Personnel: Rajesh Kumar (W-01)',
    location: 'Safe Staging Corridor (Grid X:95, Y:80)',
    status: 'SAFE',
    details: [
      { label: 'RFID Beacon', value: 'BCN-01948-RK' },
      { label: 'Simulated Vitals', value: 'Pulse: 72 bpm • SpO2: 98% (Stable)' },
      { label: 'Section Air Quality', value: 'Optimal Breathing Atmosphere' },
      { label: 'Shift Time', value: '3h 40m on shift' },
    ],
    recommendedAction: 'Operating inside verified safe corridor.',
  },
  'worker-02': {
    id: 'WORKER-02',
    type: 'worker',
    title: 'Personnel: Anil Murmu (W-02)',
    location: 'Tunnel A / Junction 1 (Grid X:160, Y:80)',
    status: 'SAFE',
    details: [
      { label: 'RFID Beacon', value: 'BCN-02481-AM' },
      { label: 'Simulated Vitals', value: 'Pulse: 76 bpm • SpO2: 98% (Stable)' },
      { label: 'Nearest Evac Route', value: '18 meters to Safe Staging Zone' },
    ],
    recommendedAction: 'Equipment inspection routine near Junction 1.',
  },
  'worker-03': {
    id: 'WORKER-03',
    type: 'worker',
    title: 'Personnel: Bikram Hansda (W-03)',
    location: 'Tunnel A → Section 4 (Grid X:450, Y:80)',
    status: 'SAFE',
    details: [
      { label: 'RFID Beacon', value: 'BCN-03119-BH' },
      { label: 'Simulated Vitals', value: 'Pulse: 74 bpm • SpO2: 97% (Stable)' },
      { label: 'Section Air Quality', value: 'Nominal CH4 baseline' },
    ],
    recommendedAction: 'Maintaining conveyor belt drive mechanism.',
  },
  'hazard-01': {
    id: 'HAZARD-01',
    type: 'hazard',
    title: 'Hazard Alert #HZ-102 (Airflow Variance)',
    location: 'Tunnel B → Section 4 / Shaft 2 (Grid X:420, Y:160)',
    status: 'WARNING',
    details: [
      { label: 'Detected Variance', value: 'Airflow velocity dipped from 2.2 to 1.8 m/s' },
      { label: 'Local Gas Sensor', value: 'CH4: 0.58% (Slight rise, below 1.25% limit)' },
      { label: 'Sensor Station', value: 'STN-VENT-04' },
      { label: 'Time Elapsed', value: '18 minutes since first alert' },
    ],
    recommendedAction: 'Dispatch ROVER-01 to conduct close-range thermal & gas inspection.',
  },
  'safe-zone': {
    id: 'SAFE-ZONE-01',
    type: 'safe_zone',
    title: 'Primary Underground Safe Haven',
    location: 'Sub-Level 2 Staging Corridor (Grid X:40, Y:30)',
    status: 'SAFE',
    details: [
      { label: 'Capacity', value: '12 Personnel max (Currently 1 present)' },
      { label: 'Independent O2 Supply', value: '96 hours oxygen reserves verified' },
      { label: 'Positive Pressure Air', value: 'Active (Prevents toxic gas ingress)' },
      { label: 'Direct Surface Link', value: 'Hardwired Landline & Fiber Mesh Active' },
    ],
    recommendedAction: 'Designated muster point during alert escalations.',
  },
};

export const InteractiveMineMap: React.FC<MineMapProps> = ({ onExpand, onNavigateToModule }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeMarker, setActiveMarker] = useState<MapMarkerDetail | null>(null);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.75));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5 flex flex-col justify-between h-full relative">
      {/* Map Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#22344A]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-[#142438] border border-[#22344A] text-[#22C55E]">
            <MapPin className="w-4 h-4 text-[#22C55E]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#F8FAFC] leading-tight">
              Underground Mine Digital Map
            </h3>
            <p className="text-[11px] text-[#94A3B8]">
              Sector 4 Under-Grid • Sub-Level 2 (-140m Depth) • Click any asset for telemetry
            </p>
          </div>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1.5 bg-[#07111F] p-1 rounded-lg border border-[#22344A]">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Map Canvas with Zoom & Pan transform */}
      <div className="relative w-full h-[280px] bg-[#07111F] rounded-lg border border-[#22344A] overflow-hidden flex items-center justify-center p-2 select-none">
        {/* Subtle grid mesh */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #22344A 1px, transparent 1px), linear-gradient(to bottom, #22344A 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div
          className="w-full h-full transition-transform duration-200"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: 'center center',
          }}
        >
          <svg viewBox="0 0 600 240" className="w-full h-full">
            <defs>
              <pattern id="safePattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 10 0 M 0 0 L 10 10" stroke="#22C55E" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
              <pattern id="warnPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 0 10 L 10 0 M 0 0 L 10 10" stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
            </defs>

            {/* Safe Staging Zone */}
            <g className="cursor-pointer" onClick={() => setActiveMarker(MARKER_DETAILS['safe-zone'])}>
              <rect
                x="40"
                y="30"
                width="120"
                height="70"
                rx="4"
                fill="url(#safePattern)"
                stroke="#22C55E"
                strokeWidth="1"
                strokeDasharray="3 3"
                strokeOpacity="0.4"
              />
              <text x="50" y="46" fill="#22C55E" fontSize="9" fontFamily="monospace" opacity="0.8">
                SAFE HAVEN (S-01)
              </text>
            </g>

            {/* Caution Zone: Tunnel B Section 4 */}
            <g className="cursor-pointer" onClick={() => setActiveMarker(MARKER_DETAILS['hazard-01'])}>
              <rect
                x="360"
                y="125"
                width="130"
                height="65"
                rx="4"
                fill="url(#warnPattern)"
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="3 3"
                strokeOpacity="0.5"
              />
              <text x="370" y="140" fill="#F59E0B" fontSize="9" fontFamily="monospace" opacity="0.8">
                ELEVATED VENT VARIANCE
              </text>
            </g>

            {/* Tunnel Lines */}
            {/* Tunnel A */}
            <path d="M 50 80 L 530 80" stroke="#22344A" strokeWidth="18" strokeLinecap="round" />
            <path d="M 50 80 L 530 80" stroke="#101D2D" strokeWidth="14" strokeLinecap="round" />

            {/* Tunnel B */}
            <path d="M 220 80 L 220 160 L 520 160" stroke="#22344A" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 220 80 L 220 160 L 520 160" stroke="#101D2D" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

            {/* Shaft 2 */}
            <path d="M 380 80 L 380 160" stroke="#22344A" strokeWidth="12" strokeLinecap="round" />
            <path d="M 380 80 L 380 160" stroke="#101D2D" strokeWidth="8" strokeLinecap="round" />

            {/* Labels */}
            <text x="70" y="76" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">
              Tunnel A (Main Drift)
            </text>
            <text x="240" y="156" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">
              Tunnel B (Seam-03)
            </text>
            <text x="388" y="118" fill="#94A3B8" fontSize="9" fontFamily="monospace">
              Shaft 2
            </text>

            {/* Rover-01 Marker */}
            <g
              className="cursor-pointer transition-transform hover:scale-110"
              onClick={() => setActiveMarker(MARKER_DETAILS['rover-01'])}
            >
              <circle cx="280" cy="80" r="10" fill="#22C55E" fillOpacity="0.25" className="animate-pulse" />
              <circle cx="280" cy="80" r="5" fill="#22C55E" stroke="#07111F" strokeWidth="1.5" />
              <rect x="290" y="68" width="62" height="18" rx="3" fill="#101D2D" stroke="#22C55E" strokeWidth="0.8" />
              <text x="295" y="80" fill="#22C55E" fontSize="9" fontFamily="monospace" fontWeight="bold">
                ROVER-01
              </text>
            </g>

            {/* Workers */}
            <g className="cursor-pointer" onClick={() => setActiveMarker(MARKER_DETAILS['worker-01'])}>
              <circle cx="95" cy="80" r="4.5" fill="#38BDF8" stroke="#07111F" strokeWidth="1.5" />
              <text x="90" y="98" fill="#38BDF8" fontSize="8" fontFamily="monospace">W-01</text>
            </g>
            <g className="cursor-pointer" onClick={() => setActiveMarker(MARKER_DETAILS['worker-02'])}>
              <circle cx="160" cy="80" r="4.5" fill="#38BDF8" stroke="#07111F" strokeWidth="1.5" />
              <text x="155" y="98" fill="#38BDF8" fontSize="8" fontFamily="monospace">W-02</text>
            </g>
            <g className="cursor-pointer" onClick={() => setActiveMarker(MARKER_DETAILS['worker-03'])}>
              <circle cx="450" cy="80" r="4.5" fill="#38BDF8" stroke="#07111F" strokeWidth="1.5" />
              <text x="445" y="98" fill="#38BDF8" fontSize="8" fontFamily="monospace">W-03</text>
            </g>

            {/* Hazard Marker */}
            <g className="cursor-pointer" onClick={() => setActiveMarker(MARKER_DETAILS['hazard-01'])}>
              <circle cx="420" cy="160" r="8" fill="#F59E0B" fillOpacity="0.3" className="animate-pulse" />
              <circle cx="420" cy="160" r="4.5" fill="#F59E0B" stroke="#07111F" strokeWidth="1.5" />
              <text x="410" y="180" fill="#F59E0B" fontSize="8" fontFamily="monospace">HZ-01</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Map Legend */}
      <div className="mt-3 pt-2.5 border-t border-[#22344A] flex flex-wrap items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setActiveMarker(MARKER_DETAILS['rover-01'])}
            className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#22C55E]"
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            Rover-01 (Active)
          </button>
          <button
            type="button"
            onClick={() => setActiveMarker(MARKER_DETAILS['worker-01'])}
            className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#38BDF8]"
          >
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            Workers (3 Tracked)
          </button>
          <button
            type="button"
            onClick={() => setActiveMarker(MARKER_DETAILS['hazard-01'])}
            className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F59E0B]"
          >
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            Hazard (1 Variance)
          </button>
        </div>
        <span className="text-[#94A3B8] font-mono text-[10px]">
          ZOOM: {(zoomLevel * 100).toFixed(0)}%
        </span>
      </div>

      {/* Marker Detail Modal / Inspector Drawer */}
      {activeMarker && (
        <div className="fixed inset-0 bg-[#07111F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#101D2D] border border-[#22344A] rounded-xl max-w-md w-full p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-[#22344A]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#142438] text-[#38BDF8] border border-[#22344A]">
                    {activeMarker.type.toUpperCase()}
                  </span>
                  <StatusBadge status={activeMarker.status} size="sm" />
                </div>
                <h4 className="text-base font-semibold text-[#F8FAFC]">
                  {activeMarker.title}
                </h4>
                <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                  {activeMarker.location}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveMarker(null)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Details list */}
            <div className="my-4 space-y-2">
              {activeMarker.details.map((d, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-[#07111F] border border-[#22344A] flex items-center justify-between text-xs"
                >
                  <span className="text-[#94A3B8]">{d.label}</span>
                  <span className="text-[#F8FAFC] font-mono font-medium">{d.value}</span>
                </div>
              ))}
            </div>

            {/* Recommended Action */}
            {activeMarker.recommendedAction && (
              <div className="p-3 rounded-lg bg-[#142438]/60 border border-[#22344A] text-xs mb-4">
                <span className="text-[10px] font-mono uppercase text-[#38BDF8] block mb-1">
                  OPERATIONAL RECOMMENDATION
                </span>
                <p className="text-[#F8FAFC]">{activeMarker.recommendedAction}</p>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#22344A]">
              <button
                type="button"
                onClick={() => setActiveMarker(null)}
                className="px-3 py-1.5 rounded-lg bg-[#142438] text-xs font-medium text-[#F8FAFC] hover:bg-[#1A2E46] border border-[#22344A] transition-colors"
              >
                Close Inspector
              </button>
              {onNavigateToModule && (
                <button
                  type="button"
                  onClick={() => {
                    const target = activeMarker.type === 'rover' ? 'rover' : activeMarker.type === 'worker' ? 'workers' : 'hazards';
                    setActiveMarker(null);
                    onNavigateToModule(target);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#22C55E] to-[#38BDF8] text-xs font-semibold text-[#07111F] flex items-center gap-1 transition-opacity hover:opacity-95"
                >
                  <span>Open Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
