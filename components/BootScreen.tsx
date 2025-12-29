
import React, { useEffect, useState } from 'react';

export const BootScreen: React.FC = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0b0c0e] z-[1000] flex flex-col items-center justify-center overflow-hidden">
      <div 
        className="flex flex-col items-center transition-opacity duration-1000"
        style={{ opacity }}
      >
        <div className="relative w-40 h-40 mb-10 flex items-center justify-center">
          {/* AI Studio like Sparkle Logo */}
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl animate-pulse rounded-full" />
          <svg viewBox="0 0 24 24" className="w-24 h-24 text-blue-400 fill-current drop-shadow-[0_0_15px_rgba(96,165,250,0.6)]">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
          </svg>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
             <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 tracking-tight">Google AI Studio</span>
             <span className="text-5xl font-light text-white/40 tracking-tight">OS</span>
          </div>
          <p className="text-white/20 text-sm font-medium tracking-[0.2em] mt-2 uppercase">Integrated Intelligence</p>
        </div>

        <div className="mt-20 w-80 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-boot-progress shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </div>
      </div>

      <style>{`
        @keyframes boot-progress {
          0% { width: 0%; left: -100%; }
          50% { width: 40%; left: 0%; }
          100% { width: 100%; left: 100%; }
        }
        .animate-boot-progress {
          position: absolute;
          animation: boot-progress 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
};
