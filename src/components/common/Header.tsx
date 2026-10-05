import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  LogOut, 
  User, 
  Settings, 
  Shield, 
  Check, 
  ChevronDown, 
  Menu,
  Clock,
  Radio
} from 'lucide-react';
import { UserSession } from '../../types';

interface HeaderProps {
  user: UserSession;
  onLogout: () => void;
  pageTitle: string;
  activeSector?: string;
  onOpenMobileMenu?: () => void;
  onOpenProfileModal?: () => void;
  onOpenSettingsTab?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLogout, 
  pageTitle, 
  activeSector = 'Jharkhand Central Pit 07',
  onOpenMobileMenu,
  onOpenProfileModal,
  onOpenSettingsTab,
}) => {
  const [time, setTime] = useState<string>('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[#0B1726] border-b border-[#22344A] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Mobile hamburger + Page Title + Breadcrumbs */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] transition-colors"
            title="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-semibold text-[#F8FAFC] tracking-tight leading-tight">
              {pageTitle}
            </h1>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#94A3B8] bg-[#101D2D] px-2 py-0.5 rounded border border-[#22344A]">
              PIT-07
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mt-0.5">
            <span className="text-[#94A3B8]">Control Center</span>
            <span className="text-[#22344A]">/</span>
            <span className="text-[#38BDF8] font-medium">{activeSector}</span>
          </div>
        </div>
      </div>

      {/* Right: Operational Status, Time, Notifications, User Profile Menu */}
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">
        {/* System connection indicator: ● SYSTEM ONLINE */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101D2D] border border-[#22344A] text-xs font-mono-num">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E]/40 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
          </span>
          <span className="text-[#22C55E] font-medium tracking-wide">SYSTEM ONLINE</span>
          <span className="text-[#94A3B8] text-[11px] border-l border-[#22344A] pl-2">
            14ms
          </span>
        </div>

        {/* Live IST clock */}
        <div className="hidden md:flex items-center gap-1.5 font-mono-num text-xs text-[#94A3B8] px-2.5 py-1 rounded bg-[#101D2D]/60 border border-[#22344A]/50">
          <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
          <span className="text-[#F8FAFC] font-medium">{time || '00:00:00'}</span>
          <span className="text-[10px] text-[#94A3B8]">IST</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button
            type="button"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            title="Operational Alerts"
            className="relative p-2 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] border border-transparent hover:border-[#22344A] transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F59E0B]" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#101D2D] border border-[#22344A] rounded-xl shadow-2xl p-3 z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#22344A]">
                <span className="text-xs font-semibold text-[#F8FAFC]">Live Incident Feed</span>
                <span className="text-[10px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.5 rounded border border-[#F59E0B]/20">
                  2 NEW
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-[#07111F] border border-[#22344A]">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#F59E0B]">
                    <span>WARNING • AIRFLOW</span>
                    <span>11:15 IST</span>
                  </div>
                  <p className="text-[#F8FAFC] mt-0.5">Airflow velocity variance in Shaft 2</p>
                </div>
                <div className="p-2 rounded bg-[#07111F] border border-[#22344A]">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#22C55E]">
                    <span>SAFE • TELEMETRY</span>
                    <span>11:02 IST</span>
                  </div>
                  <p className="text-[#F8FAFC] mt-0.5">Methane baseline stable in Tunnel A</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu Dropdown (Section 4) */}
        <div className="relative pl-2 sm:pl-3 border-l border-[#22344A]" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-[#142438] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#142438] border border-[#22344A] flex items-center justify-center text-[#38BDF8]">
              <User className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-[#F8FAFC] leading-tight">
                {user.roleTitle || user.role}
              </div>
              <div className="text-[11px] font-mono text-[#22C55E] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>Online</span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </button>

          {/* Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#101D2D] border border-[#22344A] rounded-xl shadow-2xl py-1.5 z-50">
              <div className="px-3.5 py-2.5 border-b border-[#22344A] text-left">
                <p className="text-xs font-semibold text-[#F8FAFC]">{user.name}</p>
                <p className="text-[11px] text-[#94A3B8] font-mono truncate">{user.email}</p>
                <span className="mt-1 inline-block text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-1.5 py-0.5 rounded border border-[#38BDF8]/20">
                  {user.role} PERMISSIONS
                </span>
              </div>

              <div className="py-1">
                {onOpenProfileModal && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenProfileModal();
                    }}
                    className="w-full px-3.5 py-2 text-xs text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] flex items-center gap-2.5 text-left transition-colors"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Profile & Station Info</span>
                  </button>
                )}

                {onOpenSettingsTab && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenSettingsTab();
                    }}
                    className="w-full px-3.5 py-2 text-xs text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] flex items-center gap-2.5 text-left transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Account Settings</span>
                  </button>
                )}
              </div>

              <div className="pt-1 border-t border-[#22344A]">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full px-3.5 py-2 text-xs text-[#EF4444] hover:bg-[#EF4444]/10 flex items-center gap-2.5 text-left transition-colors font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out of Terminal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
