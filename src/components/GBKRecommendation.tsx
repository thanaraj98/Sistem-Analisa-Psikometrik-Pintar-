import React from 'react';
import { Lightbulb, HeartPulse, Sparkles } from 'lucide-react';

export interface GBKRecommendationData {
  items?: string[];
  interventionGbk?: string[];
}

export interface GBKRecommendationProps {
  recommendations?: string[] | GBKRecommendationData;
  className?: string;
}

export const GBKRecommendation: React.FC<GBKRecommendationProps> = ({
  recommendations,
  className = '',
}) => {
  // Extract list items from props or fallback to standard GBK library recommendations
  let listItems: string[] = [];

  if (Array.isArray(recommendations)) {
    listItems = recommendations;
  } else if (recommendations?.items && Array.isArray(recommendations.items)) {
    listItems = recommendations.items;
  } else if (recommendations?.interventionGbk && Array.isArray(recommendations.interventionGbk)) {
    listItems = recommendations.interventionGbk;
  } else {
    listItems = [
      'Libatkan murid dalam kelab rakan sebaya atau jawatan kepimpinan murid untuk memupuk potensi domain Interpersonal.',
      'Sediakan bimbingan kaunseling kelompok bagi mengukuhkan keyakinan diri dan pengurusan emosi kendiri.',
      'Pantau perkembangan profil psikometrik murid secara berfasa bagi memastikan kesinambungan motivasi diri.',
      'Beri sokongan moral berterusan melalui sesi kesedaran potensi diri dan minat sekolah.',
    ];
  }

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>💡 Cadangan Interventions &amp; Bimbingan GBK</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cadangan intervensi perkembangan diri dan kaunseling daripada Recommendation Library SAPP
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 self-start sm:self-auto flex items-center gap-1.5">
          <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
          <span>Modul Kaunseling GBK</span>
        </span>
      </div>

      {/* BULLET LIST */}
      <div className="space-y-3">
        {listItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all flex items-start gap-3.5"
          >
            <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
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
