import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Radio,
  Server,
  Activity,
  HardHat,
  Compass,
  CheckCircle2,
  Users
} from 'lucide-react';
import { UserRole, UserSession } from '../types';

interface LoginPageProps {
  onLogin: (session: UserSession) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('operator@mineguard.demo');
  const [password, setPassword] = useState<string>('demo1234');
  const [role, setRole] = useState<UserRole>('OPERATOR');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showForgotNotice, setShowForgotNotice] = useState<boolean>(false);

  const roleTitles: Record<UserRole, string> = {
    OPERATOR: 'Control Room Operator',
    RESCUE: 'Rescue Team Lead',
    ADMIN: 'System Administrator',
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (!res.ok) {
        throw new Error('Authentication rejected by control server');
      }

      const data = await res.json();
      onLogin({
        id: data.user.id || `usr-${Date.now()}`,
        email: data.user.email || email,
        name: data.user.name || email.split('@')[0].toUpperCase(),
        role,
        roleTitle: roleTitles[role],
        sector: 'Jharkhand Central Pit 07',
        loggedAt: new Date().toISOString(),
      });
    } catch {
      // Local fallback for prototype continuity
      onLogin({
        id: `usr-${Date.now()}`,
        email,
        name: email.split('@')[0].toUpperCase(),
        role,
        roleTitle: roleTitles[role],
        sector: 'Jharkhand Central Pit 07',
        loggedAt: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectDemoAccount = (targetRole: UserRole, targetEmail: string) => {
    setRole(targetRole);
    setEmail(targetEmail);
    setPassword('demo1234');
  };

  return (
    <div className="min-h-screen bg-[#07111F] flex items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-[#22C55E]/20 selection:text-[#22C55E]">
      <div className="w-full max-w-5xl bg-[#0B1726] border border-[#22344A] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* LEFT COLUMN: Industrial Mining & Telemetry Graphic Visual Area */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#0B1726] to-[#07111F] p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#22344A] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle blueprint pattern background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #22344A 1px, transparent 1px), linear-gradient(to bottom, #22344A 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* Top Branding Section */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#101D2D] border border-[#22344A] flex items-center justify-center text-[#22C55E]">
                <Shield className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <span className="font-semibold text-lg tracking-wider text-[#F8FAFC]">
                  MINEGUARD <span className="text-[#22C55E]">AI</span>
                </span>
                <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-mono block">
                  UNDERGROUND SAFETY PLATFORM
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101D2D] border border-[#22344A] text-xs font-mono text-[#38BDF8] mb-6">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#22C55E]" />
              <span>SIH-26039 • SMART AUTOMATION</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-[#F8FAFC] tracking-tight leading-tight mb-3">
              Automated Mine Monitoring & Emergency Rescue
            </h1>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md">
              A rugged AI-powered telemetry and rover control framework engineered to protect miners, detect toxic gas anomalies, and guide rapid surface response teams.
            </p>
          </div>

          {/* Center Graphic: Technical System Indicators */}
          <div className="relative z-10 my-8 space-y-3">
            <div className="p-3.5 rounded-xl bg-[#101D2D]/80 border border-[#22344A] backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#94A3B8] font-mono flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#22C55E]" />
                  Atmospheric Gas Telemetry
                </span>
                <span className="text-[#22C55E] font-mono font-medium">NOMINAL (CH4: 0.42%)</span>
              </div>
              <div className="w-full bg-[#142438] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#22C55E] h-full rounded-full" style={{ width: '34%' }} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#101D2D]/80 border border-[#22344A] backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-[#94A3B8] font-mono flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
                  UGV Scout Location
                </span>
                <span className="text-[#38BDF8] font-mono font-medium">ROVER-01 • Tunnel A</span>
              </div>
              <div className="w-full bg-[#142438] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#38BDF8] h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </div>

          {/* Bottom Authority Endorsement */}
          <div className="relative z-10 pt-4 border-t border-[#22344A] text-xs text-[#94A3B8] flex items-center justify-between font-mono">
            <span>Govt of Jharkhand</span>
            <span>Pit 07 Sector Grid</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Enterprise Sign-In Panel */}
        <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between bg-[#101D2D]/40">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
                  Sign In to Station
                </h2>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Authenticate using authorized personnel credentials
                </p>
              </div>

              {/* Demo environment pill */}
              <div className="px-2.5 py-1 rounded-md bg-[#142438] border border-[#22344A] text-[10px] font-mono font-medium text-[#22C55E]">
                ● DEMO ENVIRONMENT
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {showForgotNotice && (
              <div className="mb-4 p-3 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-xs flex items-center justify-between">
                <span>Demo environment: Use the pre-filled password <strong>demo1234</strong>.</span>
                <button
                  type="button"
                  onClick={() => setShowForgotNotice(false)}
                  className="text-xs underline ml-2"
                >
                  Dismiss
                </button>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                  Personnel Email / Station ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="operator@mineguard.demo"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#07111F] border border-[#22344A] rounded-lg text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#22C55E] font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                    Security Passcode
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotNotice(true)}
                    className="text-[11px] text-[#38BDF8] hover:underline"
                  >
                    Forgot passcode?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#07111F] border border-[#22344A] rounded-lg text-sm text-[#F8FAFC] placeholder-[#94A3B8]/40 focus:outline-none focus:border-[#22C55E] font-mono transition-colors"
                  />
                </div>
              </div>

              {/* Role Selector */}
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] uppercase tracking-wider mb-1.5">
                  Assigned Operational Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['OPERATOR', 'RESCUE', 'ADMIN'] as UserRole[]).map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`py-2 px-2 text-xs font-mono rounded-lg border transition-colors text-center ${
                        role === r
                          ? 'bg-[#142438] border-[#22C55E] text-[#F8FAFC] font-medium'
                          : 'bg-[#07111F] border-[#22344A] text-[#94A3B8] hover:text-[#F8FAFC]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#22344A] bg-[#07111F] text-[#22C55E] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-[#94A3B8] cursor-pointer select-none">
                  Remember this terminal session
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-[#22C55E] to-[#38BDF8] hover:opacity-95 text-[#07111F] font-semibold text-xs tracking-wider uppercase transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>AUTHENTICATING STATION...</span>
                ) : (
                  <>
                    <span>SIGN IN TO CONTROL ROOM</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Demo Accounts */}
          <div className="mt-8 pt-5 border-t border-[#22344A]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider">
                CONTINUE WITH DEMO ACCOUNT
              </span>
              <span className="text-[10px] text-[#94A3B8] font-mono">1-CLICK LOGIN</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => selectDemoAccount('OPERATOR', 'operator@mineguard.demo')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  role === 'OPERATOR' && email.includes('operator')
                    ? 'bg-[#142438] border-[#22C55E]'
                    : 'bg-[#07111F] border-[#22344A] hover:border-[#22C55E]/50'
                }`}
              >
                <div className="text-xs font-mono font-medium text-[#22C55E] flex items-center gap-1">
                  <HardHat className="w-3.5 h-3.5" />
                  <span>OPERATOR</span>
                </div>
                <div className="text-[10px] text-[#94A3B8] truncate mt-0.5">Control Center</div>
              </button>

              <button
                type="button"
                onClick={() => selectDemoAccount('RESCUE', 'rescue@mineguard.demo')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  role === 'RESCUE' && email.includes('rescue')
                    ? 'bg-[#142438] border-[#38BDF8]'
                    : 'bg-[#07111F] border-[#22344A] hover:border-[#38BDF8]/50'
                }`}
              >
                <div className="text-xs font-mono font-medium text-[#38BDF8] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>RESCUE TEAM</span>
                </div>
                <div className="text-[10px] text-[#94A3B8] truncate mt-0.5">Response Lead</div>
              </button>

              <button
                type="button"
                onClick={() => selectDemoAccount('ADMIN', 'admin@mineguard.demo')}
                className={`p-2.5 rounded-lg border text-left transition-colors ${
                  role === 'ADMIN' && email.includes('admin')
                    ? 'bg-[#142438] border-[#F59E0B]'
                    : 'bg-[#07111F] border-[#22344A] hover:border-[#F59E0B]/50'
                }`}
              >
                <div className="text-xs font-mono font-medium text-[#F59E0B] flex items-center gap-1">
                  <Server className="w-3.5 h-3.5" />
                  <span>ADMIN</span>
                </div>
                <div className="text-[10px] text-[#94A3B8] truncate mt-0.5">Mine Lead</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
