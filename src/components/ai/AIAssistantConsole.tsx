import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Terminal, 
  Bot, 
  User, 
  ShieldCheck, 
  AlertTriangle,
  Compass,
  ArrowRight
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  telemetryEvidence?: { label: string; value: string }[];
  recommendation?: string;
}

const SUGGESTED_QUESTIONS = [
  'What is the current mine status?',
  'Why is Tunnel B high risk?',
  'Which worker has the highest rescue priority?',
  'Summarize the current incident.',
  'What changed during the last 30 minutes?',
];

const PRESET_ANSWERS: Record<string, { text: string; evidence: { label: string; value: string }[]; recommendation: string }> = {
  'What is the current mine status?': {
    text: 'Aggregate underground safety level is currently evaluated as SAFE (Normal Operational Grade). Core atmospheric baselines across Tunnel A and main shaft corridors indicate zero critical exceedances.',
    evidence: [
      { label: 'Aggregate Risk', value: 'SAFE (Level 0)' },
      { label: 'Methane (CH4)', value: '0.42% (Limit 1.25%)' },
      { label: 'Oxygen (O2)', value: '20.8% (Optimal)' },
      { label: 'Mine Temp', value: '24.6 °C (Stable)' },
    ],
    recommendation: 'Maintain continuous automated sensor sweeps. No human evacuation required at this time.',
  },
  'Why is Tunnel B high risk?': {
    text: 'Tunnel B at Section 4 is currently marked with a CAUTION/WARNING flag due to a mild ventilation velocity drop at Shaft 2 (logged at 1.8 m/s vs standard 2.2 m/s), which has caused a minor local accumulation of CH4 to 0.58%.',
    evidence: [
      { label: 'Affected Sector', value: 'Tunnel B · Section 4' },
      { label: 'Local CH4', value: '0.58% (Normal < 1.25%)' },
      { label: 'Air Velocity', value: '1.8 m/s (-18% variance)' },
      { label: 'Personnel Present', value: '0 (Sector Unoccupied)' },
    ],
    recommendation: 'Dispatch ROVER-01 forward scout to verify whether an air regulator curtain is partially obstructed.',
  },
  'Which worker has the highest rescue priority?': {
    text: 'Based on spatial proximity to the Tunnel B airflow variance, Worker W-02 (Anil Murmu at Junction 1) is geographically nearest (approximately 110m away). However, all 3 workers are currently located inside designated safe breathing zones with stable biometric indicators.',
    evidence: [
      { label: 'Worker W-02 (Junction 1)', value: 'Priority #1 (Precautionary)' },
      { label: 'Worker W-03 (Tunnel A Sec 4)', value: 'Priority #2 (160m distance)' },
      { label: 'Worker W-01 (Safe Haven)', value: 'Priority #3 (Secure Bunker)' },
    ],
    recommendation: 'Instruct Worker W-02 via radio to hold position at Junction 1 and not advance into Tunnel B until ROVER-01 finishes reconnaissance.',
  },
  'Summarize the current incident.': {
    text: 'Incident #INC-204 involves an airflow fluctuation at Shaft 2 intersection. Local gas sensors detected an upward CH4 trend to 0.58%. The incident has been acknowledged by the control operator; ROVER-01 is staged for autonomous inspection.',
    evidence: [
      { label: 'Incident ID', value: '#INC-204' },
      { label: 'Duration', value: '18 minutes' },
      { label: 'Status', value: 'Under Remote Investigation' },
    ],
    recommendation: 'Execute ROVER-01 waypoint path to inspect Shaft 2 fan mechanism.',
  },
  'What changed during the last 30 minutes?': {
    text: 'Over the last 30 minutes, main haulage CH4 rose slightly from 0.38% to 0.42% (normal diurnal fluctuation). Shaft 2 airflow registered a velocity drop at 11:15 IST. No seismic vibrations or thermal runaway detected.',
    evidence: [
      { label: 'CH4 Delta (30m)', value: '+0.04% (Nominal)' },
      { label: 'Temp Delta (30m)', value: '+0.2°C' },
      { label: 'Network Packets', value: '99.4% Delivery' },
    ],
    recommendation: 'Keep 30-minute rolling trend analytics open on the main dashboard.',
  },
};

