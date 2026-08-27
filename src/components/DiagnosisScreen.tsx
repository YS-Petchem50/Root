import React, { useState } from 'react';
import {
  Lightbulb,
  Languages,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react';
import {
  UserProfile,
  CategoryScoreComparison,
  StrategyRecommendation,
  SpecDetailItem,
} from '../types';

interface DiagnosisScreenProps {
  user: UserProfile;
  scoreComparisons: CategoryScoreComparison[];
  strategyRecommendations: StrategyRecommendation[];
  specDetails: SpecDetailItem[];
  onOpenStudyGuide: (strat: StrategyRecommendation) => void;
  onOpenWizard: () => void;
}

export const DiagnosisScreen: React.FC<DiagnosisScreenProps> = ({
  user,
  scoreComparisons,
  strategyRecommendations,
  specDetails,
  onOpenStudyGuide,
  onOpenWizard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [targetFilter, setTargetFilter] = useState<string>('2024년 하반기 공기업 채용 기준');

  const targetOptions = [
    '2024년 하반기 공기업 채용 기준',
    '2024년 대기업 IT/테크 채용 기준',
    '2024년 금융권 공공기관 채용 기준',
  ];

  return (
    <div className="space-y-5 pb-28 animate-fadeIn">
      {/* Page Title Header */}
      <div className="pt-2 px-1">
        <h1 className="text-3xl font-extrabold text-[#002045] tracking-tight">
          진단 결과 리포트
        </h1>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-[14px] text-[#555E68] font-normal">
            {targetFilter}
          </p>
        </div>
      </div>

      {/* Summary Score Card */}
      <section
        id="card-diagnosis-summary"
        className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)]"
      >
        <div className="grid grid-cols-2 divide-x divide-[#EDF2F7]">
          {/* Status Column */}
          <div className="pr-4 flex flex-col justify-center">
            <span className="text-xs font-medium text-[#718096]">현재 상태</span>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-xl font-bold text-[#10B981]">안정</span>
            </div>
          </div>

          {/* Overall Score Column */}
          <div className="pl-6 flex flex-col justify-center">
            <span className="text-xs font-medium text-[#718096]">종합 점수</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#002045]">
                {user.overallScore}
              </span>
              <span className="text-sm font-semibold text-[#718096]">/ 100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: 항목별 점수 비교 (Category Score Comparison Chart) */}
      <section
        id="card-score-comparison-chart"
        className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)]"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
          <h2 className="text-[16px] font-bold text-[#1A1C1E]">항목별 점수 비교</h2>

          {/* Legend */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#002045]"></span>
              <span className="text-[#4A5568] font-medium">내 점수</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]"></span>
              <span className="text-[#718096]">합격자 평균</span>
            </div>
          </div>
        </div>

        {/* Custom High Precision Bar Chart matching Image 3 */}
        <div className="pt-6 pb-2">
          <div className="relative h-56 flex items-end">
            {/* Horizontal Grid lines (100, 75, 50, 25) */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[100, 75, 50, 25].map((val) => (
                <div key={val} className="w-full flex items-center">
                  <span className="w-8 text-[11px] text-[#94A3B8] font-medium font-mono text-right pr-2">
                    {val}
                  </span>
                  <div className="flex-1 border-b border-[#F1F5F9]"></div>
                </div>
              ))}
              {/* 0 line */}
              <div className="w-full flex items-center">
                <span className="w-8 text-[11px] text-[#94A3B8] font-medium font-mono text-right pr-2">
                  0
                </span>
                <div className="flex-1 border-b border-[#CBD5E1]"></div>
              </div>
            </div>

            {/* Bars Container */}
            <div className="relative z-10 w-full pl-8 pr-2 grid grid-cols-4 gap-2 sm:gap-4 h-full items-end">
              {scoreComparisons.map((item) => {
                const isSelected = selectedCategory === item.category;
                const myHeightPercent = Math.min(100, Math.max(10, item.myScore));
                const avgHeightPercent = Math.min(100, Math.max(10, item.passedAverage));

                return (
                  <div
                    key={item.category}
                    onClick={() => setSelectedCategory(isSelected ? null : item.category)}
                    className="flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Tooltip on active */}
                    <div
                      className={`text-[10px] font-bold py-0.5 px-1.5 rounded mb-1 transition-opacity ${
                        isSelected
                          ? 'opacity-100 bg-[#002045] text-white shadow-xs'
                          : 'opacity-0 group-hover:opacity-100 bg-slate-800 text-white'
                      }`}
                    >
                      {item.myScore}점 / 평{item.passedAverage}점
                    </div>

                    {/* Dual Bars */}
                    <div className="flex items-end gap-1 sm:gap-1.5 w-full justify-center">
                      {/* My Score Bar (Navy) */}
                      <div
                        className="w-5 sm:w-6 bg-[#002045] rounded-t-xs transition-all duration-500 hover:bg-[#1A365D]"
                        style={{ height: `${(myHeightPercent / 100) * 160}px` }}
                      ></div>

                      {/* Passed Average Bar (Light Gray) */}
                      <div
                        className="w-5 sm:w-6 bg-[#E2E8F0] rounded-t-xs transition-all duration-500 hover:bg-[#CBD5E1]"
                        style={{ height: `${(avgHeightPercent / 100) * 160}px` }}
                      ></div>
                    </div>

                    {/* Category Label */}
                    <span
                      className={`text-xs mt-3 font-semibold transition-colors ${
                        isSelected ? 'text-[#002045] font-bold scale-105' : 'text-[#4A5568]'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 나의 위치 (Top 15% Banner Card) */}
      <section
        id="banner-my-ranking"
        className="bg-[#002045] text-white rounded-xl p-5 shadow-[0_6px_20px_rgba(0,32,69,0.18)] relative overflow-hidden"
      >
        {/* Subtle decorative bar chart outline */}
        <div className="absolute right-3 top-2 opacity-15 pointer-events-none flex items-end gap-1.5 h-20">
          <div className="w-4 h-8 bg-white rounded-t-xs"></div>
          <div className="w-4 h-14 bg-white rounded-t-xs"></div>
          <div className="w-4 h-20 bg-white rounded-t-xs"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-[17px] font-bold tracking-tight">나의 위치</h2>
          <p className="text-xs text-[#ADC7F7] mt-1 font-normal">
            상위권 지원자 그룹에 속해 있습니다.
          </p>

          <div className="mt-3.5 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              Top {user.rankPercentile}
            </span>
            <span className="text-lg font-bold text-[#86A0CD]">%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#1A365D] rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: '85%' }}
            ></div>
          </div>
        </div>
      </section>

      {/* Section 4: 합격 전략 추천 (Recommendation Card) */}
      <section
        id="card-pass-strategy"
        className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)]"
      >
        <div className="flex items-center gap-2 pb-3.5 border-b border-[#F1F5F9]">
          <Lightbulb className="w-5 h-5 text-[#2B6CB0]" />
          <h2 className="text-[16px] font-bold text-[#1A1C1E]">합격 전략 추천</h2>
        </div>

        <div className="pt-4 space-y-3">
          {strategyRecommendations.map((strat) => (
            <div
              key={strat.id}
              className="bg-[#F8FAFC] border border-[#EDF2F7] rounded-lg p-4 transition-all hover:border-[#CBD5E1]"
            >
              <h3 className="text-[15px] font-bold text-[#1A202C]">
                {strat.title}
              </h3>

              <div className="mt-2.5 flex items-start gap-2.5">
                <span className="shrink-0 inline-block bg-[#DCFCE7] text-[#166534] text-[11px] font-bold px-2 py-0.5 rounded">
                  {strat.pointsBadge}
                </span>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  {strat.description}
                </p>
              </div>

              <div className="mt-3.5 pt-3 border-t border-[#EDF2F7]/80">
                <button
                  id={`btn-strategy-${strat.id}`}
                  onClick={() => onOpenStudyGuide(strat)}
                  className="w-full py-2.5 bg-[#002045] hover:bg-[#1A365D] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>학습 자료 보기</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: 스펙 상세 분석 (Detailed Spec Breakdown) */}
      <section
        id="card-spec-breakdown"
        className="bg-white rounded-xl p-5 border border-[#EDF2F7] shadow-[0_2px_12px_rgba(26,54,93,0.04)]"
      >
        <div className="pb-3 border-b border-[#F1F5F9]">
          <h2 className="text-[16px] font-bold text-[#1A1C1E]">스펙 상세 분석</h2>
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {specDetails.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.iconType === 'language'
                      ? 'bg-blue-50 text-blue-600'
                      : item.iconType === 'certificate'
                      ? 'bg-rose-50 text-rose-600'
                      : item.iconType === 'experience'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {item.iconType === 'language' && <Languages className="w-5 h-5" />}
                  {item.iconType === 'certificate' && <Award className="w-5 h-5" />}
                  {item.iconType === 'experience' && <Briefcase className="w-5 h-5" />}
                  {item.iconType === 'grade' && <GraduationCap className="w-5 h-5" />}
                </div>

                <div>
                  <div className="text-[15px] font-bold text-[#1A202C]">{item.title}</div>
                  <div className="text-xs text-[#718096] mt-0.5">{item.category}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[15px] font-bold text-[#002045]">{item.myValue}</div>
                <div
                  className={`text-xs mt-0.5 font-semibold ${
                    item.status === '평균 이상' || item.status === '요건 충족'
                      ? 'text-[#059669]'
                      : 'text-[#DC2626]'
                  }`}
                >
                  {item.standardValue}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 pt-3 border-t border-[#F1F5F9]">
          <button
            onClick={onOpenWizard}
            className="w-full text-center text-xs font-semibold text-[#1960A3] hover:text-[#002045] py-1.5 flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>스펙 정보 수정 및 다시 진단하기</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Disclaimer Footer Note */}
      <footer className="px-2 pt-2">
        <p className="text-[11px] text-[#74777F] leading-relaxed text-center">
          면책 조항: 이 진단 결과는 취합된 과거 채용 데이터를 바탕으로 하며 고용을 보장하지 않습니다. 실제 커트라인은 채용 시즌 및 특정 기관의 정책에 따라 다를 수 있습니다.
        </p>
      </footer>
    </div>
  );
};
