import React from 'react';
import { GradeDomainComparison } from '../../data/dashboardData';
import { Layers, BookOpen } from 'lucide-react';

interface GradeComparisonChartCardProps {
  data: GradeDomainComparison[];
  title?: string;
  subtitle?: string;
}

export const GradeComparisonChartCard: React.FC<GradeComparisonChartCardProps> = ({
  data,
  title = 'Graf Mengikut Tahun (Tahun 4, 5 & 6)',
  subtitle = 'Perbandingan tahap penguasaan purata domain mengikut darjah',
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span>
            <span className="text-slate-600">Tahun 4</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-slate-600">Tahun 5</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="text-slate-600">Tahun 6</span>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {data.map((item) => (
          <div key={item.domain} className="space-y-2 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>{item.domain}</span>
              <span className="text-[11px] font-semibold text-slate-500">
                Purata Sekolah: <strong className="text-slate-900">{item.schoolAverage}%</strong>
              </span>
            </div>

            {/* Tri-bar representation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {/* Tahun 4 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium text-slate-600">
                  <span>T4</span>
                  <span className="font-bold text-sky-700">{item.t4}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${item.t4}%` }}></div>
                </div>
              </div>

              {/* Tahun 5 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium text-slate-600">
                  <span>T5</span>
                  <span className="font-bold text-emerald-700">{item.t5}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.t5}%` }}></div>
                </div>
              </div>

              {/* Tahun 6 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium text-slate-600">
                  <span>T6</span>
                  <span className="font-bold text-amber-700">{item.t6}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.t6}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
