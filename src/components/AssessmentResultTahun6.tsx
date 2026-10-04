import React from 'react';
import { StudentPsychometricRecord, IntelligenceDomain } from '../types';
import { Layers, Brain, Lightbulb } from 'lucide-react';

export interface DomainResultItem {
  domain: IntelligenceDomain | string;
  score: number;
  level: 'Tinggi' | 'Sederhana' | 'Rendah' | string;
}

export interface AptitudeResultItem {
  name: string; // "Kemahiran Menaakul (KM)" or "Kemahiran Menyelesaikan Masalah (KMM)"
  score: number;
  level: 'Baik' | 'Kurang Potensi' | string;
}

export interface AssessmentResultTahun6Props {
  student?: StudentPsychometricRecord;
  assessment?: {
    domains?: DomainResultItem[];
    aptitudes?: AptitudeResultItem[];
    km?: AptitudeResultItem;
    kmm?: AptitudeResultItem;
  };
  className?: string;
}

export const AssessmentResultTahun6: React.FC<AssessmentResultTahun6Props> = ({
  student,
  assessment,
  className = '',
}) => {
  // 9 Required Domains for Year 6
  const requiredDomains = [
    'Verbal Linguistik',
    'Logik Matematik',
    'Visual Ruang',
    'Muzik',
    'Kinestetik',
    'Interpersonal',
    'Intrapersonal',
    'Naturalis',
    'Eksistensial',
  ];

  // Helper for Badge Tahap (9 Domains)
  const renderDomainLevelBadge = (level: string) => {
    const lvlLower = level.toLowerCase();
    if (lvlLower.includes('tinggi')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-2xs">
          <span>🟢</span> Tinggi
        </span>
      );
    }
    if (lvlLower.includes('sederhana')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs shadow-2xs">
          <span>🟡</span> Sederhana
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-bold text-xs shadow-2xs">
        <span>🔴</span> Rendah
      </span>
    );
  };

  // Helper for Badge Tahap (KM & KMM)
  const renderAptitudeLevelBadge = (level: string) => {
    const lvlLower = level.toLowerCase();
    if (lvlLower.includes('baik')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-2xs">
          <span>🟢</span> Baik
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-bold text-xs shadow-2xs">
        <span>🔴</span> Kurang Potensi
      </span>
    );
  };

  // 1. Build 9 Domains list
  let domainItems: DomainResultItem[] = [];

  if (assessment?.domains && Array.isArray(assessment.domains)) {
    domainItems = assessment.domains;
  } else if (student && student.ikpScores) {
    domainItems = requiredDomains.map((domainName) => {
      const match = student.ikpScores.find(
        (s) =>
          s.domain.toLowerCase() === domainName.toLowerCase() ||
          (domainName === 'Visual Ruang' && s.domain.toLowerCase() === 'ruang visual')
      );
      return {
        domain: domainName,
        score: match ? match.score : 70,
        level: match ? match.level : 'Sederhana',
      };
    });
  } else {
    domainItems = requiredDomains.map((dom, idx) => ({
      domain: dom,
      score: 75 + (idx % 3) * 6,
      level: 75 + (idx % 3) * 6 >= 75 ? 'Tinggi' : 'Sederhana',
    }));
  }

  // 2. Build KM & KMM items
  let kmItem: AptitudeResultItem = {
    name: 'Kemahiran Menaakul (KM)',
    score: 82,
    level: 'Baik',
  };

  let kmmItem: AptitudeResultItem = {
    name: 'Kemahiran Menyelesaikan Masalah (KMM)',
    score: 85,
    level: 'Baik',
  };

  if (assessment?.km) {
    kmItem = assessment.km;
  } else if (student?.aptitudeScores) {
    const foundKM = student.aptitudeScores.find((a) => a.component === 'Penaakulan');
    if (foundKM) {
      kmItem = {
        name: 'Kemahiran Menaakul (KM)',
        score: foundKM.score,
        level: foundKM.score >= 65 ? 'Baik' : 'Kurang Potensi',
      };
    }
  }

  if (assessment?.kmm) {
    kmmItem = assessment.kmm;
  } else if (student?.aptitudeScores) {
    const foundKMM = student.aptitudeScores.find((a) => a.component === 'Penyelesaian Masalah');
    if (foundKMM) {
      kmmItem = {
        name: 'Kemahiran Menyelesaikan Masalah (KMM)',
        score: foundKMM.score,
        level: foundKMM.score >= 65 ? 'Baik' : 'Kurang Potensi',
      };
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SEKSYEN 1: 9 DOMAIN */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <span>Keputusan Pentaksiran 9 Domain (Tahun 6)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Keputusan rasmi Inventori Kecerdasan Pelbagai (IKP) Tahun 6
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            📙 SAPP Tahun 6 (9 Domain)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {domainItems.map((item, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                  #{index + 1}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.domain}</h3>
                  <span className="text-[10px] text-slate-500 font-medium">Domain IKP</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-black text-slate-900">{item.score}%</span>
                <div>{renderDomainLevelBadge(item.level)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEKSYEN 2: KM & KMM (SEKSYEN BERASINGAN) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <span>Kemahiran Menaakul (KM) &amp; Menyelesaikan Masalah (KMM)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Komponen aptitud khas berasingan daripada 9 domain utama
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 self-start sm:self-auto">
            Aptitud Khas T6
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* KM Card */}
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{kmItem.name}</h3>
                <span className="text-[11px] text-indigo-700 font-semibold">Aptitud KM</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-base font-black text-slate-900">{kmItem.score}%</span>
              <div>{renderAptitudeLevelBadge(kmItem.level)}</div>
            </div>
          </div>

          {/* KMM Card */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{kmmItem.name}</h3>
                <span className="text-[11px] text-amber-700 font-semibold">Aptitud KMM</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-base font-black text-slate-900">{kmmItem.score}%</span>
              <div>{renderAptitudeLevelBadge(kmmItem.level)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
