export type TabType = 'home' | 'spec' | 'diagnosis' | 'more';

export interface LanguageScore {
  id: string;
  type: string; // 'TOEIC' | 'TEPS' | 'OPIc' | 'TOEIC Speaking' | 'JLPT' | 'HSK';
  score: string;
  acquiredDate: string; // YYYY.MM or YYYY-MM-DD
  expiryDate?: string;
  isExpired?: boolean;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer?: string;
  date?: string;
  active: boolean;
}

export interface EducationInfo {
  degree: string; // '석사', '학사', '박사'
  school: string; // '서울대학교'
  major: string; // '컴퓨터공학'
  graduationDate: string; // '2022년 2월'
  gpa: number; // 4.1
  maxGpa: number; // 4.5
  regionType?: '수도권' | '지방/비수도권' | '이전지역(본사소재지)';
}

export interface UserProfile {
  name: string;
  avatar: string;
  targetSector: string; // '2024년 하반기 공기업 채용 기준'
  education: EducationInfo;
  languages: LanguageScore[];
  certificates: CertificateItem[];
  internshipMonths: number;
  readinessPercentage: number;
  overallScore: number;
  rankPercentile: number; // Top 15%
}

export interface HiringStep {
  stepNumber: number;
  title: string;
  ratioOrMultiple: string; // e.g. '적격자 전원', '30배수 선발', '3~5배수', '1배수'
  detail: string;
}

export interface CompanyJob {
  id: string;
  companyName: string;
  companyShort: string; // 'KEPCO', 'LH', '코레일' 등
  logoColor: string;
  logoBg: string;
  logoIcon?: string;
  sector: string; // '에너지', 'SOC/교통', '금융/보증', '기술/IT/R&D', '보건/복지', '문화/체육', '농림/환경'
  sectorLabel: string; // '에너지/발전', 'SOC/교통/국토', '금융/경제', '기술/정보통신', '보건/복지', '문화/관광', '환경/농림'
  institutionType: '시장형 공기업' | '준시장형 공기업' | '기금관리형 준정부기관' | '위탁집행형 준정부기관' | '기타공공기관';
  location: string; // '전남 나주', '강원 원주', '경남 진주', '경북 김천', '인천', '대전', '부산', '서울', '세종' 등
  jobTitle: string; // '사무/경영기획', 'ICT/전산개발', '전기/설비기술', '토목/건축' 등
  matchingRate: number; // 0-100 계산
  matchingLevel: '매칭률 높음' | '매칭률 보통' | '매칭률 낮음';
  status: '채용중' | '채용 마감' | '마감 임박' | '채용 예정';
  deadline: string;
  startingSalary: string; // e.g. '4,150만원'
  averageSalary: string; // e.g. '8,650만원'
  recruitmentPeriod: string; // e.g. '2024년 하반기 신입 공채 (매년 상/하반기)'
  hiringScale: string; // e.g. '연간 약 200~300명'
  ncsType: string; // e.g. '의사소통, 수리, 문제해결, 자원관리, 정보능력'
  majorExam: string; // e.g. '경영학, 경제학, 행정학, 전산학 단일/통합 전공 (객관식 50문항)'
  competitionRate: string; // e.g. '서류 25:1 / 최종 85:1'
  regionalBonus: string; // e.g. '이전지역 인재 최대 5% 가점 및 30% 채용목표제 적용'
  requiredQualifications: string[];
  preferredQualifications: string[];
  additionalPointsGuide: {
    title: string;
    points: string;
    description: string;
  }[];
  passedSpecAverage: {
    toeic: number;
    certificatesCount: number;
    gpa: number;
    ncsCutoff: number;
    internRatio: string;
  };
  hiringSteps: HiringStep[];
  description: string;
  officialWebsite?: string;
  alioUrl?: string;
}

export interface CategoryScoreComparison {
  category: string;
  myScore: number;
  passedAverage: number;
}

export interface StrategyRecommendation {
  id: string;
  title: string;
  pointsBadge: string;
  description: string;
  studyMaterialUrl?: string;
}

export interface SpecDetailItem {
  id: string;
  title: string;
  category: string;
  myValue: string;
  standardValue: string;
  status: '요건 충족' | '평균 이상' | '목표 미달';
  statusType: 'success' | 'info' | 'warning' | 'danger';
  iconType: 'language' | 'certificate' | 'experience' | 'grade';
}

