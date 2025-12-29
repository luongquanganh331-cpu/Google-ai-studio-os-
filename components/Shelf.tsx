
import React from 'react';
import { 
  Globe, Terminal, MessageSquare, Settings, 
  Folder, Calculator, ShoppingBag, Camera, 
  StickyNote, Image as ImageIcon, Palette,
  Wifi, Battery, Volume2
} from 'lucide-react';
import { WindowInstance, AppID } from '../types';
import { APPS } from '../constants';

interface ShelfProps {
  windows: WindowInstance[];
  activeWindowId: string | null;
  currentTime: Date;
  onToggleLauncher: () => void;
  onToggleQuickSettings: () => void;
  onAppClick: (appId: string) => void;
  pinnedAppIds: AppID[];
  isTabletMode?: boolean;
}

const IconMap: Record<string, any> = {
  Globe, Terminal, MessageSquare, Settings, Folder, Calculator, ShoppingBag, Camera, StickyNote, ImageIcon, Palette
};

export const Shelf: React.FC<ShelfProps> = ({ 
  windows, 
  activeWindowId, 
  currentTime,
  onToggleLauncher, 
  onToggleQuickSettings,
  onAppClick,
  pinnedAppIds,
  isTabletMode = false,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const pinnedApps = APPS.filter(app => pinnedAppIds.includes(app.id));

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#000000f2] backdrop-blur-2xl border-t border-white/5 flex items-center justify-between px-3 z-[120] shadow-2xl">
      {/* Left: Launcher Button (Circular 'O' style) */}
      <div className="flex items-center w-32">
        <button 
          onClick={onToggleLauncher}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all group relative active:scale-90"
          title={isTabletMode ? "Home" : "Launcher"}
        >
          <div className="w-6 h-6 rounded-full border-2 border-white/60 flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="w-2.5 h-2.5 bg-white rounded-full" />
          </div>
        </button>
      </div>

      {/* Center: App Icons (Matching the screenshot's spacing and style) */}
      <div className="flex-1 flex justify-center items-center h-full gap-2">
        {pinnedApps.map(app => {
          const isOpen = windows.some(w => w.appId === app.id);
          const isActive = windows.some(w => w.id === activeWindowId && w.appId === app.id);
          const Icon = IconMap[app.icon];

          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className={`w-10 h-10 flex flex-col items-center justify-center rounded-lg transition-all relative group ${isActive ? 'bg-white/10 shadow-inner' : 'hover:bg-white/5'}`}
            >
              <div className={`w-8 h-8 rounded-lg ${app.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform active:scale-95 overflow-hidden`}>
                {Icon && <Icon size={18} className="text-white" />}
              </div>
              {isOpen && (
                <div className={`absolute bottom-0.5 w-1.5 h-0.5 rounded-full bg-white transition-all ${isActive ? 'opacity-100 scale-x-150' : 'opacity-40 scale-x-100'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Right: Status Pill (Pill shape with battery and time) */}
      <div className="flex items-center justify-end w-32">
        <button 
          onClick={onToggleQuickSettings}
          className="flex items-center gap-2 h-8 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all active:scale-95 group"
        >
          <Battery size={14} className="text-white/60 group-hover:text-white transition-colors" />
          <span className="text-[11px] font-bold text-white tracking-tight">
            {formatTime(currentTime)}
          </span>
        </button>
      </div>
    </div>
  );
};
