import React from 'react';
import { StudentPsychometricRecord, IntelligenceDomain } from '../types';
import { Layers } from 'lucide-react';

export interface DomainInterpretationItem {
  domain: IntelligenceDomain | string;
  level: 'Tinggi' | 'Sederhana' | 'Rendah' | string;
  text: string; // Interpretasi Rasmi KPM
}

export interface InterpretationTahun5Props {
  student?: StudentPsychometricRecord;
  interpretation?: {
    domains?: DomainInterpretationItem[];
  } | DomainInterpretationItem[];
  domains?: DomainInterpretationItem[];
  className?: string;
}

export const InterpretationTahun5: React.FC<InterpretationTahun5Props> = ({
  student,
  interpretation,
  domains,
  className = '',
}) => {
  // 9 Official Domains for Year 5
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

  // Official KPM default interpretations lookup
  const getOfficialKpmText = (domain: string, level: string): string => {
    const lvl = level.toLowerCase();
    const isHigh = lvl.includes('tinggi');
    const isLow = lvl.includes('rendah');

    switch (domain) {
      case 'Verbal Linguistik':
        return isHigh
          ? 'Murid menunjukkan kebolehan tinggi dalam menggunakan bahasa, perbendaharaan kata, serta keupayaan menyampaikan idea lisan dan bertulis secara amat berkesan.'
          : isLow
          ? 'Murid memerlukan galakan berterusan dalam menguasai pembacaan dan pemahaman perbendaharaan kata asas.'
          : 'Murid berkeupayaan memahami struktur bahasa asas dan berkomunikasi dengan memuaskan dalam pelbagai situasi harian.';

      case 'Logik Matematik':
        return isHigh
          ? 'Murid mempunyai keupayaan cemerlang dalam mengendali konsep penaakulan nombor, corak abstrak, dan penyelesaian masalah berstruktur.'
          : isLow
          ? 'Murid memerlukan latihan asas pengiraan dan pemahaman konsep matematik secara visual konkrit.'
          : 'Murid mampu menyelesaikan tugasan logik matematik peringkat asas dan memahami pertalian angka secara baik.';

      case 'Visual Ruang':
        return isHigh
          ? 'Murid berbakat tinggi dalam membayangkan corak grafik, ruang 3D, memeta orientasi dan mentafsir gambaran visual.'
          : isLow
          ? 'Murid memerlukan bimbingan dalam mentafsir gambar rajah, peta ruang, dan koordinat visual.'
          : 'Murid berkeupayaan membaca gambar rajah asas, carta, dan menterjemah idea visual mudah.';

      case 'Muzik':
        return isHigh
          ? 'Murid peka kepada corak irama, nada suara, melodi, dan mempunyai apresiasi estetik muzik yang amat tinggi.'
          : isLow
          ? 'Murid memerlukan lebih dedahan kepada persekitaran muzik dan corak rentak mudah.'
          : 'Murid boleh mengenal pasti rentak asas dan menikmati pelbagai ekspresi seni muzik.';

      case 'Kinestetik':
        return isHigh
          ? 'Murid mempunyai koordinasi motor halus dan kasar yang cemerlang serta mahir menyampaikan idea melalui pergerakan fizikal.'
          : isLow
          ? 'Murid memerlukan aktiviti psikomotor berstruktur untuk mempertingkatkan kestabilan fizikal.'
          : 'Murid menguasai kembangan fizikal dan kawalan pergerakan asas dengan baik.';

      case 'Interpersonal':
        return isHigh
          ? 'Murid berkebolehan tinggi dalam memahami perasaan orang lain, memimpin kumpulan, serta membina hubungan sosial yang utuh.'
          : isLow
          ? 'Murid digalakkan menyertai aktiviti berpasukan untuk meningkatkan keyakinan interaksi sosial.'
          : 'Murid boleh bekerjasama dalam kumpulan dan mempunyai komunikasi sosial yang memuaskan.';

      case 'Intrapersonal':
        return isHigh
          ? 'Murid mempunyai kesedaran kendiri yang mendalam, matlamat peribadi yang jelas, serta keupayaan mengawal emosi sendiri secara matang.'
          : isLow
          ? 'Murid memerlukan dorongan dalam membina refleksi diri dan menetapkan fokus peribadi.'
          : 'Murid memahami kekuatan dan kelemahan diri sendiri secara memuaskan.';

      case 'Naturalis':
        return isHigh
          ? 'Murid amat peka kepada persekitaran alam semula jadi, flora, fauna, dan menunjukkan sifat ingin tahu yang tinggi terhadap fenomena alam.'
          : isLow
          ? 'Murid memerlukan pembudayaan dan pemerhatian fizikal persekitaran semula jadi.'
          : 'Murid mempunyai kesedaran asas terhadap pemeliharaan persekitaran dan hidupan.';

      case 'Eksistensial':
        return isHigh
          ? 'Murid gemar berfikir secara mendalam mengenai makna kehidupan, nilai murni, serta hakikat kewujudan sejagat.'
          : isLow
          ? 'Murid memerlukan pendedahan nilai kewarganegaraan dan falsafah hidup konkrit.'
          : 'Murid memahami norma asas kemanusiaan dan nilai-nilai murni seharian.';

      default:
        return 'Murid memenuhi kriteria penguasaan domain mengikut piawaian rasmi pentaksiran KPM.';
    }
  };

  // Build list of 9 domain items
  let itemsToDisplay: DomainInterpretationItem[] = [];

  if (Array.isArray(interpretation)) {
    itemsToDisplay = interpretation;
  } else if (interpretation?.domains && Array.isArray(interpretation.domains)) {
    itemsToDisplay = interpretation.domains;
  } else if (domains && Array.isArray(domains)) {
    itemsToDisplay = domains;
  } else if (student && student.ikpScores) {
    itemsToDisplay = requiredDomains.map((domainName) => {
      const match = student.ikpScores.find(
        (s) =>
          s.domain.toLowerCase() === domainName.toLowerCase() ||
          (domainName === 'Visual Ruang' && s.domain.toLowerCase() === 'ruang visual')
      );
      const level = match ? match.level : 'Sederhana';
      return {
        domain: domainName,
        level,
        text: getOfficialKpmText(domainName, level),
      };
    });
  } else {
    itemsToDisplay = requiredDomains.map((dom, idx) => {
      const level = idx % 3 === 0 ? 'Tinggi' : 'Sederhana';
      return {
        domain: dom,
        level,
        text: getOfficialKpmText(dom, level),
      };
    });
  }

  // Badge renderer
  const renderLevelBadge = (level: string) => {
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

  return (
    <div className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5 ${className}`}>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>Interpretasi Rasmi 9 Domain KPM (Tahun 5)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Interpretasi rasmi Inventori Kecerdasan Pelbagai (IKP) mengikut piawaian KPM
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          📗 Interpretasi T5
        </span>
      </div>

      {/* CARDS LIST FOR 9 DOMAINS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itemsToDisplay.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">{item.domain}</h3>
                </div>

                <div>{renderLevelBadge(item.level)}</div>
              </div>

              <p className="text-[11px] leading-relaxed text-slate-700 font-medium bg-white p-3 rounded-xl border border-slate-200/60">
                <span className="font-bold text-slate-900 block mb-0.5 text-[10px] uppercase tracking-wider text-emerald-800">
                  📄 Interpretasi Rasmi:
                </span>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
