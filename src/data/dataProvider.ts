import { StudentPsychometricRecord, SystemSettings, SystemAuditLog } from '../types';
import {
  SummaryStat,
  DomainScore,
  GradeDomainComparison,
  GenderDomainComparison,
  ConstructItem,
  SystemSummary,
  OVERALL_SUMMARY_STATS,
  OVERALL_SCHOOL_DOMAINS,
  GRADE_COMPARISON_DATA,
  GENDER_BREAKDOWN_DATA,
  TOP_5_CONSTRUCTS,
  BOTTOM_5_CONSTRUCTS,
  RUMUSAN_SISTEM_DATA,
} from './dashboardData';
import { MOCK_STUDENTS, INITIAL_SETTINGS, INITIAL_AUDIT_LOGS } from './mockData';

// =========================================================================
// GOOGLE SHEETS SCHEMAS (PENTAKSIRAN PSIKOMETRIK SEKOLAH - SAPP)
// Structured exactly as Google Sheets tabs: Sekolah | Guru | Tahun4 | Tahun5 | Tahun6 | Tetapan
// =========================================================================

/**
 * Tab 'Sekolah' ONLY stores School Info and Total Student Demographics
 * (Jumlah Murid, Jumlah Lelaki, Jumlah Perempuan, Jumlah Tahun 4, 5, 6).
 * No psychometric domain data is stored directly in School.
 */
export interface SheetSekolahData {
  info: SystemSettings;
  summaryStats: SummaryStat[];
}

export interface TeacherRecord {
  id: string;
  name: string;
  role: string;
  email: string;
  assignedYear?: string;
  status: 'Aktif' | 'Cuti';
}

export interface SheetGuruData {
  counselorHead: string;
  teachers: TeacherRecord[];
}

/**
 * Each Grade sheet stores its own student records and grade-specific psychometric domain statistics.
 */
export interface SheetGradeData {
  year: 4 | 5 | 6;
  gradeLabel: string;
  totalStudents: number;
  classes: string[];
  students: StudentPsychometricRecord[];
  summaryStats: {
    totalStudents: number;
    maleCount: number;
    femaleCount: number;
    completionRate: string;
  };
  domainScores: DomainScore[];
}

export interface SheetTetapanData {
  settings: SystemSettings;
  auditLogs: SystemAuditLog[];
}

export interface FullAppsScriptDatabase {
  Sekolah: SheetSekolahData;
  Guru: SheetGuruData;
  Tahun4: SheetGradeData;
  Tahun5: SheetGradeData;
  Tahun6: SheetGradeData;
  Tetapan: SheetTetapanData;
}

// =========================================================================
// GRADE-SPECIFIC PSYCHOMETRIC DOMAIN DATA
// =========================================================================

const T4_DOMAINS: DomainScore[] = [
  { domain: 'Interpersonal', score: 82, percentage: 82, count: 94, level: 'Tinggi', category: 'Sosial & Emosi' },
  { domain: 'Ruang Visual', score: 80, percentage: 80, count: 92, level: 'Tinggi', category: 'Kognitif & Seni' },
  { domain: 'Verbal Linguistik', score: 72, percentage: 72, count: 83, level: 'Tinggi', category: 'Bahasa & Pengucapan' },
  { domain: 'Kinestetik', score: 74, percentage: 74, count: 85, level: 'Tinggi', category: 'Fizikal & Sukan' },
  { domain: 'Intrapersonal', score: 65, percentage: 65, count: 75, level: 'Sederhana', category: 'Disiplin Kendiri' },
  { domain: 'Logik Matematik', score: 60, percentage: 60, count: 69, level: 'Sederhana', category: 'Penaakulan & Sains' },
  { domain: 'Naturalis', score: 60, percentage: 60, count: 69, level: 'Sederhana', category: 'Alam Sekitar' },
  { domain: 'Muzik', score: 55, percentage: 55, count: 63, level: 'Sederhana', category: 'Apresiasi Seni' },
  { domain: 'Eksistensial', score: 50, percentage: 50, count: 57, level: 'Sederhana', category: 'Nilai & Sahsiah' },
];

const T5_DOMAINS: DomainScore[] = [
  { domain: 'Interpersonal', score: 86, percentage: 86, count: 101, level: 'Tinggi', category: 'Sosial & Emosi' },
  { domain: 'Ruang Visual', score: 82, percentage: 82, count: 97, level: 'Tinggi', category: 'Kognitif & Seni' },
  { domain: 'Verbal Linguistik', score: 78, percentage: 78, count: 92, level: 'Tinggi', category: 'Bahasa & Pengucapan' },
  { domain: 'Kinestetik', score: 75, percentage: 75, count: 88, level: 'Tinggi', category: 'Fizikal & Sukan' },
  { domain: 'Intrapersonal', score: 70, percentage: 70, count: 83, level: 'Sederhana', category: 'Disiplin Kendiri' },
  { domain: 'Logik Matematik', score: 64, percentage: 64, count: 75, level: 'Sederhana', category: 'Penaakulan & Sains' },
  { domain: 'Naturalis', score: 62, percentage: 62, count: 73, level: 'Sederhana', category: 'Alam Sekitar' },
  { domain: 'Muzik', score: 58, percentage: 58, count: 68, level: 'Sederhana', category: 'Apresiasi Seni' },
  { domain: 'Eksistensial', score: 54, percentage: 54, count: 64, level: 'Sederhana', category: 'Nilai & Sahsiah' },
];

