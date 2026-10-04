import React from 'react';
import { Lightbulb, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';

export interface TeacherRecommendationData {
  items?: string[];
  strategyPdp?: string[];
}

export interface TeacherRecommendationProps {
  recommendations?: string[] | TeacherRecommendationData;
  className?: string;
}

export const TeacherRecommendation: React.FC<TeacherRecommendationProps> = ({
  recommendations,
  className = '',
}) => {
  // Extract list items from props or fallback to standard library recommendations
  let listItems: string[] = [];

  if (Array.isArray(recommendations)) {
    listItems = recommendations;
  } else if (recommendations?.items && Array.isArray(recommendations.items)) {
    listItems = recommendations.items;
  } else if (recommendations?.strategyPdp && Array.isArray(recommendations.strategyPdp)) {
    listItems = recommendations.strategyPdp;
  } else {
    listItems = [
      'Gunakan pendekatan pembelajaran berasaskan projek (PBL) dan perbincangan kumpulan untuk mengoptimumkan domain Verbal Linguistik.',
      'Sediakan bahan bacaan suplemen berunsur wacana interaktif bagi mengukuhkan kefahaman kosa kata bahasa.',
      'Selitkan tugasan pembentangan lisan berjadual untuk memberi ruang murid meluahkan idea secara berstruktur.',
      'Beri galakan khas bagi modul Logik Matematik menerusi bahan bantu mengajar (BBM) bergambar dan berinfografik.',
    ];
  }

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>💡 Cadangan Strategi PdP Guru</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cadangan kaedah pengajaran dan aktiviti bilik darjah daripada Recommendation Library SAPP
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 self-start sm:self-auto flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-sky-600" />
          <span>Panduan PdP Guru</span>
        </span>
      </div>

      {/* BULLET LIST */}
      <div className="space-y-3">
        {listItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all flex items-start gap-3.5"
          >
            <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <p className="text-xs leading-relaxed text-slate-700 font-medium">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
