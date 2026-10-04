import React from 'react';
import { StudentPsychometricRecord } from '../types';
import { BarChart2 } from 'lucide-react';

export interface ConstructChartItem {
  construct: string; // e.g. "Verbal Linguistik BM", "Verbal Linguistik BI", "Logik Matematik"
  score: number;
}

export interface AssessmentChartTahun4Props {
  student?: StudentPsychometricRecord;
  assessmentChart?: ConstructChartItem[];
  constructs?: ConstructChartItem[];
  className?: string;
}

export const AssessmentChartTahun4: React.FC<AssessmentChartTahun4Props> = ({
  student,
  assessmentChart,
  constructs,
  className = '',
}) => {
  // Determine construct items from props
  let itemsToDisplay: ConstructChartItem[] = [];

  if (assessmentChart && Array.isArray(assessmentChart)) {
    itemsToDisplay = assessmentChart;
  } else if (constructs && Array.isArray(constructs)) {
    itemsToDisplay = constructs;
  } else if (student) {
    const bmScore = student.ikpScores?.find((s) => s.domain.toLowerCase().includes('verbal'))?.score || 85;
    const biScore = Math.max(40, bmScore - 7);
    const mathScore = student.ikpScores?.find((s) => s.domain.toLowerCase().includes('logik'))?.score || 68;

    itemsToDisplay = [
      { construct: 'Verbal Linguistik BM', score: bmScore },
      { construct: 'Verbal Linguistik BI', score: biScore },
      { construct: 'Logik Matematik', score: mathScore },
    ];
  } else {
    itemsToDisplay = [
      { construct: 'Verbal Linguistik BM', score: 85 },
      { construct: 'Verbal Linguistik BI', score: 78 },
      { construct: 'Logik Matematik', score: 68 },
    ];
  }

  // SVG Bar Chart dimensions
  const svgWidth = 600;
  const svgHeight = 280;
  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 40;
  const paddingBottom = 60;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const yTicks = [0, 25, 50, 75, 100];

  // Bar dimensions
  const numBars = itemsToDisplay.length;
  const barGroupWidth = chartWidth / numBars;
  const barWidth = Math.min(64, barGroupWidth * 0.45);

  const getBarColor = (index: number) => {
    switch (index % 3) {
      case 0:
        return { fill: '#0284c7', bg: 'bg-sky-500', text: 'text-sky-700' }; // Sky
      case 1:
        return { fill: '#2563eb', bg: 'bg-blue-600', text: 'text-blue-700' }; // Blue
      case 2:
        return { fill: '#0d9488', bg: 'bg-teal-600', text: 'text-teal-700' }; // Teal
      default:
        return { fill: '#3b82f6', bg: 'bg-blue-500', text: 'text-blue-700' };
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-sky-600" />
            <span>Carta Pentaksiran Tahun 4 (Bar Chart)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualisasi skor pentaksiran mengikut konstruk bahasa dan logik matematik
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 self-start sm:self-auto">
          📘 Carta T4
        </span>
      </div>

      {/* SVG BAR CHART CONTAINER */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[500px]">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
            {/* Y-Axis Horizontal Gridlines & Labels */}
            {yTicks.map((tick) => {
              const yPos = paddingTop + chartHeight - (tick / 100) * chartHeight;
              return (
                <g key={tick}>
                  <line
                    x1={paddingLeft}
                    y1={yPos}
                    x2={svgWidth - paddingRight}
                    y2={yPos}
                    stroke="#e2e8f0"
                    strokeDasharray={tick === 0 ? undefined : '4 4'}
                    strokeWidth={tick === 0 ? 1.5 : 1}
                  />
                  <text
                    x={paddingLeft - 12}
                    y={yPos + 4}
                    textAnchor="end"
                    className="text-[11px] font-semibold fill-slate-400 font-mono"
                  >
                    {tick}%
                  </text>
                </g>
              );
            })}

            {/* Bars & X-Axis Labels */}
            {itemsToDisplay.map((item, idx) => {
              const xCenter = paddingLeft + idx * barGroupWidth + barGroupWidth / 2;
              const xPos = xCenter - barWidth / 2;
              const barH = (Math.min(100, Math.max(0, item.score)) / 100) * chartHeight;
              const yPos = paddingTop + chartHeight - barH;
              const colors = getBarColor(idx);

              return (
                <g key={idx} className="group cursor-pointer">
                  {/* Bar Background Track */}
                  <rect
                    x={xPos}
                    y={paddingTop}
                    width={barWidth}
                    height={chartHeight}
                    rx={8}
                    fill="#f8fafc"
                  />

                  {/* Actual Score Bar */}
                  <rect
                    x={xPos}
                    y={yPos}
                    width={barWidth}
                    height={barH}
                    rx={8}
                    fill={colors.fill}
                    className="transition-all duration-300 group-hover:opacity-90"
                  />

                  {/* Score Label Callout above bar */}
                  <text
                    x={xCenter}
                    y={yPos - 10}
                    textAnchor="middle"
                    className="text-xs font-black fill-slate-900"
                  >
                    {item.score}%
                  </text>

                  {/* X-Axis Label */}
                  <text
                    x={xCenter}
                    y={paddingTop + chartHeight + 24}
                    textAnchor="middle"
                    className="text-[11px] font-bold fill-slate-700"
                  >
                    {item.construct}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* LEGEND / SUMMARY BAR LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
        {itemsToDisplay.map((item, idx) => {
          const colors = getBarColor(idx);
          return (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${colors.bg}`} />
                <span className="text-xs font-bold text-slate-800">{item.construct}</span>
              </div>
              <span className="text-xs font-black text-slate-900">{item.score}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
