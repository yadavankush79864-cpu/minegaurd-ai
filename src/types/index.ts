export type UserRole = 'OPERATOR' | 'RESCUE' | 'ADMIN';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  sector: string;
  loggedAt: string;
}

export type NavigationTab = 
  // Overview
  | 'dashboard'
  // Monitoring
  | 'monitoring'
  | 'sensors'
  | 'map'
  // Operations
  | 'rover'
  | 'missions'
  | 'workers'
  // Safety
  | 'hazards'
  | 'incidents'
  | 'emergency'
  // Intelligence
  | 'ai-assistant'
  | 'analytics'
  | 'reports'
  // System
  | 'settings';

export type StatusLevel = 'SAFE' | 'WARNING' | 'CRITICAL' | 'INFO';

export interface QuickAlert {
  id: string;
  code: string;
  title: string;
  location: string;
  time: string;
  severity: StatusLevel;
  type: string;
  acknowledged?: boolean;
}

export interface SensorReading {
  id: string;
  name: string;
  symbol: string;
  value: number;
  unit: string;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  status: StatusLevel;
  statusText: string;
  safeRange: string;
  history: number[];
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  category: 'TELEMETRY' | 'ROVER' | 'VENTILATION' | 'SAFETY' | 'PERSONNEL';
  description: string;
  location: string;
  status: StatusLevel;
}

export interface MapMarkerDetail {
  id: string;
  type: 'rover' | 'worker' | 'hazard' | 'safe_zone';
  title: string;
  location: string;
  status: StatusLevel;
  details: { label: string; value: string }[];
  recommendedAction?: string;
}
