import React from 'react';
import { StudentPsychometricRecord } from '../types';
import { X, Brain, Compass, Target, BookOpen, Home, HeartHandshake, Sparkles, Award } from 'lucide-react';

interface StudentDetailModalProps {
  student: StudentPsychometricRecord | null;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900 text-white p-6 rounded-t-2xl flex items-center justify-between border-b border-slate-800 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded-full">
                  Tahun {student.year} ({student.className})
                </span>
                <span className="text-xs text-slate-300 font-medium">{student.gender}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{student.name}</h2>
              <p className="text-xs text-slate-400 font-mono">No. MyKid: {student.icNumber}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-xs font-semibold text-emerald-800 uppercase block mb-1">
                Dominan Utama (IKP)
              </span>
              <span className="text-base font-extrabold text-emerald-950 block">
                {student.topIntelligences[0]}
              </span>
              <span className="text-xs text-emerald-700 font-medium">
                {student.topIntelligences.slice(1).join(', ')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-xs font-semibold text-blue-800 uppercase block mb-1">
                Kod Minat Kerjaya (IMK)
              </span>
              <div className="flex gap-1.5 my-1">
                {student.imkTopCodes.map((code, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-600 text-white font-extrabold text-xs rounded">
                    {code}
                  </span>
                ))}
              </div>
              <span className="text-xs text-blue-700 font-medium">
                {student.suggestedCareers.slice(0, 2).join(', ')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-semibold text-amber-800 uppercase block mb-1">
                Status Pentaksiran
              </span>
              <span className="text-base font-extrabold text-amber-950 block">
                {student.overallStatus}
              </span>
              <span className="text-xs text-amber-700 font-medium">
                Tarikh: {student.assessmentDate}
              </span>
            </div>
          </div>

          {/* IKP 9 Domain Breakdown */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-600" />
              <span>Analisis Inventori Kecerdasan Pelbagai (IKP - 9 Domain)</span>
            </h3>

            <div className="space-y-4">
              {student.ikpScores.map((score, idx) => (
                <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-slate-900 text-sm">{score.domain}</span>
                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {score.score}% ({score.level})
                    </span>
                  </div>

                  <p className="text-slate-600 mb-2">{score.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-100">
                    <div className="bg-emerald-50/60 p-2 rounded border border-emerald-100 text-emerald-950">
                      <strong className="block text-emerald-900 font-semibold mb-0.5">
                         Strategi PdP Guru di Sekolah:
                      </strong>
                      <span>{score.recommendationSchool}</span>
                    </div>
                    <div className="bg-blue-50/60 p-2 rounded border border-blue-100 text-blue-950">
                      <strong className="block text-blue-900 font-semibold mb-0.5">
                         Cadangan Bimbingan Waris di Rumah:
                      </strong>
                      <span>{score.recommendationHome}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMK & IAPT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Inventori Minat Kerjaya (IMK)</span>
              </h4>
              <div className="space-y-1.5 text-xs">
                {student.imkScores.map((imk, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-slate-200/60 last:border-0">
                    <span className="text-slate-700">{imk.category} ({imk.code})</span>
                    <span className="font-bold text-slate-900">{imk.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-600" />
                <span>Inventori Aptitud (IAPT)</span>
              </h4>
              <div className="space-y-1.5 text-xs">
                {student.aptitudeScores.map((apt, idx) => (
                  <div key={idx} className="flex justify-between py-0.5 border-b border-slate-200/60 last:border-0">
                    <span className="text-slate-700">Aptitud {apt.component}</span>
                    <span className="font-bold text-slate-900">{apt.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Counselor Remarks */}
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs">
            <strong className="text-amber-950 block font-bold text-sm mb-1 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-amber-700" />
              <span>Catatan & Ulasan GBK ({student.counselorName})</span>
            </strong>
            <p className="text-slate-800 leading-relaxed">{student.counselorRemarks}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 rounded-b-2xl border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            Tutup Paparan
          </button>
        </div>
      </div>
    </div>
  );
};
