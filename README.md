# MINEGUARD AI - Stage 1 (Industrial UI Redesign)
## AI-Powered Underground Mine Safety, Monitoring & Rescue System
**Smart India Hackathon (SIH) Problem Statement ID: 26039**  
**Organization:** Government of Jharkhand • Department of Higher & Technical Education  
**Category:** Hardware • **Theme:** Smart Automation

---

## 🎨 Professional Industrial Design System

The UI follows a clean, dark industrial control-room palette with no visual clutter:
- **Primary Background**: `#07111F` (Deep Navy)
- **Secondary Background**: `#0B1726` (Dark Slate)
- **Card Background**: `#101D2D` (Dark Surface)
- **Elevated Card**: `#142438`
- **Border**: `#22344A` (Subtle boundary)
- **Primary Text**: `#F1F5F9`
- **Secondary Text**: `#94A3B8`
- **Primary Accent**: `#22C55E` (Safe / Normal)
- **Secondary Accent**: `#38BDF8` (Information / Communication)
- **Warning**: `#F59E0B` (Caution)
- **Critical**: `#EF4444` (Emergency)
- **Accent Gradient**: `#22C55E` → `#38BDF8` (Used selectively on primary action buttons & highlights)

---

## 📐 Structured Dashboard Grid (4 Rows)

1. **Row 1 - Overall Status Banner**:
   - `MINE STATUS`: SAFE (All Systems Nominal)
   - `ACTIVE ALERTS`: Pending count with direct shortcut to Hazard console.
2. **Row 2 - Key Environmental Indicators**:
   - `GAS (CH4)`: 0.42% with mini sparkline trend, % change, and status indicator.
   - `TEMPERATURE`: 24.6°C with mini sparkline trend and safe-zone limits.
   - `OXYGEN (O2)`: 20.8% with optimal concentration trend.
3. **Row 3 - Spatial Tracking & Telemetry**:
   - `MINE DIGITAL MAP`: 2D technical underground schematic of Jharkhand Pit 07 with Rover, Worker beacons, Caution zone, and Safe staging corridor.
   - `ROVER STATUS`: ROVER-01 battery bar, coordinates, signal dBm, and teleoperation trigger.
4. **Row 4 - Trend Analytics & Incident Queue**:
   - `ATMOSPHERIC TREND`: Interactive 30-minute SVG multi-point trend analysis for CH4, CO, and Temp.
   - `ACTIVE ALERTS TIMELINE`: Clean, chronological list with small colored status dots and single-click acknowledgment.

---

## 🧭 Categorized Sidebar Navigation
- **OVERVIEW**: Main Dashboard
- **MONITORING**: Live Monitoring, Sensors, Mine Map
- **OPERATIONS**: Rover, Missions, Workers
- **SAFETY**: Hazards, Incidents, Emergency Mode
- **INTELLIGENCE**: AI Assistant, Analytics, Reports
- **SYSTEM**: Settings

---

## 💻 Running the Application

```cmd
:: Install dependencies (if not already done)
npm install

:: Start full-stack development server
npm run dev
```

Open **`http://localhost:3000`** in your browser.
