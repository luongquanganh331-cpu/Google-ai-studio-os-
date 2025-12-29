
import React, { useState } from 'react';
import { ArrowRight, Lock, Power, LogOut, Camera } from 'lucide-react';

interface LockScreenProps {
  wallpaper: string;
  profilePic: string;
  currentTime: Date;
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ wallpaper, profilePic, currentTime, onUnlock }) => {
  const [password, setPassword] = useState('');

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 blur-3xl scale-110"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      <div className="absolute inset-0 bg-[#0b0c0e]/70" />

      {/* Clock Section */}
      <div className="absolute top-[12%] text-center animate-in fade-in slide-in-from-top-10 duration-1000">
        <h1 className="text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20">{formatTime(currentTime)}</h1>
        <p className="text-lg font-bold text-blue-400 uppercase tracking-[0.3em] mt-2 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]">{formatDate(currentTime)}</p>
      </div>

      {/* Profile Picture Section */}
      <div className="relative flex flex-col items-center gap-6 animate-in zoom-in duration-500 mt-20">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white/10 p-1 bg-white/5 overflow-hidden shadow-2xl relative flex items-center justify-center">
            <img 
              src={profilePic} 
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {/* Camera Icon Overlay like the screenshot */}
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-[#1a1b1e]">
             <Camera size={20} className="text-[#0b0c0e]" />
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-tight mb-2 text-white">anhdaynekkkk</h2>
          <p className="text-sm text-white/40 font-medium tracking-tight">No password required</p>
        </div>

        <div className="relative group mt-2">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400/40 group-focus-within:text-blue-400 transition-colors">
            <Lock size={16} />
          </div>
          <input
            autoFocus
            type="password"
            placeholder="Studio Access Code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onUnlock()}
            className="w-80 h-14 bg-white/5 backdrop-blur-3xl border border-white/5 rounded-[24px] pl-14 pr-14 text-center text-white placeholder-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-bold tracking-widest"
          />
          <button 
            onClick={onUnlock}
            className="absolute right-2 top-2 bottom-2 w-10 bg-blue-500 hover:bg-blue-400 rounded-[18px] flex items-center justify-center transition-all group/btn shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <ArrowRight size={20} className="text-white group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2 opacity-30 select-none">
         <span className="text-[10px] font-black tracking-widest uppercase">Google AI Studio</span>
         <div className="w-1 h-1 bg-white rounded-full" />
         <span className="text-[10px] font-medium tracking-tight">OS v2.0-AI</span>
      </div>
    </div>
  );
};
