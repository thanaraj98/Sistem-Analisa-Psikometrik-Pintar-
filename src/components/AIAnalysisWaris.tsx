import React from 'react';
import { Bot, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export interface AIAnalysisWarisData {
  childStrengthsUnderstanding?: string;
  developmentOverview?: string;
}

export interface AIAnalysisWarisProps {
  aiAnalysis?: AIAnalysisWarisData | string;
  className?: string;
}

export const AIAnalysisWaris: React.FC<AIAnalysisWarisProps> = ({
  aiAnalysis,
  className = '',
}) => {
  // Extract data from props or fallback to default parent-friendly text
  const data: AIAnalysisWarisData =
    typeof aiAnalysis === 'string'
      ? {
          childStrengthsUnderstanding: aiAnalysis,
          developmentOverview: 'Anak tuan/puan berkembang secara positif dalam aspek komunikasi dan kebolehan sosial.',
        }
      : {
          childStrengthsUnderstanding:
            aiAnalysis?.childStrengthsUnderstanding ||
            'Anak tuan/puan menyerlah dalam kecerdasan Verbal Linguistik dan Interpersonal. Beliau mempunyai kebolehan semula jadi untuk meluahkan idea secara berhemah serta mudah menyesuaikan diri dalam persekitaran sosial.',
          developmentOverview:
            aiAnalysis?.developmentOverview ||
            'Secara keseluruhannya, anak tuan/puan menunjukkan potensi sosioemosi yang kukuh dan berkeyakinan tinggi apabila melibatkan aktiviti berkumpulan dan komunikasi bersama rakan-rakan.',
        };

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-600" />
            <span>🤖 AI Analysis (Perspektif Ibu Bapa / Waris)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kefahaman mesra mengenai potensi, kekuatan, dan perkembangan diri anak
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Panduan Ibu Bapa</span>
        </span>
      </div>

      {/* TWO CONTENT BLOCKS */}
      <div className="space-y-4">
        {/* 1. Kefahaman Kekuatan Anak */}
        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>Kefahaman Kekuatan Anak</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-amber-100/80">
            {data.childStrengthsUnderstanding}
          </p>
        </div>

        {/* 2. Gambaran Perkembangan Diri */}
        <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-2">
          <div className="flex items-center gap-2 text-orange-900 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Gambaran Perkembangan Diri Anak</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-orange-100/80">
            {data.developmentOverview}
          </p>
        </div>
      </div>
    </div>
  );
};
