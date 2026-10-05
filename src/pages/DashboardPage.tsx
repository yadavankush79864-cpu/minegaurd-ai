import React, { useState } from 'react';
import { NavigationTab, UserSession } from '../types';
import { TopStatusBanner } from '../components/dashboard/TopStatusBanner';
import { EnvironmentalRow } from '../components/dashboard/EnvironmentalRow';
import { InteractiveMineMap } from '../components/dashboard/InteractiveMineMap';
import { RoverStatusCard } from '../components/dashboard/RoverStatusCard';
import { SensorTrendCard } from '../components/dashboard/SensorTrendCard';
import { ActiveAlertsTimeline } from '../components/dashboard/ActiveAlertsTimeline';
import { RecentActivityLog } from '../components/dashboard/RecentActivityLog';

interface DashboardPageProps {
  user: UserSession;
  onNavigate: (tab: NavigationTab) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, onNavigate }) => {
  const [pendingAlertsCount, setPendingAlertsCount] = useState<number>(2);

  return (
    <div className="space-y-6">
      {/* SECTION 1: Top Status Banner (Large Mine Safety Status & Active Alerts) */}
      <section>
        <TopStatusBanner
          onNavigate={onNavigate}
          pendingAlertsCount={pendingAlertsCount}
        />
      </section>

      {/* SECTION 2: Environmental Monitoring (Key 3-Gas Indicators + Sparklines) */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-[#94A3B8]">
            Atmospheric Monitoring (Methane, Temperature, Oxygen)
          </h2>
          <button
            onClick={() => onNavigate('sensors')}
            className="text-xs font-mono text-[#38BDF8] hover:underline"
          >
            All 7 Sensors →
          </button>
        </div>
        <EnvironmentalRow />
      </section>

      {/* SECTION 3: Spatial Overview (Mine Digital Map + Rover Status) */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <InteractiveMineMap
              onExpand={() => onNavigate('map')}
              onNavigateToModule={(tab) => onNavigate(tab as NavigationTab)}
            />
          </div>
          <div className="lg:col-span-1">
            <RoverStatusCard onNavigate={onNavigate} />
          </div>
        </div>
      </section>

      {/* SECTION 4: Trend Analysis & Active Alerts */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <SensorTrendCard />
          </div>
          <div className="lg:col-span-1">
            <ActiveAlertsTimeline
              onViewAll={() => onNavigate('hazards')}
              onCountChange={setPendingAlertsCount}
            />
          </div>
        </div>
      </section>

      {/* SECTION 5: Recent Activity (Section 9 Requirement) */}
      <section>
        <RecentActivityLog />
      </section>
    </div>
  );
};
