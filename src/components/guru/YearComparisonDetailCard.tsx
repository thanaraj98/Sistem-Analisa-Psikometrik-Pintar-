import React from 'react';
import { GradeDomainComparison } from '../../data/dashboardData';
import { Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface YearComparisonDetailCardProps {
  data: GradeDomainComparison[];
  title?: string;
  subtitle?: string;
}

export const YearComparisonDetailCard: React.FC<YearComparisonDetailCardProps> = ({
  data,
  title = 'Perbandingan Tahun (Tahun 4 vs Tahun 5 vs Tahun 6)',
  subtitle = 'Jadual perbandingan skor peratusan domain merentas aliran darjah',
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200 self-start sm:self-auto">
          3 Aliran Ditaksir
        </span>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead>
            <tr className="bg-slate-50 border-y border-slate-200/80">
              <th className="py-3 px-4 font-bold text-slate-800">Domain / Konstruk</th>
              <th className="py-3 px-3 font-bold text-sky-700 text-center">Tahun 4 (115)</th>
              <th className="py-3 px-3 font-bold text-emerald-700 text-center">Tahun 5 (118)</th>
              <th className="py-3 px-3 font-bold text-amber-700 text-center">Tahun 6 (115)</th>
              <th className="py-3 px-4 font-bold text-indigo-700 text-center">Purata Sekolah</th>
              <th className="py-3 px-4 font-bold text-slate-700 text-center">Trend Aliran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row) => {
              const diffT6T4 = row.t6 - row.t4;
              return (
                <tr key={row.domain} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>{row.domain}</span>
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-sky-800 bg-sky-50/30">
                    {row.t4}%
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-emerald-800 bg-emerald-50/30">
                    {row.t5}%
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-amber-800 bg-amber-50/30">
                    {row.t6}%
                  </td>
                  <td className="py-3 px-4 text-center font-extrabold text-slate-900 bg-slate-50/50">
                    {row.schoolAverage}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      +{diffT6T4}% (Meningkat)
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
