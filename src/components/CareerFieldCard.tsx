import React from 'react';
import { Target, Sparkles, Briefcase } from 'lucide-react';

export interface CareerFieldCardProps {
  careerFields?: string[];
  year?: 4 | 5 | 6;
  className?: string;
}

export const CareerFieldCard: React.FC<CareerFieldCardProps> = ({
  careerFields,
  year,
  className = '',
}) => {
  // If explicitly designated for Year 4, do not render according to SAPP V1 spec
  if (year === 4) {
    return null;
  }

  // Fallback default list if no props provided
  const defaultFields = [
    'STEM',
    'Teknologi Maklumat',
    'Pendidikan',
    'Komunikasi & Bahasa',
    'Sains Sosial',
  ];

  const fieldsToDisplay =
    careerFields && Array.isArray(careerFields) && careerFields.length > 0
      ? careerFields
      : defaultFields;

  // Modern colorful badge styles for fields
  const getBadgeStyle = (index: number) => {
    const styles = [
      'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
      'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100',
      'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
      'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
      'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100',
      'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100',
      'bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100',
    ];
    return styles[index % styles.length];
  };

  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>🎯 Bidang Berkaitan</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Bidang kecenderungan utama berasaskan profil psikometrik murid
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 self-start sm:self-auto flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
          <span>Bidang Kecenderungan</span>
        </span>
      </div>

      {/* BADGES / TAGS LIST */}
      <div className="flex flex-wrap gap-2.5 pt-1">
        {fieldsToDisplay.map((field, idx) => (
          <div
            key={idx}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-black shadow-2xs transition-all cursor-default ${getBadgeStyle(
              idx
            )}`}
          >
            <span>🎯</span>
            <span>{field}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
