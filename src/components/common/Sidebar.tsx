import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Activity,
  MapPin,
  Bot,
  Compass,
  Users,
  AlertTriangle,
  Flame,
  ShieldAlert,
  Sparkles,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  X,
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOverlay?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'safe' | 'warning' | 'critical' | 'info';
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

export const navCategories: NavCategory[] = [
  {
    title: 'OVERVIEW',
    items: [
      { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'MONITORING',
    items: [
      { id: 'monitoring', label: 'Live Monitoring', icon: Radio, badge: 'Live', badgeType: 'safe' },
      { id: 'sensors', label: 'Sensors', icon: Activity },
      { id: 'map', label: 'Mine Map', icon: MapPin },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { id: 'rover', label: 'Rover', icon: Bot, badge: 'Active', badgeType: 'info' },
      { id: 'missions', label: 'Missions', icon: Compass },
      { id: 'workers', label: 'Workers', icon: Users, badge: '3', badgeType: 'info' },
    ],
  },
  {
    title: 'SAFETY',
    items: [
      { id: 'hazards', label: 'Hazards', icon: AlertTriangle, badge: '1', badgeType: 'warning' },
      { id: 'incidents', label: 'Incidents', icon: Flame },
      { id: 'emergency', label: 'Emergency Mode', icon: ShieldAlert, badgeType: 'critical' },
    ],
  },
  {
    title: 'INTELLIGENCE',
    items: [
      { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'reports', label: 'Reports', icon: FileText },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  isMobileOverlay = false,
  onCloseMobile,
}) => {
  const handleItemClick = (id: NavigationTab) => {
    onSelectTab(id);
    if (isMobileOverlay && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={`bg-[#07111F] border-r border-[#22344A] transition-all duration-200 flex flex-col justify-between shrink-0 select-none ${
        isMobileOverlay ? 'w-72 h-full' : collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top: Logo & Subtitle */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#22344A] bg-[#07111F]">
          {!collapsed || isMobileOverlay ? (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#101D2D] border border-[#22344A] flex items-center justify-center text-[#22C55E]">
                <Shield className="w-4 h-4 text-[#22C55E]" />
              </div>
              <div>
                <span className="font-semibold text-sm tracking-wider text-[#F8FAFC] block leading-tight">
                  MINEGUARD <span className="text-[#22C55E]">AI</span>
                </span>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-mono block">
                  MINE SAFETY & RESCUE
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-[#101D2D] border border-[#22344A] flex items-center justify-center text-[#22C55E]">
                <Shield className="w-4 h-4" />
              </div>
            </div>
          )}

          {isMobileOverlay ? (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101D2D] transition-colors"
              title="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          ) : !collapsed ? (
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101D2D] transition-colors"
              title="Collapse navigation"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Collapsed Expand Toggle */}
        {collapsed && !isMobileOverlay && (
          <div className="p-2 border-b border-[#22344A] flex justify-center">
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101D2D] transition-colors"
              title="Expand navigation"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Categorized Navigation */}
        <div className="py-3 px-2 space-y-4">
          {navCategories.map((category) => (
            <div key={category.title}>
              {(!collapsed || isMobileOverlay) && (
                <div className="px-3 mb-1 text-[10px] font-mono font-medium tracking-wider text-[#94A3B8] uppercase">
                  {category.title}
                </div>
              )}

              <div className="space-y-0.5">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  const badgeColors = {
                    safe: 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30',
                    warning: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
                    critical: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
                    info: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/30',
                  };

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      title={collapsed && !isMobileOverlay ? item.label : undefined}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left relative ${
                        isActive
                          ? 'bg-[#142438] text-[#F8FAFC] border-l-2 border-[#22C55E]'
                          : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#101D2D] border-l-2 border-transparent'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? 'text-[#22C55E]' : 'text-[#94A3B8]'
                        }`}
                      />

                      {(!collapsed || isMobileOverlay) && (
                        <div className="flex-1 flex items-center justify-between overflow-hidden">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[10px] font-mono-num px-1.5 py-0.2 rounded border ${
                                badgeColors[item.badgeType || 'info']
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: Compact SIH Problem ID */}
      <div className="p-3 border-t border-[#22344A] bg-[#07111F]">
        {!collapsed || isMobileOverlay ? (
          <div className="text-[11px] text-[#94A3B8] font-mono flex items-center justify-between">
            <span className="text-[#F8FAFC]">SIH-26039</span>
            <span>JHARKHAND</span>
          </div>
        ) : (
          <div className="text-center font-mono text-[9px] text-[#94A3B8]">
            26039
          </div>
        )}
      </div>
    </aside>
  );
};
