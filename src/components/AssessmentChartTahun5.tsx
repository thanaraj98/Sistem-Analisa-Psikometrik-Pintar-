import React from 'react';
import { StudentPsychometricRecord, IntelligenceDomain } from '../types';
import { Radar } from 'lucide-react';

export interface DomainChartItem {
  domain: IntelligenceDomain | string;
  score: number;
}

export interface AssessmentChartTahun5Props {
  student?: StudentPsychometricRecord;
  assessmentChart?: DomainChartItem[];
  domains?: DomainChartItem[];
  className?: string;
}

export const AssessmentChartTahun5: React.FC<AssessmentChartTahun5Props> = ({
  student,
  assessmentChart,
  domains,
  className = '',
}) => {
  // 9 Required Domains for Year 5
  const requiredDomains = [
    'Verbal Linguistik',
    'Logik Matematik',
    'Visual Ruang',
    'Muzik',
    'Kinestetik',
    'Interpersonal',
    'Intrapersonal',
    'Naturalis',
    'Eksistensial',
  ];

  // Determine items list
  let itemsToDisplay: DomainChartItem[] = [];

  if (assessmentChart && Array.isArray(assessmentChart)) {
    itemsToDisplay = assessmentChart;
  } else if (domains && Array.isArray(domains)) {
    itemsToDisplay = domains;
  } else if (student && student.ikpScores) {
    itemsToDisplay = requiredDomains.map((domainName) => {
      const match = student.ikpScores.find(
        (s) =>
          s.domain.toLowerCase() === domainName.toLowerCase() ||
          (domainName === 'Visual Ruang' && s.domain.toLowerCase() === 'ruang visual')
      );
      return {
        domain: domainName,
        score: match ? match.score : 70,
      };
    });
  } else {
    // Default fallback
    itemsToDisplay = [
      { domain: 'Verbal Linguistik', score: 85 },
      { domain: 'Logik Matematik', score: 78 },
      { domain: 'Visual Ruang', score: 80 },
      { domain: 'Muzik', score: 65 },
      { domain: 'Kinestetik', score: 72 },
      { domain: 'Interpersonal', score: 88 },
      { domain: 'Intrapersonal', score: 75 },
      { domain: 'Naturalis', score: 70 },
      { domain: 'Eksistensial', score: 68 },
    ];
  }

  // Ensure exact 9 domains order if possible
  const domainsCount = itemsToDisplay.length;

  // Radar SVG Math
  const size = 520;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 160;

  const getCoordinates = (index: number, count: number, valueRatio: number, rOffset = 0) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const currentR = radius * valueRatio + rOffset;
    const x = cx + currentR * Math.cos(angle);
    const y = cy + currentR * Math.sin(angle);
    return { x, y, angle };
  };

  // Concentric polygon web levels
  const webLevels = [0.25, 0.5, 0.75, 1.0];

  // Polygon points string for score data
  const dataPoints = itemsToDisplay.map((item, idx) => {
    const ratio = Math.min(100, Math.max(0, item.score)) / 100;
    const { x, y } = getCoordinates(idx, domainsCount, ratio);
    return { x, y, item };
  });

  const polygonPointsString = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Radar className="w-5 h-5 text-emerald-600" />
            <span>Carta Pentaksiran 9 Domain Tahun 5 (Radar Chart)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Plot profil radar skor 9 domain Inventori Kecerdasan Pelbagai (IKP)
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          📗 Radar T5
        </span>
      </div>

      {/* SVG RADAR CHART */}
      <div className="w-full flex items-center justify-center overflow-x-auto py-2">
        <div className="min-w-[360px] max-w-[500px] w-full">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible">
            {/* Concentric Web Polygons (25%, 50%, 75%, 100%) */}
            {webLevels.map((lvl) => {
              const points = itemsToDisplay
                .map((_, idx) => {
                  const { x, y } = getCoordinates(idx, domainsCount, lvl);
                  return `${x},${y}`;
                })
                .join(' ');

              return (
                <g key={lvl}>
                  <polygon
                    points={points}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth={lvl === 1.0 ? 1.5 : 1}
                    strokeDasharray={lvl === 1.0 ? undefined : '3 3'}
                  />
                  {/* Axis level label at top vertex */}
                  <text
                    x={cx}
                    y={cy - radius * lvl - 4}
                    textAnchor="middle"
                    className="text-[10px] font-bold fill-slate-400 font-mono"
                  >
                    {Math.round(lvl * 100)}%
                  </text>
                </g>
              );
            })}

            {/* Axis Spoke Lines from Center */}
            {itemsToDisplay.map((_, idx) => {
              const { x, y } = getCoordinates(idx, domainsCount, 1.0);
              return (
                <line
                  key={idx}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              );
            })}

            {/* Filled Radar Polygon */}
            <polygon
              points={polygonPointsString}
              fill="#10b981"
              fillOpacity="0.25"
              stroke="#059669"
              strokeWidth="2.5"
              className="transition-all duration-500"
            />

            {/* Data Points & Value Badges */}
            {dataPoints.map((pt, idx) => (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  fill="#059669"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="shadow-sm"
                />
              </g>
            ))}

            {/* Domain Labels around Perimeter */}
            {itemsToDisplay.map((item, idx) => {
              const { x, y, angle } = getCoordinates(idx, domainsCount, 1.0, 28);

              let textAnchor: 'start' | 'middle' | 'end' = 'middle';
              const cosA = Math.cos(angle);
              if (cosA > 0.15) textAnchor = 'start';
              else if (cosA < -0.15) textAnchor = 'end';

              return (
                <g key={idx}>
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor}
                    className="text-[11px] font-bold fill-slate-800"
                  >
                    {item.domain}
                  </text>
                  <text
                    x={x}
                    y={y + 13}
                    textAnchor={textAnchor}
                    className="text-[10px] font-black fill-emerald-700 font-mono"
                  >
                    {item.score}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* FOOTER DOMAINS SCORES SUMMARY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-100">
        {itemsToDisplay.map((item, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs"
          >
            <span className="font-bold text-slate-700 truncate mr-1">{item.domain}</span>
            <span className="font-black text-emerald-700 font-mono shrink-0">{item.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
