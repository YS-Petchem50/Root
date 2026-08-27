import { UserProfile } from '../types';

const getLanguageScoreNumber = (scoreText: string): number => {
  const match = scoreText.match(/\d+/g);
  if (!match) return 0;
  return Number(match[0]);
};

const normalizeEnglishScore = (scoreText: string): number => {
  const text = scoreText.toLowerCase();

  if (text.includes('toeic')) {
    const numeric = getLanguageScoreNumber(scoreText);
    return Math.min(100, numeric / 10);
  }

  if (text.includes('teps')) {
    const numeric = getLanguageScoreNumber(scoreText);
    return Math.min(100, numeric / 3.5);
  }

  if (text.includes('tos')) {
    const numeric = getLanguageScoreNumber(scoreText);
    return Math.min(100, numeric / 2);
  }

  if (text.includes('opic')) {
    const levelMap: Record<string, number> = {
      al: 18,
      il: 28,
      im1: 44,
      im2: 56,
      im3: 68,
      im4: 80,
      ih: 90,
      nh: 100,
    };

    const match = scoreText.match(/(al|il|im1|im2|im3|im4|ih|nh)/i);
    if (match) {
      const level = match[1].toLowerCase();
      return levelMap[level] ?? 0;
    }

    const numeric = getLanguageScoreNumber(scoreText);
    return Math.min(100, numeric);
  }

  return 0;
};

export const evaluateEmploymentReadiness = (candidate: UserProfile) => {
  const activeCertificates = candidate.certificates.filter((certificate) => certificate.active);
  const englishScore = candidate.languages.reduce((maxScore, language) => {
    const normalized = normalizeEnglishScore(language.score);
    return Math.max(maxScore, normalized);
  }, 0);

  const hasKoreanHistory = activeCertificates.some((certificate) => /한국사|국사/i.test(certificate.name));
  const hasComputerSkill = activeCertificates.some((certificate) => /컴퓨터활용능력|컴활/i.test(certificate.name));
  const hasAnyCertificate = activeCertificates.length > 0;

  const isSpecFailure = !hasAnyCertificate && englishScore < 100;

  if (isSpecFailure) {
    return {
      ...candidate,
      readinessPercentage: 0,
      overallScore: 0,
      rankPercentile: 100,
    };
  }

  const languageWeight = Math.min(22, englishScore * 0.22);
  const certificateWeight = Math.min(16, activeCertificates.length * 4.5);
  const internshipWeight =
    candidate.internshipMonths >= 12 ? 18 :
    candidate.internshipMonths >= 6 ? 12 :
    candidate.internshipMonths >= 3 ? 7 :
    0;
  const gpaWeight = Math.min(8, (candidate.education.gpa / candidate.education.maxGpa) * 8);
  const degreeWeight =
    candidate.education.degree === '석사' ? 8 :
    candidate.education.degree === '박사' ? 10 : 6;
  const skillBonus = (hasKoreanHistory ? 3 : 0) + (hasComputerSkill ? 3 : 0);
  const experienceBonus = candidate.internshipMonths > 0 ? 3 : 0;
  const marketAdjustment = englishScore >= 80 && activeCertificates.length >= 1 ? 3 : 0;

  const combinedScore =
    languageWeight +
    certificateWeight +
    internshipWeight +
    gpaWeight +
    degreeWeight +
    skillBonus +
    experienceBonus +
    marketAdjustment;

  const suitabilityRate = Math.min(100, Math.max(0, Math.round(combinedScore)));
  const readinessPercentage = suitabilityRate;

  return {
    ...candidate,
    readinessPercentage,
    overallScore: readinessPercentage,
    rankPercentile: Math.max(1, Math.min(99, 100 - readinessPercentage)),
  };
};
