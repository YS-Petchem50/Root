import React from 'react';
import {
  GraduationCap,
  Globe,
  Award,
  RotateCw,
  Pencil,
  Building2,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { UserProfile, CompanyJob } from '../types';

interface MySpecScreenProps {
  user: UserProfile;
  onOpenWizard: (step?: number) => void;
  onNavigateToHome: () => void;
  onSelectCompany: (company: CompanyJob) => void;
  recentCompanies: CompanyJob[];
}

export const MySpecScreen: React.FC<MySpecScreenProps> = ({
  user,
  onOpenWizard,
  onNavigateToHome,
  onSelectCompany,
  recentCompanies,
}) => {
  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Page Title Header */}
      <div className="pt-2 px-1">
        <h1 className="text-3xl font-extrabold text-[#002045] tracking-tight">
          내 스펙 관리
        </h1>
        <p className="text-[14px] text-[#555E68] mt-1.5 leading-relaxed font-normal">
          등록된 스펙을 확인하고 업데이트하여 진단 정확도를 높이세요.
        </p>

        {/* Global Update Button */}
        <div className="mt-4">
          <button
            id="btn-update-all-specs"
            onClick={() => onOpenWizard(1)}
            className="inline-flex items-center justify-center gap-2 bg-[#002045] hover:bg-[#1A365D] active:scale-[0.99] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <RotateCw className="w-4 h-4 text-white" />
            <span>스펙 전체 업데이트</span>
          </button>
        </div>
      </div>

      {/* Card 1: 학력 사항 (Academic Background) */}
      <section
        id="card-education-spec"
        className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)] hover:border-[#D6E3FF] transition-all"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#EEF4FF] flex items-center justify-center text-[#1A365D]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#1A1C1E]">학력 사항</h2>
              <p className="text-xs text-[#64748B] mt-0.5">최종 학력: {user.education.degree}</p>
            </div>
          </div>
          <button
            id="btn-edit-education"
            onClick={() => onOpenWizard(3)}
            aria-label="학력 사항 수정"
            className="p-2 text-[#4A5568] hover:text-[#002045] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-4 pt-4 text-sm">
          <div>
            <span className="block text-xs font-medium text-[#718096]">학교명</span>
            <span className="text-[15px] font-semibold text-[#1A202C] mt-0.5 block">
              {user.education.school}
            </span>
          </div>
          <div>
            <span className="block text-xs font-medium text-[#718096]">전공</span>
            <span className="text-[15px] font-semibold text-[#1A202C] mt-0.5 block">
              {user.education.major}
            </span>
          </div>
          <div>
            <span className="block text-xs font-medium text-[#718096]">졸업 시기</span>
            <span className="text-[15px] font-semibold text-[#1A202C] mt-0.5 block">
              {user.education.graduationDate}
            </span>
          </div>
          <div>
            <span className="block text-xs font-medium text-[#718096]">GPA</span>
            <span className="text-[15px] font-semibold text-[#1A202C] mt-0.5 block">
              {user.education.gpa} / {user.education.maxGpa}
            </span>
          </div>
        </div>
      </section>

      {/* Card 2: 어학 성적 (Language Scores) */}
      <section
        id="card-language-spec"
        className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)] hover:border-[#D6E3FF] transition-all"
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#EBF8FF] flex items-center justify-center text-[#1960A3]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#1A1C1E]">어학 성적</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                {user.languages.length}개의 성적 등록됨
              </p>
            </div>
          </div>
          <button
            id="btn-edit-language"
            onClick={() => onOpenWizard(1)}
            aria-label="어학 성적 수정"
            className="p-2 text-[#4A5568] hover:text-[#002045] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-[#F1F5F9] pt-1">
          {user.languages.map((lang) => (
            <div key={lang.id} className="py-3.5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-[15px] text-[#1A202C]">
                  {lang.type === 'TOEIC' ? '영어 (TOEIC)' : lang.type === 'JLPT' ? '일본어 (JLPT)' : lang.type}
                </div>
                <div className="text-xs text-[#718096] mt-0.5">
                  취득: {lang.acquiredDate}
                  {lang.expiryDate && ` • 만료: ${lang.expiryDate}`}
                </div>
              </div>
              <div className="text-xl font-bold text-[#002045] tracking-tight">
                {lang.score}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Card 3: 자격증 및 면허 (Certifications & Licenses) */}
      <section
        id="card-certificates-spec"
        className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)] hover:border-[#D6E3FF] transition-all"
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#FAF5FF] flex items-center justify-center text-[#7E22CE]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#1A1C1E]">자격증 및 면허</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                {user.certificates.filter((c) => c.active).length}개 활성화
              </p>
            </div>
          </div>
          <button
            id="btn-edit-certificates"
            onClick={() => onOpenWizard(2)}
            aria-label="자격증 수정"
            className="p-2 text-[#4A5568] hover:text-[#002045] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-4">
          {user.certificates
            .filter((c) => c.active)
            .map((cert) => (
              <span
                key={cert.id}
                className="inline-flex items-center gap-2 bg-[#F0FDF4] border border-[#DCFCE7] text-[#166534] text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                {cert.name}
              </span>
            ))}
          <button
            id="btn-add-quick-cert"
            onClick={() => onOpenWizard(2)}
            className="inline-flex items-center gap-1.5 border border-dashed border-[#CBD5E1] hover:border-[#002045] text-[#64748B] hover:text-[#002045] text-xs font-medium px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            자격증 추가
          </button>
        </div>
      </section>

      {/* Card 4: 진단 준비도 (Dark Navy Banner Card) */}
      <section
        id="banner-diagnostic-readiness"
        className="bg-[#002045] text-white rounded-xl p-5 shadow-[0_6px_20px_rgba(0,32,69,0.18)] relative overflow-hidden"
      >
        {/* Subtle geometric pattern background */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
          <div className="w-32 h-32 border-8 border-white rounded-full"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-[17px] font-bold tracking-tight">진단 준비도</h2>
          <p className="text-xs text-[#ADC7F7] mt-1 font-normal">
            스펙 프로필이 거의 완성되었습니다.
          </p>

          <div className="mt-3.5 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold tracking-tight text-white">
              {user.readinessPercentage}
            </span>
            <span className="text-lg font-bold text-[#86A0CD]">%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#1A365D] rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${user.readinessPercentage}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Card 5: 최근 매칭된 기업 (Recently Matched Companies) */}
      <section
        id="card-recently-matched"
        className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)]"
      >
        <div className="flex items-center gap-2 pb-3.5 border-b border-[#F1F5F9]">
          <Building2 className="w-5 h-5 text-[#002045]" />
          <h2 className="text-[16px] font-bold text-[#1A1C1E]">최근 매칭된 기업</h2>
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {recentCompanies.slice(0, 3).map((comp) => (
            <div
              key={comp.id}
              onClick={() => onSelectCompany(comp)}
              className="py-3.5 flex items-center justify-between hover:bg-[#F8FAFC] -mx-2 px-2 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                    comp.companyShort === 'NC'
                      ? 'bg-cyan-50 text-cyan-800'
                      : comp.companyShort === 'KN'
                      ? 'bg-amber-50 text-amber-800'
                      : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  {comp.companyShort}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#1A1C1E] group-hover:text-[#1960A3] transition-colors">
                    {comp.companyName.split(' ')[0]}
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">{comp.jobTitle}</p>
                </div>
              </div>

              <div>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                    comp.matchingLevel === '매칭률 높음'
                      ? 'bg-[#E6F8F0] text-[#059669]'
                      : 'bg-[#FEF3C7] text-[#D97706]'
                  }`}
                >
                  {comp.matchingLevel}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#F1F5F9] mt-2">
          <button
            id="btn-view-all-matches"
            onClick={onNavigateToHome}
            className="w-full py-2.5 border border-[#CBD5E1] hover:border-[#002045] text-[#002045] text-xs font-semibold rounded-lg hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-all cursor-pointer text-center flex items-center justify-center gap-1"
          >
            <span>전체 매칭 보기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
