import React from 'react';
import { X, User, Mail, GraduationCap, Award, Globe, Edit3 } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  user: UserProfile;
  onClose: () => void;
  onOpenWizard: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  user,
  onClose,
  onOpenWizard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#EDF2F7] overflow-hidden my-auto animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9] bg-[#FAF9FD]">
          <h2 className="text-base font-bold text-[#002045]">회원 정보</h2>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="p-1.5 text-[#94A3B8] hover:text-[#1A1C1E] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Avatar & Main */}
          <div className="flex flex-col items-center text-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-[#EEF4FF] shadow-sm"
              referrerPolicy="no-referrer"
            />
            <h3 className="text-lg font-bold text-[#1A1C1E] mt-2.5">{user.name}</h3>
            <p className="text-xs text-[#64748B] mt-0.5">lyh090703@gmail.com</p>
            <div className="mt-2 inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#166534] text-xs font-bold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
              스펙 프로필 인증 완료 (85점)
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 text-center bg-[#F8FAFC] p-3 rounded-xl border border-[#EDF2F7]">
            <div>
              <span className="text-[11px] text-[#718096] block">어학 성적</span>
              <span className="text-sm font-bold text-[#002045] mt-0.5 block">
                {user.languages.length}개
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#718096] block">자격증</span>
              <span className="text-sm font-bold text-[#002045] mt-0.5 block">
                {user.certificates.filter((c) => c.active).length}개
              </span>
            </div>
            <div>
              <span className="text-[11px] text-[#718096] block">실무 인턴십</span>
              <span className="text-sm font-bold text-[#002045] mt-0.5 block">
                {user.internshipMonths}개월
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 text-xs">
            <div className="bg-[#FAF9FD] p-3 rounded-lg border border-[#EDF2F7] space-y-1">
              <span className="text-[#718096] font-medium">최종 학력</span>
              <p className="text-[#1A1C1E] font-bold">
                {user.education.school} {user.education.major} ({user.education.degree})
              </p>
              <p className="text-[#64748B]">
                졸업: {user.education.graduationDate} • 학점: {user.education.gpa} /{' '}
                {user.education.maxGpa}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF9FD] border-t border-[#F1F5F9] flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-[#CBD5E1] text-[#4A5568] text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenWizard();
            }}
            className="flex-1 py-2.5 bg-[#002045] hover:bg-[#1A365D] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>스펙 수정하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
