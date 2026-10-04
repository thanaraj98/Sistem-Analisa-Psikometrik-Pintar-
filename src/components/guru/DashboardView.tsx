import React from 'react';
import {
  getSekolahData,
  getGuruData,
  getTahun4Data,
  getTahun5Data,
  getTahun6Data,
} from '../../data/dataProvider';
import { SummaryCardsGrid } from './SummaryCardsGrid';
import {
  School,
  Calendar,
  User,
  Users,
  BarChart2,
  PieChart,
  Bell,
  CheckCircle2,
  Database,
  Clock,
  Activity,
  Award,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const sekolahData = getSekolahData();
  const guruData = getGuruData();
  const t4Data = getTahun4Data();
  const t5Data = getTahun5Data();
  const t6Data = getTahun6Data();

  // Primary Info
  const schoolName = sekolahData.info.schoolName || 'SK Seri Bintang Utama';
  const currentTeacherName = guruData.teachers[0]?.name || 'Cikgu Ahmad Razak';
  const teacherRole = guruData.teachers[0]?.role || 'Guru Bimbingan & Kaunseling';

  // Date formatted in Malay
  const currentDateFormatted = new Date().toLocaleDateString('ms-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Data for Graf 1: Bilangan Murid Mengikut Tahun
  const yearChartData = [
    { year: 'Tahun 4', count: t4Data.summaryStats.totalStudents, color: 'bg-sky-500', lightBg: 'bg-sky-50' },
    { year: 'Tahun 5', count: t5Data.summaryStats.totalStudents, color: 'bg-emerald-500', lightBg: 'bg-emerald-50' },
    { year: 'Tahun 6', count: t6Data.summaryStats.totalStudents, color: 'bg-amber-500', lightBg: 'bg-amber-50' },
  ];
  const maxYearCount = Math.max(...yearChartData.map((d) => d.count), 150);

  // Data for Graf 2: Bilangan Murid Mengikut Jantina
  const totalMale = t4Data.summaryStats.maleCount + t5Data.summaryStats.maleCount + t6Data.summaryStats.maleCount;
  const totalFemale = t4Data.summaryStats.femaleCount + t5Data.summaryStats.femaleCount + t6Data.summaryStats.femaleCount;
  const totalStudents = totalMale + totalFemale;

  const malePercent = Math.round((totalMale / totalStudents) * 100);
  const femalePercent = Math.round((totalFemale / totalStudents) * 100);

  const genderChartData = [
    { gender: 'Lelaki', count: totalMale, percent: malePercent, color: 'bg-blue-600', textColor: 'text-blue-700', bgLight: 'bg-blue-50' },
    { gender: 'Perempuan', count: totalFemale, percent: femalePercent, color: 'bg-purple-600', textColor: 'text-purple-700', bgLight: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Header Ringkasan Dashboard */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-xs font-semibold">
              <School className="w-3.5 h-3.5 text-indigo-300" />
              <span>{schoolName}</span>
              <span className="text-slate-400">•</span>
              <span>{sekolahData.info.academicYear}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dashboard Portal Guru
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl">
              Ringkasan maklumat demografi murid dan status pengurusan sistem PPsi sekolah.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-lg shadow-inner">
              <User className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="text-slate-300 font-medium">Log Masuk Sebagai:</div>
              <div className="text-sm font-bold text-white">{currentTeacherName}</div>
              <div className="text-[11px] text-indigo-200 font-medium">{teacherRole}</div>
            </div>
            <div className="hidden sm:block border-l border-white/15 h-8 mx-1" />
            <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 w-full sm:w-auto">
              <Calendar className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
              <span className="font-semibold text-white capitalize">{currentDateFormatted}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Kad Statistik Utama (Statik Demografi dari dataProvider) */}
      <SummaryCardsGrid stats={sekolahData.summaryStats} title="Demografi Murid Sekolah" />

      {/* 3. Graf Ringkasan (Hanya 2 Graf: Mengikut Tahun & Jantina) */}
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
                  Agihan jumlah murid Tahun 4, Tahun 5 dan Tahun 6
                </p>
              </div>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                {totalStudents} Murid
              </span>
            </div>

            <div className="space-y-5 my-2">
              {yearChartData.map((item, idx) => {
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
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5">
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
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <Users className="w-4 h-4 text-slate-400" /> Purata 116 murid per darjah
            </span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Data Sah APDM
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
                  Nisbah peratusan murid Lelaki dan Perempuan
                </p>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                L: {malePercent}% | P: {femalePercent}%
              </span>
            </div>

            {/* Visual ratio bar */}
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
                {genderChartData.map((g, i) => (
                  <div key={i} className={`p-4 rounded-xl ${g.bgLight} border border-slate-200/60 flex items-center justify-between`}>
                    <div>
                      <div className="text-xs font-semibold text-slate-500">{g.gender}</div>
                      <div className={`text-2xl font-black ${g.textColor}`}>{g.count}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-600">{g.percent}%</div>
                      <div className="text-[10px] text-slate-400 font-medium">drpd jumlah</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Nisbah seimbang (1.1 : 1)</span>
            <span className="font-semibold text-indigo-600">Kemaskini Sesi 2026/2027</span>
          </div>
        </div>
      </div>

      {/* 4. Makluman Sistem */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Makluman Sistem</h2>
            <p className="text-xs text-slate-500">Status operasi dan maklumat pengurusan data PPsi semasa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
            <Clock className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-700">Data Terakhir Dikemas Kini</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">Hari Ini, 08:30 AM</div>
              <div className="text-[11px] text-slate-500 mt-1">Diselaraskan dari pangkalan data PPsi</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
            <Database className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-700">Bilangan Rekod Murid Semasa</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">348 Rekod (100% Lengkap)</div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">Tahun 4, 5 & 6 sedia disemak</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
            <Activity className="w-5 h-5 text-sky-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-700">Status Operasi Sistem</div>
              <div className="text-sm font-bold text-emerald-700 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Operasi Normal (Aktif)
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Struktur data PPsi V1 disahkan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

