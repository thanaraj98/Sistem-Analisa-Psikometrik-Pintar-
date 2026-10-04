import React from 'react';
import { StudentPsychometricRecord } from '../types';
import {
  User,
  CreditCard,
  GraduationCap,
  School,
  CheckCircle2,
  Clock,
  AlertCircle,
  Hash,
  Sparkles,
} from 'lucide-react';

export interface StudentHeaderProps {
  student: StudentPsychometricRecord;
  className?: string;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  student,
  className = '',
}) => {
  if (!student) return null;

  // Year theme color accent
  const getYearBadgeStyle = (year: 4 | 5 | 6) => {
    switch (year) {
      case 4:
        return {
          cardBorder: 'border-l-4 border-l-sky-500 border-y border-r border-slate-200/90',
          badgeBg: 'bg-sky-50 text-sky-800 border-sky-200',
          avatarBg: 'bg-sky-100 text-sky-700 border-sky-200',
          yearText: '📘 Tahun 4',
        };
      case 5:
        return {
          cardBorder: 'border-l-4 border-l-emerald-500 border-y border-r border-slate-200/90',
          badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          avatarBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          yearText: '📗 Tahun 5',
        };
      case 6:
        return {
          cardBorder: 'border-l-4 border-l-amber-500 border-y border-r border-slate-200/90',
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          avatarBg: 'bg-amber-100 text-amber-700 border-amber-200',
          yearText: '📙 Tahun 6',
        };
      default:
        return {
          cardBorder: 'border-l-4 border-l-slate-400 border-y border-r border-slate-200/90',
          badgeBg: 'bg-slate-50 text-slate-800 border-slate-200',
          avatarBg: 'bg-slate-100 text-slate-700 border-slate-200',
          yearText: `Tahun ${year}`,
        };
    }
  };

  const yearStyle = getYearBadgeStyle(student.year);

  // Status Badge Component
  const renderStatusBadge = (status: StudentPsychometricRecord['overallStatus']) => {
    switch (status) {
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs shadow-2xs">
            <span>🟢</span> Selesai
          </span>
        );
      case 'Dalam Semakan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs shadow-2xs">
            <span>🟡</span> Dalam Semakan
          </span>
        );
      case 'Perlu Bimbingan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 font-bold text-xs shadow-2xs">
            <span>🔴</span> Perlu Bimbingan
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs shadow-2xs">
            {status || 'Aktif'}
          </span>
        );
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 ${yearStyle.cardBorder} shadow-xs space-y-5 ${className}`}>
      {/* SECTION 1: Avatar, Nama Murid, ID Murid */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl ${yearStyle.avatarBg} border border-slate-200/60 flex items-center justify-center text-slate-700 shrink-0 shadow-2xs`}>
            <User className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
              👤 {student.name}
            </h1>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>ID Murid: <strong className="text-slate-800 font-bold">{student.id}</strong></span>
            </div>
          </div>
        </div>

        {/* Year Badge */}
        <div className="self-start sm:self-center">
          <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-xl border ${yearStyle.badgeBg} shadow-2xs`}>
            {yearStyle.yearText}
          </span>
        </div>
      </div>

      {/* SECTION 2: IC, Jantina, Tahun, Kelas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5 text-slate-400" />
            <span>No. MyKid / IC</span>
          </div>
          <div className="text-xs font-black text-slate-900 mt-1 font-mono">
            🆔 {student.icNumber}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Jantina</span>
          </div>
          <div className="text-xs font-bold text-slate-900 mt-1">
            {student.gender === 'Lelaki' ? '👦 Lelaki' : '👧 Perempuan'}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <span>Tahun</span>
          </div>
          <div className="text-xs font-bold text-slate-900 mt-1">
            🎓 {yearStyle.yearText}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <School className="w-3.5 h-3.5 text-slate-400" />
            <span>Kelas</span>
          </div>
          <div className="text-xs font-bold text-slate-900 mt-1">
            🏫 {student.className}
          </div>
        </div>
      </div>

      {/* SECTION 3: Status Pentaksiran */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="font-bold text-slate-900">📌 Status Pentaksiran:</span>
          {renderStatusBadge(student.overallStatus)}
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Sekolah: <strong className="text-slate-800">{student.schoolName || 'SK SERI BINTANG UTAMA'}</strong>
        </div>
      </div>
    </div>
  );
};
