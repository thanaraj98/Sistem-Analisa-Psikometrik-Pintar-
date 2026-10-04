import React, { useState } from 'react';
import { StudentPsychometricRecord, SystemSettings, SystemAuditLog } from '../types';
import { PortalGuru } from './PortalGuru';
import { PenyelenggaraanSistem } from './PenyelenggaraanSistem';
import { Shield, Settings, ChevronRight } from 'lucide-react';

interface PortalPentadbirProps {
  students: StudentPsychometricRecord[];
  onBackToLanding: () => void;
  settings: SystemSettings;
  auditLogs: SystemAuditLog[];
  onUpdateSettings: (newSettings: SystemSettings) => void;
}

export const PortalPentadbir: React.FC<PortalPentadbirProps> = ({
  students,
  onBackToLanding,
  settings,
  auditLogs,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<string>('keseluruhan');

  // Additional sidebar button for Penyelenggaraan Sistem
  const extraSidebarItems = (
    <div className="pt-2 mt-2 border-t border-slate-800">
      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block px-3 mb-2">
        Pentadbir Khusus
      </span>
      <button
        onClick={() => setActiveTab('penyelenggaraan')}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
          activeTab === 'penyelenggaraan'
            ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
            : 'text-amber-300 hover:bg-slate-800 hover:text-amber-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Settings className="w-4 h-4 text-amber-400" />
          <span>Penyelenggaraan Sistem</span>
        </div>
        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <PortalGuru
        students={students}
        onBackToLanding={onBackToLanding}
        titleOverride="Portal Pentadbir / GBK"
        extraSidebarItems={extraSidebarItems}
        activeTabOverride={activeTab}
        onTabChange={(newTab) => setActiveTab(newTab)}
        settings={settings}
        auditLogs={auditLogs}
        onUpdateSettings={onUpdateSettings}
      />
    </div>
  );
};
