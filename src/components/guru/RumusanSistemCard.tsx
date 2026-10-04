import React from 'react';
import { SystemSummary } from '../../data/dashboardData';
import { Sparkles, CheckCircle2, ShieldCheck, BookmarkCheck } from 'lucide-react';

interface RumusanSistemCardProps {
  summary: SystemSummary;
}

export const RumusanSistemCard: React.FC<RumusanSistemCardProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {summary.title}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {summary.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <ShieldCheck className="w-4 h-4" />
            Laporan Disahkan
          </span>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed font-normal bg-slate-50/70 p-4 rounded-xl border border-slate-100">
        {summary.description}
      </p>

      {/* 2 Grid Sections: Highlights & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Dapatan Utama */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-indigo-600" />
            <span>Dapatan Utama Sekolah</span>
          </h4>
          <ul className="space-y-2">
            {summary.highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cadangan Tindakan Susulan */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Cadangan Cadangan PdP & Kaunseling</span>
          </h4>
          <ul className="space-y-2">
            {summary.recommendations.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
