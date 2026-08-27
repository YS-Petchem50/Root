import React, { useState, useEffect } from 'react';
import {
  X,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Award,
  Sparkles,
  Plus,
  Trash2,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, LanguageScore, CertificateItem } from '../types';

interface SpecWizardModalProps {
  isOpen: boolean;
  initialStep?: number;
  user: UserProfile;
  onClose: () => void;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

export const SpecWizardModal: React.FC<SpecWizardModalProps> = ({
  isOpen,
  initialStep = 1,
  user,
  onClose,
  onSave,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  // Step 1: Language State
  const [examType, setExamType] = useState<string>('TOEIC');
  const [examScore, setExamScore] = useState<string>('850');
  const [acquiredDate, setAcquiredDate] = useState<string>('2021-08-15');

  // Step 2: Certificates State
  const [certificates, setCertificates] = useState<CertificateItem[]>(user.certificates);
  const [newCertName, setNewCertName] = useState<string>('');

  // Step 3: Education State
  const [school, setSchool] = useState<string>(user.education.school);
  const [major, setMajor] = useState<string>(user.education.major);
  const [degree, setDegree] = useState<string>(user.education.degree);
  const [graduationDate, setGraduationDate] = useState<string>(user.education.graduationDate);
  const [gpa, setGpa] = useState<number>(user.education.gpa);

  // Step 4: Experience State
  const [internshipMonths, setInternshipMonths] = useState<number>(user.internshipMonths);
  const [hasKoreanHistory1, setHasKoreanHistory1] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(initialStep);
      // Pre-fill with existing user TOEIC if available
      const toeic = user.languages.find((l) => l.type === 'TOEIC');
      if (toeic) {
        setExamScore(toeic.score);
        // Default to a date for illustration
        setAcquiredDate('2021-08-15');
      }
      setCertificates(user.certificates);
      setSchool(user.education.school);
      setMajor(user.education.major);
      setDegree(user.education.degree);
      setGpa(user.education.gpa);
      setInternshipMonths(user.internshipMonths);
    }
  }, [isOpen, initialStep, user]);

  if (!isOpen) return null;

  // Calculate if date is expired (2 years from acquisition)
  const isExpired = (() => {
    try {
      const acq = new Date(acquiredDate);
      if (isNaN(acq.getTime())) return false;
      const twoYearsLater = new Date(acq);
      twoYearsLater.setFullYear(acq.getFullYear() + 2);
      return new Date() > twoYearsLater;
    } catch {
      return false;
    }
  })();

  const examTypes = ['TOEIC', 'TEPS', 'OPIc', 'TOEIC Speaking', 'JLPT', 'HSK'];

  const availablePopularCerts = [
    '정보처리기사',
    '한국사능력검정 1급',
    'AWS Certified Solutions Architect',
    'SQL Developer (SQLD)',
    '컴퓨터활용능력 1급',
    '빅데이터분석기사',
    'ADsP 데이터분석 준전문가',
  ];

  const toggleCertificate = (certName: string) => {
    const existing = certificates.find((c) => c.name === certName);
    if (existing) {
      setCertificates(
        certificates.map((c) =>
          c.name === certName ? { ...c, active: !c.active } : c
        )
      );
    } else {
      setCertificates([
        ...certificates,
        {
          id: `cert-${Date.now()}-${Math.random()}`,
          name: certName,
          issuer: '국가공인/주관사',
          date: '2023.05',
          active: true,
        },
      ]);
    }
  };

  const handleAddNewCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim()) return;
    setCertificates([
      ...certificates,
      {
        id: `cert-custom-${Date.now()}`,
        name: newCertName.trim(),
        issuer: '주관기관',
        date: '2024.01',
        active: true,
      },
    ]);
    setNewCertName('');
  };

  const handleNextOrFinish = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Finalize and Save
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      const updatedLanguages: LanguageScore[] = [
        {
          id: 'lang-toeic-updated',
          type: examType,
          score: examScore,
          acquiredDate: acquiredDate.replace(/-/g, '.'),
          expiryDate: isExpired ? '만료됨' : '2026.08',
          isExpired: isExpired,
        },
        ...user.languages.filter((l) => l.type !== examType),
      ];

      // If Korean history 1급 was checked in step 4 or step 2, adjust overall score
      const hasKoreanHistory = certificates.some(
        (c) => c.name.includes('한국사') && c.active
      ) || hasKoreanHistory1;

      const newOverallScore = hasKoreanHistory ? 90 : 85;
      const newPercentile = hasKoreanHistory ? 8 : 15;

      onSave({
        education: {
          degree,
          school,
          major,
          graduationDate,
          gpa: Number(gpa),
          maxGpa: 4.5,
        },
        languages: updatedLanguages,
        certificates: certificates,
        internshipMonths,
        readinessPercentage: 95,
        overallScore: newOverallScore,
        rankPercentile: newPercentile,
      });
      onClose();
    }
  };

  const stepsList = [
    { num: 1, label: '어학' },
    { num: 2, label: '자격증' },
    { num: 3, label: '학력' },
    { num: 4, label: '우대사항' },
  ];

  return (
    <div
      id="modal-spec-wizard-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        id="modal-spec-wizard-container"
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#EDF2F7] overflow-hidden my-auto animate-scaleUp"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1960A3]"></span>
            <h2 className="text-base font-bold text-[#002045]">스펙 업데이트 마법사</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 text-[#94A3B8] hover:text-[#1A1C1E] hover:bg-[#F1F5F9] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator matching Image 5 */}
        <div className="px-6 pt-5 pb-3 border-b border-[#F8FAFC] bg-[#FAF9FD]/50">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-[#EDF2F7] -z-0"></div>

            {stepsList.map((st) => {
              const isActive = currentStep === st.num;
              const isPast = currentStep > st.num;

              return (
                <div
                  key={st.num}
                  onClick={() => setCurrentStep(st.num)}
                  className="flex flex-col items-center relative z-10 cursor-pointer group"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-white border-2 border-[#002045] text-[#002045] shadow-xs'
                        : isPast
                        ? 'bg-[#002045] text-white border border-[#002045]'
                        : 'bg-white border-2 border-[#CBD5E1] text-[#94A3B8]'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 font-medium transition-colors ${
                      isActive ? 'text-[#002045] font-bold' : 'text-[#74777F]'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 max-h-[68vh] overflow-y-auto">
          {/* STEP 1: 어학 성적 입력 (Image 5) */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#002045]">어학 성적 입력</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  유효한 어학 성적을 입력하여 매칭 진단 정확도를 높이세요.
                </p>
              </div>

              {/* 시험 종류 */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#1A1C1E] mb-2">
                  시험 종류
                </label>
                <div className="flex flex-wrap gap-2">
                  {examTypes.map((type) => {
                    const isSelected = examType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setExamType(type)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#002045] text-white shadow-xs'
                            : 'bg-white border border-[#EDF2F7] text-[#4A5568] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 점수 / 등급 */}
              <div>
                <label className="block text-xs font-bold text-[#1A1C1E] mb-1.5">
                  점수 / 등급
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={examScore}
                    onChange={(e) => setExamScore(e.target.value)}
                    placeholder="예: 850 또는 AL"
                    className="w-full px-4 py-2.5 bg-white border border-[#EDF2F7] rounded-lg text-sm text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30 focus:border-[#1960A3]"
                  />
                  <span className="absolute right-3.5 top-3 text-xs text-[#94A3B8] font-medium">
                    pts
                  </span>
                </div>
              </div>

              {/* 취득 일자 */}
              <div>
                <label className="block text-xs font-bold text-[#1A1C1E] mb-1.5">
                  취득 일자
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={acquiredDate}
                    onChange={(e) => setAcquiredDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#EDF2F7] rounded-lg text-sm text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30 focus:border-[#1960A3]"
                  />
                </div>
              </div>

              {/* Expiry Warning Container matching Image 5 */}
              {isExpired ? (
                <div className="bg-[#FFECEC] border border-[#FFDAD6] rounded-xl p-4 flex items-start gap-3 text-left animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-[#BA1A1A] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#93000A]">유효기간 만료</h4>
                    <p className="text-[11px] text-[#BA1A1A] mt-1 leading-relaxed">
                      2년이 경과한 성적은 공기업 채용 시 인정되지 않는 경우가 많습니다. 유효한 성적을 입력해 주세요.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl p-3.5 flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#166534] font-medium">
                    유효 기간 내 성적입니다. 진단 점수에 100% 반영됩니다.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: 자격증 및 면허 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#002045]">자격증 및 면허</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  보유 중인 국가공인 및 전문 자격증을 선택하거나 직접 추가하세요.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1A1C1E]">
                  주요 가산점 자격증 빠른 선택
                </label>
                <div className="flex flex-wrap gap-2">
                  {availablePopularCerts.map((cert) => {
                    const isSelected = certificates.some(
                      (c) => c.name === cert && c.active
                    );
                    return (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleCertificate(cert)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#166534] text-white shadow-xs'
                            : 'bg-white border border-[#EDF2F7] text-[#4A5568] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        <span>{cert}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct Add Input */}
              <form onSubmit={handleAddNewCert} className="pt-2">
                <label className="block text-xs font-bold text-[#1A1C1E] mb-1.5">
                  직접 자격증 입력
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCertName}
                    onChange={(e) => setNewCertName(e.target.value)}
                    placeholder="예: 정보보안기사, 전기기사 등"
                    className="flex-1 px-3.5 py-2 bg-white border border-[#EDF2F7] rounded-lg text-sm text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#002045] text-white text-xs font-bold rounded-lg hover:bg-[#1A365D] transition-colors cursor-pointer"
                  >
                    추가
                  </button>
                </div>
              </form>

              {/* Current Active List */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-[#718096]">
                  등록된 자격증 ({certificates.filter((c) => c.active).length}개)
                </span>
                <div className="mt-2 space-y-1.5 max-h-32 overflow-y-auto">
                  {certificates.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between bg-[#F8FAFC] p-2.5 rounded-lg border border-[#EDF2F7]"
                    >
                      <span className="text-xs font-medium text-[#1A1C1E]">{c.name}</span>
                      <button
                        onClick={() =>
                          setCertificates(certificates.filter((item) => item.id !== c.id))
                        }
                        className="text-xs text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: 학력 및 학점 */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#002045]">학력 사항</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  출신 학교와 전공, 취득 학점 정보를 업데이트합니다.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A1C1E] mb-1">
                    최종 학력
                  </label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EDF2F7] rounded-lg text-sm text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30"
                  >
                    <option value="학사">학사 (4년제 대학교)</option>
                    <option value="석사">석사 (대학원)</option>
                    <option value="박사">박사 (대학원)</option>
                    <option value="전문학사">전문학사 (2/3년제)</option>
                    <option value="고등학교 졸업">고등학교 졸업</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1C1E] mb-1">
                    학교명
                  </label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="예: 서울대학교"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EDF2F7] rounded-lg text-sm text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1C1E] mb-1">
                    전공
                  </label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="예: 컴퓨터공학"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EDF2F7] rounded-lg text-sm text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1C1E] mb-1">
                      졸업 시기
                    </label>
                    <input
                      type="text"
                      value={graduationDate}
                      onChange={(e) => setGraduationDate(e.target.value)}
                      placeholder="예: 2022년 2월"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EDF2F7] rounded-lg text-sm text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1C1E] mb-1">
                      학점 (GPA / 4.5)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.5"
                      value={gpa}
                      onChange={(e) => setGpa(parseFloat(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#EDF2F7] rounded-lg text-sm text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-[#1960A3]/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: 우대사항 및 실무 경험 */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#002045]">우대사항 및 실무 경험</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  인턴십 및 가산점 항목을 추가하여 최종 합격 확률을 예측합니다.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A1C1E] mb-1">
                  인턴십 / 실무 경험 기간
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={internshipMonths}
                    onChange={(e) => setInternshipMonths(parseInt(e.target.value))}
                    className="flex-1 accent-[#002045]"
                  />
                  <span className="w-16 text-sm font-bold text-[#002045] text-right">
                    {internshipMonths} 개월
                  </span>
                </div>
              </div>

              {/* Recommended Quick Boost */}
              <div className="bg-[#F8FAFC] border border-[#EDF2F7] rounded-xl p-4 space-y-2.5">
                <span className="text-xs font-bold text-[#002045] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  전략적 추천 가산점 적용해보기
                </span>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#1A1C1E]">
                  <input
                    type="checkbox"
                    checked={hasKoreanHistory1}
                    onChange={(e) => setHasKoreanHistory1(e.target.checked)}
                    className="w-4 h-4 rounded text-[#002045] accent-[#002045]"
                  />
                  <span>한국사능력검정 1급 취득 적용 (+5점 가점 모의 시뮬레이션)</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions matching Image 5 */}
        <div className="px-6 py-4 bg-[#FAF9FD] border-t border-[#F1F5F9] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="py-2.5 px-4 border border-[#CBD5E1] hover:border-[#002045] text-[#002045] text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              이전 단계
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (currentStep < 4) setCurrentStep((prev) => prev + 1);
                else onClose();
              }}
              className="py-2.5 px-5 border border-[#002045] text-[#002045] hover:bg-slate-100 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              건너뛰기
            </button>
          )}

          <button
            type="button"
            onClick={handleNextOrFinish}
            className="flex-1 py-2.5 px-5 bg-[#002045] hover:bg-[#1A365D] active:scale-[0.99] text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>{currentStep === 4 ? '진단 리포트 업데이트' : '다음 단계'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
