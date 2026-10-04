import React from 'react';
import { Lightbulb, Smile, Star } from 'lucide-react';

export interface StudentRecommendationData {
  items?: string[];
  studentAction?: string[];
}

export interface StudentRecommendationProps {
  recommendations?: string[] | StudentRecommendationData;
  className?: string;
}

export const StudentRecommendation: React.FC<StudentRecommendationProps> = ({
  recommendations,
  className = '',
}) => {
  // Extract list items from props or fallback to standard student library recommendations
  let listItems: string[] = [];

  if (Array.isArray(recommendations)) {
    listItems = recommendations;
  } else if (recommendations?.items && Array.isArray(recommendations.items)) {
    listItems = recommendations.items;
  } else if (recommendations?.studentAction && Array.isArray(recommendations.studentAction)) {
    listItems = recommendations.studentAction;
  } else {
    listItems = [
      'Amalkan membaca majalah, buku cerita, atau artikel ilmu pengetahuan selama 15 minit setiap hari.',
      'Sertai aktiviti persatuan, kelab, atau sukan di sekolah untuk menambah rakan baru dan mengasah bakat kepimpinan.',
      'Cuba selesaikan teka-teki logik atau permainan teka nombor untuk menguji minda secara menyeronokkan.',
      'Sentiasa berani bertanya kepada guru atau rakan sekiranya ada tajuk pelajaran yang belum difahami.',
    ];
  }

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>💡 Cadangan Aktiviti Kendiri Murid</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Langkah mudah dan amalan harian untuk membina potensi diri awak
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-emerald-600" />
          <span>Langkah Saya</span>
        </span>
      </div>

      {/* BULLET LIST */}
      <div className="space-y-3">
        {listItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all flex items-start gap-3.5"
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
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
