import React, { useState, useMemo } from 'react';
import { StudentPsychometricRecord } from '../types';
import { getAllStudents } from '../data/dataProvider';
import { StudentDetailModal } from './StudentDetailModal';
import {
  Search,
  User,
  GraduationCap,
  School,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  X,
  Eye,
  Filter,
} from 'lucide-react';

export interface StudentSearchProps {
  /** Optional custom list of students; defaults to dataProvider.getAllStudents() */
  students?: StudentPsychometricRecord[];
  /** Callback when "Lihat Profil" is clicked */
  onSelectStudent?: (student: StudentPsychometricRecord) => void;
  /** Restrict carian to MyKad/IC only (e.g. for Portal Waris) */
  icOnlyMode?: boolean;
  /** Custom placeholder text for search input */
  placeholder?: string;
  /** Custom container class names */
  className?: string;
  /** Title header for the search engine section */
  title?: string;
}

export const StudentSearch: React.FC<StudentSearchProps> = ({
  students: customStudents,
  onSelectStudent,
  icOnlyMode = false,
  placeholder,
  className = '',
  title = 'Global Student Search Engine',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllResults, setShowAllResults] = useState(false);
  const [selectedStudentModal, setSelectedStudentModal] = useState<StudentPsychometricRecord | null>(null);

  // Load students from dataProvider if custom list is not provided
  const allStudentsList = useMemo(() => {
    return customStudents && customStudents.length > 0 ? customStudents : getAllStudents();
  }, [customStudents]);

  // Live filter matching name OR IC number
  const filteredStudents = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) {
      return [];
    }

    const cleanQueryIC = rawQuery.replace(/[^0-9a-z]/g, '');

    return allStudentsList.filter((student) => {
      const matchName = !icOnlyMode && student.name.toLowerCase().includes(rawQuery);
      const cleanStudentIC = student.icNumber.toLowerCase().replace(/[^0-9a-z]/g, '');
      const matchIC = cleanStudentIC.includes(cleanQueryIC) || student.icNumber.toLowerCase().includes(rawQuery);

      return matchName || matchIC;
    });
  }, [searchQuery, allStudentsList, icOnlyMode]);

  // Quick results (Max 5) vs All results
  const displayedStudents = showAllResults ? filteredStudents : filteredStudents.slice(0, 5);
  const hasMoreThanFive = filteredStudents.length > 5;

  // Handle "Lihat Profil" button click
  const handleViewProfile = (student: StudentPsychometricRecord) => {
    if (onSelectStudent) {
      onSelectStudent(student);
    } else {
      // Default fallback: open detailed student modal placeholder
      setSelectedStudentModal(student);
    }
  };

  // Border & Color scheme based on Student Year
  const getYearCardStyle = (year: 4 | 5 | 6) => {
    switch (year) {
      case 4:
        return {
          cardBorder: 'border-l-4 border-l-sky-500 border-y border-r border-slate-200/90 hover:border-sky-300',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          avatarBg: 'bg-sky-100 text-sky-700',
          yearText: '📘 Tahun 4',
        };
      case 5:
        return {
          cardBorder: 'border-l-4 border-l-emerald-500 border-y border-r border-slate-200/90 hover:border-emerald-300',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          avatarBg: 'bg-emerald-100 text-emerald-700',
          yearText: '📗 Tahun 5',
        };
      case 6:
        return {
          cardBorder: 'border-l-4 border-l-amber-500 border-y border-r border-slate-200/90 hover:border-amber-300',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          avatarBg: 'bg-amber-100 text-amber-700',
          yearText: '📙 Tahun 6',
        };
      default:
        return {
          cardBorder: 'border-l-4 border-l-slate-400 border-y border-r border-slate-200/90',
          badgeBg: 'bg-slate-50 text-slate-700 border-slate-200',
          avatarBg: 'bg-slate-100 text-slate-700',
          yearText: `Tahun ${year}`,
        };
    }
  };

  // Status Badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
          </span>
        );
      case 'Dalam Semakan':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Dalam Semakan
          </span>
        );
      case 'Perlu Bimbingan':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" /> Perlu Bimbingan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
            {status || 'Aktif'}
          </span>
        );
    }
  };

  const inputPlaceholderText =
    placeholder ||
    (icOnlyMode
      ? '🔍 Masukkan No. Kad Pengenalan / MyKid'
      : '🔍 Cari Nama Murid atau No. Kad Pengenalan');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SEARCH CONTAINER CARD */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        {/* Header Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-600" />
              <span>{title}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cari maklumat murid secara rasmi melalui nama atau No. MyKid / Kad Pengenalan.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">📘 T4</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">📗 T5</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">📙 T6</span>
          </div>
        </div>

        {/* Live Search Input Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-slate-400" />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowAllResults(false);
            }}
            placeholder={inputPlaceholderText}
            className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-2xs"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setShowAllResults(false);
              }}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Helper Text / Status count */}
        {searchQuery.trim() !== '' && (
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>
              Keputusan carian untuk: <strong className="text-slate-900">"{searchQuery}"</strong>
            </span>
            <span className="font-bold text-slate-700">
              {filteredStudents.length} murid dijumpai
            </span>
          </div>
        )}
      </div>

      {/* NO RESULT STATE */}
      {searchQuery.trim() !== '' && filteredStudents.length === 0 && (
        <div className="bg-white rounded-2xl p-10 border border-slate-200/90 shadow-xs text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-base font-bold text-slate-900">Tiada murid dijumpai.</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Sila pastikan ejaan nama murid atau nombor Kad Pengenalan (MyKid) ditaip dengan betul tanpa simbol KPM tambahan.
          </p>
        </div>
      )}

      {/* RESULTS CARDS GRID */}
      {displayedStudents.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedStudents.map((student) => {
              const yearStyle = getYearCardStyle(student.year);

              return (
                <div
                  key={student.id}
                  className={`bg-white rounded-2xl p-5 ${yearStyle.cardBorder} shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4`}
                >
                  <div className="space-y-3">
                    {/* Header Row: Student Name & Year Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl ${yearStyle.avatarBg} font-black text-base flex items-center justify-center shrink-0 shadow-2xs`}>
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                            👤 {student.name}
                          </h3>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">
                            🆔 MyKid: {student.icNumber}
                          </p>
                        </div>
                      </div>

                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${yearStyle.badgeBg} shrink-0`}>
                        {yearStyle.yearText}
                      </span>
                    </div>

                    {/* Metadata Row: Class, School, Status */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>🏫 {student.className}</span>
                      </div>

                      <div className="flex items-center justify-end">
                        {renderStatusBadge(student.overallStatus)}
                      </div>
                    </div>
                  </div>

                  {/* Action Row: Lihat Profil Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Jantina: {student.gender}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleViewProfile(student)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Profil</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* QUICK RESULT TOGGLE BUTTON ("Lihat semua keputusan") */}
          {hasMoreThanFive && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setShowAllResults(!showAllResults)}
                className="px-6 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 transition-all shadow-2xs inline-flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {showAllResults
                    ? 'Tunjukkan 5 keputusan teratas sahaja'
                    : `Lihat semua keputusan (${filteredStudents.length} murid dijumpai)`}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showAllResults ? 'rotate-90' : ''}`} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* DEFAULT INITIAL PROMPT STATE */}
      {searchQuery.trim() === '' && (
        <div className="bg-slate-50/70 rounded-2xl p-8 border border-dashed border-slate-200 text-center space-y-2">
          <div className="text-slate-400 text-sm font-medium">
            💡 Taip sebahagian nama murid atau nombor Kad Pengenalan di kotak carian di atas.
          </div>
          <p className="text-xs text-slate-400">
            Sistem carian pintar secara lansung (Live Search) tanpa perlu menekan butang Enter.
          </p>
        </div>
      )}

      {/* STUDENT PROFILE MODAL FALLBACK PLACEHOLDER */}
      {selectedStudentModal && (
        <StudentDetailModal
          student={selectedStudentModal}
          onClose={() => setSelectedStudentModal(null)}
        />
      )}
    </div>
  );
};
