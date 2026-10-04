import React, { useState } from 'react';
import { StudentPsychometricRecord } from '../types';
import { findStudentByIC } from '../data/dataProvider';
import { Search, UserCheck, ShieldAlert, Sparkles, Brain, Compass, Target, HeartHandshake, AlertCircle, ArrowLeft, CheckCircle2, Home, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface PortalWarisProps {
  onBackToLanding: () => void;
  onSelectStudentDetail: (student: StudentPsychometricRecord) => void;
}

export const PortalWaris: React.FC<PortalWarisProps> = ({ onBackToLanding }) => {
  const [icInput, setIcInput] = useState('');
  const [searchedStudent, setSearchedStudent] = useState<StudentPsychometricRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!icInput.trim()) {
      setErrorMessage('Sila masukkan No. Kad Pengenalan / MyKid murid.');
      setSearchedStudent(null);
      setHasSearched(true);
      return;
    }

    const found = findStudentByIC(icInput);
    if (found) {
      setSearchedStudent(found);
      setErrorMessage(null);
    } else {
      setSearchedStudent(null);
      setErrorMessage('Rekod murid tidak dijumpai bagi No. Kad Pengenalan ini. Sila semak semula nombor MyKid murid.');
    }
    setHasSearched(true);
  };

  const handleQuickFill = (ic: string) => {
    setIcInput(ic);
    const found = findStudentByIC(ic);
    if (found) {
      setSearchedStudent(found);
      setErrorMessage(null);
    }
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/80 shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <UserCheck className="w-4 h-4" />
              <span>Portal Semakan Waris & Ibu Bapa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Analisa Psikometrik Murid (PPsi)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Masukkan No. Kad Pengenalan / MyKid murid untuk melihat laporan tafsiran Pentaksiran Psikometrik Sekolah Rendah.
            </p>
          </div>

          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/20 transition-colors shrink-0 self-start md:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Utama</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
        {/* Strict Policy Reminder Banner */}
        <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 text-xs">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold">Dasar Akses Terkawal Waris KPM:</span>
              <p className="text-amber-800/90 mt-0.5">
                Portal Waris hanya memaparkan paparan keputusan bagi No. MyKid yang dimasukkan.{' '}
                <strong className="underline decoration-amber-400">Tiada pendaftaran akaun, tiada muat turun, tiada fungsi cetak, dan tiada suntingan data.</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-200/60 px-2.5 py-1 rounded-md text-[11px] font-semibold text-amber-950 shrink-0">
            <Lock className="w-3.5 h-3.5" />
            <span>Mod Paparan Sahaja</span>
          </div>
        </div>

        {/* Search Card Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 p-6 sm:p-8 mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <label className="block text-sm font-bold text-slate-900 mb-2">
              No. Kad Pengenalan / MyKid Murid:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={icInput}
                  onChange={(e) => setIcInput(e.target.value)}
                  placeholder="Contoh: 140512-10-1234 atau 140512101234"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 text-sm font-medium outline-none transition-all pl-11 shadow-xs"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Semak Keputusan</span>
              </button>
            </div>
          </form>

          {/* Quick Demo IC Shortcuts */}
          <div className="mt-6 pt-5 border-t border-slate-100 max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-slate-500 block mb-2.5">
              Pilih No. MyKid Contoh Untuk Semakan Pantas:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickFill('140512-10-1234')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
              >
                140512-10-1234 (Ahmad Daniel - Thn 4)
              </button>
              <button
                onClick={() => handleQuickFill('140822-14-5678')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
              >
                140822-14-5678 (Nur Aina Sofea - Thn 4)
              </button>
              <button
                onClick={() => handleQuickFill('130315-10-3456')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
              >
                130315-10-3456 (Siti Sarah - Thn 5)
              </button>
              <button
                onClick={() => handleQuickFill('120108-14-1122')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-lg text-xs font-medium border border-slate-200 transition-colors"
              >
                120108-14-1122 (Muhammad Faris - Thn 6)
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {hasSearched && errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center max-w-2xl mx-auto shadow-sm"
          >
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-2" />
            <h3 className="font-bold text-slate-900 text-base mb-1">Carian Tidak Dipercayai</h3>
            <p className="text-xs text-rose-700 mb-4">{errorMessage}</p>
            <p className="text-[11px] text-slate-500">
              Sila pastikan tiada kesilapan ejaan nombor atau hubungi Guru Bimbingan dan Kaunseling (GBK) sekolah jika memerlukan bantuan.
            </p>
          </motion.div>
        )}

        {/* Display Student Psychometric Profile Results */}
        {searchedStudent && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Student Profil Card Header */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                  {searchedStudent.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                      Tahun {searchedStudent.year} &bull; {searchedStudent.className}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      {searchedStudent.gender}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {searchedStudent.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    No. MyKid: <strong className="text-slate-800 font-mono">{searchedStudent.icNumber}</strong> &bull; Sekolah: {searchedStudent.schoolName}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 w-full md:w-auto shrink-0">
                <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Guru Bimbingan & Kaunseling:</span>
                </div>
                <div className="text-slate-700">{searchedStudent.counselorName}</div>
                <div className="text-[11px] text-slate-400 mt-1">Tarikh Pentaksiran: {searchedStudent.assessmentDate}</div>
              </div>
            </div>

            {/* Dominant Intelligences Highlights Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-6 shadow-md border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Kecerdasan Dominan Utama Murid (IKP)</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-3">
                Kecerdasan Tertinggi: {searchedStudent.topIntelligences.join(', ')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Berdasarkan instrumen Inventori Kecerdasan Pelbagai (IKP) KPM, murid mempunyai kecenderungan dominan dalam domain{' '}
                <strong className="text-amber-300">{searchedStudent.topIntelligences[0]}</strong>. Murid mempamerkan keupayaan yang sangat baik apabila pembelajaran disesuaikan dengan minat ini.
              </p>
            </div>

            {/* Inventori Kecerdasan Pelbagai (IKP - 9 Domain Breakdown) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-emerald-600" />
                    <span>Inventori Kecerdasan Pelbagai (IKP - 9 Domain)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Skor dan peratusan mengikut tahap pencapaian murid (Tinggi: ≥75%, Sederhana: 50%-74%, Rendah: &lt;50%)
                  </p>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-200 hidden sm:inline-block">
                  Instrumen PPsi KPM
                </span>
              </div>

              {/* 9 Domains Progress & Recommendations Grid */}
              <div className="space-y-5">
                {searchedStudent.ikpScores.map((score, index) => {
                  let badgeBg = 'bg-slate-100 text-slate-700 border-slate-300';
                  let barBg = 'bg-slate-400';
                  if (score.level === 'Tinggi') {
                    badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                    barBg = 'bg-emerald-500';
                  } else if (score.level === 'Sederhana') {
                    badgeBg = 'bg-blue-100 text-blue-800 border-blue-300';
                    barBg = 'bg-blue-500';
                  }

                  return (
                    <div key={index} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{score.domain}</span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${badgeBg}`}>
                            Tahap {score.level} ({score.score}%)
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{score.score}%</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-3 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full ${barBg} transition-all duration-500`}
                          style={{ width: `${score.score}%` }}
                        ></div>
                      </div>

                      <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">
                        {score.description}
                      </p>

                      {/* Parent Home Recommendation */}
                      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-3 text-xs text-emerald-950 flex items-start gap-2">
                        <Home className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-emerald-900 block font-semibold mb-0.5">
                            Cadangan Bimbingan Ibu Bapa di Rumah:
                          </strong>
                          <span>{score.recommendationHome}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inventori Minat Kerjaya (IMK - Holland Codes) & Aptitud Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* IMK Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <Compass className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Inventori Minat Kerjaya (IMK)
                    </h3>
                    <p className="text-[11px] text-slate-500">Kod Holland Ringkas Sekolah Rendah</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs text-slate-500 font-medium block mb-1">3 Kod Kecenderungan Dominan:</span>
                  <div className="flex gap-2">
                    {searchedStudent.imkTopCodes.map((code, idx) => (
                      <span key={idx} className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-base flex items-center justify-center shadow-sm">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {searchedStudent.imkScores.map((imk, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                      <span className="text-slate-700 font-medium">{imk.category} ({imk.code})</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${imk.score}%` }}></div>
                        </div>
                        <span className="font-bold text-slate-900 w-8 text-right">{imk.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-700 block mb-1">Cadangan Domain Kerjaya Masa Depan:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {searchedStudent.suggestedCareers.map((c, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-800 text-[11px] font-medium rounded-lg border border-blue-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Aptitud (IAPT) Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <Target className="w-5 h-5 text-amber-600" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Inventori Aptitud Am & Khusus (IAPT)
                    </h3>
                    <p className="text-[11px] text-slate-500">Profil Keupayaan & Kebolehan Kognitif</p>
                  </div>
                </div>

                <div className="space-y-3.5 mb-6">
                  {searchedStudent.aptitudeScores.map((apt, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                        <span>Aptitud {apt.component}</span>
                        <span>{apt.score}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${apt.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <strong>Ulasan Kaunselor (GBK):</strong>
                  <p className="mt-1 text-slate-700">{searchedStudent.counselorRemarks}</p>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="text-center pt-4 text-xs text-slate-500">
              Laporan ini dijana berasaskan data Pentaksiran Psikometrik Sekolah Rendah ({searchedStudent.schoolName}). Untuk sebarang pertanyaan lanjut, sila hubungi Guru Bimbingan dan Kaunseling sekolah.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
