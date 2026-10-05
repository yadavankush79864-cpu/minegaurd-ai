import React, { useState, useEffect } from 'react';
import { NavigationTab, UserSession } from './types';
import { LoginPage } from './pages/LoginPage';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ProfileModal } from './components/common/ProfileModal';
import {
  LiveMonitoringPlaceholder,
  MineMapPlaceholder,
  SensorMonitoringPlaceholder,
  RoverPlaceholder,
  HazardsPlaceholder,
  IncidentsPlaceholder,
  EmergencyPlaceholder,
  WorkersPlaceholder,
  MissionsPlaceholder,
  AIAssistantPlaceholder,
  AnalyticsPlaceholder,
  ReportsPlaceholder,
  SettingsPlaceholder,
} from './components/placeholders/PlaceholderViews';

// Route path to NavigationTab mapping
const ROUTE_TO_TAB: Record<string, NavigationTab> = {
  '/dashboard': 'dashboard',
  '/monitoring': 'monitoring',
  '/sensors': 'sensors',
  '/map': 'map',
  '/mine-map': 'map',
  '/rover': 'rover',
  '/rovers': 'rover',
  '/missions': 'missions',
  '/workers': 'workers',
  '/hazards': 'hazards',
  '/incidents': 'incidents',
  '/emergency': 'emergency',
  '/ai-assistant': 'ai-assistant',
  '/analytics': 'analytics',
  '/reports': 'reports',
  '/settings': 'settings',
};

// Tab to URL path mapping
const TAB_TO_ROUTE: Record<NavigationTab, string> = {
  dashboard: '/dashboard',
  monitoring: '/monitoring',
  sensors: '/sensors',
  map: '/map',
  rover: '/rover',
  missions: '/missions',
  workers: '/workers',
  hazards: '/hazards',
  incidents: '/incidents',
  emergency: '/emergency',
  'ai-assistant': '/ai-assistant',
  analytics: '/analytics',
  reports: '/reports',
  settings: '/settings',
};

const TAB_PAGE_TITLES: Record<NavigationTab, string> = {
  dashboard: 'Mine Overview',
  monitoring: 'Live Mine Monitoring',
  sensors: 'Atmospheric Sensors',
  map: 'Underground Mine Map',
  rover: 'Rover Teleoperation',
  missions: 'Mission Management',
  workers: 'Worker Rescue & Triage',
  hazards: 'Hazard Detection',
  incidents: 'Incident Management',
  emergency: 'Emergency Operations Mode',
  'ai-assistant': 'AI Rescue Assistant',
  analytics: 'Safety Analytics',
  reports: 'Reports & Audit Logs',
  settings: 'System Settings',
};

export default function App() {
  // CRITICAL REQUIREMENT 1:
  // The application MUST ALWAYS start from the LOGIN PAGE when opened.
  // We check sessionStorage (so an active tab refresh retains session, but a new window starts logged out).
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const saved = sessionStorage.getItem('mineguard_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/login';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  // Sync route on mount and handle route protection
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname || '/';

      if (!user) {
        // Unauthenticated users are strictly restricted to /login
        if (path !== '/login') {
          window.history.replaceState(null, '', '/login');
          setCurrentPath('/login');
        } else {
          setCurrentPath('/login');
        }
      } else {
        // Authenticated users
        if (path === '/' || path === '/login') {
          window.history.replaceState(null, '', '/dashboard');
          setCurrentPath('/dashboard');
        } else {
          setCurrentPath(path);
        }
      }
    };

    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [user]);

  // Navigate helper
  const navigateTo = (pathOrTab: string) => {
    if (!user) {
      window.history.replaceState(null, '', '/login');
      setCurrentPath('/login');
      return;
    }

    const route = pathOrTab.startsWith('/')
      ? pathOrTab
      : TAB_TO_ROUTE[pathOrTab as NavigationTab] || '/dashboard';

    window.history.pushState(null, '', route);
    setCurrentPath(route);
  };

  const handleLogin = (session: UserSession) => {
    setUser(session);
    try {
      sessionStorage.setItem('mineguard_auth', JSON.stringify(session));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
    window.history.pushState(null, '', '/dashboard');
    setCurrentPath('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    try {
      sessionStorage.removeItem('mineguard_auth');
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
    // Prevent back-button restoration
    window.history.replaceState(null, '', '/login');
    setCurrentPath('/login');
  };

  // If unauthenticated: always show the Login Page
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Determine active tab from URL path
  const currentTab: NavigationTab = ROUTE_TO_TAB[currentPath] || 'dashboard';
  const pageTitle = TAB_PAGE_TITLES[currentTab] || 'Mine Overview';

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#22C55E]/20 selection:text-[#22C55E]">
      {/* Top Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        pageTitle={pageTitle}
        activeSector={user.sector}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onOpenProfileModal={() => setProfileModalOpen(true)}
        onOpenSettingsTab={() => navigateTo('/settings')}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex">
          <Sidebar
            currentTab={currentTab}
            onSelectTab={(tab) => navigateTo(tab)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-[#07111F]/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div className="relative z-10">
              <Sidebar
                currentTab={currentTab}
                onSelectTab={(tab) => {
                  navigateTo(tab);
                  setMobileMenuOpen(false);
                }}
                collapsed={false}
                onToggleCollapse={() => {}}
                isMobileOverlay={true}
                onCloseMobile={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Center Main Stage Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-industrial-canvas bg-subtle-grid">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'dashboard' && (
              <DashboardPage user={user} onNavigate={(tab) => navigateTo(tab)} />
            )}
            {currentTab === 'monitoring' && <LiveMonitoringPlaceholder />}
            {currentTab === 'sensors' && <SensorMonitoringPlaceholder />}
            {currentTab === 'map' && <MineMapPlaceholder />}
            {currentTab === 'rover' && <RoverPlaceholder />}
            {currentTab === 'missions' && <MissionsPlaceholder />}
            {currentTab === 'workers' && <WorkersPlaceholder />}
            {currentTab === 'hazards' && <HazardsPlaceholder />}
            {currentTab === 'incidents' && <IncidentsPlaceholder />}
            {currentTab === 'emergency' && (
              <EmergencyPlaceholder onNavigateToTab={(tab) => navigateTo(tab)} />
            )}
            {currentTab === 'ai-assistant' && <AIAssistantPlaceholder />}
            {currentTab === 'analytics' && <AnalyticsPlaceholder />}
            {currentTab === 'reports' && <ReportsPlaceholder />}
            {currentTab === 'settings' && <SettingsPlaceholder />}
          </div>
        </main>
      </div>

      {/* User Profile Modal */}
      {profileModalOpen && (
        <ProfileModal
          user={user}
          onClose={() => setProfileModalOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
