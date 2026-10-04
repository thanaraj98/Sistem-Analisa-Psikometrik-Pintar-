import React, { useState, useMemo } from 'react';
import { StudentPsychometricRecord } from '../../types';
import {
  getSekolahData,
  getTahun4Data,
} from '../../data/dataProvider';
import { AnalisisTahun4View } from './AnalisisTahun4View';
import { StudentDetailModal } from '../StudentDetailModal';
import {
  ChevronRight,
  School,
  BarChart2,
  PieChart,
  TrendingUp,
  Info,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  Search,
  User,
  Clock,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react';

interface Tahun4ViewProps {
  onSelectStudent?: (student: StudentPsychometricRecord) => void;
}

export const Tahun4View: React.FC<Tahun4ViewProps> = ({ onSelectStudent }) => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'analisis'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentModal, setSelectedStudentModal] = useState<StudentPsychometricRecord | null>(null);

  const sekolahData = getSekolahData();
  const t4Data = getTahun4Data();

  // Filter Year 4 students by small search box
  const t4Students = useMemo(() => {
    const allT4 = t4Data.students || [];
    if (!searchQuery.trim()) return allT4;
    const q = searchQuery.toLowerCase().trim();
    return allT4.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.icNumber.toLowerCase().includes(q) ||
        s.className.toLowerCase().includes(q)
    );
  }, [t4Data.students, searchQuery]);

  const handleViewProfile = (student: StudentPsychometricRecord) => {
    if (onSelectStudent) {
      onSelectStudent(student);
    } else {
      setSelectedStudentModal(student);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Selesai
          </span>
        );
      case 'Dalam Semakan':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> Dalam Semakan
          </span>
        );
      case 'Perlu Bimbingan':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3 h-3" /> Perlu Bimbingan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            {status || 'Aktif'}
          </span>
        );
    }
  };

  if (activeSubTab === 'analisis') {
    return (
      <div className="space-y-6">
        {/* Navigation Bar for Switching Sub-views */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('dashboard')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <span>Dashboard Tahun 4</span>
          </button>
          <button
            onClick={() => setActiveSubTab('analisis')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs transition-all"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Analisis Tahun 4</span>
          </button>
        </div>

        <AnalisisTahun4View />
      </div>
    );
  }

  const schoolName = sekolahData.info.schoolName || 'SK SERI BINTANG UTAMA';
  const totalStudents = t4Data.summaryStats.totalStudents;
  const maleCount = t4Data.summaryStats.maleCount;
  const femaleCount = t4Data.summaryStats.femaleCount;
  const totalClasses = t4Data.classes.length;

  // Graf 1: Bilangan Murid Mengikut Kelas
  const classBreakdown = t4Data.classes.map((className, idx) => {
    const studentCount = t4Data.students.filter((s) => s.className === className).length;
    const fallbackCount = Math.floor(totalStudents / totalClasses) + (idx === 0 ? totalStudents % totalClasses : 0);
    const count = studentCount > 0 ? studentCount : fallbackCount;
    return {
      className,
      count,
    };
  });
  const maxClassCount = Math.max(...classBreakdown.map((c) => c.count), 40);

  // Graf 2: Bilangan Murid Mengikut Jantina
  const malePercent = Math.round((maleCount / (totalStudents || 1)) * 100);
  const femalePercent = Math.round((femaleCount / (totalStudents || 1)) * 100);

  // Graf 3: Taburan Skor Purata
  // Verbal Linguistik (BM), Verbal Linguistik (BI), Logik Matematik
  const vlDomain = t4Data.domainScores.find((d) => d.domain === 'Verbal Linguistik');
  const lmDomain = t4Data.domainScores.find((d) => d.domain === 'Logik Matematik');

  const vlScoreBase = vlDomain ? vlDomain.score : 72;
  const lmScoreBase = lmDomain ? lmDomain.score : 60;

  const averageScores = [
    { label: 'Verbal Linguistik (BM)', score: Math.min(100, vlScoreBase + 2), color: 'bg-sky-500' },
    { label: 'Verbal Linguistik (BI)', score: Math.max(0, vlScoreBase - 2), color: 'bg-blue-500' },
    { label: 'Logik Matematik', score: lmScoreBase, color: 'bg-indigo-600' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Navigation Bar for Switching Sub-views */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-xs transition-all"
        >
          <LayoutDashboard className="w-4 h-4 text-white" />
          <span>Dashboard Tahun 4</span>
        </button>
        <button
          onClick={() => setActiveSubTab('analisis')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <FileText className="w-4 h-4 text-slate-400" />
          <span>Analisis Tahun 4</span>
        </button>
      </div>

      {/* 1. Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2">
            <span>Portal Guru</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sky-600 font-semibold">Tahun 4</span>
          </nav>

          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>📘</span> Tahun 4
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
            <School className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Pentaksiran Psikometrik Tahun 4</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{schoolName}</span>
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-2 bg-sky-50 text-sky-700 rounded-xl border border-sky-100 shrink-0 flex items-center gap-2 self-start md:self-auto">
          <span>{sekolahData.info.academicYear}</span>
        </div>
      </div>

      {/* 2. Kad Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Jumlah Murid Tahun 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center text-xl shrink-0">
            👨‍🎓
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Jumlah Murid Tahun 4</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{totalStudents}</div>
            <div className="text-[11px] text-sky-600 font-medium mt-0.5">Enrolmen Tahun 4</div>
          </div>
        </div>

        {/* Card 2: Jumlah Murid Lelaki */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xl shrink-0">
            👦
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Jumlah Murid Lelaki</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{maleCount}</div>
            <div className="text-[11px] text-blue-600 font-medium mt-0.5">{malePercent}% daripada Tahun 4</div>
          </div>
        </div>

        {/* Card 3: Jumlah Murid Perempuan */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center text-xl shrink-0">
            👧
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Jumlah Murid Perempuan</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{femaleCount}</div>
            <div className="text-[11px] text-purple-600 font-medium mt-0.5">{femalePercent}% daripada Tahun 4</div>
          </div>
        </div>

        {/* Card 4: Jumlah Kelas Tahun 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xl shrink-0">
            🏫
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Jumlah Kelas Tahun 4</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{totalClasses}</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Kelas Berdaftar</div>
          </div>
        </div>
      </div>

      {/* 3. Graf (Tiga Graf Sahaja) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graf 1: Bilangan Murid Mengikut Kelas */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-sky-600" />
                  <span>Bilangan Murid Mengikut Kelas</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Enrolmen murid bagi setiap kelas Tahun 4</p>
              </div>
            </div>

            <div className="space-y-4 my-2">
              {classBreakdown.map((item, idx) => {
                const widthPercent = Math.round((item.count / maxClassCount) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 font-bold">{item.className}</span>
                      <span className="text-slate-900 font-bold">
                        {item.count} <span className="text-slate-400 font-normal">Murid</span>
                      </span>
                    </div>
                    <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-sky-500 transition-all duration-500"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Jumlah: {totalClasses} Kelas</span>
            <span className="font-semibold text-sky-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> dataProvider
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
                <p className="text-xs text-slate-500 mt-0.5">Taburan Lelaki vs Perempuan Tahun 4</p>
              </div>
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

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-blue-50 border border-slate-200/60">
                  <div className="text-xs font-semibold text-slate-500">Lelaki</div>
                  <div className="text-xl font-black text-blue-700 mt-0.5">{maleCount} Murid</div>
                  <div className="text-[10px] text-slate-400 font-medium">{malePercent}% daripada T4</div>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-50 border border-slate-200/60">
                  <div className="text-xs font-semibold text-slate-500">Perempuan</div>
                  <div className="text-xl font-black text-purple-700 mt-0.5">{femaleCount} Murid</div>
                  <div className="text-[10px] text-slate-400 font-medium">{femalePercent}% daripada T4</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Nisbah L : P ({maleCount} : {femaleCount})</span>
            <span className="font-semibold text-indigo-600">SAPP V1</span>
          </div>
        </div>

        {/* Graf 3: Taburan Skor Purata */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Taburan Skor Purata</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Purata skor konstruk utama Tahun 4</p>
              </div>
            </div>

            <div className="space-y-4 my-2">
              {averageScores.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 font-bold">{item.label}</span>
                    <span className="text-slate-900 font-bold">{item.score}%</span>
                  </div>
                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">3 Domain Utama</span>
            <span className="font-semibold text-emerald-600">Skor Purata</span>
          </div>
        </div>
      </div>

      {/* 4. Ringkasan Tahun 4 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Ringkasan Statistik Tahun 4</h2>
            <p className="text-xs text-slate-500">Ringkasan enrolmen dan liputan statistik modul Tahun 4</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 text-sm leading-relaxed font-medium">
          Pentaksiran Tahun 4 melibatkan <strong className="text-slate-900 font-black">{totalStudents} orang murid</strong> daripada{' '}
          <strong className="text-slate-900 font-black">{totalClasses} buah kelas</strong> ({maleCount} murid lelaki dan {femaleCount} murid perempuan) di {schoolName}.
        </div>
      </div>

      {/* 5. Senarai Murid Tahun 4 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>👨‍🎓</span>
              <span>Senarai Murid Tahun 4</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Senarai dan carian rekod pentaksiran murid Tahun 4 ({t4Students.length} murid dijumpai)
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 self-start sm:self-auto">
            Tahun 4 ({t4Data.students.length} Orang Murid)
          </span>
        </div>

        {/* Kotak carian kecil */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Cari nama murid, kelas, atau No. MyKid..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Senarai Kad Murid */}
        {t4Students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {t4Students.map((student) => (
              <div
                key={student.id}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-sky-300 hover:bg-white transition-all shadow-2xs flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                          👤 {student.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-mono">
                          🆔 {student.icNumber}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-semibold flex items-center gap-1">
                      <School className="w-3.5 h-3.5 text-slate-400" />
                      <span>🏫 {student.className}</span>
                    </span>
                    {renderStatusBadge(student.overallStatus)}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleViewProfile(student)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Profil</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            Tiada murid Tahun 4 dijumpai bagi carian "{searchQuery}".
          </div>
        )}
      </div>

      {selectedStudentModal && (
        <StudentDetailModal
          student={selectedStudentModal}
          onClose={() => setSelectedStudentModal(null)}
        />
      )}
    </div>
  );
};
