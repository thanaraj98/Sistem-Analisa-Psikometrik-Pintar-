import React from 'react';
import { GenderDomainComparison } from '../../data/dashboardData';
import { Users, UserCheck } from 'lucide-react';

interface GenderBreakdownChartCardProps {
  data: GenderDomainComparison[];
  title?: string;
  subtitle?: string;
}

export const GenderBreakdownChartCard: React.FC<GenderBreakdownChartCardProps> = ({
  data,
  title = 'Graf Mengikut Jantina (Lelaki & Perempuan)',
  subtitle = 'Analisis taburan peratusan kecerdasan mengikut jantina murid',
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
            <span className="text-slate-700">Lelaki (182)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
            <span className="text-slate-700">Perempuan (166)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.domain} className="space-y-2 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>{item.domain}</span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-blue-700 font-bold">L: {item.malePercentage}%</span>
                <span className="text-slate-300">|</span>
                <span className="text-purple-700 font-bold">P: {item.femalePercentage}%</span>
              </div>
            </div>

            {/* Double Bar */}
            <div className="space-y-1.5">
              {/* Male Bar */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-slate-500 w-12 shrink-0">Lelaki</span>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.malePercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Female Bar */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-slate-500 w-12 shrink-0">Perempuan</span>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${item.femalePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