export const AIAssistantConsole: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-01',
      sender: 'assistant',
      timestamp: '11:30 IST',
      text: 'MineGuard AI operational decision support initialized. Connected to Jharkhand Central Pit 07 telemetry feed. How can I assist your control-room watch?',
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendQuestion = (question: string) => {
    if (!question.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: question,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const match = PRESET_ANSWERS[question] || {
        text: `Analysis based on Pit 07 telemetry: Query regarding "${question}" processed. Current mine atmospheric levels remain in SAFE boundaries with Methane at 0.42% and O2 at 20.8%. Rover-01 is available on standby.`,
        evidence: [
          { label: 'Primary Safety', value: 'SAFE' },
          { label: 'Live Telemetry', value: 'Verified Real-Time' },
        ],
        recommendation: 'Review the Digital Mine Map for spatial validation before dispatching rescue teams.',
      };

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: match.text,
        telemetryEvidence: match.evidence,
        recommendation: match.recommendation,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5 lg:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-lg bg-[#142438] border border-[#22344A] text-[#38BDF8]">
            <Sparkles className="w-6 h-6 text-[#38BDF8]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono font-medium uppercase text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-2 py-0.5 rounded">
                DECISION SUPPORT SYSTEM
              </span>
              <span className="text-xs font-mono text-[#94A3B8]">
                GROUNDED CONTEXT
              </span>
            </div>
            <h1 className="text-xl lg:text-2xl font-semibold text-[#F8FAFC]">
              MineGuard AI Assistant
            </h1>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Operational intelligence answering operator queries without hallucinating sensor data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status="SAFE" text="REASONING MODEL READY" size="sm" />
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-4">
        <span className="text-[11px] font-mono uppercase text-[#94A3B8] tracking-wider block mb-2.5">
          SUGGESTED OPERATIONAL QUESTIONS
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendQuestion(q)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#07111F] hover:bg-[#142438] text-[#F8FAFC] border border-[#22344A] hover:border-[#38BDF8] transition-colors text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5 min-h-[380px] flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto max-h-[460px] pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-[#142438] border border-[#22344A] flex items-center justify-center text-[#38BDF8] shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-4 border ${
                  msg.sender === 'user'
                    ? 'bg-[#142438] border-[#22344A] text-[#F8FAFC]'
                    : 'bg-[#07111F] border-[#22344A] text-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] mb-1.5">
                  <span>{msg.sender === 'user' ? 'CONTROL OPERATOR' : 'MINEGUARD AI'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="text-xs leading-relaxed text-[#F8FAFC]">{msg.text}</p>

                {/* Grounded telemetry proof */}
                {msg.telemetryEvidence && (
                  <div className="mt-3 pt-2.5 border-t border-[#22344A]/80">
                    <span className="text-[10px] font-mono uppercase text-[#94A3B8] block mb-1.5">
                      OBSERVED TELEMETRY EVIDENCE
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {msg.telemetryEvidence.map((ev, i) => (
                        <div key={i} className="p-2 rounded bg-[#101D2D] border border-[#22344A]">
                          <span className="text-[9px] font-mono text-[#94A3B8] block">{ev.label}</span>
                          <span className="text-xs font-mono font-medium text-[#F8FAFC]">{ev.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tactical Recommendation */}
                {msg.recommendation && (
                  <div className="mt-2.5 p-2.5 rounded-lg bg-[#142438]/70 border border-[#22344A] text-xs">
                    <span className="text-[10px] font-mono uppercase text-[#22C55E] block mb-0.5">
                      TACTICAL RECOMMENDATION
                    </span>
                    <p className="text-[#F8FAFC]">{msg.recommendation}</p>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#142438] border border-[#22344A] flex items-center justify-center text-[#94A3B8] shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono pl-10">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
              <span>Analyzing Pit 07 telemetry and synthesizing recommendation...</span>
            </div>
          )}
        </div>

        {/* Query Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuestion(inputQuery);
          }}
          className="mt-4 pt-3 border-t border-[#22344A] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask a technical or operational question regarding mine conditions..."
            className="flex-1 bg-[#07111F] border border-[#22344A] rounded-lg px-4 py-2.5 text-xs text-[#F8FAFC] placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#38BDF8] font-mono transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#22C55E] to-[#38BDF8] text-[#07111F] font-semibold text-xs flex items-center gap-1.5 transition-opacity hover:opacity-95 disabled:opacity-40"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
