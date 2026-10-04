import React from 'react';
import { ConstructItem } from '../../data/dashboardData';
import { TrendingUp, TrendingDown, Star, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TopBottomConstructsCardProps {
  top5: ConstructItem[];
  bottom5: ConstructItem[];
  title?: string;
}

export const TopBottomConstructsCard: React.FC<TopBottomConstructsCardProps> = ({
  top5,
  bottom5,
  title = 'Konstruk / Domain Dominan Keseluruhan',
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
        <Star className="w-4 h-4 text-amber-500" />
        <span>{title}</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 5 Domain Tertinggi */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">5 Domain Tertinggi</h3>
                <p className="text-[11px] text-slate-500">Kekuatan utama murid peringkat sekolah</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              Pencapaian Tinggi
            </span>
          </div>

          <div className="space-y-3.5">
            {top5.map((item, idx) => (
              <div key={item.name} className="space-y-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-slate-800">{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({item.domain})</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600">{item.percentage}%</span>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>

                <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium pt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span>{item.note}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Domain Terendah / Fokus Pengukuhan */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">5 Domain Memerlukan Pengukuhan</h3>
                <p className="text-[11px] text-slate-500">Kawasan fokus sokongan intervensi</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
              Fokus Intervensi
            </span>
          </div>

          <div className="space-y-3.5">
            {bottom5.map((item, idx) => (
              <div key={item.name} className="space-y-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-slate-800">{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({item.domain})</span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-600">{item.percentage}%</span>
                </div>

                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>

                <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium pt-0.5">
                  <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{item.note}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
