export interface SummaryStat {
  key: string;
  title: string;
  value: number | string;
  subtitle: string;
  badge?: string;
  colorType: 'indigo' | 'blue' | 'purple' | 'sky' | 'emerald' | 'amber';
}

export interface DomainScore {
  domain: string;
  score: number;
  percentage: number;
  count: number;
  level: 'Tinggi' | 'Sederhana' | 'Rendah';
  category?: string;
}

export interface GradeDomainComparison {
  domain: string;
  t4: number;
  t5: number;
  t6: number;
  schoolAverage: number;
}

export interface GenderDomainComparison {
  domain: string;
  maleScore: number;
  femaleScore: number;
  malePercentage: number;
  femalePercentage: number;
}

export interface ConstructItem {
  name: string;
  domain: string;
  score: number;
  level: 'Tinggi' | 'Sederhana' | 'Rendah';
  percentage: number;
  note: string;
}

export interface SystemSummary {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  recommendations: string[];
}

// ==========================================
// CENTRAL DUMMY DATA FOR SCHOOL ANALYTICS
// ==========================================

export const OVERALL_SUMMARY_STATS: SummaryStat[] = [
  {
    key: 'totalStudents',
    title: 'Jumlah Murid',
    value: 348,
    subtitle: 'Keseluruhan Tahun 4, 5 & 6',
    badge: '100% Berdaftar',
    colorType: 'indigo',
  },
  {
    key: 'totalMale',
    title: 'Jumlah Lelaki',
    value: 182,
    subtitle: '52.3% daripada keseluruhan',
    badge: '182 Murid',
    colorType: 'blue',
  },
  {
    key: 'totalFemale',
    title: 'Jumlah Perempuan',
    value: 166,
    subtitle: '47.7% daripada keseluruhan',
    badge: '166 Murid',
    colorType: 'purple',
  },
  {
    key: 'totalTahun4',
    title: 'Jumlah Tahun 4',
    value: 115,
    subtitle: '3 Kelas (Alpha, Beta, Gamma)',
    badge: '115 Murid',
    colorType: 'sky',
  },
  {
    key: 'totalTahun5',
    title: 'Jumlah Tahun 5',
    value: 118,
    subtitle: '3 Kelas (Alpha, Beta, Gamma)',
    badge: '118 Murid',
    colorType: 'emerald',
  },
  {
    key: 'totalTahun6',
    title: 'Jumlah Tahun 6',
    value: 115,
    subtitle: '3 Kelas (Alpha, Beta, Gamma)',
    badge: '115 Murid',
    colorType: 'amber',
  },
];

export const OVERALL_SCHOOL_DOMAINS: DomainScore[] = [
  { domain: 'Interpersonal', score: 86, percentage: 86, count: 299, level: 'Tinggi', category: 'Sosial & Emosi' },
  { domain: 'Ruang Visual', score: 82, percentage: 82, count: 285, level: 'Tinggi', category: 'Kognitif & Seni' },
  { domain: 'Verbal Linguistik', score: 78, percentage: 78, count: 271, level: 'Tinggi', category: 'Bahasa & Pengucapan' },
  { domain: 'Kinestetik', score: 75, percentage: 75, count: 261, level: 'Tinggi', category: 'Fizikal & Sukan' },
  { domain: 'Intrapersonal', score: 70, percentage: 70, count: 243, level: 'Sederhana', category: 'Disiplin Kendiri' },
  { domain: 'Logik Matematik', score: 64, percentage: 64, count: 222, level: 'Sederhana', category: 'Penaakulan & Sains' },
  { domain: 'Naturalis', score: 62, percentage: 62, count: 215, level: 'Sederhana', category: 'Alam Sekitar' },
  { domain: 'Muzik', score: 58, percentage: 58, count: 201, level: 'Sederhana', category: 'Apresiasi Seni' },
  { domain: 'Eksistensial', score: 54, percentage: 54, count: 187, level: 'Sederhana', category: 'Nilai & Sahsiah' },
];

export const GRADE_COMPARISON_DATA: GradeDomainComparison[] = [
  { domain: 'Verbal Linguistik', t4: 72, t5: 78, t6: 84, schoolAverage: 78 },
  { domain: 'Logik Matematik', t4: 60, t5: 64, t6: 68, schoolAverage: 64 },
  { domain: 'Ruang Visual', t4: 80, t5: 82, t6: 84, schoolAverage: 82 },
  { domain: 'Kinestetik', t4: 74, t5: 75, t6: 76, schoolAverage: 75 },
  { domain: 'Muzik', t4: 55, t5: 58, t6: 61, schoolAverage: 58 },
  { domain: 'Interpersonal', t4: 82, t5: 86, t6: 90, schoolAverage: 86 },
  { domain: 'Intrapersonal', t4: 65, t5: 70, t6: 75, schoolAverage: 70 },
  { domain: 'Naturalis', t4: 60, t5: 62, t6: 64, schoolAverage: 62 },
  { domain: 'Eksistensial', t4: 50, t5: 54, t6: 58, schoolAverage: 54 },
];

