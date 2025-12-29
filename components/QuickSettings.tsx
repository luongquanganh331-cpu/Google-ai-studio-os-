
import React, { useState } from 'react';
import { 
  Wifi, Bluetooth, Moon, Bell, Volume2, Sun, Power, 
  Settings as SettingsIcon, Accessibility, Monitor, 
  Share2, Tablet, Cast, Camera, BatteryFull, LogOut
} from 'lucide-react';

interface QuickSettingsProps {
  onClose: () => void;
  setWallpaper: (url: string) => void;
  onLock: () => void;
  profilePic: string;
  isTabletMode: boolean;
  toggleTabletMode: () => void;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({ onClose, onLock, profilePic, isTabletMode, toggleTabletMode }) => {
  const [wifiActive, setWifiActive] = useState(true);
  const [btActive, setBtActive] = useState(true);
  const [dndActive, setDndActive] = useState(false);
  const [volume, setVolume] = useState(65);
  const [brightness, setBrightness] = useState(80);

  return (
    <div className="absolute bottom-16 right-4 w-[400px] bg-[#1a1c1ed9] backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* User Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={profilePic} alt="User" className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20 shadow-xl" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">anhdaynekkkk</span>
            <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">No password required</span>
          </div>
        </div>
        <div className="flex gap-2">
           <button onClick={onLock} title="Sign Out" className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-400/60 hover:text-red-400">
             <LogOut size={18} />
           </button>
           <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60">
             <SettingsIcon size={18} />
           </button>
        </div>
      </div>

      {/* Toggles Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <LargeToggle 
          icon={<Wifi size={20} />} 
          label="Network" 
          sublabel={wifiActive ? "Studio_5G" : "Off"} 
          active={wifiActive} 
          onClick={() => setWifiActive(!wifiActive)}
        />
        <LargeToggle 
          icon={<Bluetooth size={20} />} 
          label="Bluetooth" 
          sublabel={btActive ? "Connected" : "Off"} 
          active={btActive} 
          onClick={() => setBtActive(!btActive)}
        />
        
        <div className="col-span-2 grid grid-cols-3 gap-3">
           <SmallToggle 
              icon={<Moon size={18} />} 
              label="DND" 
              active={dndActive}
              onClick={() => setDndActive(!dndActive)}
           />
           <SmallToggle 
              icon={<Camera size={18} />} 
              label="Capture" 
              onClick={() => {}}
           />
           <SmallToggle 
              icon={<Tablet size={18} />} 
              label="Tablet" 
              active={isTabletMode}
              onClick={toggleTabletMode}
           />
        </div>

        <LargeToggle 
          icon={<Accessibility size={20} />} 
          label="Accessibility" 
          sublabel="AI Enhanced"
        />
        <LargeToggle 
          icon={<Share2 size={20} />} 
          label="Cloud Share" 
          sublabel="Syncing"
        />
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Volume2 size={18} />
          </div>
          <div className="flex-1 h-10 bg-white/5 rounded-full relative flex items-center px-1 overflow-hidden">
             <input 
                type="range" 
                min="0" max="100" 
                value={volume} 
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer"
             />
             <div className="h-8 bg-blue-500 rounded-full pointer-events-none transition-all flex items-center" style={{ width: `calc(${volume}%)` }} />
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Sun size={18} />
          </div>
          <div className="flex-1 h-10 bg-white/5 rounded-full relative flex items-center px-1 overflow-hidden">
             <input 
                type="range" 
                min="0" max="100" 
                value={brightness} 
                onChange={(e) => setBrightness(parseInt(e.target.value))}
                className="w-full h-full opacity-0 absolute inset-0 z-10 cursor-pointer"
             />
             <div className="h-8 bg-blue-500 rounded-full pointer-events-none transition-all flex items-center" style={{ width: `calc(${brightness}%)` }} />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <BatteryFull size={14} className="text-cyan-400" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Quantum Battery 99%</span>
        </div>
        <span className="text-[10px] font-bold text-blue-400/40 uppercase tracking-widest animate-pulse">Neural Core Online</span>
      </div>
    </div>
  );
};

const LargeToggle = ({ icon, label, sublabel, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full h-16 rounded-2xl p-4 flex items-center gap-4 transition-all ${
      active ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 hover:bg-white/10 text-white/80'
    }`}
  >
    <div className={`shrink-0 ${active ? 'text-white' : 'text-white/40'}`}>
      {icon}
    </div>
    <div className="text-left overflow-hidden">
      <div className="text-xs font-bold truncate leading-tight uppercase tracking-wide">{label}</div>
      {sublabel && <div className={`text-[10px] truncate leading-tight font-medium ${active ? 'text-white/60' : 'text-white/30'}`}>{sublabel}</div>}
    </div>
  </button>
);

const SmallToggle = ({ icon, label, active = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all border border-white/5 ${
      active ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 hover:bg-white/10 text-white/80'
    }`}
  >
    <div className={active ? 'text-white' : 'text-white/40'}>{icon}</div>
    <span className={`text-[9px] text-center leading-tight font-bold uppercase tracking-tighter ${active ? 'text-white' : 'text-white/40'}`}>{label}</span>
  </button>
);
