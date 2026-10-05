import React from 'react';
import {
  MapPin,
  Activity,
  Bot,
  AlertTriangle,
  Users,
  Compass,
  Sparkles,
  FileText,
  Settings,
  Radio,
  Flame,
  ShieldAlert,
  BarChart3,
} from 'lucide-react';
import { SectionPlaceholder } from './SectionPlaceholder';
import { EmergencyConsole } from '../emergency/EmergencyConsole';
import { AIAssistantConsole } from '../ai/AIAssistantConsole';

export const LiveMonitoringPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Live Underground Mine Monitoring"
    subtitle="Simulated real-time camera feeds, telemetry streams, and environmental health across mine sectors."
    stageName="Live Monitoring Console"
    stageNumber={3}
    icon={Radio}
    description="Dedicated multi-camera monitoring console displaying simulated optical, thermal, and night-vision streams alongside live telemetry."
    plannedFeatures={[
      'Simulated Optical & Thermal FLIR video player',
      'Telemetry stream overlay (CH4, CO, O2, Temp)',
      'Underground ventilation airflow status',
      'One-click Emergency Protocol activation',
    ]}
    sihContext="In Jharkhand underground coal mines, low visibility and toxic gas pockets require unified camera and sensor streaming to the surface control room."
    sampleEndpoint="GET /api/monitoring/stream & GET /api/telemetry/live"
  />
);

export const MineMapPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Underground Mine Digital Map & Spatial Routing"
    subtitle="Interactive 2D spatial grid showing Jharkhand coal seams, tunnel intersections, hazardous pockets, and live assets."
    stageName="Mine Map & Spatial Routing"
    stageNumber={5}
    icon={MapPin}
    description="This module visualizes underground tunnels (A, B, C, D), Shafts 1 & 2, safe evacuation corridors, and real-time asset coordinates."
    plannedFeatures={[
      'Underground Risk Heatmap (CH4, CO, Temp overlay)',
      'Real-time Rover-01 location marker with vector path',
      'Worker thermal signature beacons with status flags',
      'Safe evacuation route calculator avoiding high gas zones',
    ]}
    sihContext="Spatial awareness is critical for surface controllers before dispatching human rescue teams into collapsed or gas-filled shafts."
    sampleEndpoint="GET /api/map/grid & GET /api/map/risk-heatmap"
  />
);

export const SensorMonitoringPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Atmospheric & Environmental Telemetry Analytics"
    subtitle="High-precision telemetry logging and time-series trend analysis from underground sensor stations."
    stageName="Live Telemetry Dashboard"
    stageNumber={4}
    icon={Activity}
    description="Continuous monitoring for Methane (CH4), Carbon Monoxide (CO), Oxygen (O2), Carbon Dioxide (CO2), Temperature, Humidity, and Pressure."
    plannedFeatures={[
      'Interactive time-series charts (10m, 30m, 1h, shift duration)',
      'Early Warning Trend Detection (gradient rate analysis)',
      'Configurable demo sensor safety thresholds',
      'Low oxygen & asphyxiation hazard indicators',
    ]}
    sihContext="Continuous monitoring of toxic and combustible gases prevents secondary explosions and provides empirical data during post-incident investigations."
    sampleEndpoint="GET /api/telemetry?timeframe=30m&sensor=ch4,co,o2"
  />
);

export const RoverPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Rugged Ground Rover / Aerial Drone Teleoperation"
    subtitle="Control telemetry, simulated camera feeds, thermal vision, and teleoperation console."
    stageName="Rover Control & Simulation"
    stageNumber={5}
    icon={Bot}
    description="Hardware telemetry interface for unmanned ground vehicles (UGVs) equipped with gas sensors and thermal imaging payloads."
    plannedFeatures={[
      'Simulated Optical, Night Vision & Thermal FLIR video feeds',
      'Navigation controls: Forward, Reverse, Pivot, Emergency Stop',
      'Battery percentage, motor temperature, and RF signal dBm',
      'Autonomous return-to-base (RTB) protocol',
    ]}
    sihContext="UGVs replace human first-responders in unstable, toxic, or flooded shafts, gathering ground-truth intelligence without risking lives."
    sampleEndpoint="POST /api/rovers/ROVER-01/command"
  />
);

export const HazardsPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Intelligent Hazard Detection & Multi-Risk Escalation"
    subtitle="Rule-based anomaly detection, toxic gas pocket alerts, and structural risk monitoring."
    stageName="Hazard Detection System"
    stageNumber={6}
    icon={AlertTriangle}
    description="Automated risk classification engine evaluating sensor telemetry against safety thresholds to flag Low, Medium, High, and Critical hazards."
    plannedFeatures={[
      'Compound hazard escalation (e.g. Rising CH4 + Heat Spike = CRITICAL)',
      'Geographic hazard tagging by Tunnel and Section',
      'Operator acknowledgement and emergency dispatch triggers',
      'Audio-visual alarm cues for control-room operators',
    ]}
    sihContext="Eliminates operator alert fatigue by correlating multi-sensor cues into actionable hazard states with clear escalation pathways."
    sampleEndpoint="GET /api/hazards & POST /api/hazards/acknowledge"
  />
);

