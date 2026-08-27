import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  Zap,
  CheckCircle2,
  Building,
  Sparkles,
  X,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Coins,
} from 'lucide-react';
import { CompanyJob, UserProfile } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  companies: CompanyJob[];
  selectedCompany: CompanyJob;
  onSelectCompany: (company: CompanyJob) => void;
  onNavigateToDiagnosis: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  companies,
  selectedCompany,
  onSelectCompany,
  onNavigateToDiagnosis,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [sortOrder, setSortOrder] = useState<'matching' | 'salary' | 'deadline' | 'name'>('matching');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categories = [
    '전체',
    '에너지',
    'SOC/교통',
    '금융',
    '보건/복지',
    '기술/IT',
    '농림/환경',
    '문화/관광',
  ];

  // Filtering & Sorting logic
  const filteredCompanies = useMemo(() => {
    return companies
      .filter((comp) => {
        const matchesCategory =
          selectedCategory === '전체' ||
          comp.sector.includes(selectedCategory) ||
          comp.sectorLabel.includes(selectedCategory);

        const term = searchTerm.toLowerCase();
        const matchesSearch =
          !term ||
          comp.companyName.toLowerCase().includes(term) ||
          comp.companyShort.toLowerCase().includes(term) ||
          comp.jobTitle.toLowerCase().includes(term) ||
          comp.sectorLabel.toLowerCase().includes(term) ||
          (comp.location && comp.location.toLowerCase().includes(term)) ||
          (comp.majorExam && comp.majorExam.toLowerCase().includes(term)) ||
          (comp.ncsType && comp.ncsType.toLowerCase().includes(term));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortOrder === 'matching') return b.matchingRate - a.matchingRate;
        if (sortOrder === 'salary') {
          const numA = parseInt((a.startingSalary || '0').replace(/[^0-9]/g, ''), 10) || 0;
          const numB = parseInt((b.startingSalary || '0').replace(/[^0-9]/g, ''), 10) || 0;
          return numB - numA;
        }
        if (sortOrder === 'deadline') return a.deadline.localeCompare(b.deadline);
        return a.companyName.localeCompare(b.companyName);
      });
  }, [companies, selectedCategory, searchTerm, sortOrder]);

  return (
    <div className="space-y-5 pb-36 animate-fadeIn">
      {/* Page Title Header */}
      <div className="pt-2 px-1">
        <h1 className="text-3xl font-extrabold text-[#002045] tracking-tight">
          기업 검색 및 매칭
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          현재 등록된 스펙(어학 950점, 정보처리기사, 컴활1급, 한국사1급) 기준으로 주요 공기업 실시간 적합도를 분석합니다.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#94A3B8]" />
        </div>
        <input
          id="input-company-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="공기업명, 직무, 전공과목, 근무지역을 검색하세요 (예: 한전, 신보, 토목, 대구)..."
          className="w-full pl-10 pr-10 py-3 bg-white border border-[#EDF2F7] rounded-xl text-sm placeholder-[#94A3B8] text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30 focus:border-[#1960A3] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94A3B8] hover:text-[#4A5568]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`filter-cat-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#002045] text-white shadow-xs'
                  : 'bg-white border border-[#EDF2F7] text-[#4A5568] hover:bg-[#F8FAFC]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results Header with Count and Sort */}
      <div className="flex items-center justify-between pt-1 px-1">
        <div className="text-base font-bold text-[#1A1C1E]">
          검색 결과 <span className="text-[#1960A3]">({filteredCompanies.length})</span>
        </div>

        <div className="relative">
          <button
            id="btn-sort-filter"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A5568] hover:text-[#002045] py-1 px-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>
              {sortOrder === 'matching'
                ? '매칭률 높은순'
                : sortOrder === 'salary'
                ? '초봉 높은순'
                : sortOrder === 'deadline'
                ? '마감임박순'
                : '가나다순'}
            </span>
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#EDF2F7] rounded-lg shadow-lg py-1 z-20 text-xs">
              <button
                onClick={() => {
                  setSortOrder('matching');
                  setShowSortDropdown(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#F1F5F9] font-medium text-[#1A1C1E]"
              >
                매칭률 높은순
              </button>
              <button
                onClick={() => {
                  setSortOrder('salary');
                  setShowSortDropdown(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#F1F5F9] font-medium text-[#1A1C1E]"
              >
                신입초봉 높은순
              </button>
              <button
                onClick={() => {
                  setSortOrder('deadline');
                  setShowSortDropdown(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#F1F5F9] font-medium text-[#1A1C1E]"
              >
                마감일 임박순
              </button>
              <button
                onClick={() => {
                  setSortOrder('name');
                  setShowSortDropdown(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-[#F1F5F9] font-medium text-[#1A1C1E]"
              >
                기업명 가나다순
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Company Cards List */}
      <div className="space-y-3">
        {filteredCompanies.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-[#EDF2F7]">
            <p className="text-sm text-[#718096]">검색 조건에 맞는 공기업 채용 정보가 없습니다.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('전체');
              }}
              className="mt-3 text-xs text-[#1960A3] font-semibold underline"
            >
              전체 목록 보기
            </button>
          </div>
        ) : (
          filteredCompanies.map((comp) => {
            const isSelected = selectedCompany.id === comp.id;
            const isClosed = comp.status === '채용 마감';

            return (
              <div
                key={comp.id}
                id={`card-company-${comp.id}`}
                onClick={() => onSelectCompany(comp)}
                className={`bg-white rounded-xl p-4 sm:p-5 border transition-all cursor-pointer group relative ${
                  isSelected
                    ? 'border-[#002045] ring-2 ring-[#002045]/10 shadow-md'
                    : 'border-[#EDF2F7] hover:border-[#CBD5E1] shadow-[0_2px_8px_rgba(26,54,93,0.03)]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3.5">
                    {/* Company Logo Icon Box */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${comp.logoBg} ${comp.logoColor}`}
                    >
                      {comp.companyShort}
                    </div>

                    <div>
                      {/* Sector & Institution Type Tag */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-block text-[11px] font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded">
                          {comp.sectorLabel}
                        </span>
                        {comp.institutionType && (
                          <span className="inline-block text-[10px] text-[#475569] bg-[#E2E8F0]/60 px-1.5 py-0.5 rounded">
                            {comp.institutionType}
                          </span>
                        )}
                      </div>

                      {/* Company Name */}
                      <h2 className="text-[16px] font-bold text-[#1A1C1E] mt-1 group-hover:text-[#1960A3] transition-colors">
                        {comp.companyName}
                      </h2>

                      {/* Job Title */}
                      <p className="text-xs font-medium text-[#4A5568] mt-0.5">
                        {comp.jobTitle}
                      </p>

                      {/* Key Badges (Salary & Location) */}
                      <div className="flex items-center flex-wrap gap-2 text-[11px] text-[#64748B] mt-1.5">
                        {comp.startingSalary && (
                          <span className="text-[#002045] font-semibold bg-[#F8FAFC] border border-[#EDF2F7] px-2 py-0.5 rounded">
                            초봉 {comp.startingSalary}
                          </span>
                        )}
                        {comp.location && (
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#94A3B8]" />
                            {comp.location.split(' ')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status / Chevron */}
                  <div className="flex items-center gap-2">
                    {isClosed ? (
                      <span className="text-[11px] font-medium bg-[#F1F5F9] text-[#94A3B8] px-2.5 py-1 rounded">
                        채용 마감
                      </span>
                    ) : (
                      <div className="flex items-center text-[#94A3B8] group-hover:text-[#002045] transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Match summary chip */}
                {!isClosed && (
                  <div className="mt-3 pt-3 border-t border-[#F8FAFC] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#64748B]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>마감: {comp.deadline}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                          comp.matchingRate >= 88
                            ? 'bg-[#DCFCE7] text-[#166534]'
                            : comp.matchingRate >= 80
                            ? 'bg-[#FEF3C7] text-[#B45309]'
                            : 'bg-[#F1F5F9] text-[#64748B]'
                        }`}
                      >
                        적합도 {comp.matchingRate}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating / Sticky Real-Time Matching Result Card */}
      <section
        id="card-realtime-matching-highlight"
        className="bg-white rounded-2xl p-5 border border-[#DCE9FC] shadow-[0_8px_25px_rgba(0,32,69,0.08)] ring-1 ring-[#002045]/5"
      >
        {/* Header with Lightning */}
        <div className="flex items-center gap-2 pb-3 border-b border-[#F1F5F9]">
          <div className="w-6 h-6 rounded-full bg-[#EBF8FF] flex items-center justify-center text-[#1960A3]">
            <Zap className="w-3.5 h-3.5 fill-[#1960A3]" />
          </div>
          <h2 className="text-[16px] font-extrabold text-[#002045] tracking-tight">
            실시간 매칭 결과
          </h2>
        </div>

        {/* Selected Position preview */}
        <div className="pt-3.5">
          <span className="text-xs text-[#718096] font-medium">선택된 포지션</span>

          <div className="mt-1.5 flex items-center gap-3 bg-[#F8FAFC] p-2.5 rounded-xl border border-[#EDF2F7]">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${selectedCompany.logoBg} ${selectedCompany.logoColor}`}
            >
              {selectedCompany.companyShort}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs text-[#64748B] truncate">
                {selectedCompany.companyName}
              </div>
              <div className="text-sm font-bold text-[#1A1C1E] truncate">
                {selectedCompany.jobTitle}
              </div>
            </div>
          </div>
        </div>

        {/* Score & Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-[#4A5568]">종합 적합도</span>
            <span className="text-2xl font-extrabold text-[#1960A3]">
              {selectedCompany.matchingRate}%
            </span>
          </div>

          <div className="w-full bg-[#EDF2F7] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#1960A3] h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${selectedCompany.matchingRate}%` }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 space-y-2">
          <button
            id="btn-realtime-analysis-submit"
            onClick={onNavigateToDiagnosis}
            className="w-full py-3.5 bg-[#002045] hover:bg-[#1A365D] active:scale-[0.99] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>실시간 분석</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[11px] text-[#718096] text-center font-medium">
            직무 역량 기반 정밀 진단
          </p>
        </div>
      </section>
    </div>
  );
};
