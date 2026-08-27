import React from 'react';
import { Search, UserCheck, BarChart3, MoreHorizontal } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: '홈',
      icon: Search,
    },
    {
      id: 'spec' as TabType,
      label: '내 스펙',
      icon: UserCheck,
    },
    {
      id: 'diagnosis' as TabType,
      label: '진단 분석',
      icon: BarChart3,
    },
    {
      id: 'more' as TabType,
      label: '더보기',
      icon: MoreHorizontal,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-md border-t border-[#EDF2F7] pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 px-3">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              id={`tab-nav-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center py-1.5 px-1 group transition-all duration-200 cursor-pointer"
            >
              <div
                className={`flex items-center justify-center w-14 h-8 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#DCE9FC] text-[#002045] shadow-xs scale-105'
                    : 'text-[#64748B] hover:text-[#1A365D] hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[11px] mt-1 font-medium transition-colors ${
                  isActive ? 'text-[#002045] font-bold' : 'text-[#74777F]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
