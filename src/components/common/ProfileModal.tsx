import React from 'react';
import { X, User, HardHat, Shield, Radio, Key, Clock, MapPin } from 'lucide-react';
import { UserSession } from '../../types';
import { StatusBadge } from './StatusBadge';

interface ProfileModalProps {
  user: UserSession;
  onClose: () => void;
  onLogout: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onLogout }) => {
  return (
    <div className="fixed inset-0 bg-[#07111F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#101D2D] border border-[#22344A] rounded-xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#22344A]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#142438] border border-[#22344A] flex items-center justify-center text-[#38BDF8]">
              <HardHat className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#F8FAFC]">
                Operator Station Credentials
              </h3>
              <p className="text-xs text-[#94A3B8]">
                Authenticated Terminal Profile
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#142438] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Card Content */}
        <div className="my-5 space-y-3 text-xs">
          <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] flex items-center justify-between">
            <span className="text-[#94A3B8]">Personnel Name:</span>
            <span className="text-[#F8FAFC] font-semibold">{user.name}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] flex items-center justify-between">
            <span className="text-[#94A3B8]">Station Email:</span>
            <span className="text-[#F8FAFC] font-mono">{user.email}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] flex items-center justify-between">
            <span className="text-[#94A3B8]">Security Clearance:</span>
            <span className="text-[#22C55E] font-mono font-medium">{user.roleTitle || user.role}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] flex items-center justify-between">
            <span className="text-[#94A3B8]">Assigned Sector:</span>
            <span className="text-[#F8FAFC] font-medium">{user.sector}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] flex items-center justify-between">
            <span className="text-[#94A3B8]">Session Initialized:</span>
            <span className="text-[#94A3B8] font-mono text-[11px]">{new Date(user.loggedAt).toLocaleTimeString()} IST</span>
          </div>

          <div className="p-3 rounded-lg bg-[#07111F] border border-[#22344A] flex items-center justify-between">
            <span className="text-[#94A3B8]">Connection Node:</span>
            <StatusBadge status="SAFE" text="SURFACE GATEWAY ONLINE" size="sm" />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#22344A] flex items-center justify-between">
          <button
            type="button"
            onClick={onLogout}
            className="text-xs text-[#EF4444] hover:underline font-medium"
          >
            End Session & Logout
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#142438] hover:bg-[#1A2E46] border border-[#22344A] text-xs font-medium text-[#F8FAFC] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