export const IncidentsPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Mine Incident Management & Event Logging"
    subtitle="Historical incident records, response times, and containment logs."
    stageName="Incident Management"
    stageNumber={6}
    icon={Flame}
    description="Centralized incident management console to log, track, and close underground hazardous events and structural incidents."
    plannedFeatures={[
      'Incident lifecycle management (Open, Investigating, Contained, Closed)',
      'Time-stamped audit logs with operator signatures',
      'Automated incident severity scoring',
      'Direct link to dispatch rescue missions',
    ]}
    sihContext="Provides complete traceability for DGMS regulatory inquiries and post-incident investigation boards."
    sampleEndpoint="GET /api/incidents & POST /api/incidents/create"
  />
);

// Emergency mode displays the dedicated EmergencyConsole
export const EmergencyPlaceholder: React.FC<{ onNavigateToTab?: (tab: string) => void }> = ({ onNavigateToTab }) => (
  <EmergencyConsole onNavigateToTab={onNavigateToTab} />
);

export const WorkersPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Worker Rescue & Location Triage System"
    subtitle="Thermal signature tracking, trapped personnel status, and AI-assisted rescue priority."
    stageName="Worker Rescue Module"
    stageNumber={7}
    icon={Users}
    description="Tracks underground personnel positions through simulated RFID and thermal vision beacons, triaging individuals based on proximity to hazards."
    plannedFeatures={[
      'Worker profile tracking: ID, Section, Distance from Rover',
      'AI-assisted Rescue Priority ranking based on atmospheric risk',
      'Mark as Rescued & Dispatch Rover to Worker actions',
      'Simulated physiological & vital status indicators',
    ]}
    sihContext="Locating trapped miners within the critical 'golden hour' drastically increases survival rates during collapse or flooding events."
    sampleEndpoint="GET /api/workers & POST /api/workers/:id/rescue-priority"
  />
);

export const MissionsPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Mission Management & Emergency Operational Dispatch"
    subtitle="Creation, dispatch, and timeline tracking for underground reconnaissance and rescue sorties."
    stageName="Mission Management & Emergency Dispatch"
    stageNumber={8}
    icon={Compass}
    description="Coordinates tactical rescue plans, assigning rovers to target waypoints with predefined objectives (Recon, Gas Sweep, Worker Extraction)."
    plannedFeatures={[
      'Mission creation wizard with priority level & target tunnel',
      'Live mission timeline with milestone timestamps',
      'Emergency Mode one-click lockdown and alert broadcast',
      'Mission Replay system for post-operational debriefs',
    ]}
    sihContext="Standardizes incident command protocols for the Government of Jharkhand and disaster management authorities."
    sampleEndpoint="GET /api/missions & POST /api/missions/dispatch"
  />
);

// AI Assistant displays the dedicated operational assistant console
export const AIAssistantPlaceholder: React.FC = () => (
  <AIAssistantConsole />
);

export const AnalyticsPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Historical Safety Analytics & Trend Modeling"
    subtitle="Long-term atmospheric patterns, incident frequencies, and mission success metrics."
    stageName="Historical Analytics"
    stageNumber={10}
    icon={BarChart3}
    description="Deep analytics on gas buildup patterns across different mining shifts, seasons, and geological sectors."
    plannedFeatures={[
      'Historical methane accumulation correlation charts',
      'Mission response time benchmarking',
      'Equipment reliability and battery depletion curves',
      'Sector risk indexing across Jharkhand coal seams',
    ]}
    sihContext="Enables preventative safety engineering and optimized ventilation schedules based on historical trend data."
    sampleEndpoint="GET /api/analytics/trends & GET /api/analytics/summary"
  />
);

export const ReportsPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="Incident Reports, Analytics & Regulatory Audit Logs"
    subtitle="Printable incident summaries, historical safety trends, and regulatory compliance reports."
    stageName="Reports & Historical Analytics"
    stageNumber={10}
    icon={FileText}
    description="Generates complete mission debriefs with time-stamped hazard logs, rover telemetry paths, and supervisor sign-offs."
    plannedFeatures={[
      'Exportable and printable incident debrief reports',
      'Historical analytics: Total missions, response times, hazard types',
      'Mine section risk distribution breakdown',
      'Audit log for Directorate General of Mines Safety (DGMS) compliance',
    ]}
    sihContext="Ensures complete transparency and accountability for mine management and regulatory authorities following emergencies."
    sampleEndpoint="GET /api/reports & GET /api/reports/:id/export"
  />
);

export const SettingsPlaceholder: React.FC = () => (
  <SectionPlaceholder
    title="System Configuration & Demo Simulation Control"
    subtitle="Tune safety thresholds, configure mine sectors, and trigger what-if emergency scenarios."
    stageName="System Administration & Simulator Control"
    stageNumber={11}
    icon={Settings}
    description="Administrative control over simulation speed, sensor baseline parameters, user permissions, and what-if incident simulators."
    plannedFeatures={[
      'Demo Safety Threshold customizer (CH4, CO, O2, Temp)',
      'What-If Emergency Scenario trigger (Gas Leak, Fire, Collapse)',
      'Reset Demo Database to initial clean state',
      'Telemetry simulation frequency controls',
    ]}
    sihContext="Allows presenters and evaluators to test various emergency scenarios on demand during hackathon demonstrations."
    sampleEndpoint="POST /api/simulation/start & POST /api/simulation/trigger-emergency"
  />
);
