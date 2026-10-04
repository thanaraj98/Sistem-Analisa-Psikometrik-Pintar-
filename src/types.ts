export type PortalType = 'landing' | 'waris' | 'guru' | 'pentadbir';

export type IntelligenceDomain = 
  | 'Verbal Linguistik'
  | 'Logik Matematik'
  | 'Ruang Visual'
  | 'Muzik'
  | 'Kinestetik'
  | 'Interpersonal'
  | 'Intrapersonal'
  | 'Naturalis'
  | 'Eksistensial';

export interface IntelligenceScore {
  domain: IntelligenceDomain;
  score: number; // 0 - 100
  level: 'Tinggi' | 'Sederhana' | 'Rendah';
  description: string;
  recommendationHome: string; // Ulasan & cadangan aktiviti untuk waris
  recommendationSchool: string; // Cadangan strategi PdP guru
}

export interface CareerInterestScore {
  code: string; // e.g., "R", "I", "A", "S", "E", "K"
  category: 'Realistik' | 'Investigatif' | 'Artistik' | 'Sosial' | 'Enterprising (Usahawan)' | 'Konvensional';
  score: number; // %
}

export interface AptitudeScore {
  component: 'Verbal' | 'Numerikal' | 'Penaakulan' | 'Kreativiti' | 'Penyelesaian Masalah';
  score: number;
}

export interface StudentPsychometricRecord {
  id: string;
  icNumber: string; // No MyKid / IC (e.g. 140512-10-1234)
  name: string;
  year: 4 | 5 | 6;
  className: string; // e.g. "4 Cemerlang"
  gender: 'Lelaki' | 'Perempuan';
  schoolName: string;
  counselorName: string;
  assessmentDate: string; // e.g. "12 Jun 2026"
  
  // IKP (Inventori Kecerdasan Pelbagai)
  ikpScores: IntelligenceScore[];
  topIntelligences: IntelligenceDomain[];
  
  // IMK (Inventori Minat Kerjaya)
  imkTopCodes: string[]; // e.g. ["S", "A", "I"]
  imkScores: CareerInterestScore[];
  suggestedCareers: string[];
  
  // IAPT (Inventori Aptitud)
  aptitudeScores: AptitudeScore[];
  
  // GBK / Teacher ulasan
  counselorRemarks: string;
  overallStatus: 'Selesai' | 'Dalam Semakan' | 'Perlu Bimbingan';
}

export interface ClassSummary {
  year: 4 | 5 | 6;
  className: string;
  totalStudents: number;
  completedAssessment: number;
  dominantIntelligenceCount: Record<string, number>;
  topCareerCodes: Record<string, number>;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  userType: 'Guru' | 'Pentadbir' | 'Waris' | 'Super Admin';
  action: string;
  details: string;
}

export interface SystemSettings {
  schoolName: string;
  schoolCode: string;
  academicYear: string;
  ppsiStatus: 'Aktif' | 'Tutup Sesi' | 'Mod Semakan';
  highThreshold: number; // 75
  mediumThreshold: number; // 50
  gbkHeadName: string;
  ppdName: string;
  jpnName: string;
}