export const GENDER_BREAKDOWN_DATA: GenderDomainComparison[] = [
  { domain: 'Verbal Linguistik', maleScore: 72, femaleScore: 84, malePercentage: 72, femalePercentage: 84 },
  { domain: 'Logik Matematik', maleScore: 68, femaleScore: 60, malePercentage: 68, femalePercentage: 60 },
  { domain: 'Ruang Visual', maleScore: 84, femaleScore: 80, malePercentage: 84, femalePercentage: 80 },
  { domain: 'Kinestetik', maleScore: 82, femaleScore: 68, malePercentage: 82, femalePercentage: 68 },
  { domain: 'Muzik', maleScore: 52, femaleScore: 64, malePercentage: 52, femalePercentage: 64 },
  { domain: 'Interpersonal', maleScore: 82, femaleScore: 90, malePercentage: 82, femalePercentage: 90 },
  { domain: 'Intrapersonal', maleScore: 66, femaleScore: 74, malePercentage: 66, femalePercentage: 74 },
  { domain: 'Naturalis', maleScore: 65, femaleScore: 59, malePercentage: 65, femalePercentage: 59 },
  { domain: 'Eksistensial', maleScore: 51, femaleScore: 57, malePercentage: 51, femalePercentage: 57 },
];

export const TOP_5_CONSTRUCTS: ConstructItem[] = [
  {
    name: 'Interpersonal',
    domain: 'Sosial & Kepimpinan',
    score: 86,
    level: 'Tinggi',
    percentage: 86,
    note: '86% murid menguasai kemahiran berinteraksi dan empati berpasukan.',
  },
  {
    name: 'Ruang Visual',
    domain: 'Pemetaan & Reka Bentuk',
    score: 82,
    level: 'Tinggi',
    percentage: 82,
    note: '82% murid cemerlang membayangkan struktur 3D dan peta minda.',
  },
  {
    name: 'Verbal Linguistik',
    domain: 'Komunikasi & Bahasa',
    score: 78,
    level: 'Tinggi',
    percentage: 78,
    note: '78% murid menguasai perbendaharaan kata dan pengucapan lisan.',
  },
  {
    name: 'Kinestetik',
    domain: 'Motor Fizikal & Sukan',
    score: 75,
    level: 'Tinggi',
    percentage: 75,
    note: '75% murid menunjukkan koordinasi fizikal dan kecergasan yang cemerlang.',
  },
  {
    name: 'Intrapersonal',
    domain: 'Disiplin Kendiri & Refleksi',
    score: 70,
    level: 'Sederhana',
    percentage: 70,
    note: '70% murid mempunyai kesedaran kendiri dan motivasi persekolahan.',
  },
];

export const BOTTOM_5_CONSTRUCTS: ConstructItem[] = [
  {
    name: 'Eksistensial',
    domain: 'Nilai & Sahsiah',
    score: 54,
    level: 'Sederhana',
    percentage: 54,
    note: 'Memerlukan bimbingan penghayatan nilai moral dan etika kehidupan.',
  },
  {
    name: 'Muzik',
    domain: 'Apresiasi Seni Audio',
    score: 58,
    level: 'Sederhana',
    percentage: 58,
    note: 'Pendedahan asas irama dan melodi masih pada tahap sederhana.',
  },
  {
    name: 'Naturalis',
    domain: 'Kelestarian Alam Sekitar',
    score: 62,
    level: 'Sederhana',
    percentage: 62,
    note: 'Perlu penglibatan lebih aktif dalam program alam sekitar sekolah.',
  },
  {
    name: 'Logik Matematik',
    domain: 'Penaakulan & Analisis',
    score: 64,
    level: 'Sederhana',
    percentage: 64,
    note: 'Memerlukan pengukuhan soalan Kemahiran Berfikir Aras Tinggi (KBAT).',
  },
  {
    name: 'Intrapersonal (Awal)',
    domain: 'Pengurusan Emosi',
    score: 70,
    level: 'Sederhana',
    percentage: 70,
    note: 'Bimbingan pengurusan stres dan penetapan matlamat jangka panjang.',
  },
];

export const RUMUSAN_SISTEM_DATA: SystemSummary = {
  title: 'Rumusan Sistem Analisa Keseluruhan Sekolah',
  subtitle: 'Laporan Pentaksiran Psikometrik (PPsi) Sesi Akademik 2026/2027',
  description:
    'Secara keseluruhannya, analisis profil kecerdasan murid SK Seri Bintang Utama menunjukkan pencapaian yang sangat membanggakan dalam domain Interpersonal (86%), Ruang Visual (82%), dan Verbal Linguistik (78%). Dapatan ini membuktikan bahawa majoriti murid mempunyai kekuatan sosial yang tinggi, kepimpinan rakan sebaya yang positif, serta minat yang mendalam dalam aktiviti komunikasi visual dan lisan.',
  highlights: [
    'Dominasi Domain Interpersonal & Visual Ruang bagi majoriti murid Tahun 4, 5, dan 6.',
    'Peningkatan konsisten skor kecerdasan murid mengikut aliran Tahun 4 ke Tahun 6.',
    'Domain Eksistensial dan Muzik dikenal pasti sebagai fokus program pengukuhan sahsiah dan seni budaya.',
    'Ketaksamaan jantina menunjukkan kelebihan murid Lelaki dalam Kinestetik & Visual, manakala murid Perempuan mendominasi Verbal & Interpersonal.',
  ],
  recommendations: [
    'Merancang aktiviti Pengajaran dan Pembelajaran (PdP) berteraskan pembelajaran berasaskan projek (PBL) dan peta visual.',
    'Memperkasakan peranan Pembimbing Rakan Sebaya (PRS) dan persatuan kelab ko-kurikulum.',
    'Menyelenggara modul sokongan khas KBAT bagi meningkatkan domain Logik Matematik sekolah.',
  ],
};
