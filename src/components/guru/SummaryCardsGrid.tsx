import React from 'react';
import { SummaryStat } from '../../data/dashboardData';
import { Users, UserCheck, BookOpen, Layers } from 'lucide-react';

interface SummaryCardsGridProps {
  stats: SummaryStat[];
  title?: string;
}

export const SummaryCardsGrid: React.FC<SummaryCardsGridProps> = ({ stats, title = 'Kad Ringkasan' }) => {
  const getIcon = (key: string) => {
    switch (key) {
      case 'totalStudents':
        return Users;
      case 'totalMale':
      case 'totalFemale':
        return UserCheck;
      case 'totalTahun4':
      case 'totalTahun5':
      case 'totalTahun6':
        return BookOpen;
      default:
        return Layers;
    }
  };

  const getColorClasses = (colorType: SummaryStat['colorType']) => {
    switch (colorType) {
      case 'indigo':
        return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'purple':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'sky':
        return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'emerald':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'amber':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-3">
      {title && (
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <span>{title}</span>
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = getIcon(stat.key);
          const iconStyle = getColorClasses(stat.colorType);

          return (
            <div
              key={stat.key}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500">
                  {stat.title}
                </span>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconStyle}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                  {stat.badge && (
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {stat.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
