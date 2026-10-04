import React, { useState, useMemo } from 'react';
import { StudentPsychometricRecord } from '../../types';
import {
  getSekolahData,
  getTahun5Data,
} from '../../data/dataProvider';
import { AnalisisTahun5View } from './AnalisisTahun5View';
import { StudentDetailModal } from '../StudentDetailModal';
import {
  ChevronRight,
  School,
  Users,
  BarChart2,
  PieChart,
  TrendingUp,
  FileText,
  CheckCircle2,
  LayoutDashboard,
  Search,
  User,
  Clock,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react';

interface Tahun5ViewProps {
  onSelectStudent?: (student: StudentPsychometricRecord) => void;
}

export const Tahun5View: React.FC<Tahun5ViewProps> = ({ onSelectStudent }) => {
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'analisis'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentModal, setSelectedStudentModal] = useState<StudentPsychometricRecord | null>(null);

  const sekolahData = getSekolahData();
  const t5Data = getTahun5Data();

  // Filter Year 5 students by small search box
  const t5Students = useMemo(() => {
    const allT5 = t5Data.students || [];
    if (!searchQuery.trim()) return allT5;
    const q = searchQuery.toLowerCase().trim();
    return allT5.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.icNumber.toLowerCase().includes(q) ||
        s.className.toLowerCase().includes(q)
    );
  }, [t5Data.students, searchQuery]);

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
            <span>Dashboard Tahun 5</span>
          </button>
          <button
            onClick={() => setActiveSubTab('analisis')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-xs transition-all"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>Analisis Tahun 5</span>
          </button>
        </div>

        <AnalisisTahun5View />
      </div>
    );
  }

  const schoolName = sekolahData.info.schoolName || 'SK SERI BINTANG UTAMA';
  const totalStudents = t5Data.summaryStats.totalStudents;
  const maleCount = t5Data.summaryStats.maleCount;
  const femaleCount = t5Data.summaryStats.femaleCount;
  const totalClasses = t5Data.classes.length;

  const malePercent = Math.round((maleCount / (totalStudents || 1)) * 100);
  const femalePercent = Math.round((femaleCount / (totalStudents || 1)) * 100);

  // 2. Graf Bilangan Murid Mengikut Kelas
  const classBreakdown = t5Data.classes.map((className, idx) => {
    const studentCount = t5Data.students.filter((s) => s.className === className).length;
    const fallbackCount =
      Math.floor(totalStudents / totalClasses) + (idx === 0 ? totalStudents % totalClasses : 0);
    const count = studentCount > 0 ? studentCount : fallbackCount;
    return {
      className,
      count,
    };
  });
  const maxClassCount = Math.max(...classBreakdown.map((c) => c.count), 40);

  // 4. Graf Purata Domain Tahun 5 (SEMUA 9 Domain)
  const requiredDomains = [
    { key: 'Verbal Linguistik', label: 'Verbal Linguistik', color: 'bg-emerald-500' },
    { key: 'Logik Matematik', label: 'Logik Matematik', color: 'bg-indigo-500' },
    { key: 'Visual Ruang', label: 'Visual Ruang', color: 'bg-sky-500' },
    { key: 'Muzik', label: 'Muzik', color: 'bg-purple-500' },
    { key: 'Kinestetik', label: 'Kinestetik', color: 'bg-orange-500' },
    { key: 'Interpersonal', label: 'Interpersonal', color: 'bg-blue-500' },
    { key: 'Intrapersonal', label: 'Intrapersonal', color: 'bg-teal-500' },
    { key: 'Naturalis', label: 'Naturalis', color: 'bg-lime-500' },
    { key: 'Eksistensial', label: 'Eksistensial', color: 'bg-amber-500' },
  ];

  const domainScoresList = requiredDomains.map((dom) => {
    const found = t5Data.domainScores.find(
      (d) =>
        d.domain.toLowerCase() === dom.key.toLowerCase() ||
        (dom.key === 'Visual Ruang' && d.domain.toLowerCase() === 'ruang visual')
    );
    const score = found ? found.score : 70;
    return {
      ...dom,
      score,
    };
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Navigation Bar for Switching Sub-views */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-xs transition-all"
        >
          <LayoutDashboard className="w-4 h-4 text-white" />
          <span>Dashboard Tahun 5</span>
        </button>
        <button
          onClick={() => setActiveSubTab('analisis')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <FileText className="w-4 h-4 text-slate-400" />
          <span>Analisis Tahun 5</span>
        </button>
      </div>

      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-2">
            <span>Portal Guru</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-600 font-semibold">Tahun 5</span>
          </nav>

          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>📗</span> Tahun 5
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
            <School className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Pentaksiran Psikometrik Tahun 5</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{schoolName}</span>
          </p>
        </div>

        <div className="text-xs font-bold px-3 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 shrink-0 flex items-center gap-2 self-start md:self-auto">
          <span>{sekolahData.info.academicYear}</span>
        </div>
      </div>

      {/* 1. RINGKASAN STATISTIK */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-600" />
          <span>1. Ringkasan Statistik</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Jumlah Murid Tahun 5 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xl shrink-0">
              👨‍🎓
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">Jumlah Murid Tahun 5</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">{totalStudents}</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Enrolmen Murid T5</div>
            </div>
          </div>

          {/* Jumlah Murid Lelaki */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center text-xl shrink-0">
              👦
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">Jumlah Murid Lelaki</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">{maleCount}</div>
              <div className="text-[11px] text-blue-600 font-medium mt-0.5">{malePercent}% daripada Tahun 5</div>
            </div>
          </div>

          {/* Jumlah Murid Perempuan */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center text-xl shrink-0">
              👧
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">Jumlah Murid Perempuan</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">{femaleCount}</div>
              <div className="text-[11px] text-purple-600 font-medium mt-0.5">{femalePercent}% daripada Tahun 5</div>
            </div>
          </div>

          {/* Jumlah Kelas Tahun 5 */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center text-xl shrink-0">
              🏫
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">Jumlah Kelas Tahun 5</div>
              <div className="text-2xl font-black text-slate-900 mt-0.5">{totalClasses}</div>
              <div className="text-[11px] text-teal-600 font-medium mt-0.5">Kelas Berdaftar</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GRAF BILANGAN MURID MENGIKUT KELAS & 3. GRAF BILANGAN MURID MENGIKUT JANTINA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. Graf Bilangan Murid Mengikut Kelas */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-emerald-600" />
                  <span>2. Graf Bilangan Murid Mengikut Kelas</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Bilangan murid bagi setiap kelas Tahun 5</p>
              </div>
            </div>

            <div className="space-y-4 my-2">
              {classBreakdown.map((item, idx) => {
                const widthPercent = Math.round((item.count / maxClassCount) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800 font-bold">{item.className}</span>
                      <span className="text-slate-900 font-bold">
                        {item.count} <span className="text-slate-400 font-normal">Murid</span>
                      </span>
                    </div>
                    <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className="h-full rounded-full bg-emerald-600 transition-all duration-500"
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
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Data Sah
            </span>
          </div>
        </div>

        {/* 3. Graf Bilangan Murid Mengikut Jantina */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  <span>3. Graf Bilangan Murid Mengikut Jantina</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Graf perbandingan murid Lelaki vs Perempuan</p>
              </div>
            </div>

            <div className="space-y-4 my-2">
              <div className="w-full h-7 bg-slate-100 rounded-xl overflow-hidden flex p-1 gap-1 border border-slate-200/60">
                <div
                  className="h-full bg-blue-600 rounded-lg transition-all duration-500 flex items-center justify-center text-[11px] font-bold text-white shadow-xs"
                  style={{ width: `${malePercent}%` }}
                >
                  Lelaki {malePercent}%
                </div>
                <div
                  className="h-full bg-purple-600 rounded-lg transition-all duration-500 flex items-center justify-center text-[11px] font-bold text-white shadow-xs"
                  style={{ width: `${femalePercent}%` }}
                >
                  Perempuan {femalePercent}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-xs font-semibold text-slate-500">Lelaki</div>
                  <div className="text-2xl font-black text-blue-700 mt-0.5">{maleCount} Murid</div>
                  <div className="text-[11px] text-blue-600 font-medium mt-0.5">{malePercent}% daripada T5</div>
                </div>

                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="text-xs font-semibold text-slate-500">Perempuan</div>
                  <div className="text-2xl font-black text-purple-700 mt-0.5">{femaleCount} Murid</div>
                  <div className="text-[11px] text-purple-600 font-medium mt-0.5">{femalePercent}% daripada T5</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium text-slate-600">Nisbah L : P ({maleCount} : {femaleCount})</span>
            <span className="font-semibold text-emerald-600">SAPP V1</span>
          </div>
        </div>
      </div>

      {/* 4. GRAF PURATA DOMAIN TAHUN 5 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>4. Graf Purata Domain Tahun 5</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Skor purata keseluruhan Tahun 5 bagi SEMUA 9 domain psikometrik
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 self-start sm:self-auto">
            9 Domain Utama
          </span>
        </div>

        {/* 9 Domains Horizontal Bar Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {domainScoresList.map((domainItem, idx) => {
            return (
              <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{domainItem.label}</span>
                  <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                    {domainItem.score}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${domainItem.color} rounded-full transition-all duration-500`}
                    style={{ width: `${domainItem.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. RINGKASAN TAHUN 5 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">5. Ringkasan Tahun 5</h2>
            <p className="text-xs text-slate-500">Kad ringkasan statistik rasmi Tahun 5</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-slate-700 text-sm leading-relaxed font-medium">
          Pentaksiran Tahun 5 melibatkan <strong className="text-slate-900 font-black">{totalStudents} orang murid</strong> daripada{' '}
          <strong className="text-slate-900 font-black">{totalClasses} buah kelas</strong>.
        </div>
      </div>

      {/* 6. Senarai Murid Tahun 5 */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>👨‍🎓</span>
              <span>Senarai Murid Tahun 5</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Senarai dan carian rekod pentaksiran murid Tahun 5 ({t5Students.length} murid dijumpai)
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
            Tahun 5 ({t5Data.students.length} Orang Murid)
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
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-2xs"
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
        {t5Students.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {t5Students.map((student) => (
              <div
                key={student.id}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-300 hover:bg-white transition-all shadow-2xs flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
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
            Tiada murid Tahun 5 dijumpai bagi carian "{searchQuery}".
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
