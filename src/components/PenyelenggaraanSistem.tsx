import React, { useState } from 'react';
import { SystemSettings, SystemAuditLog } from '../types';
import { Settings, Shield, Lock, FileSpreadsheet, History, Database, CheckCircle2, AlertCircle, Save, RefreshCw, Layers } from 'lucide-react';

interface PenyelenggaraanSistemProps {
  settings: SystemSettings;
  auditLogs: SystemAuditLog[];
  onUpdateSettings: (newSettings: SystemSettings) => void;
}

export const PenyelenggaraanSistem: React.FC<PenyelenggaraanSistemProps> = ({
  settings,
  auditLogs,
  onUpdateSettings,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'tetapan' | 'penguncian' | 'import' | 'log'>('tetapan');
  const [formData, setFormData] = useState<SystemSettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSimulateImport = () => {
    setImportStatus('Memproses templat CSV/Excel PPsi KPM...');
    setTimeout(() => {
      setImportStatus('Berjaya mengimport 6 rekod murid mock ke dalam pengkalan data sekolah!');
      setTimeout(() => setImportStatus(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-slate-900 text-white rounded-2xl p-6 border border-amber-800/80 shadow-md">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Shield className="w-4 h-4" />
          <span>Portal Pentadbir Sekolah & GBK</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-white">
          Penyelenggaraan Sistem (System Maintenance)
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Modul pengurusan khas bagi penyiapan tetapan instrumen PPsi KPM, status penguncian data, kemasukan data mock, dan log audit keselamatan.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSubTab('tetapan')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'tetapan'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Tetapan Sekolah & Instrumen</span>
        </button>

        <button
          onClick={() => setActiveSubTab('penguncian')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'penguncian'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Penguncian Data PPsi</span>
        </button>

        <button
          onClick={() => setActiveSubTab('import')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'import'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Integrasi & Muat Naik CSV</span>
        </button>

        <button
          onClick={() => setActiveSubTab('log')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'log'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Log Akses & Audit</span>
        </button>
      </div>

      {/* SUB-TAB 1: TETAPAN */}
      {activeSubTab === 'tetapan' && (
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-600" />
            <span>Tetapan Umum Sekolah & Instrumen KPM</span>
          </h3>

          {saveSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Tetapan sistem berjaya dikemaskini dan disimpan!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Nama Sekolah:</label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Kod Sekolah (KPM):</label>
              <input
                type="text"
                value={formData.schoolCode}
                onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Sesi Persekolahan:</label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Nama Ketua GBK:</label>
              <input
                type="text"
                value={formData.gbkHeadName}
                onChange={(e) => setFormData({ ...formData, gbkHeadName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Pejabat Pendidikan Daerah (PPD):</label>
              <input
                type="text"
                value={formData.ppdName}
                onChange={(e) => setFormData({ ...formData, ppdName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Jabatan Pendidikan Negeri (JPN):</label>
              <input
                type="text"
                value={formData.jpnName}
                onChange={(e) => setFormData({ ...formData, jpnName: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
              Ambang Tahap Pencapaian IKP (%)
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Ambang Tahap Tinggi (≥ %):</label>
                <input
                  type="number"
                  value={formData.highThreshold}
                  onChange={(e) => setFormData({ ...formData, highThreshold: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-emerald-700"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Ambang Tahap Sederhana (≥ %):</label>
                <input
                  type="number"
                  value={formData.mediumThreshold}
                  onChange={(e) => setFormData({ ...formData, mediumThreshold: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-blue-700"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Tetapan Sistem</span>
            </button>
          </div>
        </form>
      )}

      {/* SUB-TAB 2: PENGUNCIAN DATA */}
      {activeSubTab === 'penguncian' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-amber-600" />
            <span>Status Penguncian Data PPsi (Data Locking)</span>
          </h3>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
            <strong>Fungsi Penguncian Data PPsi:</strong>
            <p className="mt-1">
              Penguncian data bertujuan untuk menghalang sebarang perubahan atau kemasukan markah psikometrik baharu selepas sesi penilaian sekolah tamat bagi tujuan pelaporan rasmi ke PPD dan JPN.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-700 block mb-1">Tahun 4 PPsi Status</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] inline-block mb-2">
                Terbuka (Dalam Semakan)
              </span>
              <p className="text-slate-500 text-[11px]">Dapat disemak oleh Guru Kelas & Waris.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-700 block mb-1">Tahun 5 PPsi Status</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] inline-block mb-2">
                Terbuka (Dalam Semakan)
              </span>
              <p className="text-slate-500 text-[11px]">Dapat disemak oleh Guru Kelas & Waris.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="font-bold text-slate-700 block mb-1">Tahun 6 PPsi Status</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] inline-block mb-2">
                Dikunci (Sedia Untuk PPD)
              </span>
              <p className="text-slate-500 text-[11px]">Data dikunci untuk sijil PPsi murid.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: IMPORT DATA */}
      {activeSubTab === 'import' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-600" />
            <span>Integrasi & Muat Naik Data CSV/Excel PPsi KPM</span>
          </h3>

          <div className="p-4 border-2 border-dashed border-slate-300 rounded-2xl text-center bg-slate-50 hover:bg-slate-100/80 transition-colors cursor-pointer p-8">
            <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-slate-800 text-sm mb-1">Pilih Fail CSV / Templat Excel PPsi KPM</h4>
            <p className="text-xs text-slate-500 mb-4">
              Format piawai: No. MyKid, Nama Murid, Kelas, Skor IKP (9 Domain), Skor IMK, Skor Aptitud.
            </p>
            <button
              onClick={handleSimulateImport}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Muat Naik Fail Contoh (Simulasi)</span>
            </button>
          </div>

          {importStatus && (
            <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <Database className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{importStatus}</span>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: LOG AUDIT */}
      {activeSubTab === 'log' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
            <History className="w-5 h-5 text-amber-600" />
            <span>Log Audit & Akses Sistem Terkini</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase">
                  <th className="p-3">ID Log</th>
                  <th className="p-3">Masa & Tarikh</th>
                  <th className="p-3">Pengguna</th>
                  <th className="p-3">Aktiviti</th>
                  <th className="p-3">Perincian</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-500">{log.id}</td>
                    <td className="p-3 text-slate-600">{log.timestamp}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-[11px]">
                        {log.userType}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-900">{log.action}</td>
                    <td className="p-3 text-slate-600">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Notice Card */}
      <div className="p-4 rounded-xl bg-slate-800 text-slate-300 text-xs flex items-start gap-3">
        <Layers className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block font-semibold mb-0.5">Nota Pembangunan SAPP:</strong>
          <span>
            Fungsi Penyelenggaraan Sistem ini disediakan untuk pengurusan Pentadbir Sekolah & GBK. Ciri-ciri integrasi pelayan penuh akan dikembangkan mengikut spesifikasi lanjutan Kementerian Pendidikan Malaysia (KPM).
          </span>
        </div>
      </div>
    </div>
  );
};
