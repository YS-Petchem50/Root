import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onOpenMenu: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenMenu, onOpenProfile }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EDF2F7] px-4 py-3.5 transition-all">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left: Hamburger Menu */}
        <button
          id="btn-header-menu"
          onClick={onOpenMenu}
          aria-label="메뉴 열기"
          className="p-2 -ml-2 text-[#1A1C1E] hover:bg-[#F7FAFC] active:bg-[#EDF2F7] rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6 text-[#1A1C1E]" />
        </button>

        {/* Center: App Title (Recruit Diagnosis) */}
        <div className="flex items-center gap-1.5 font-bold text-lg text-[#002045] tracking-tight">
          <span className="bg-[#1A365D] text-white text-xs px-2 py-0.5 rounded font-semibold">AI</span>
          <h1 className="text-[17px] font-bold text-[#002045] tracking-tight">리크루트 진단</h1>
        </div>

        {/* Right: Notification & Profile Avatar */}
        <div className="flex items-center gap-2">
          <button
            id="btn-header-profile"
            onClick={onOpenProfile}
            aria-label="프로필 정보 보기"
            className="relative flex items-center focus:outline-none ring-2 ring-[#2B6CB0]/20 hover:ring-[#2B6CB0] rounded-full transition-all cursor-pointer"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-white shadow-xs"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
