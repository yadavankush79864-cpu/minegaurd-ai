import React from 'react';
import { LucideIcon, Layers, Terminal, CheckCircle2 } from 'lucide-react';

interface SectionPlaceholderProps {
  title: string;
  subtitle: string;
  stageName: string;
  stageNumber: number;
  icon: LucideIcon;
  description: string;
  plannedFeatures: string[];
  sihContext: string;
  sampleEndpoint?: string;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({
  title,
  subtitle,
  stageName,
  stageNumber,
  icon: Icon,
  description,
  plannedFeatures,
  sihContext,
  sampleEndpoint,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-[#142438] border border-[#22344A] text-[#22C55E] shrink-0">
              <Icon className="w-6 h-6 text-[#22C55E]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2 py-0.5 rounded">
                  {stageName} (Stage {stageNumber})
                </span>
                <span className="text-[11px] font-mono text-[#94A3B8]">
                  FRAMEWORK INITIALIZED
                </span>
              </div>
              <h1 className="text-xl lg:text-2xl font-semibold text-[#F1F5F9] tracking-tight">
                {title}
              </h1>
              <p className="text-xs lg:text-sm text-[#94A3B8] mt-1 max-w-2xl font-normal">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center px-3 py-1.5 rounded-md bg-[#07111F] border border-[#22344A] text-xs">
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[#94A3B8]">Status:</span>
            <span className="text-[#22C55E] font-mono font-medium">Ready for Stage {stageNumber}</span>
          </div>
        </div>
      </div>

      {/* Grid: Planned Specs & SIH Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Capabilities */}
        <div className="lg:col-span-2 bg-[#101D2D] border border-[#22344A] rounded-xl p-5 lg:p-6">
          <h3 className="text-sm font-semibold text-[#F1F5F9] mb-1">
            Planned Capabilities for This Module
          </h3>
          <p className="text-xs text-[#94A3B8] mb-4">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {plannedFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                <span className="text-xs text-[#F1F5F9] font-normal leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {sampleEndpoint && (
            <div className="mt-5 p-3.5 rounded-lg bg-[#07111F] border border-[#22344A] font-mono text-xs">
              <div className="flex items-center justify-between text-[#94A3B8] mb-1.5">
                <span className="flex items-center gap-1.5 text-[#F1F5F9] text-xs">
                  <Terminal className="w-3.5 h-3.5 text-[#22C55E]" />
                  Planned REST Endpoint
                </span>
                <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-1.5 py-0.5 rounded">
                  STAGE {stageNumber}
                </span>
              </div>
              <code className="text-[#38BDF8] text-[11px] block truncate">{sampleEndpoint}</code>
            </div>
          )}
        </div>

        {/* Right Column: SIH Context */}
        <div className="bg-[#101D2D] border border-[#22344A] rounded-xl p-5 lg:p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#22C55E] uppercase tracking-wider block mb-1">
              Smart India Hackathon 2024 / 2025
            </span>
            <h3 className="text-sm font-semibold text-[#F1F5F9] mb-3">
              SIH Problem #26039 Alignment
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed bg-[#07111F] p-3.5 rounded-lg border border-[#22344A]">
              {sihContext}
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-[#22344A] text-[11px] text-[#94A3B8] font-mono">
            <span>Govt of Jharkhand • Dept of Higher & Tech Education</span>
          </div>
        </div>
      </div>
    </div>
  );
};
