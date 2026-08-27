import React, { useState } from 'react';
import {
  User,
  Settings,
  Bell,
  HelpCircle,
  FileCheck,
  Shield,
  ChevronRight,
  Target,
  Clock,
  Sparkles,
  Info,
  Building,
} from 'lucide-react';
import { UserProfile } from '../types';

interface MoreScreenProps {
  user: UserProfile;
  onOpenProfile: () => void;
  onOpenWizard: () => void;
}

export const MoreScreen: React.FC<MoreScreenProps> = ({
  user,
  onOpenProfile,
  onOpenWizard,
}) => {
  const [notiDeadline, setNotiDeadline] = useState(true);
  const [notiExpiry, setNotiExpiry] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState(user.targetSector);

  const targets = [
    '2024년 하반기 공기업 채용 기준',
    '2024년 대기업 IT/테크 채용 기준',
    '2024년 금융권 공공기관 채용 기준',
    '2024년 외국계 테크 기업 기준',
  ];

  return (
    <div className="space-y-5 pb-28 animate-fadeIn">
      {/* Page Title Header */}
      <div className="pt-2 px-1">
        <h1 className="text-3xl font-extrabold text-[#002045] tracking-tight">
          더보기
        </h1>
        <p className="text-xs text-[#64748B] mt-1 font-normal">
          진단 목표 설정, 알림 및 계정 환경을 관리합니다.
        </p>
      </div>

      {/* User Profile Mini Card */}
      <section
        onClick={onOpenProfile}
        className="bg-white rounded-xl p-4 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)] flex items-center justify-between cursor-pointer hover:border-[#D6E3FF] transition-all"
      >
        <div className="flex items-center gap-3.5">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border border-[#CBD5E1]"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base font-bold text-[#1A1C1E]">{user.name}</h2>
              <span className="text-[10px] bg-[#EEF4FF] text-[#1960A3] font-bold px-1.5 py-0.5 rounded">
                인증회원
              </span>
            </div>
            <p className="text-xs text-[#718096] mt-0.5">
              {user.education.school} • {user.education.degree} ({user.education.major})
            </p>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
      </section>

      {/* Target Setting Section */}
      <section className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)]">
        <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
          <Target className="w-4 h-4 text-[#1960A3]" />
          <h2 className="text-[15px] font-bold text-[#1A1C1E]">목표 채용 기준 설정</h2>
        </div>

        <div className="pt-3 space-y-2">
          {targets.map((t) => (
            <label
              key={t}
              className={`flex items-center justify-between p-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                selectedTarget === t
                  ? 'border-[#002045] bg-[#FAF9FD] text-[#002045]'
                  : 'border-[#EDF2F7] text-[#4A5568] hover:bg-[#F8FAFC]'
              }`}
            >
              <span>{t}</span>
              <input
                type="radio"
                name="target-sector"
                checked={selectedTarget === t}
                onChange={() => setSelectedTarget(t)}
                className="accent-[#002045]"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)]">
        <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
          <Bell className="w-4 h-4 text-[#1960A3]" />
          <h2 className="text-[15px] font-bold text-[#1A1C1E]">스마트 알림 설정</h2>
        </div>

        <div className="divide-y divide-[#F1F5F9] text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-[#1A1C1E]">어학/자격증 만료 사전 알림</div>
              <div className="text-[#718096] mt-0.5">유효기간 만료 3개월 전 갱신 안내</div>
            </div>
            <input
              type="checkbox"
              checked={notiExpiry}
              onChange={(e) => setNotiExpiry(e.target.checked)}
              className="w-4 h-4 accent-[#002045]"
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-[#1A1C1E]">적합 기업 공고 마감 임박 알림</div>
              <div className="text-[#718096] mt-0.5">적합도 80% 이상 채용 공고 마감 D-3 알림</div>
            </div>
            <input
              type="checkbox"
              checked={notiDeadline}
              onChange={(e) => setNotiDeadline(e.target.checked)}
              className="w-4 h-4 accent-[#002045]"
            />
          </div>
        </div>
      </section>

      {/* Service Info & Help */}
      <section className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)] space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
          <Info className="w-4 h-4 text-[#1960A3]" />
          <h2 className="text-[15px] font-bold text-[#1A1C1E]">서비스 안내</h2>
        </div>

        <div className="space-y-2 text-xs text-[#4A5568]">
          <div className="flex items-start gap-2 bg-[#F8FAFC] p-3 rounded-lg">
            <Sparkles className="w-4 h-4 text-[#1960A3] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1A1C1E]">진단 데이터 산출 기준</span>
              <p className="mt-0.5 text-[#64748B] leading-relaxed">
                공공기관 경영정보 공개시스템(ALIO) 및 주요 100대 기업의 과거 3개년 최종 합격자 스펙 정량 데이터를 기반으로 인공지능 매칭 알고리즘이 점수를 도출합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
