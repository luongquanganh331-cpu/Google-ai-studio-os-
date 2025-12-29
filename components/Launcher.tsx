
import React, { useState } from 'react';
import { 
  Search, Globe, Terminal, MessageSquare, Settings, 
  Folder, Calculator, ShoppingBag, Camera, StickyNote, 
  Image as ImageIcon, FileText, ChevronUp, ChevronDown,
  Clock, Mic
} from 'lucide-react';
import { APPS, RECENT_FILES } from '../constants';
import { AppID } from '../types';

interface LauncherProps {
  onOpenApp: (appId: AppID) => void;
  onClose: () => void;
  isTabletMode?: boolean;
  activeWindowsCount?: number;
}

const IconMap: Record<string, any> = {
  Globe, Terminal, MessageSquare, Settings, Folder, Calculator, ShoppingBag, Camera, StickyNote, ImageIcon
};

export const Launcher: React.FC<LauncherProps> = ({ onOpenApp, onClose, isTabletMode = false, activeWindowsCount = 0 }) => {
  const [search, setSearch] = useState('');

  const filteredApps = APPS.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  const isHomeScreen = isTabletMode && activeWindowsCount === 0;

  const handleBackdropClick = () => {
    if (isHomeScreen) return;
    onClose();
  };

  // --- Normal Mode Launcher (Screenshot 3 Style) ---
  const renderNormalLauncher = () => (
    <div className="relative w-full max-w-[640px] max-h-[90vh] bg-[#1a1b1ee6] backdrop-blur-3xl border border-white/10 rounded-[28px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-300">
      {/* Search Bar */}
      <div className="p-4 pt-6">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-black text-[10px]">G</span>
          </div>
          <input
            autoFocus
            type="text"
            placeholder="Search your tabs, files, apps, and more..."
            className="w-full h-12 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 text-white text-sm focus:outline-none focus:bg-white/10 transition-all placeholder:text-white/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Recents Section */}
      {!search && (
        <div className="px-6 py-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.15em]">Continue where you left off</span>
            <ChevronUp size={14} className="text-white/40" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
            {RECENT_FILES.map((file, i) => (
              <div key={i} className="flex-shrink-0 w-40 p-3 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group relative">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                  {file.type === 'image' ? <ImageIcon size={20} className="text-purple-400" /> : <FileText size={20} className="text-blue-400" />}
                </div>
                <div className="text-[11px] font-bold text-white truncate mb-0.5">{file.name}</div>
                <div className="text-[9px] text-white/30 font-medium">Edited {file.time}</div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white text-black text-[8px] font-bold px-1.5 py-0.5 rounded">Preview</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Apps Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar bg-black/10">
        <div className="grid grid-cols-5 gap-y-8 gap-x-4 pb-10">
          {filteredApps.map((app, i) => {
            const Icon = IconMap[app.icon];
            return (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center gap-2.5 group outline-none animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${i * 20}ms` }}
              >
                <div className={`w-12 h-12 rounded-full ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all duration-300 relative`}>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-colors" />
                  {Icon && <Icon size={22} className="text-white" />}
                </div>
                <span className="text-[10px] font-bold text-white/50 group-hover:text-white transition-colors truncate w-full text-center px-1">
                  {app.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // --- Tablet Mode Launcher (Screenshot 2 Style) ---
  const renderTabletLauncher = () => (
    <div className={`relative w-full max-w-[900px] h-[80vh] flex flex-col animate-in fade-in zoom-in-95 duration-300 ${
      isHomeScreen 
        ? 'bg-transparent border-none shadow-none' 
        : 'bg-[#202124d9] backdrop-blur-[40px] border border-white/10 rounded-[40px] shadow-[0_30px_100px_rgba(0,0,0,0.8)]'
    }`}>
      {/* Search Header */}
      <div className="pt-10 pb-6 flex flex-col items-center gap-6 shrink-0">
        <div className="relative w-full max-w-[500px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors" size={18} />
          <input
            autoFocus={!isHomeScreen}
            type="text"
            placeholder="Search your device, apps, web..."
            className={`w-full h-14 border border-white/5 rounded-full pl-14 pr-14 text-white text-base focus:outline-none focus:bg-white/20 transition-all placeholder:text-white/20 shadow-inner ${
              isHomeScreen ? 'bg-white/5 backdrop-blur-xl' : 'bg-white/10'
            }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Mic size={18} className="text-white/40 mr-1" />
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path fill="#4285F4" d="M12 15c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v7c0 1.66 1.34 3 3 3z"/>
              <path fill="#34A853" d="M11 19.93V22h2v-2.07c3.39-.49 6-3.38 6-6.93h-2c0 2.21-1.79 4-4 4s-4-1.79-4-4H5c0 3.55 2.61 6.44 6 6.93z"/>
            </svg>
          </div>
        </div>

        {/* Shortcuts row (only in tablet home) */}
        {!search && (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500 delay-150">
            {APPS.slice(0, 5).map(app => (
              <button key={app.id} onClick={() => onOpenApp(app.id)} className="h-8 px-4 rounded-full bg-white/5 border border-white/5 hover:bg-white/15 transition-all flex items-center gap-2 group backdrop-blur-md">
                <div className={`w-3 h-3 rounded-full ${app.color}`} />
                <span className="text-[11px] font-medium text-white/60 group-hover:text-white">{app.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Apps Grid Area */}
      <div className="flex-1 overflow-hidden relative flex">
        <div className="flex-1 overflow-y-auto px-12 py-4 custom-scrollbar">
          <div className="grid grid-cols-5 gap-y-12 gap-x-8 max-w-[800px] mx-auto pb-20">
            {filteredApps.map((app, i) => {
              const Icon = IconMap[app.icon];
              return (
                <button
                  key={app.id}
                  onClick={() => onOpenApp(app.id)}
                  className="flex flex-col items-center gap-3 group outline-none animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className={`w-16 h-16 rounded-full ${app.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-active:scale-95 transition-all duration-300 relative`}>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-colors" />
                    {Icon && <Icon size={28} className="text-white" />}
                  </div>
                  <span className={`text-[12px] font-medium transition-colors truncate w-full text-center px-2 ${
                    isHomeScreen ? 'text-white' : 'text-white/50 group-hover:text-white'
                  }`}>
                    {app.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots (Only in Tablet) */}
        <div className="w-12 flex flex-col items-center justify-center gap-3 shrink-0 pr-4">
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_white]" />
          <div className="w-1.5 h-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors cursor-pointer" />
          <div className="w-1.5 h-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors cursor-pointer" />
        </div>
      </div>

      <div className="h-6 flex items-center justify-center shrink-0">
        <div className="w-12 h-1 bg-white/10 rounded-full mb-3" />
      </div>
    </div>
  );

  return (
    <div className={`absolute inset-0 z-[110] flex flex-col items-center p-4 transition-all duration-500 ${isHomeScreen ? 'justify-center' : 'justify-end pb-20'} ${isTabletMode ? '' : 'justify-end pb-16'}`}>
      {/* Backdrop */}
      {!isHomeScreen && (
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default" 
          onClick={handleBackdropClick}
        />
      )}

      {isTabletMode ? renderTabletLauncher() : renderNormalLauncher()}
    </div>
  );
};
