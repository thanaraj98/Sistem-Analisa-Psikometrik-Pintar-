import React from 'react';
import { StudentPsychometricRecord, IntelligenceDomain } from '../types';
import { Radar, Brain, Lightbulb } from 'lucide-react';

export interface DomainChartItem {
  domain: IntelligenceDomain | string;
  score: number;
}

export interface AptitudeChartItem {
  name: string; // "Kemahiran Menaakul (KM)" or "Kemahiran Menyelesaikan Masalah (KMM)"
  score: number;
  level: 'Baik' | 'Kurang Potensi' | string;
}

export interface AssessmentChartTahun6Props {
  student?: StudentPsychometricRecord;
  assessmentChart?: {
    domains?: DomainChartItem[];
    km?: AptitudeChartItem;
    kmm?: AptitudeChartItem;
  };
  domains?: DomainChartItem[];
  km?: AptitudeChartItem;
  kmm?: AptitudeChartItem;
  className?: string;
}

export const AssessmentChartTahun6: React.FC<AssessmentChartTahun6Props> = ({
  student,
  assessmentChart,
  domains,
  km,
  kmm,
  className = '',
}) => {
  // 9 Required Domains for Year 6
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

  // Helper for Badge Tahap (KM & KMM)
  const renderAptitudeLevelBadge = (level: string) => {
    const lvlLower = level.toLowerCase();
    if (lvlLower.includes('baik')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-2xs">
          <span>🟢</span> Baik
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 font-bold text-xs shadow-2xs">
        <span>🔴</span> Kurang Potensi
      </span>
    );
  };

  // 1. Determine 9 Domains list
  let domainItems: DomainChartItem[] = [];

  if (assessmentChart?.domains && Array.isArray(assessmentChart.domains)) {
    domainItems = assessmentChart.domains;
  } else if (domains && Array.isArray(domains)) {
    domainItems = domains;
  } else if (student && student.ikpScores) {
    domainItems = requiredDomains.map((domainName) => {
      const match = student.ikpScores.find(
        (s) =>
          s.domain.toLowerCase() === domainName.toLowerCase() ||
          (domainName === 'Visual Ruang' && s.domain.toLowerCase() === 'ruang visual')
      );
      return {
        domain: domainName,
        score: match ? match.score : 75,
      };
    });
  } else {
    // Default fallback list
    domainItems = [
      { domain: 'Verbal Linguistik', score: 88 },
      { domain: 'Logik Matematik', score: 82 },
      { domain: 'Visual Ruang', score: 85 },
      { domain: 'Muzik', score: 70 },
      { domain: 'Kinestetik', score: 76 },
      { domain: 'Interpersonal', score: 90 },
      { domain: 'Intrapersonal', score: 80 },
      { domain: 'Naturalis', score: 72 },
      { domain: 'Eksistensial', score: 74 },
    ];
  }

  // 2. Determine KM & KMM items (displayed separately, NOT in Radar Chart)
  let kmData: AptitudeChartItem = km || assessmentChart?.km || {
    name: 'Kemahiran Menaakul (KM)',
    score: 82,
    level: 'Baik',
  };

  let kmmData: AptitudeChartItem = kmm || assessmentChart?.kmm || {
    name: 'Kemahiran Menyelesaikan Masalah (KMM)',
    score: 85,
    level: 'Baik',
  };

  if (!km && !assessmentChart?.km && student?.aptitudeScores) {
    const foundKM = student.aptitudeScores.find((a) => a.component === 'Penaakulan');
    if (foundKM) {
      kmData = {
        name: 'Kemahiran Menaakul (KM)',
        score: foundKM.score,
        level: foundKM.score >= 65 ? 'Baik' : 'Kurang Potensi',
      };
    }
  }

  if (!kmm && !assessmentChart?.kmm && student?.aptitudeScores) {
    const foundKMM = student.aptitudeScores.find((a) => a.component === 'Penyelesaian Masalah');
    if (foundKMM) {
      kmmData = {
        name: 'Kemahiran Menyelesaikan Masalah (KMM)',
        score: foundKMM.score,
        level: foundKMM.score >= 65 ? 'Baik' : 'Kurang Potensi',
      };
    }
  }

  // Radar SVG Math
  const domainsCount = domainItems.length;
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

  const webLevels = [0.25, 0.5, 0.75, 1.0];

  const dataPoints = domainItems.map((item, idx) => {
    const ratio = Math.min(100, Math.max(0, item.score)) / 100;
    const { x, y } = getCoordinates(idx, domainsCount, ratio);
    return { x, y, item };
  });

  const polygonPointsString = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SEKSYEN 1: RADAR CHART 9 DOMAIN */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Radar className="w-5 h-5 text-amber-600" />
              <span>Carta Radar 9 Domain (Tahun 6)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualisasi profil 9 domain IKP Tahun 6 (Eksklusif Domain Sahaja)
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            📙 Radar T6
          </span>
        </div>

        {/* RADAR SVG GRAPH */}
        <div className="w-full flex items-center justify-center overflow-x-auto py-2">
          <div className="min-w-[360px] max-w-[500px] w-full">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto overflow-visible">
              {/* Concentric Web Polygons */}
              {webLevels.map((lvl) => {
                const points = domainItems
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

              {/* Axis Spoke Lines */}
              {domainItems.map((_, idx) => {
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

              {/* Radar Filled Area */}
              <polygon
                points={polygonPointsString}
                fill="#f59e0b"
                fillOpacity="0.25"
                stroke="#d97706"
                strokeWidth="2.5"
                className="transition-all duration-500"
              />

              {/* Data Points */}
              {dataPoints.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  fill="#d97706"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              ))}

              {/* Perimeter Labels */}
              {domainItems.map((item, idx) => {
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
                      className="text-[10px] font-black fill-amber-700 font-mono"
                    >
                      {item.score}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* SEKSYEN 2: KAD BERASINGAN KM & KMM (TIDAK DIMASUKKAN KE DALAM RADAR) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span>Aptitud Khas Tahun 6 (Dipaparkan Berasingan daripada Radar Chart)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Skor dan badge tahap rasmi bagi Kemahiran Menaakul (KM) dan Menyelesaikan Masalah (KMM)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Kad 🧠 Kemahiran Menaakul (KM) */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100/90 shadow-2xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 font-black flex items-center justify-center shrink-0 shadow-2xs">
                <Brain className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                  Aptitud Khas
                </span>
                <h3 className="text-sm font-black text-slate-900 leading-snug">
                  🧠 {kmData.name}
                </h3>
              </div>
            </div>

            <div className="text-right space-y-1 shrink-0">
              <div className="text-xl font-black text-slate-900 font-mono">
                {kmData.score}%
              </div>
              <div>{renderAptitudeLevelBadge(kmData.level)}</div>
            </div>
          </div>

          {/* Kad 🧩 Kemahiran Menyelesaikan Masalah (KMM) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-100/90 shadow-2xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center shrink-0 shadow-2xs">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                  Aptitud Khas
                </span>
                <h3 className="text-sm font-black text-slate-900 leading-snug">
                  🧩 {kmmData.name}
                </h3>
              </div>
            </div>

            <div className="text-right space-y-1 shrink-0">
              <div className="text-xl font-black text-slate-900 font-mono">
                {kmmData.score}%
              </div>
              <div>{renderAptitudeLevelBadge(kmmData.level)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