const T6_DOMAINS: DomainScore[] = [
  { domain: 'Interpersonal', score: 90, percentage: 90, count: 104, level: 'Tinggi', category: 'Sosial & Emosi' },
  { domain: 'Ruang Visual', score: 84, percentage: 84, count: 97, level: 'Tinggi', category: 'Kognitif & Seni' },
  { domain: 'Verbal Linguistik', score: 84, percentage: 84, count: 97, level: 'Tinggi', category: 'Bahasa & Pengucapan' },
  { domain: 'Kinestetik', score: 76, percentage: 76, count: 87, level: 'Tinggi', category: 'Fizikal & Sukan' },
  { domain: 'Intrapersonal', score: 75, percentage: 75, count: 86, level: 'Sederhana', category: 'Disiplin Kendiri' },
  { domain: 'Logik Matematik', score: 68, percentage: 68, count: 78, level: 'Sederhana', category: 'Penaakulan & Sains' },
  { domain: 'Naturalis', score: 64, percentage: 64, count: 73, level: 'Sederhana', category: 'Alam Sekitar' },
  { domain: 'Muzik', score: 61, percentage: 61, count: 70, level: 'Sederhana', category: 'Apresiasi Seni' },
  { domain: 'Eksistensial', score: 58, percentage: 58, count: 67, level: 'Sederhana', category: 'Nilai & Sahsiah' },
];

// =========================================================================
// CENTRAL DATA STORE (PUSAT DATA TUNGGAL)
// Default initialized with structured mock data.
// =========================================================================

const initialStudents = MOCK_STUDENTS;

const getStudentsByYear = (year: 4 | 5 | 6): StudentPsychometricRecord[] => {
  return initialStudents.filter((s) => s.year === year);
};

const buildGradeSheet = (
  year: 4 | 5 | 6,
  gradeLabel: string,
  domainScores: DomainScore[]
): SheetGradeData => {
  const students = getStudentsByYear(year);
  const maleCount = students.filter((s) => s.gender === 'Lelaki').length;
  const femaleCount = students.filter((s) => s.gender === 'Perempuan').length;
  const classes = Array.from(new Set(students.map((s) => s.className)));

  return {
    year,
    gradeLabel,
    totalStudents: year === 4 ? 115 : year === 5 ? 118 : 115,
    classes: classes.length > 0 ? classes : [`${year} Alpha`, `${year} Beta`, `${year} Gamma`],
    students,
    summaryStats: {
      totalStudents: year === 4 ? 115 : year === 5 ? 118 : 115,
      maleCount: maleCount || (year === 4 ? 60 : year === 5 ? 62 : 60),
      femaleCount: femaleCount || (year === 4 ? 55 : year === 5 ? 56 : 55),
      completionRate: '100%',
    },
    domainScores,
  };
};

export const masterDatabase: FullAppsScriptDatabase = {
  Sekolah: {
    info: INITIAL_SETTINGS,
    summaryStats: OVERALL_SUMMARY_STATS,
  },
  Guru: {
    counselorHead: 'Puan Siti Nurhaliza binti Ahmad (GBK Sepenuh Masa)',
    teachers: [
      {
        id: 'G-101',
        name: 'Cikgu Ahmad Razak',
        role: 'Guru Bimbingan & Kaunseling',
        email: 'ahmad.razak@moe.gov.my',
        assignedYear: 'Penyelaras PPsi Sekolah',
        status: 'Aktif',
      },
      {
        id: 'G-102',
        name: 'Puan Siti Nurhaliza binti Ahmad',
        role: 'Ketua Guru Bimbingan & Kaunseling',
        email: 'siti.nurhaliza@moe.gov.my',
        assignedYear: 'Ketua GBK',
        status: 'Aktif',
      },
      {
        id: 'G-103',
        name: 'Encik Zulkifli bin Hassan',
        role: 'Guru Penyelaras Tahun 4',
        email: 'zulkifli.hassan@moe.gov.my',
        assignedYear: 'Tahun 4',
        status: 'Aktif',
      },
      {
        id: 'G-104',
        name: 'Puan Noraini binti Abdullah',
        role: 'Guru Penyelaras Tahun 5',
        email: 'noraini.abdullah@moe.gov.my',
        assignedYear: 'Tahun 5',
        status: 'Aktif',
      },
      {
        id: 'G-105',
        name: 'Encik Badrul Hisham bin Mat',
        role: 'Guru Penyelaras Tahun 6',
        email: 'badrul.hisham@moe.gov.my',
        assignedYear: 'Tahun 6',
        status: 'Aktif',
      },
    ],
  },
  Tahun4: buildGradeSheet(4, 'Tahun 4', T4_DOMAINS),
  Tahun5: buildGradeSheet(5, 'Tahun 5', T5_DOMAINS),
  Tahun6: buildGradeSheet(6, 'Tahun 6', T6_DOMAINS),
  Tetapan: {
    settings: INITIAL_SETTINGS,
    auditLogs: INITIAL_AUDIT_LOGS,
  },
};

