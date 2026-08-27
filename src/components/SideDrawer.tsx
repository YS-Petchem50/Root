import React from 'react';
import {
  X,
  UserCheck,
  BarChart3,
  Search,
  MoreHorizontal,
  GraduationCap,
  ShieldCheck,
  BookmarkCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { TabType, UserProfile } from '../types';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenWizard: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  onClose,
  user,
  currentTab,
  onSelectTab,
  onOpenWizard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 left-0 max-w-[280px] w-full bg-white shadow-2xl flex flex-col z-10 animate-slideRight">
        {/* Top Header */}
        <div className="p-5 border-b border-[#EDF2F7] flex items-center justify-between bg-[#002045] text-white">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-white/80"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="font-bold text-sm text-white">{user.name} 님</h2>
              <p className="text-[11px] text-[#ADC7F7] mt-0.5">
                {user.education.school} ({user.education.degree})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Readiness Pill */}
        <div className="p-4 bg-[#FAF9FD] border-b border-[#EDF2F7]">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#4A5568]">스펙 진단 준비도</span>
            <span className="font-bold text-[#002045]">{user.readinessPercentage}%</span>
          </div>
          <div className="w-full bg-[#EDF2F7] rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-[#002045] h-full rounded-full"
              style={{ width: `${user.readinessPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Menu Navigation Items */}
        <div className="flex-1 p-3 space-y-1 overflow-y-auto text-sm">
          <button
            onClick={() => {
              onSelectTab('home');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'home'
                ? 'bg-[#EEF4FF] text-[#002045] font-bold'
                : 'text-[#4A5568] hover:bg-[#F8FAFC]'
            }`}
          >
            <Search className="w-4 h-4 text-[#1960A3]" />
            <span>기업 검색 및 매칭</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('spec');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'spec'
                ? 'bg-[#EEF4FF] text-[#002045] font-bold'
                : 'text-[#4A5568] hover:bg-[#F8FAFC]'
            }`}
          >
            <UserCheck className="w-4 h-4 text-[#1960A3]" />
            <span>내 스펙 관리</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('diagnosis');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'diagnosis'
                ? 'bg-[#EEF4FF] text-[#002045] font-bold'
                : 'text-[#4A5568] hover:bg-[#F8FAFC]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#1960A3]" />
            <span>진단 결과 리포트</span>
          </button>

          <button
            onClick={() => {
              onSelectTab('more');
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'more'
                ? 'bg-[#EEF4FF] text-[#002045] font-bold'
                : 'text-[#4A5568] hover:bg-[#F8FAFC]'
            }`}
          >
            <MoreHorizontal className="w-4 h-4 text-[#1960A3]" />
            <span>더보기 및 설정</span>
          </button>

          <div className="pt-3 my-2 border-t border-[#F1F5F9]">
            <button
              onClick={() => {
                onClose();
                onOpenWizard();
              }}
              className="w-full py-2.5 px-3 bg-[#FAF9FD] border border-[#DCE9FC] text-[#002045] text-xs font-bold rounded-lg hover:bg-[#EEF4FF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1960A3]" />
              <span>새 스펙 추가하기</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EDF2F7] bg-[#FAF9FD] text-[11px] text-[#718096]">
          <p className="font-bold text-[#1A1C1E]">리크루트 진단</p>
          <p className="mt-0.5">공기업 & 주요 대기업 맞춤형 취업 진단</p>
        </div>
      </div>
    </div>
  );
};
