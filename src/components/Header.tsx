import React, { useState } from 'react';
import { PortalType, SystemSettings } from '../types';
import { School, Users, GraduationCap, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  currentPortal: PortalType;
  onSelectPortal: (portal: PortalType) => void;
  settings: SystemSettings;
  onOpenAdminLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPortal,
  onSelectPortal,
  settings,
  onOpenAdminLogin,
}) => {
  const [logoClicks, setLogoClicks] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  const handleLogoClick = () => {
    const nextClicks = logoClicks + 1;
    setLogoClicks(nextClicks);

    if (clickTimer) clearTimeout(clickTimer);

    if (nextClicks >= 5) {
      setLogoClicks(0);
      onOpenAdminLogin();
    } else {
      const timer = setTimeout(() => {
        setLogoClicks(0);
      }, 3000);
      setClickTimer(timer);
    }
  };

  const getPortalBadge = () => {
    switch (currentPortal) {
      case 'waris':
        return { label: 'Portal Waris', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'guru':
        return { label: 'Portal Guru', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'pentadbir':
        return { label: 'Portal Pentadbir / GBK', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      default:
        return null;
    }
  };

  const badge = getPortalBadge();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Interactive School Logo & Title */}
        <div className="flex items-center gap-3.5 cursor-pointer group" onClick={handleLogoClick}>
          {/* School Logo Emblem */}
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-slate-800 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center border border-indigo-400/30">
                <School className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                {settings.schoolName}
              </h1>
              {badge && (
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.bg} hidden sm:inline-block`}>
                  {badge.label}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <span>Sistem Analisa Psikometrik Pintar (SAPP)</span>
            </p>
          </div>
        </div>

        {/* Right Actions & Portal Navigation */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium border border-slate-700">
            {settings.academicYear}
          </span>

          {currentPortal !== 'landing' && (
            <button
              onClick={() => onSelectPortal('landing')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Halaman Utama</span>
            </button>
          )}

          {currentPortal === 'landing' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectPortal('waris')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Waris</span>
              </button>
              <button
                onClick={() => onSelectPortal('guru')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Guru</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
