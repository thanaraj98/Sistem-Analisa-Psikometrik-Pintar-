import React, { useState } from 'react';
import { PortalType, StudentPsychometricRecord, SystemSettings, SystemAuditLog } from './types';
import { getAllStudents, getSekolahData, getTetapanData } from './data/dataProvider';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { PortalWaris } from './components/PortalWaris';
import { PortalGuru } from './components/PortalGuru';
import { PortalPentadbir } from './components/PortalPentadbir';
import { SuperAdminModal } from './components/SuperAdminModal';
import { AdminLoginModal } from './components/AdminLoginModal';

export default function App() {
  const [currentPortal, setCurrentPortal] = useState<PortalType>('landing');
  const [students, setStudents] = useState<StudentPsychometricRecord[]>(getAllStudents());
  const [settings, setSettings] = useState<SystemSettings>(getSekolahData().info);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>(getTetapanData().auditLogs);
  const [isSuperAdminOpen, setIsSuperAdminOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const handleSelectPortal = (portal: PortalType) => {
    setCurrentPortal(portal);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddStudent = (newStudent: StudentPsychometricRecord) => {
    setStudents((prev) => [newStudent, ...prev]);

    // Log the addition in audit log
    const newLog: SystemAuditLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userType: 'Super Admin',
      action: 'Tambah Murid Baharu',
      details: `Menambah ${newStudent.name} (${newStudent.icNumber}) - Tahun ${newStudent.year}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdateSettings = (newSettings: SystemSettings) => {
    setSettings(newSettings);

    const newLog: SystemAuditLog = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userType: 'Pentadbir',
      action: 'Kemaskini Tetapan Sistem',
      details: `Tukar nama sekolah / tetapan ambang (${newSettings.schoolName})`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleResetData = () => {
    setStudents(getAllStudents());
    setSettings(getSekolahData().info);
    setAuditLogs(getTetapanData().auditLogs);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-amber-400 selection:text-slate-900 flex flex-col justify-between">
      <div>
        {/* Global School Header */}
        <Header
          currentPortal={currentPortal}
          onSelectPortal={handleSelectPortal}
          settings={settings}
          onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        />

        {/* Dynamic View Switcher */}
        {currentPortal === 'landing' && (
          <LandingPage
            onSelectPortal={handleSelectPortal}
            settings={settings}
            totalStudentsCount={students.length}
          />
        )}

        {currentPortal === 'waris' && (
          <PortalWaris
            onBackToLanding={() => handleSelectPortal('landing')}
            onSelectStudentDetail={() => {}}
          />
        )}

        {currentPortal === 'guru' && (
          <PortalGuru
            students={students}
            onBackToLanding={() => handleSelectPortal('landing')}
          />
        )}

        {currentPortal === 'pentadbir' && (
          <PortalPentadbir
            students={students}
            onBackToLanding={() => handleSelectPortal('landing')}
            settings={settings}
            auditLogs={auditLogs}
            onUpdateSettings={handleUpdateSettings}
          />
        )}
      </div>

      {/* Secret Portal Pentadbir Login Modal (Triggered by 5 rapid clicks on school logo) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => handleSelectPortal('pentadbir')}
      />

      {/* Secret Super Admin Master Modal */}
      <SuperAdminModal
        isOpen={isSuperAdminOpen}
        onClose={() => setIsSuperAdminOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onAddStudent={handleAddStudent}
        onResetData={handleResetData}
      />

      {/* Global Footer */}
      <footer className="bg-slate-950 text-slate-400 py-6 px-4 border-t border-slate-800 text-center text-xs">
        <div className="max-w-7xl mx-auto space-y-1">
          <p className="font-bold text-slate-300">
            {settings.schoolName} &bull; Sistem Analisa Psikometrik Pintar (SAPP)
          </p>
          <p className="text-slate-500 text-[11px]">
            Sistem pengurusan dan analisa Pentaksiran Psikometrik (PPsi) murid merujuk kepada instrumen dan garis panduan Pentaksiran Psikometrik Kementerian Pendidikan Malaysia (KPM).
          </p>
        </div>
      </footer>
    </div>
  );
}
