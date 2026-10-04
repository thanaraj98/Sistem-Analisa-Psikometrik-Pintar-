import React, { useState } from 'react';
import { StudentPsychometricRecord, SystemSettings, SystemAuditLog } from '../types';
import { DashboardView } from './guru/DashboardView';
import { AnalisaKeseluruhanView } from './guru/AnalisaKeseluruhanView';
import { Tahun4View } from './guru/Tahun4View';
import { Tahun5View } from './guru/Tahun5View';
import { Tahun6View } from './guru/Tahun6View';
import { PenyelenggaraanSistem } from './PenyelenggaraanSistem';
import { StudentSearch } from './StudentSearch';
import { StudentDetailModal } from './StudentDetailModal';
import {
  LayoutDashboard,
  BarChart3,
  BookOpen,
  LogOut,
  User,
  ChevronRight,
  Menu,
  X,
  Calendar,
  School,
  Sparkles,
  Search,
} from 'lucide-react';

interface PortalGuruProps {
  students: StudentPsychometricRecord[];
  onBackToLanding: () => void;
  titleOverride?: string;
  extraSidebarItems?: React.ReactNode;
  activeTabOverride?: string;
  onTabChange?: (tab: string) => void;
  settings?: SystemSettings;
  auditLogs?: SystemAuditLog[];
  onUpdateSettings?: (newSettings: SystemSettings) => void;
}

export const PortalGuru: React.FC<PortalGuruProps> = ({
  students,
  onBackToLanding,
  titleOverride,
  extraSidebarItems,
  activeTabOverride,
  onTabChange,
  settings,
  auditLogs,
  onUpdateSettings,
}) => {
  const [internalTab, setInternalTab] = useState<string>(activeTabOverride || 'dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<StudentPsychometricRecord | null>(null);

  const currentActiveTab = activeTabOverride !== undefined ? activeTabOverride : internalTab;

  const handleTabSelect = (tabKey: string) => {
    if (onTabChange) {
      onTabChange(tabKey);
    } else {
      setInternalTab(tabKey);
    }
    setIsMobileSidebarOpen(false);
  };

  // Format current Malay date
  const todayDateMalay = new Date().toLocaleDateString('ms-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get active tab label for breadcrumb
  const getTabBreadcrumbLabel = () => {
    switch (currentActiveTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'keseluruhan':
        return 'Analisa Keseluruhan';
      case 't4':
        return 'Tahun 4';
      case 't5':
        return 'Tahun 5';
      case 't6':
        return 'Tahun 6';
      case 'carian':
        return '🔍 Carian Murid';
      case 'penyelenggaraan':
        return 'Penyelenggaraan Sistem';
      default:
        return 'Dashboard';
    }
  };

  // Render main tab view content
  const renderTabContent = () => {
    switch (currentActiveTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'keseluruhan':
        return <AnalisaKeseluruhanView />;
      case 't4':
        return <Tahun4View onSelectStudent={(s) => setSelectedStudentForProfile(s)} />;
      case 't5':
        return <Tahun5View onSelectStudent={(s) => setSelectedStudentForProfile(s)} />;
      case 't6':
        return <Tahun6View onSelectStudent={(s) => setSelectedStudentForProfile(s)} />;
      case 'carian':
        return (
          <StudentSearch
            students={students}
            onSelectStudent={(s) => setSelectedStudentForProfile(s)}
          />
        );
      case 'penyelenggaraan':
        if (settings && auditLogs && onUpdateSettings) {
          return (
            <PenyelenggaraanSistem
              settings={settings}
              auditLogs={auditLogs}
              onUpdateSettings={onUpdateSettings}
            />
          );
        }
        return <DashboardView />;
      default:
        return <DashboardView />;
    }
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'keseluruhan', label: 'Analisa Keseluruhan', icon: BarChart3 },
    { key: 't4', label: 'Tahun 4', icon: BookOpen, badgeColor: 'bg-sky-500/20 text-sky-300' },
    { key: 't5', label: 'Tahun 5', icon: BookOpen, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
    { key: 't6', label: 'Tahun 6', icon: BookOpen, badgeColor: 'bg-amber-500/20 text-amber-300' },
    { key: 'carian', label: '🔍 Carian Murid', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-800 font-sans">
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <School className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-sm block leading-tight">
              {titleOverride || 'Portal Guru SAPP'}
            </span>
            <span className="text-[10px] text-slate-400">Penyelaras PPsi</span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 border border-slate-700"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Fixed Sidebar Navigation (Desktop) */}
      <aside
        className={`${
          isMobileSidebarOpen ? 'block fixed inset-0 z-40 bg-slate-900' : 'hidden'
        } lg:block lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 bg-slate-900 text-slate-300 border-r border-slate-800 z-30 flex flex-col justify-between overflow-y-auto`}
      >
        <div className="p-5 space-y-6">
          {/* App Branding Header */}
          <div className="pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-slate-800 border border-indigo-400/30 flex items-center justify-center text-white shadow-md">
                <School className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight">
                  {titleOverride || 'Portal Guru'}
                </h1>
                <p className="text-[11px] text-slate-400 font-medium">
                  Analisa Psikometrik (SAPP)
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3 mb-2">
              Menu Utama
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentActiveTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleTabSelect(item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badgeColor && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor}`}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Render any additional sidebar items (e.g., Penyelenggaraan Sistem in Pentadbir portal) */}
            {extraSidebarItems}
          </nav>
        </div>

        {/* Sidebar Footer: Divider, Teacher Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
              AR
            </div>
            <div className="overflow-hidden">
              <h3 className="text-xs font-bold text-white truncate">Cikgu Ahmad Razak</h3>
              <p className="text-[11px] text-slate-400 truncate">Guru Bimbingan & Kaunseling</p>
            </div>
          </div>

          <button
            onClick={onBackToLanding}
            className="w-full py-2 px-3 bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-800/60 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (With left margin for fixed desktop sidebar) */}
      <div className="lg:pl-64 flex-1 flex flex-col min-h-screen">
        {/* Main Content Header */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-5 sticky top-0 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                <span>{titleOverride || 'Portal Guru'}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-indigo-600 font-semibold">
                  {getTabBreadcrumbLabel()}
                </span>
              </div>

              {/* Welcome Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Selamat Datang, <span className="text-indigo-600">Cikgu Ahmad Razak</span>
              </h1>
            </div>

            {/* Current Date Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
              <span>{todayDateMalay}</span>
            </div>
          </div>
        </header>

        {/* View Content Container */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {renderTabContent()}
        </main>
      </div>

      {selectedStudentForProfile && (
        <StudentDetailModal
          student={selectedStudentForProfile}
          onClose={() => setSelectedStudentForProfile(null)}
        />
      )}
    </div>
  );
};
