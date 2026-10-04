import React from 'react';
import { DomainScore } from '../../data/dashboardData';
import { BarChart3, Award, Info } from 'lucide-react';

interface OverallSchoolChartCardProps {
  domains: DomainScore[];
  title?: string;
  subtitle?: string;
}

export const OverallSchoolChartCard: React.FC<OverallSchoolChartCardProps> = ({
  domains,
  title = 'Graf Keseluruhan Sekolah',
  subtitle = 'Taburan peratusan penguasaan murid mengikut 9 Domain Kecerdasan (IKP)',
}) => {
  const getBarColor = (index: number) => {
    const colors = [
      'bg-indigo-600',
      'bg-blue-600',
      'bg-sky-500',
      'bg-emerald-500',
      'bg-teal-500',
      'bg-amber-500',
      'bg-purple-500',
      'bg-rose-500',
      'bg-slate-500',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100 self-start sm:self-auto">
          348 Murid Dinilai
        </span>
      </div>

      <div className="space-y-4">
        {domains.map((item, idx) => (
          <div key={item.domain} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-slate-800 font-bold">{item.domain}</span>
                {item.category && (
                  <span className="text-[10px] text-slate-400 font-normal px-2 py-0.5 bg-slate-100 rounded">
                    {item.category}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-normal text-[11px]">
                  {item.count} murid
                </span>
                <span className="text-slate-900 font-extrabold text-sm w-12 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex items-center">
              <div
                className={`h-full rounded-full ${getBarColor(idx)} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          <span>Penguasaan Tinggi (&gt;75%): Interpersonal, Ruang Visual, Verbal Linguistik & Kinestetik</span>
        </div>
        <span className="font-semibold text-slate-700">Dapatan Keseluruhan PPsi 2026/2027</span>
      </div>
    </div>
  );
};
