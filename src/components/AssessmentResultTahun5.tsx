import React from 'react';
import { StudentPsychometricRecord, IntelligenceDomain } from '../types';
import { Layers, CheckCircle2 } from 'lucide-react';

export interface DomainResultItem {
  domain: IntelligenceDomain | string;
  score: number;
  level: 'Tinggi' | 'Sederhana' | 'Rendah' | string;
}

export interface AssessmentResultTahun5Props {
  student?: StudentPsychometricRecord;
  assessment?: {
    domains?: DomainResultItem[];
  } | DomainResultItem[];
  className?: string;
}

export const AssessmentResultTahun5: React.FC<AssessmentResultTahun5Props> = ({
  student,
  assessment,
  className = '',
}) => {
  // 9 Required Domains for Year 5
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

  // Helper for Badge Tahap
  const renderLevelBadge = (level: string) => {
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

  // Build items list
  let itemsToDisplay: DomainResultItem[] = [];

  if (Array.isArray(assessment)) {
    itemsToDisplay = assessment;
  } else if (assessment?.domains && Array.isArray(assessment.domains)) {
    itemsToDisplay = assessment.domains;
  } else if (student && student.ikpScores) {
    itemsToDisplay = requiredDomains.map((domainName) => {
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
    // Default fallback list
    itemsToDisplay = requiredDomains.map((dom, idx) => ({
      domain: dom,
      score: 75 + (idx % 3) * 5,
      level: 75 + (idx % 3) * 5 >= 75 ? 'Tinggi' : 'Sederhana',
    }));
  }

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>Keputusan Pentaksiran 9 Domain (Tahun 5)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Keputusan rasmi Inventori Kecerdasan Pelbagai (IKP) bagi 9 domain psikometrik
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          📗 SAPP Tahun 5
        </span>
      </div>

      {/* LIST OF 9 DOMAINS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {itemsToDisplay.map((item, index) => (
          <div
            key={index}
            className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                #{index + 1}
              </span>
              <div>
                <h3 className="text-xs font-bold text-slate-900">{item.domain}</h3>
                <span className="text-[10px] text-slate-500 font-medium">Domain IKP</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-black text-slate-900">{item.score}%</span>
              <div>{renderLevelBadge(item.level)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
