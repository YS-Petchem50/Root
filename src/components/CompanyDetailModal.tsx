import React, { useState } from 'react';
import {
  X,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  DollarSign,
  MapPin,
  BookOpen,
  Users,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Layers,
  GraduationCap,
  Scale,
} from 'lucide-react';
import { CompanyJob, UserProfile } from '../types';

interface CompanyDetailModalProps {
  company: CompanyJob | null;
  user: UserProfile;
  onClose: () => void;
  onNavigateToDiagnosis: () => void;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  user,
  onClose,
  onNavigateToDiagnosis,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'hiring' | 'spec'>('info');

  if (!company) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#EDF2F7] overflow-hidden my-auto animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9] bg-[#FAF9FD]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1960A3] bg-[#EBF8FF] px-2 py-0.5 rounded">
              {company.sectorLabel}
            </span>
            {company.institutionType && (
              <span className="text-xs font-medium text-[#475569] bg-[#F1F5F9] px-2 py-0.5 rounded">
                {company.institutionType}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 text-[#94A3B8] hover:text-[#1A1C1E] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Company Info */}
        <div className="px-6 pt-5 pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center font-extrabold text-base shrink-0 border ${company.logoBg} ${company.logoColor}`}
            >
              {company.companyShort}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1A1C1E]">{company.companyName}</h2>
                <span className="text-xs font-extrabold text-[#1960A3] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#BFDBFE]">
                  적합도 {company.matchingRate}%
                </span>
              </div>
              <p className="text-sm font-semibold text-[#1960A3] mt-0.5">{company.jobTitle}</p>
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-[#64748B] mt-1.5">
                {company.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#94A3B8]" />
                    {company.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#94A3B8]" />
                  마감: {company.deadline}
                </span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-[#E2E8F0] mt-4 -mb-3 text-xs font-bold">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'info'
                  ? 'border-[#002045] text-[#002045]'
                  : 'border-transparent text-[#64748B] hover:text-[#1A1C1E]'
              }`}
            >
              기업 & 보수 정보
            </button>
            <button
              onClick={() => setActiveTab('hiring')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'hiring'
                  ? 'border-[#002045] text-[#002045]'
                  : 'border-transparent text-[#64748B] hover:text-[#1A1C1E]'
              }`}
            >
              채용 단계 & 필기 전형
            </button>
            <button
              onClick={() => setActiveTab('spec')}
              className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'spec'
                  ? 'border-[#002045] text-[#002045]'
                  : 'border-transparent text-[#64748B] hover:text-[#1A1C1E]'
              }`}
            >
              합격 스펙 & 가산점
            </button>
          </div>
        </div>

        {/* Modal Body with Tab Switching */}
        <div className="p-6 space-y-4 max-h-[58vh] overflow-y-auto">
          {activeTab === 'info' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Salary & Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#EDF2F7]">
                  <span className="text-[11px] font-medium text-[#64748B] block">
                    ALIO 공시 신입 초봉
                  </span>
                  <span className="text-base font-extrabold text-[#002045] mt-0.5 block">
                    {company.startingSalary || '약 4,200만원'}
                  </span>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#EDF2F7]">
                  <span className="text-[11px] font-medium text-[#64748B] block">
                    임직원 평균 보수
                  </span>
                  <span className="text-base font-extrabold text-[#1960A3] mt-0.5 block">
                    {company.averageSalary || '약 8,600만원'}
                  </span>
                </div>
              </div>

              {/* Recruitment Scale & Competition */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#EDF2F7]">
                  <span className="text-[#64748B] block text-[11px]">연간 채용 규모</span>
                  <span className="font-semibold text-[#1A1C1E] mt-0.5 block">
                    {company.hiringScale || '정기 상/하반기 공채'}
                  </span>
                </div>
                <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#EDF2F7]">
                  <span className="text-[#64748B] block text-[11px]">전형별 경쟁률</span>
                  <span className="font-semibold text-[#1A1C1E] mt-0.5 block">
                    {company.competitionRate || '서류 20:1 / 최종 70:1'}
                  </span>
                </div>
              </div>

              {/* Regional Incentive */}
              {company.regionalBonus && (
                <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0]">
                  <span className="text-xs font-bold text-[#166534] flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-[#166534]" />
                    지역인재 채용 혜택
                  </span>
                  <p className="text-xs text-[#15803D] leading-relaxed">
                    {company.regionalBonus}
                  </p>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold text-[#475569] uppercase tracking-wider mb-1.5">
                  기관 및 직무 개요
                </h3>
                <p className="text-xs text-[#334155] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#EDF2F7]">
                  {company.description}
                </p>
              </div>

              {/* Links */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                {company.officialWebsite && (
                  <a
                    href={company.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#1960A3] hover:underline font-semibold bg-[#EFF6FF] px-2.5 py-1.5 rounded-lg"
                  >
                    <ExternalLink className="w-3 h-3" />
                    기관 공식 홈페이지
                  </a>
                )}
                {company.alioUrl && (
                  <a
                    href={company.alioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#475569] hover:underline font-semibold bg-[#F1F5F9] px-2.5 py-1.5 rounded-lg"
                  >
                    <ExternalLink className="w-3 h-3" />
                    ALIO 공시 정보
                  </a>
                )}
              </div>
            </div>
          )}

          {activeTab === 'hiring' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Hiring Steps */}
              {company.hiringSteps && company.hiringSteps.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-[#1A1C1E] mb-2 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#1960A3]" />
                    <span>전형 단계별 선발 배수</span>
                  </h3>
                  <div className="space-y-2">
                    {company.hiringSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="bg-[#F8FAFC] p-2.5 rounded-xl border border-[#EDF2F7] flex items-start justify-between"
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#002045] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {step.stepNumber}
                          </span>
                          <div>
                            <div className="text-xs font-bold text-[#1A1C1E]">
                              {step.title}
                            </div>
                            <div className="text-[11px] text-[#64748B] mt-0.5">
                              {step.detail}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-[#1960A3] bg-[#EBF8FF] px-2 py-0.5 rounded shrink-0">
                          {step.ratioOrMultiple}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NCS & Major Exam */}
              <div className="space-y-2.5">
                <div className="bg-[#EFF6FF] p-3 rounded-xl border border-[#BFDBFE]">
                  <span className="text-xs font-bold text-[#1E40AF] block mb-1">
                    NCS 직업기초능력 출제 영역
                  </span>
                  <p className="text-xs text-[#1D4ED8] leading-relaxed font-medium">
                    {company.ncsType || '의사소통, 수리, 문제해결, 자원관리능력'}
                  </p>
                </div>

                <div className="bg-[#FAF5FF] p-3 rounded-xl border border-[#E9D5FF]">
                  <span className="text-xs font-bold text-[#6B21A8] block mb-1">
                    직무수행능력평가 (전공 필기 과목)
                  </span>
                  <p className="text-xs text-[#7E22CE] leading-relaxed font-medium">
                    {company.majorExam || '단일전공 객관식 50문항'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'spec' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Passed Specs Statistics */}
              {company.passedSpecAverage && (
                <div>
                  <h3 className="text-xs font-bold text-[#1A1C1E] mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#1960A3]" />
                    <span>합격자 평균 스펙 (ALIO 및 합격자 빅데이터)</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#EDF2F7]">
                      <span className="text-[#64748B] text-[11px]">TOEIC 평균</span>
                      <span className="font-bold text-[#002045] text-sm block mt-0.5">
                        {company.passedSpecAverage.toeic}점
                      </span>
                    </div>
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#EDF2F7]">
                      <span className="text-[#64748B] text-[11px]">보유 자격증 평균</span>
                      <span className="font-bold text-[#002045] text-sm block mt-0.5">
                        {company.passedSpecAverage.certificatesCount}개
                      </span>
                    </div>
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#EDF2F7]">
                      <span className="text-[#64748B] text-[11px]">NCS 필기 합격 컷오프</span>
                      <span className="font-bold text-[#1960A3] text-sm block mt-0.5">
                        {company.passedSpecAverage.ncsCutoff}점
                      </span>
                    </div>
                    <div className="bg-[#F8FAFC] p-2.5 rounded-lg border border-[#EDF2F7]">
                      <span className="text-[#64748B] text-[11px]">인턴십 유경험 비율</span>
                      <span className="font-bold text-[#1960A3] text-sm block mt-0.5">
                        {company.passedSpecAverage.internRatio}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Points Guide */}
              {company.additionalPointsGuide && company.additionalPointsGuide.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-[#1A1C1E] mb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#10B981]" />
                    <span>서류 전형 가산점 인정표</span>
                  </h3>
                  <div className="space-y-1.5">
                    {company.additionalPointsGuide.map((guide, idx) => (
                      <div
                        key={idx}
                        className="bg-[#F8FAFC] p-2 rounded-lg border border-[#EDF2F7] flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-bold text-[#1A1C1E]">{guide.title}</span>
                          <span className="text-[11px] text-[#64748B] ml-2">
                            {guide.description}
                          </span>
                        </div>
                        <span className="font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded text-[11px] shrink-0">
                          {guide.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Required & Preferred */}
              <div className="space-y-3 pt-2">
                <div>
                  <h4 className="text-xs font-bold text-[#1A1C1E] mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>필수 자격 요건</span>
                  </h4>
                  <ul className="space-y-1">
                    {company.requiredQualifications.map((req, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-[#475569] bg-[#F8FAFC] px-2.5 py-1.5 rounded border border-[#EDF2F7]"
                      >
                        • {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FAF9FD] border-t border-[#F1F5F9] flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="py-2.5 px-4 border border-[#CBD5E1] text-[#4A5568] text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToDiagnosis();
            }}
            className="flex-1 py-2.5 px-4 bg-[#002045] hover:bg-[#1A365D] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>이 포지션으로 리포트 진단</span>
          </button>
        </div>
      </div>
    </div>
  );
};
