import React from 'react';
import { PortalType, SystemSettings } from '../types';
import { Users, GraduationCap, ArrowRight, CheckCircle2, School, Lock, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onSelectPortal: (portal: PortalType) => void;
  settings: SystemSettings;
  totalStudentsCount?: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectPortal,
  settings,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Header Banner / Hero Section with Corporate Navy Accent */}
      <div className="bg-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          {/* Logo Sekolah & Nama Sekolah */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-700/30 border border-indigo-400/40 p-1 flex items-center justify-center shadow-lg shadow-indigo-900/30">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center border border-indigo-400/20">
                <School className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-200 text-xs font-semibold tracking-wide shadow-xs">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>{settings.schoolName}</span>
            </div>
          </motion.div>

          {/* Nama Sistem */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Sistem Analisa Psikometrik Pintar{' '}
            <span className="text-indigo-400">(SAPP)</span>
          </motion.h1>

          {/* Penerangan Ringkas Sistem */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
          >
            Sistem Analisa Psikometrik Pintar (SAPP) ialah sistem yang dibangunkan untuk membantu pihak sekolah mentafsir keputusan Pentaksiran Psikometrik murid sekolah rendah. Sistem ini menggunakan keputusan pentaksiran yang merujuk kepada instrumen dan garis panduan Pentaksiran Psikometrik Kementerian Pendidikan Malaysia (KPM).
          </motion.p>
        </div>
      </div>

      {/* Main Content Area - 2 Main Portals */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* 2 Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* 1. PORTAL WARIS */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Ibu Bapa / Penjaga
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Portal Waris
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Semak keputusan dan tafsiran profil psikometrik anak anda dengan mudah dan pantas melalui No. Kad Pengenalan.
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Semakan pantas No. Kad Pengenalan / MyKid</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Paparan profil kecerdasan & cadangan aktiviti</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Akses selamat & mesra pengguna</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPortal('waris')}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Semak Keputusan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* 2. PORTAL GURU */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  Guru Kelas & Subjek
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Portal Guru
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
                Akses dashboard analisis data bagi setiap darjah (Tahun 4, 5, 6) dan pemantauan menyeluruh murid.
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Analisa Keseluruhan & Taburan Kecerdasan</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Kategori Khas Tahun 4, Tahun 5 dan Tahun 6</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Penapisan mengikut kelas & profil murid</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPortal('guru')}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Masuk Portal Guru</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
