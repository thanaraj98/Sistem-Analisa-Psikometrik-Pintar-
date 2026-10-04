import React from 'react';
import { Bot, Sparkles, HeartPulse, Activity, AlertCircle } from 'lucide-react';

export interface AIAnalysisGBKData {
  developmentObservations?: string;
  psychometricPattern?: string;
  attentionAreas?: string;
}

export interface AIAnalysisGBKProps {
  aiAnalysis?: AIAnalysisGBKData | string;
  className?: string;
}

export const AIAnalysisGBK: React.FC<AIAnalysisGBKProps> = ({
  aiAnalysis,
  className = '',
}) => {
  // Extract data from props or fallback to default structured text for GBK
  const data: AIAnalysisGBKData =
    typeof aiAnalysis === 'string'
      ? {
          developmentObservations: aiAnalysis,
          psychometricPattern: 'Profil psikometrik stabil dengan kecondongan kecerdasan sosial yang tinggi.',
          attentionAreas: 'Perlu fokus kepada pengurusan emosi kendiri semasa menghadapi cabaran tinggi.',
        }
      : {
          developmentObservations:
            aiAnalysis?.developmentObservations ||
            'Perkembangan holistik murid berada pada tahap sangat positif. Murid menunjukkan kematangan emosi (Intrapersonal) dan kebolehan membina hubungan harmoni bersama rakan sebaya (Interpersonal).',
          psychometricPattern:
            aiAnalysis?.psychometricPattern ||
            'Garis profil psikometrik menunjukkan integrasi yang seimbang antara domain kecerdasan sosial dan bahasa. Skor intrapersonal yang tinggi mencerminkan tahap kesedaran kendiri yang matang.',
          attentionAreas:
            aiAnalysis?.attentionAreas ||
            'Perhatian khusus wajar diberikan kepada aspek pemantauan konsistensi motivasi kendiri apabila berdepan dengan tugasan logik yang mencabar.',
        };

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-rose-600" />
            <span>🤖 AI Analysis (Perspektif Kaunselor GBK)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Analisis profesional kaunseling perkembangan sosioemosi dan psikometrik murid
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          <span>Analisis Kaunseling GBK</span>
        </span>
      </div>

      {/* THREE CONTENT BLOCKS */}
      <div className="space-y-4">
        {/* 1. Pemerhatian Perkembangan Murid */}
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
            <HeartPulse className="w-4 h-4 text-rose-600" />
            <span>Pemerhatian Perkembangan Murid</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-rose-100/80">
            {data.developmentObservations}
          </p>
        </div>

        {/* 2. Corak Psikometrik */}
        <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
          <div className="flex items-center gap-2 text-purple-900 font-bold text-xs uppercase tracking-wider">
            <Activity className="w-4 h-4 text-purple-600" />
            <span>Corak Profil Psikometrik</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-purple-100/80">
            {data.psychometricPattern}
          </p>
        </div>

        {/* 3. Perkara yang Perlu Diberi Perhatian */}
        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Perkara yang Perlu Diberi Perhatian</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-amber-100/80">
            {data.attentionAreas}
          </p>
        </div>
      </div>
    </div>
  );
};
