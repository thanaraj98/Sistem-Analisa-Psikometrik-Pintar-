import React from 'react';
import {
  getSekolahData,
  getTahun4Data,
  getTahun5Data,
  getTahun6Data,
  SheetGradeData,
} from '../../data/dataProvider';
import { SummaryCardsGrid } from './SummaryCardsGrid';
import {
  BarChart2,
  PieChart,
  Grid3X3,
  School,
  ChevronRight,
  BookOpen,
  Users,
  FileSpreadsheet,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const AnalisaKeseluruhanView: React.FC = () => {
  const sekolahData = getSekolahData();
  const t4Data = getTahun4Data();
  const t5Data = getTahun5Data();
  const t6Data = getTahun6Data();

  const schoolName = sekolahData.info.schoolName || 'SK SERI BINTANG UTAMA';

  // Total demographics calculation from dataProvider
  const totalT4 = t4Data.summaryStats.totalStudents;
  const totalT5 = t5Data.summaryStats.totalStudents;
  const totalT6 = t6Data.summaryStats.totalStudents;

  const totalMale =
    t4Data.summaryStats.maleCount +
    t5Data.summaryStats.maleCount +
    t6Data.summaryStats.maleCount;

  const totalFemale =
    t4Data.summaryStats.femaleCount +
    t5Data.summaryStats.femaleCount +
    t6Data.summaryStats.femaleCount;

  const totalStudents = totalT4 + totalT5 + totalT6;

  // Graf 1: Bilangan Murid Mengikut Tahun
  const yearData = [
    { year: 'Tahun 4', count: totalT4, color: 'bg-sky-500', badgeBg: 'bg-sky-50 text-sky-700 border-sky-100' },
    { year: 'Tahun 5', count: totalT5, color: 'bg-emerald-500', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { year: 'Tahun 6', count: totalT6, color: 'bg-amber-500', badgeBg: 'bg-amber-50 text-amber-700 border-amber-100' },
  ];
  const maxYearCount = Math.max(totalT4, totalT5, totalT6, 150);

  // Graf 2: Bilangan Murid Mengikut Jantina
  const malePercent = Math.round((totalMale / (totalStudents || 1)) * 100);
  const femalePercent = Math.round((totalFemale / (totalStudents || 1)) * 100);

  // Helper to extract classes with student counts
  const getClassBreakdown = (gradeSheet: SheetGradeData) => {
    const studentTotal = gradeSheet.summaryStats.totalStudents;
    const classList = gradeSheet.classes;
    const countPerClass = Math.floor(studentTotal / (classList.length || 1));
    const remainder = studentTotal % (classList.length || 1);

    return classList.map((className, idx) => ({
      className,
      count: countPerClass + (idx === 0 ? remainder : 0),
      year: gradeSheet.year,
    }));
  };

  const t4Classes = getClassBreakdown(t4Data);
  const t5Classes = getClassBreakdown(t5Data);
  const t6Classes = getClassBreakdown(t6Data);
  const allClassBreakdown = [...t4Classes, ...t5Classes, ...t6Classes];
  const maxClassCount = Math.max(...allClassBreakdown.map((c) => c.count), 40);

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header & Breadcrumb */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2">
            <span>Portal Guru</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600 font-semibold">Analisa Keseluruhan</span>
          </nav>

          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>📊</span> Analisa Keseluruhan
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
            <School className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{schoolName}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{sekolahData.info.academicYear}</span>
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100 shrink-0 flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
          <span>Statistik SAPP Sekolah</span>
        </div>
      </div>

      {/* 2. Ringkasan Statistik */}
      <SummaryCardsGrid stats={sekolahData.summaryStats} title="Ringkasan Statistik Murid" />

      {/* 3 & 4. Graf Bilangan Murid Mengikut Tahun & Jantina */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graf 1: Bilangan Murid Mengikut Tahun */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-indigo-600" />
                  <span>Bilangan Murid Mengikut Tahun</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Agihan jumlah murid mengikut darjah persekolahan
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                {totalStudents} Murid
              </span>
            </div>

            <div className="space-y-5 my-2">
              {yearData.map((item, idx) => {
                const percentage = Math.round((item.count / maxYearCount) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                        <span className="font-bold">{item.year}</span>
                      </span>
                      <span className="text-slate-900 font-bold">
                        {item.count} <span className="text-slate-400 font-normal">Murid</span>
                      </span>
                    </div>
                    <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">3 Aliran Tahun (T4, T5, T6)</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Sumber Data: dataProvider
            </span>
          </div>
        </div>

        {/* Graf 2: Bilangan Murid Mengikut Jantina */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  <span>Bilangan Murid Mengikut Jantina</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nisbah peratusan murid Lelaki dan Perempuan keseluruhan
                </p>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                L: {malePercent}% | P: {femalePercent}%
              </span>
            </div>

            <div className="space-y-4 my-2">
              <div className="w-full h-6 bg-slate-100 rounded-xl overflow-hidden flex p-1 gap-1 border border-slate-200/60">
                <div
                  className="h-full bg-blue-600 rounded-lg transition-all duration-500 flex items-center justify-center text-[11px] font-bold text-white shadow-xs"
                  style={{ width: `${malePercent}%` }}
                >
                  {malePercent}%
                </div>
                <div
                  className="h-full bg-purple-600 rounded-lg transition-all duration-500 flex items-center justify-center text-[11px] font-bold text-white shadow-xs"
                  style={{ width: `${femalePercent}%` }}
                >
                  {femalePercent}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-blue-50 border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Murid Lelaki</div>
                    <div className="text-2xl font-black text-blue-700">{totalMale}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-600">{malePercent}%</div>
                    <div className="text-[10px] text-slate-400 font-medium">keseluruhan</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-50 border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">Murid Perempuan</div>
                    <div className="text-2xl font-black text-purple-700">{totalFemale}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-600">{femalePercent}%</div>
                    <div className="text-[10px] text-slate-400 font-medium">keseluruhan</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Jumlah Lelaki: {totalMale} | Perempuan: {totalFemale}</span>
            <span className="font-semibold text-indigo-600">Pengurusan Demografi SAPP</span>
          </div>
        </div>
      </div>

      {/* 5. Graf Bilangan Murid Mengikut Kelas */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Grid3X3 className="w-5 h-5 text-indigo-600" />
              <span>Bilangan Murid Mengikut Kelas</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Taburan enrolmen murid bagi setiap kelas merentas Tahun 4, Tahun 5 dan Tahun 6
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
            {allClassBreakdown.length} Kelas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allClassBreakdown.map((item, index) => {
            const barWidth = Math.round((item.count / maxClassCount) * 100);
            const badgeColor =
              item.year === 4
                ? 'bg-sky-100 text-sky-800'
                : item.year === 5
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800';

            const barColor =
              item.year === 4
                ? 'bg-sky-500'
                : item.year === 5
                ? 'bg-emerald-500'
                : 'bg-amber-500';

            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">{item.className}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                    Tahun {item.year}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Enrolmen Kelas</span>
                  <span className="font-bold text-slate-900">{item.count} Murid</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Ringkasan Mengikut Tahun */}
      <div>
        <div className="mb-4">
          <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Ringkasan Mengikut Tahun</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Laporan ringkas enrolmen dan bilangan kelas mengikut darjah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Tahun 4 */}
          <div className="bg-white rounded-2xl p-6 border border-sky-200 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl">📘</span>
              <span className="text-xs font-bold px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-100">
                Tahun 4
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs text-slate-500 font-medium">Jumlah Murid</span>
                <span className="text-lg font-black text-slate-900">{t4Data.summaryStats.totalStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Jumlah Kelas</span>
                <span className="text-sm font-bold text-slate-800">{t4Data.classes.length} Kelas</span>
              </div>
            </div>
          </div>

          {/* Card Tahun 5 */}
          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl">📗</span>
              <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                Tahun 5
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs text-slate-500 font-medium">Jumlah Murid</span>
                <span className="text-lg font-black text-slate-900">{t5Data.summaryStats.totalStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Jumlah Kelas</span>
                <span className="text-sm font-bold text-slate-800">{t5Data.classes.length} Kelas</span>
              </div>
            </div>
          </div>

          {/* Card Tahun 6 */}
          <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl">📙</span>
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100">
                Tahun 6
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs text-slate-500 font-medium">Jumlah Murid</span>
                <span className="text-lg font-black text-slate-900">{t6Data.summaryStats.totalStudents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Jumlah Kelas</span>
                <span className="text-sm font-bold text-slate-800">{t6Data.classes.length} Kelas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Rumusan Sekolah */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Rumusan Sekolah</h2>
            <p className="text-xs text-slate-500">Ringkasan demografi dan liputan pentaksiran psikometrik sekolah</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 text-sm leading-relaxed font-medium">
          Jumlah murid keseluruhan ialah <strong className="text-slate-900 font-black">{totalStudents} orang</strong> yang
          terdiri daripada <strong className="text-slate-900 font-black">{totalMale} murid lelaki</strong> dan{' '}
          <strong className="text-slate-900 font-black">{totalFemale} murid perempuan</strong>. Pentaksiran psikometrik
          sekolah ini melibatkan murid <strong className="text-indigo-700 font-bold">Tahun 4 ({totalT4} murid)</strong>,{' '}
          <strong className="text-indigo-700 font-bold">Tahun 5 ({totalT5} murid)</strong>, dan{' '}
          <strong className="text-indigo-700 font-bold">Tahun 6 ({totalT6} murid)</strong> secara menyeluruh di bawah Pengurusan Pentaksiran Psikometrik Sekolah (SAPP).
        </div>
      </div>
    </div>
  );
};
