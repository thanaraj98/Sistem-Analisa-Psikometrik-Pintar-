import React from 'react';
import { Briefcase, Sparkles } from 'lucide-react';

export interface CareerExampleItem {
  title: string;
  category?: string;
  icon?: string;
}

export interface CareerExampleCardProps {
  careerExamples?: (string | CareerExampleItem)[];
  categoryName?: string;
  year?: 4 | 5 | 6;
  maxDisplay?: number;
  className?: string;
}

export const CareerExampleCard: React.FC<CareerExampleCardProps> = ({
  careerExamples,
  categoryName,
  year,
  maxDisplay = 6,
  className = '',
}) => {
  // If explicitly designated for Year 4, do not render according to SAPP V1 spec
  if (year === 4) {
    return null;
  }

  // Default fallback career examples with categories and icons
  const defaultExamples: CareerExampleItem[] = [
    { title: 'Pembangun Perisian', category: 'Teknologi Maklumat', icon: '💻' },
    { title: 'Pakar Keselamatan Siber', category: 'Teknologi Maklumat', icon: '🛡️' },
    { title: 'Penganalisis Data', category: 'Teknologi Maklumat', icon: '📊' },
    { title: 'Jurutera AI & Robotik', category: 'STEM', icon: '🤖' },
    { title: 'Pensyarah / Guru Subjek Sains', category: 'Pendidikan', icon: '🎓' },
    { title: 'Pegawai Komunikasi Korporat', category: 'Komunikasi', icon: '🎙️' },
    { title: 'Jurutera Sistem Komputer', category: 'STEM', icon: '⚙️' },
    { title: 'Perekabentuk Visual & UI/UX', category: 'Seni Kreatif', icon: '🎨' },
    { title: 'Ahli Matematik Gunaan', category: 'STEM', icon: '📐' },
    { title: 'Pakar Pengurusan Projek', category: 'Perniagaan', icon: '📋' },
  ];

  // Helper to resolve icon based on title/category if not provided
  const getIconForTitle = (title: string, category?: string): string => {
    const t = title.toLowerCase();
    const c = (category || '').toLowerCase();

    if (t.includes('perisian') || t.includes('web') || t.includes('kod')) return '💻';
    if (t.includes('siber') || t.includes('keselamatan')) return '🛡️';
    if (t.includes('data') || t.includes('analisis')) return '📊';
    if (t.includes('ai') || t.includes('robot') || t.includes('jurutera')) return '🤖';
    if (t.includes('doktor') || t.includes('perubatan') || c.includes('kesihatan')) return '🏥';
    if (t.includes('jururawat') || t.includes('klinik')) return '🩺';
    if (t.includes('farmasi') || t.includes('ubat')) return '💊';
    if (t.includes('guru') || t.includes('pensyarah') || c.includes('pendidikan')) return '🎓';
    if (t.includes('reka') || t.includes('seni') || c.includes('kreatif')) return '🎨';
    if (t.includes('komunikasi') || t.includes('wartawan')) return '🎙️';
    if (t.includes('akauntan') || t.includes('kewangan') || c.includes('perniagaan')) return '📈';
    if (t.includes('pertanian') || t.includes('botani')) return '🌱';
    return '💼';
  };

  // Process input list into standardized objects
  let rawList: CareerExampleItem[] = [];

  if (careerExamples && Array.isArray(careerExamples) && careerExamples.length > 0) {
    rawList = careerExamples.map((item) => {
      if (typeof item === 'string') {
        return {
          title: item,
          category: categoryName || 'Bidang Berkaitan',
          icon: getIconForTitle(item, categoryName),
        };
      }
      return {
        title: item.title,
        category: item.category || categoryName || 'Bidang Berkaitan',
        icon: item.icon || getIconForTitle(item.title, item.category || categoryName),
      };
    });
  } else {
    rawList = defaultExamples;
  }

  // Display max N items and count remaining
  const displayedItems = rawList.slice(0, maxDisplay);
  const remainingCount = Math.max(0, rawList.length - maxDisplay);

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-sky-600" />
            <span>💼 Contoh Kerjaya</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Contoh kerjaya sasaran berasaskan bidang kecenderungan psikometrik murid
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Contoh Kerjaya (T5/T6)</span>
        </span>
      </div>

      {/* CATEGORY BANNER (IF SPECIFIED) */}
      {categoryName && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
          <span>🎯 Kategori Bidang:</span>
          <span className="text-sky-800 font-black">{categoryName}</span>
        </div>
      )}

      {/* CAREER ITEMS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayedItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/30 transition-all flex items-start gap-3 shadow-2xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              {item.icon}
            </div>
            <div className="space-y-0.5 min-w-0">
              {item.category && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block truncate">
                  {item.category}
                </span>
              )}
              <h3 className="text-xs font-black text-slate-900 leading-snug truncate">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* MORE CAREERS BADGE (+XX lagi kerjaya berkaitan) */}
      {remainingCount > 0 && (
        <div className="pt-2 flex justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-black text-xs border border-slate-200/80 hover:bg-slate-200/60 transition-colors shadow-2xs">
            <span>➕</span>
            <span>+{remainingCount} lagi kerjaya berkaitan</span>
          </span>
        </div>
      )}
    </div>
  );
};
