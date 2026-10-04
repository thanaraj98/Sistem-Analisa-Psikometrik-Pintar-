import React from 'react';
import { Bot, Sparkles, BookOpen, Target, Eye } from 'lucide-react';

export interface AIAnalysisGuruData {
  strengthsSummary?: string;
  reinforcementAreas?: string;
  learningPatternObservations?: string;
}

export interface AIAnalysisGuruProps {
  aiAnalysis?: AIAnalysisGuruData | string;
  className?: string;
}

export const AIAnalysisGuru: React.FC<AIAnalysisGuruProps> = ({
  aiAnalysis,
  className = '',
}) => {
  // Extract data from props or fallback to default structured professional text
  const data: AIAnalysisGuruData =
    typeof aiAnalysis === 'string'
      ? {
          strengthsSummary: aiAnalysis,
          reinforcementAreas: 'Perlu bimbingan konsisten bagi domain yang berada pada tahap sederhana.',
          learningPatternObservations: 'Cenderung kepada kaedah pembelajaran berasaskan visual dan interaksi langsung.',
        }
      : {
          strengthsSummary:
            aiAnalysis?.strengthsSummary ||
            'Murid menunjukkan kecenderungan yang amat tinggi dalam domain Verbal Linguistik dan Interpersonal. Mempunyai keupayaan cemerlang dalam menyatakan idea secara tersusun dan berinteraksi dalam kumpulan.',
          reinforcementAreas:
            aiAnalysis?.reinforcementAreas ||
            'Domain Logik Matematik dan Visual Ruang berada pada tahap sederhana dan memerlukan pendedahan tambahan kepada tugasan pemikiran berstruktur.',
          learningPatternObservations:
            aiAnalysis?.learningPatternObservations ||
            'Corak pembelajaran menunjukkan murid lebih cepat menyerap maklumat melalui perbincangan, pembacaan aktif, dan aktiviti berasaskan wacana lisan.',
        };

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span>🤖 AI Analysis (Perspektif Guru)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Analisis profesional berfokuskan profil akademik dan corak pembelajaran murid
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Analisis Profesional Guru</span>
        </span>
      </div>

      {/* THREE CONTENT BLOCKS */}
      <div className="space-y-4">
        {/* 1. Rumusan Kekuatan Murid */}
        <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Rumusan Kekuatan Murid</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-indigo-100/80">
            {data.strengthsSummary}
          </p>
        </div>

        {/* 2. Perkara yang Perlu Diperkukuh */}
        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4 text-amber-600" />
            <span>Perkara yang Perlu Diperkukuh</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-amber-100/80">
            {data.reinforcementAreas}
          </p>
        </div>

        {/* 3. Pemerhatian Corak Pembelajaran */}
        <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2">
          <div className="flex items-center gap-2 text-sky-900 font-bold text-xs uppercase tracking-wider">
            <Eye className="w-4 h-4 text-sky-600" />
            <span>Pemerhatian Corak Pembelajaran</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-sky-100/80">
            {data.learningPatternObservations}
          </p>
        </div>
      </div>
    </div>
  );
};
