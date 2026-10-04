import React from 'react';
import { StudentPsychometricRecord, IntelligenceDomain } from '../types';
import { Layers, Brain, Lightbulb } from 'lucide-react';

export interface DomainInterpretationItem {
  domain: IntelligenceDomain | string;
  level: 'Tinggi' | 'Sederhana' | 'Rendah' | string;
  text: string; // Interpretasi Rasmi KPM
}

export interface AptitudeInterpretationItem {
  name: string; // "Kemahiran Menaakul (KM)" or "Kemahiran Menyelesaikan Masalah (KMM)"
  level: 'Baik' | 'Kurang Potensi' | string;
  text: string; // Interpretasi Rasmi KPM
}

export interface InterpretationTahun6Props {
  student?: StudentPsychometricRecord;
  interpretation?: {
    domains?: DomainInterpretationItem[];
    km?: AptitudeInterpretationItem;
    kmm?: AptitudeInterpretationItem;
  };
  domains?: DomainInterpretationItem[];
  km?: AptitudeInterpretationItem;
  kmm?: AptitudeInterpretationItem;
  className?: string;
}

export const InterpretationTahun6: React.FC<InterpretationTahun6Props> = ({
  student,
  interpretation,
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

  // KPM Official Text Helper for 9 Domains
  const getOfficialDomainText = (domain: string, level: string): string => {
    const lvl = level.toLowerCase();
    const isHigh = lvl.includes('tinggi');
    const isLow = lvl.includes('rendah');

    switch (domain) {
      case 'Verbal Linguistik':
        return isHigh
          ? 'Murid menunjukkan penguasaan cemerlang dalam menganalisis wacana bahasa, penulisan kreatif, serta komunikasi persuasif lisan.'
          : isLow
          ? 'Murid memerlukan intervensi asas dalam perbendaharaan kata dan struktur pembinaan ayat.'
          : 'Murid berkeupayaan menyampaikan gagasan asas dengan baik melalui bahasa Melayu dan Inggeris.';

      case 'Logik Matematik':
        return isHigh
          ? 'Murid mahir dalam penaakulan deduktif, deduksi pola kompleks, dan penyelesaian masalah berangka aras tinggi.'
          : isLow
          ? 'Murid memerlukan panduan berstruktur dalam mengaitkan hubungan nombor dan formula asas.'
          : 'Murid menguasai konsep matematik rutin dan penaakulan berangka asas.';

      case 'Visual Ruang':
        return isHigh
          ? 'Murid amat kreatif dalam memanipulasi imej mental 3D, mereka bentuk grafik, dan pemetaan ruang.'
          : isLow
          ? 'Murid memerlukan panduan latihan visualisasi berpandu gambar rajah.'
          : 'Murid berkeupayaan mentafsir pelan, piktogram, dan pemetaan visual asas.';

      case 'Muzik':
        return isHigh
          ? 'Murid amat sensitif terhadap ton, irama komited, serta mampu menterjemahkan emosi melalui corak muzik.'
          : isLow
          ? 'Murid memerlukan pendedahan berterusan kepada latihan pendengaran rentak.'
          : 'Murid mengenal pasti rentak asas dan mengapresiasi bunyi seni muzik harian.';

      case 'Kinestetik':
        return isHigh
          ? 'Murid mempunyai kelincahan fizikal, koordinasi psikomotor halus yang cemerlang serta kemahiran sukan/manipulatif tinggi.'
          : isLow
          ? 'Murid memerlukan latihan kecergasan fizikal berjadual untuk sokongan kestabilan motor.'
          : 'Murid mempunyai kawalan fizikal yang baik dalam aktiviti kokurikulum dan sukan asas.';

      case 'Interpersonal':
        return isHigh
          ? 'Murid mempunyai kemahiran kepimpinan koperatif, empati yang tinggi, serta kebolehan mengurus dinamika kumpulan.'
          : isLow
          ? 'Murid memerlukan galakan untuk menyertai aktiviti perbincangan berpasukan.'
          : 'Murid mampu berkomunikasi secara harmoni bersama rakan sebaya.';

      case 'Intrapersonal':
        return isHigh
          ? 'Murid amat matang dalam meletakkan matlamat kendiri, bermotivasi dalaman tinggi, dan reflektif terhadap emosi diri.'
          : isLow
          ? 'Murid memerlukan bimbingan dalam pengurusan emosi dan penetapan sasaran pembelajaran.'
          : 'Murid menyedari potensi diri dan berupaya mengawal fokus peribadi.';

      case 'Naturalis':
        return isHigh
          ? 'Murid mempunyai kebolehan mengelas dan menganalisis fenomena biologi serta ekosistem semula jadi dengan cemerlang.'
          : isLow
          ? 'Murid memerlukan pendedahan langsung kepada pemerhatian alam sekitar.'
          : 'Murid prihatin terhadap alam sekitar dan memahami kepentingan kebersihan ekosistem.';

      case 'Eksistensial':
        return isHigh
          ? 'Murid berkebolehan tinggi dalam merenung persoalan nilai, etika, dan perspektif sejagat secara matang.'
          : isLow
          ? 'Murid memerlukan bimbingan berkaitan penerapan nilai-nilai murni harian.'
          : 'Murid memahami prinsip moral dan etika asas dalam kehidupan bermasyarakat.';

      default:
        return 'Murid menguasai domain psikometrik mengikut standard pentaksiran KPM.';
    }
  };

  // Badge Renderer (9 Domains)
  const renderDomainBadge = (level: string) => {
    const lvlLower = level.toLowerCase();
    if (lvlLower.includes('tinggi')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-2xs">
          <span>🟢</span> Tinggi
        </span>
      );
    }
    if (lvlLower.includes('sederhana')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs shadow-2xs">
          <span>🟡</span> Sederhana
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-bold text-xs shadow-2xs">
        <span>🔴</span> Rendah
      </span>
    );
  };

  // Badge Renderer (KM & KMM)
  const renderAptitudeBadge = (level: string) => {
    const lvlLower = level.toLowerCase();
    if (lvlLower.includes('baik')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-2xs">
          <span>🟢</span> Baik
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-bold text-xs shadow-2xs">
        <span>🔴</span> Kurang Potensi
      </span>
    );
  };

  // 1. Determine 9 Domains list
  let domainItems: DomainInterpretationItem[] = [];

  if (interpretation?.domains && Array.isArray(interpretation.domains)) {
    domainItems = interpretation.domains;
  } else if (domains && Array.isArray(domains)) {
    domainItems = domains;
  } else if (student && student.ikpScores) {
    domainItems = requiredDomains.map((domainName) => {
      const match = student.ikpScores.find(
        (s) =>
          s.domain.toLowerCase() === domainName.toLowerCase() ||
          (domainName === 'Visual Ruang' && s.domain.toLowerCase() === 'ruang visual')
      );
      const level = match ? match.level : 'Sederhana';
      return {
        domain: domainName,
        level,
        text: getOfficialDomainText(domainName, level),
      };
    });
  } else {
    domainItems = requiredDomains.map((dom, idx) => {
      const level = idx % 2 === 0 ? 'Tinggi' : 'Sederhana';
      return {
        domain: dom,
        level,
        text: getOfficialDomainText(dom, level),
      };
    });
  }

  // 2. Determine KM & KMM items (displayed in a SEPARATE section)
  let kmData: AptitudeInterpretationItem = km || interpretation?.km || {
    name: 'Kemahiran Menaakul (KM)',
    level: 'Baik',
    text: 'Murid mempunyai daya menaakul yang logik dan teratur, mampu menghubungkaitkan sebab dan akibat serta membuat andaian tepat berdasarkan bukti.',
  };

  let kmmData: AptitudeInterpretationItem = kmm || interpretation?.kmm || {
    name: 'Kemahiran Menyelesaikan Masalah (KMM)',
    level: 'Baik',
    text: 'Murid berkeupayaan mengenal pasti punca masalah, merangka strategi penyelesaian secara kreatif, dan melaksanakan langkah penyelesaian secara cekap.',
  };

  if (!km && !interpretation?.km && student?.aptitudeScores) {
    const foundKM = student.aptitudeScores.find((a) => a.component === 'Penaakulan');
    if (foundKM) {
      const isGood = foundKM.score >= 65;
      kmData = {
        name: 'Kemahiran Menaakul (KM)',
        level: isGood ? 'Baik' : 'Kurang Potensi',
        text: isGood
          ? 'Murid mempunyai daya menaakul logik yang kukuh dan mampu menyusun strategi fikiran berstruktur.'
          : 'Murid memerlukan latihan bimbingan berterusan dalam logik penaakulan konkrit.',
      };
    }
  }

  if (!kmm && !interpretation?.kmm && student?.aptitudeScores) {
    const foundKMM = student.aptitudeScores.find((a) => a.component === 'Penyelesaian Masalah');
    if (foundKMM) {
      const isGood = foundKMM.score >= 65;
      kmmData = {
        name: 'Kemahiran Menyelesaikan Masalah (KMM)',
        level: isGood ? 'Baik' : 'Kurang Potensi',
        text: isGood
          ? 'Murid menunjukkan potensi baik dalam menganalisis punca isu dan mencari alternatif penyelesaian.'
          : 'Murid memerlukan pemudahan aktiviti penyelesaian masalah bertingkat.',
      };
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SEKSYEN 1: 9 DOMAIN */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <span>Interpretasi Rasmi 9 Domain (Tahun 6)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Interpretasi rasmi Inventori Kecerdasan Pelbagai (IKP) Tahun 6 mengikut piawaian KPM
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 self-start sm:self-auto">
            📙 Interpretasi T6 (9 Domain)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domainItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900">{item.domain}</h3>
                  </div>

                  <div>{renderDomainBadge(item.level)}</div>
                </div>

                <p className="text-[11px] leading-relaxed text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-200/60">
                  <span className="font-bold text-slate-900 block mb-0.5 text-[10px] uppercase tracking-wider text-amber-800">
                    📄 Interpretasi Rasmi:
                  </span>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEKSYEN 2: KM & KMM (SEKSYEN BERASINGAN) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <span>Interpretasi Rasmi KM &amp; KMM (Seksyen Berasingan)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Interpretasi rasmi khas bagi Kemahiran Menaakul (KM) dan Kemahiran Menyelesaikan Masalah (KMM)
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200 self-start sm:self-auto">
            Aptitud Khas T6
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card KM */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-indigo-200/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">🧠 {kmData.name}</h3>
                  <span className="text-[10px] font-semibold text-indigo-700">Aptitud KM</span>
                </div>
              </div>

              <div>{renderAptitudeBadge(kmData.level)}</div>
            </div>

            <p className="text-xs leading-relaxed text-slate-700 font-medium bg-white p-3.5 rounded-xl border border-indigo-100/80">
              <span className="font-bold text-slate-900 block mb-1 text-[10px] uppercase tracking-wider text-indigo-700">
                📄 Interpretasi Rasmi KM:
              </span>
              {kmData.text}
            </p>
          </div>

          {/* Card KMM */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">🧩 {kmmData.name}</h3>
                  <span className="text-[10px] font-semibold text-amber-800">Aptitud KMM</span>
                </div>
              </div>

              <div>{renderAptitudeBadge(kmmData.level)}</div>
            </div>

            <p className="text-xs leading-relaxed text-slate-700 font-medium bg-white p-3.5 rounded-xl border border-amber-100/80">
              <span className="font-bold text-slate-900 block mb-1 text-[10px] uppercase tracking-wider text-amber-800">
                📄 Interpretasi Rasmi KMM:
              </span>
              {kmmData.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