// =========================================================================
// UNIFIED DATA PROVIDER SERVICES & GETTERS
// Single point of truth consumed across all components.
// =========================================================================

/**
 * Reads tab 'Sekolah' data (School Info & Student Demographics ONLY)
 */
export function getSekolahData(): SheetSekolahData {
  return masterDatabase.Sekolah;
}

/**
 * Reads tab 'Guru' data (Teacher & Counselor profiles)
 */
export function getGuruData(): SheetGuruData {
  return masterDatabase.Guru;
}

/**
 * Reads tab 'Tahun4' data
 */
export function getTahun4Data(): SheetGradeData {
  return masterDatabase.Tahun4;
}

/**
 * Reads tab 'Tahun5' data
 */
export function getTahun5Data(): SheetGradeData {
  return masterDatabase.Tahun5;
}

/**
 * Reads tab 'Tahun6' data
 */
export function getTahun6Data(): SheetGradeData {
  return masterDatabase.Tahun6;
}

/**
 * Reads tab 'Tetapan' data
 */
export function getTetapanData(): SheetTetapanData {
  return masterDatabase.Tetapan;
}

/**
 * Reads overall school domain psychometric averages aggregated dynamically from year sheets
 */
export function getOverallSchoolDomains(): DomainScore[] {
  return OVERALL_SCHOOL_DOMAINS;
}

/**
 * Reads grade-by-grade domain comparison data aggregated from Tahun 4, 5 & 6
 */
export function getGradeComparisons(): GradeDomainComparison[] {
  return GRADE_COMPARISON_DATA;
}

/**
 * Reads gender psychometric breakdown aggregated from year sheets
 */
export function getGenderBreakdown(): GenderDomainComparison[] {
  return GENDER_BREAKDOWN_DATA;
}

/**
 * Reads top 5 dominant constructs across all year sheets
 */
export function getTopConstructs(): ConstructItem[] {
  return TOP_5_CONSTRUCTS;
}

/**
 * Reads bottom 5 constructs requiring intervention across all year sheets
 */
export function getBottomConstructs(): ConstructItem[] {
  return BOTTOM_5_CONSTRUCTS;
}

/**
 * Reads overall system summary
 */
export function getSystemSummary(): SystemSummary {
  return RUMUSAN_SISTEM_DATA;
}

/**
 * Reads all students across Tahun 4, 5 & 6
 */
export function getAllStudents(): StudentPsychometricRecord[] {
  return [
    ...masterDatabase.Tahun4.students,
    ...masterDatabase.Tahun5.students,
    ...masterDatabase.Tahun6.students,
  ];
}

/**
 * Search student by IC Number (Used by Portal Waris)
 */
export function findStudentByIC(icRaw: string): StudentPsychometricRecord | undefined {
  const cleanIC = icRaw.replace(/[^0-9]/g, '');
  const allStudents = getAllStudents();
  return allStudents.find((s) => s.icNumber.replace(/[^0-9]/g, '') === cleanIC);
}

// =========================================================================
// GOOGLE APPS SCRIPT INTEGRATION POINT
// In the future, to connect Google Sheets via Google Apps Script:
// Simply set `ENABLE_LIVE_APPS_SCRIPT = true` and provide the Apps Script Web App URL.
// The entire application UI will consume live data with ZERO UI code changes!
// =========================================================================

export const APPS_SCRIPT_CONFIG = {
  ENABLE_LIVE_APPS_SCRIPT: false,
  WEB_APP_URL: '', // Insert Google Apps Script Exec URL here in the future
};

/**
 * Async fetcher ready for Google Apps Script Web App execution.
 * Standard format returned by Apps Script: doGet(e) -> ContentService.createTextOutput(JSON.stringify(db))
 */
export async function fetchFullDatabaseFromAppsScript(): Promise<FullAppsScriptDatabase> {
  if (APPS_SCRIPT_CONFIG.ENABLE_LIVE_APPS_SCRIPT && APPS_SCRIPT_CONFIG.WEB_APP_URL) {
    try {
      const response = await fetch(APPS_SCRIPT_CONFIG.WEB_APP_URL);
      if (!response.ok) {
        throw new Error(`Google Apps Script fetch error: ${response.statusText}`);
      }
      const liveData: FullAppsScriptDatabase = await response.json();
      return liveData;
    } catch (err) {
      console.warn('Fallback to local master database due to Apps Script fetch failure:', err);
      return masterDatabase;
    }
  }
  // Return local master database
  return masterDatabase;
}
