import React, { useState } from 'react';
import { TabType, UserProfile, CompanyJob, StrategyRecommendation } from './types';
import {
  initialUserProfile,
  sampleCompanies,
  scoreComparisons,
  strategyRecommendations,
  specDetailItems,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MySpecScreen } from './components/MySpecScreen';
import { DiagnosisScreen } from './components/DiagnosisScreen';
import { HomeScreen } from './components/HomeScreen';
import { MoreScreen } from './components/MoreScreen';
import { SpecWizardModal } from './components/SpecWizardModal';
import { CompanyDetailModal } from './components/CompanyDetailModal';
import { StudyGuideModal } from './components/StudyGuideModal';
import { ProfileModal } from './components/ProfileModal';
import { SideDrawer } from './components/SideDrawer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('spec');
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('recruit_diagnosis_user');
      return saved ? JSON.parse(saved) : initialUserProfile;
    } catch {
      return initialUserProfile;
    }
  });

  const [selectedCompany, setSelectedCompany] = useState<CompanyJob>(sampleCompanies[0]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalCompany, setModalCompany] = useState<CompanyJob | null>(null);

  // Wizard state
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardInitialStep, setWizardInitialStep] = useState(1);

  // Study Guide Modal state
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyRecommendation | null>(null);

  // Profile Modal state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Side Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Save profile helper
  const handleSaveProfile = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedData };
      try {
        localStorage.setItem('recruit_diagnosis_user', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save to local storage', err);
      }
      return updated;
    });
  };

  const handleOpenWizard = (step: number = 1) => {
    setWizardInitialStep(step);
    setIsWizardOpen(true);
  };

  const handleSelectCompanyFromCard = (company: CompanyJob) => {
    setSelectedCompany(company);
    setModalCompany(company);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex justify-center selection:bg-[#002045] selection:text-white">
      {/* Mobile container centered on screen */}
      <div className="w-full max-w-md bg-[#FAF9FD] min-h-screen relative shadow-[0_0_40px_rgba(0,0,0,0.06)] border-x border-[#E2E8F0] flex flex-col">
        {/* Top Sticky Header */}
        <Header
          user={user}
          onOpenMenu={() => setIsDrawerOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 pt-3">
          {currentTab === 'spec' && (
            <MySpecScreen
              user={user}
              onOpenWizard={handleOpenWizard}
              onNavigateToHome={() => setCurrentTab('home')}
              onSelectCompany={handleSelectCompanyFromCard}
              recentCompanies={sampleCompanies}
            />
          )}

          {currentTab === 'diagnosis' && (
            <DiagnosisScreen
              user={user}
              scoreComparisons={scoreComparisons}
              strategyRecommendations={strategyRecommendations}
              specDetails={specDetailItems}
              onOpenStudyGuide={(strat) => setSelectedStrategy(strat)}
              onOpenWizard={() => handleOpenWizard(1)}
            />
          )}

          {currentTab === 'home' && (
            <HomeScreen
              user={user}
              companies={sampleCompanies}
              selectedCompany={selectedCompany}
              onSelectCompany={(comp) => {
                setSelectedCompany(comp);
                setModalCompany(comp);
                setIsDetailModalOpen(true);
              }}
              onNavigateToDiagnosis={() => setCurrentTab('diagnosis')}
            />
          )}

          {currentTab === 'more' && (
            <MoreScreen
              user={user}
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenWizard={() => handleOpenWizard(1)}
            />
          )}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNav currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

        {/* Modals & Drawers */}
        <SpecWizardModal
          isOpen={isWizardOpen}
          initialStep={wizardInitialStep}
          user={user}
          onClose={() => setIsWizardOpen(false)}
          onSave={handleSaveProfile}
        />

        <CompanyDetailModal
          company={modalCompany}
          user={user}
          onClose={() => {
            setIsDetailModalOpen(false);
            setModalCompany(null);
          }}
          onNavigateToDiagnosis={() => {
            setIsDetailModalOpen(false);
            setCurrentTab('diagnosis');
          }}
        />

        <StudyGuideModal
          strategy={selectedStrategy}
          onClose={() => setSelectedStrategy(null)}
        />

        <ProfileModal
          isOpen={isProfileOpen}
          user={user}
          onClose={() => setIsProfileOpen(false)}
          onOpenWizard={() => {
            setIsProfileOpen(false);
            handleOpenWizard(1);
          }}
        />

        <SideDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          user={user}
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          onOpenWizard={() => handleOpenWizard(1)}
        />
      </div>
    </div>
  );
}
