import React, { useState } from 'react';
import { StudentPsychometricRecord, SystemSettings } from '../types';
import { X, KeyRound, Database, RefreshCw, PlusCircle, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';

interface SuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SystemSettings;
  onUpdateSettings: (newSettings: SystemSettings) => void;
  onAddStudent: (newStudent: StudentPsychometricRecord) => void;
  onResetData: () => void;
}

export const SuperAdminModal: React.FC<SuperAdminModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onAddStudent,
  onResetData,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'addStudent' | 'masterConfig'>('overview');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // New Student Form State
  const [newIC, setNewIC] = useState('');
  const [newName, setNewName] = useState('');
  const [newYear, setNewYear] = useState<4 | 5 | 6>(4);
  const [newClass, setNewClass] = useState('4 Bijak');
  const [newGender, setNewGender] = useState<'Lelaki' | 'Perempuan'>('Lelaki');

  if (!isOpen) return null;

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIC.trim() || !newName.trim()) {
      setStatusMsg('Sila isi No. MyKid dan Nama Murid.');
      return;
    }

    const created: StudentPsychometricRecord = {
      id: `M-${Date.now()}`,
      icNumber: newIC.trim(),
      name: newName.trim(),
      year: newYear,
      className: newClass,
      gender: newGender,
      schoolName: settings.schoolName,
      counselorName: settings.gbkHeadName,
      assessmentDate: '01 Ogos 2026',
      overallStatus: 'Selesai',
      topIntelligences: ['Verbal Linguistik', 'Logik Matematik', 'Interpersonal'],
      counselorRemarks: 'Murid baharu ditambah menerusi Portal Super Admin Master.',
      ikpScores: [
        { domain: 'Verbal Linguistik', score: 85, level: 'Tinggi', description: 'Penguasaan lisan dan bacaan yang cemerlang.', recommendationHome: 'Galakkan membaca di rumah.', recommendationSchool: 'Sertai perbahasan.' },
        { domain: 'Logik Matematik', score: 80, level: 'Tinggi', description: 'Kemahiran mengira dan logik yang baik.', recommendationHome: 'Permainan strategi.', recommendationSchool: 'Soalan KBAT.' },
        { domain: 'Interpersonal', score: 75, level: 'Tinggi', description: 'Boleh bekerjasama dalam kumpulan.', recommendationHome: 'Aktiviti sosial.', recommendationSchool: 'Pembimbing rakan.' },
        { domain: 'Ruang Visual', score: 65, level: 'Sederhana', description: 'Pemahaman visual.', recommendationHome: 'Aktiviti melukis.', recommendationSchool: 'Guna peta minda.' },
        { domain: 'Muzik', score: 60, level: 'Sederhana', description: 'Irama asas.', recommendationHome: 'Muzik santai.', recommendationSchool: 'Aktiviti nyanyian.' },
        { domain: 'Kinestetik', score: 55, level: 'Sederhana', description: 'Koordinasi fizikal.', recommendationHome: 'Riadah.', recommendationSchool: 'Sukan.' },
        { domain: 'Naturalis', score: 50, level: 'Sederhana', description: 'Peka alam sekitar.', recommendationHome: 'Berkebun.', recommendationSchool: 'Kelab alam.' },
        { domain: 'Intrapersonal', score: 50, level: 'Sederhana', description: 'Faham diri.', recommendationHome: 'Diari.', recommendationSchool: 'Refleksi.' },
        { domain: 'Eksistensial', score: 45, level: 'Rendah', description: 'Pemahaman moral.', recommendationHome: 'Nilai murni.', recommendationSchool: 'Sivik.' }
      ],
      imkTopCodes: ['S', 'A', 'I'],
      imkScores: [
        { code: 'S', category: 'Sosial', score: 85 },
        { code: 'A', category: 'Artistik', score: 75 },
        { code: 'I', category: 'Investigatif', score: 70 },
        { code: 'R', category: 'Realistik', score: 50 },
        { code: 'E', category: 'Enterprising (Usahawan)', score: 45 },
        { code: 'K', category: 'Konvensional', score: 40 }
      ],
      suggestedCareers: ['Guru', 'Kaunselor', 'Pereka'],
      aptitudeScores: [
        { component: 'Verbal', score: 85 },
        { component: 'Numerikal', score: 80 },
        { component: 'Penaakulan', score: 78 },
        { component: 'Kreativiti', score: 75 },
        { component: 'Penyelesaian Masalah', score: 82 }
      ]
    };

    onAddStudent(created);
    setStatusMsg(`Murid ${newName} (No. MyKid: ${newIC}) berjaya ditambah ke dalam pengkalan data!`);
    setNewIC('');
    setNewName('');
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleReset = () => {
    onResetData();
    setStatusMsg('Data mock berjaya diset semula kepada rekod asal KPM!');
    setTimeout(() => setStatusMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                <Sparkles className="w-3 h-3" />
                <span>AKSES RAHSIA SUPER ADMIN (MOD MASTER)</span>
              </div>
              <h2 className="text-base font-bold text-white">Kawalan Pentadbir Utama SAPP</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex gap-2 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ringkasan Master
          </button>
          <button
            onClick={() => setActiveTab('addStudent')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === 'addStudent'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tambah Murid Mock
          </button>
        </div>

        {/* Status Message Alert */}
        {statusMsg && (
          <div className="mx-5 mt-4 p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-xs font-semibold text-amber-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-xl leading-relaxed text-slate-300">
                <strong className="text-amber-400 block font-bold mb-1">
                  Selamat Datang ke Mod Master Super Admin:
                </strong>
                Mod ini diakses secara tersembunyi menerusi 5 kali klik pada logo sekolah di bahagian atas. Di sini anda boleh menguruskan tetapan teras, menambah murid baharu secara dinamik, atau menetapkan semula data ujian.
              </div>

              <div className="p-4 bg-slate-850 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-white block">Status Konfigurasi Semasa:</span>
                <div className="grid grid-cols-2 gap-2 text-slate-400">
                  <div>Sekolah: <strong className="text-white">{settings.schoolName}</strong></div>
                  <div>Kod: <strong className="text-amber-400">{settings.schoolCode}</strong></div>
                  <div>PPD: <strong className="text-white">{settings.ppdName}</strong></div>
                  <div>Sesi: <strong className="text-emerald-400">{settings.academicYear}</strong></div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-800">
                <span className="text-slate-400">Set semula pengkalan data mock ke bentuk asal:</span>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-rose-600/80 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Set Semula Data Mock</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'addStudent' && (
            <form onSubmit={handleCreateStudent} className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
                Bina Rekod Murid Baharu (Tahun 4, 5, atau 6)
              </h4>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">No. Kad Pengenalan / MyKid:</label>
                <input
                  type="text"
                  value={newIC}
                  onChange={(e) => setNewIC(e.target.value)}
                  placeholder="Contoh: 141122-10-9988"
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Nama Penuh Murid:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Nur Qaisara binti Hisham"
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Tahun:</label>
                  <select
                    value={newYear}
                    onChange={(e) => setNewYear(Number(e.target.value) as 4 | 5 | 6)}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none font-bold"
                  >
                    <option value={4}>Tahun 4</option>
                    <option value={5}>Tahun 5</option>
                    <option value={6}>Tahun 6</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Nama Kelas:</label>
                  <input
                    type="text"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    placeholder="e.g. 4 Bijak"
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Jantina:</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as 'Lelaki' | 'Perempuan')}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white outline-none"
                  >
                    <option value="Lelaki">Lelaki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Daftar Murid Ke Dalam SAPP</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
          >
            Tutup Mod Master
          </button>
        </div>
      </div>
    </div>
  );
};
