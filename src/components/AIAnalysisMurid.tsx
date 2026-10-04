import React from 'react';
import { Bot, Sparkles, Smile, Award } from 'lucide-react';

export interface AIAnalysisMuridData {
  selfUnderstanding?: string;
  positiveStrengths?: string;
}

export interface AIAnalysisMuridProps {
  aiAnalysis?: AIAnalysisMuridData | string;
  className?: string;
}

export const AIAnalysisMurid: React.FC<AIAnalysisMuridProps> = ({
  aiAnalysis,
  className = '',
}) => {
  // Extract data from props or fallback to default student-friendly positive text
  const data: AIAnalysisMuridData =
    typeof aiAnalysis === 'string'
      ? {
          selfUnderstanding: aiAnalysis,
          positiveStrengths: 'Awak seorang yang mesra, pandai berkomunikasi, dan suka belajar perkara baharu.',
        }
      : {
          selfUnderstanding:
            aiAnalysis?.selfUnderstanding ||
            'Awak mempunyai kebolehan istimewa dalam memahami bahasa dan mudah berkawan dengan rakan-rakan. Awak hebat dalam bercakap dan menyampaikan idea secara berhemah!',
          positiveStrengths:
            aiAnalysis?.positiveStrengths ||
            'Keistimewaan utama awak ialah daya pemikiran yang kreatif serta sikap suka membantu rakan sebaya. Awak juga seorang yang peka dan prihatin terhadap perasaan orang di sekeliling.',
        };

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-600" />
            <span>🤖 AI Analysis (Ruang Diri Murid)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mengenali potensi dan keistimewaan unik yang ada dalam diri awak
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Mengenali Diri Saya</span>
        </span>
      </div>

      {/* TWO CONTENT BLOCKS */}
      <div className="space-y-4">
        {/* 1. Kefahaman Diri */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
            <Smile className="w-4 h-4 text-emerald-600" />
            <span>Refleksi &amp; Mengenali Diri</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-emerald-100/80">
            {data.selfUnderstanding}
          </p>
        </div>

        {/* 2. Keistimewaan Utama */}
        <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-2">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 text-teal-600" />
            <span>Keistimewaan &amp; Kekuatan Diri</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3.5 rounded-xl border border-teal-100/80">
            {data.positiveStrengths}
          </p>
        </div>
      </div>
    </div>
  );
};
