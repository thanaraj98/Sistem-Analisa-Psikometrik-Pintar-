import React from 'react';
import { Lightbulb, HeartHandshake, Home } from 'lucide-react';

export interface ParentRecommendationData {
  items?: string[];
  parentSupport?: string[];
}

export interface ParentRecommendationProps {
  recommendations?: string[] | ParentRecommendationData;
  className?: string;
}

export const ParentRecommendation: React.FC<ParentRecommendationProps> = ({
  recommendations,
  className = '',
}) => {
  // Extract list items from props or fallback to standard parent library recommendations
  let listItems: string[] = [];

  if (Array.isArray(recommendations)) {
    listItems = recommendations;
  } else if (recommendations?.items && Array.isArray(recommendations.items)) {
    listItems = recommendations.items;
  } else if (recommendations?.parentSupport && Array.isArray(recommendations.parentSupport)) {
    listItems = recommendations.parentSupport;
  } else {
    listItems = [
      'Sediakan sudut bacaan yang selesa di rumah dan galakkan anak berkongsi ringkasan bahan yang dibaca.',
      'Sering berkomunikasi dengan anak mengenai minat, pengalaman di sekolah, serta impian beliau.',
      'Berikan pujian dan galakan berterusan atas usaha anak, bukannya sekadar bergantung kepada keputusan markah semata-mata.',
      'Libatkan anak dalam perbincangan keluarga mudah bagi melatih kemahiran menyatakan pandangan secara yakin.',
    ];
  }

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>💡 Cadangan Sokongan Ibu Bapa / Waris</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Panduan mesra untuk menyokong minat dan potensi perkembangan anak di rumah
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-amber-600" />
          <span>Sokongan Rumah</span>
        </span>
      </div>

      {/* BULLET LIST */}
      <div className="space-y-3">
        {listItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all flex items-start gap-3.5"
          >
            <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
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
