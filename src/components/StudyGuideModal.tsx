import React from 'react';
import { X, BookOpen, CheckCircle, Clock, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { StrategyRecommendation } from '../types';

interface StudyGuideModalProps {
  strategy: StrategyRecommendation | null;
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({ strategy, onClose }) => {
  if (!strategy) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#EDF2F7] overflow-hidden my-auto animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9] bg-[#FAF9FD]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#1960A3]" />
            <h2 className="text-base font-bold text-[#002045]">맞춤형 합격 전략 가이드</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 text-[#94A3B8] hover:text-[#1A1C1E] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <span className="inline-block bg-[#DCFCE7] text-[#166534] text-xs font-bold px-2 py-0.5 rounded">
              {strategy.pointsBadge}
            </span>
            <h3 className="text-lg font-bold text-[#1A1C1E] mt-2">{strategy.title}</h3>
            <p className="text-xs text-[#555E68] mt-1">{strategy.description}</p>
          </div>

          <div className="border-t border-[#F1F5F9] pt-4 space-y-3">
            <h4 className="text-xs font-bold text-[#002045] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>단기 점수 획득 4주 로드맵</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#EDF2F7]">
                <div className="font-bold text-[#1A1C1E]">1~2주차: 핵심 빈출 개념 요약</div>
                <div className="text-[#64748B] mt-0.5">시대별 핵심 기출 키워드 50선 암기 및 오답노트 정리</div>
              </div>
              <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#EDF2F7]">
                <div className="font-bold text-[#1A1C1E]">3~4주차: 최근 5개년 실전 모의고사 풀이</div>
                <div className="text-[#64748B] mt-0.5">실전 시간 배분(80분 50문항) 훈련 및 가점 안정권 80점 돌파</div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#F1F5F9] pt-4">
            <h4 className="text-xs font-bold text-[#002045] mb-2">추천 핵심 학습 자료</h4>
            <div className="bg-[#EEF4FF] p-3.5 rounded-xl border border-[#D6E3FF] text-xs text-[#1A365D] space-y-1">
              <p className="font-bold">📘 {strategy.studyMaterialUrl || '공기업 채용 전용 가산점 핵심 족보'}</p>
              <p className="text-[11px] text-[#455F88]">최신 출제 경향 반영 모의고사 및 필수 합격 공식 PDF</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF9FD] border-t border-[#F1F5F9]">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#002045] hover:bg-[#1A365D] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};
