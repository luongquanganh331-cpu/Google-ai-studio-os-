
import React from 'react';
import { Check, Image as ImageIcon } from 'lucide-react';
import { WALLPAPERS } from '../../constants';

interface WallpaperAppProps {
  setWallpaper: (url: string) => void;
  currentWallpaper?: string;
}

export const WallpaperApp: React.FC<WallpaperAppProps> = ({ setWallpaper, currentWallpaper }) => {
  const handleSelect = (url: string) => {
    setWallpaper(url);
  };

  return (
    <div className="h-full bg-[#121212] text-white flex flex-col p-8 overflow-y-auto custom-scrollbar">
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-bold mb-3 tracking-tight">Wallpaper</h1>
        <p className="text-white/40 text-lg">Personalize your desktop background and lock screen.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WALLPAPERS.map((url, i) => (
          <div key={i} className="flex flex-col gap-3 animate-in fade-in zoom-in duration-300" style={{ animationDelay: `${i * 50}ms` }}>
            <button
              onClick={() => handleSelect(url)}
              className={`relative aspect-video rounded-2xl overflow-hidden border-[3px] transition-all group active:scale-[0.98] ${
                currentWallpaper === url 
                  ? 'border-blue-500 shadow-2xl shadow-blue-500/30' 
                  : 'border-transparent hover:border-white/20'
              }`}
            >
              <img 
                src={url} 
                alt={`Wallpaper ${i + 1}`} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=500';
                }}
              />
              
              {currentWallpaper === url && (
                <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                  <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg scale-110">
                    <Check size={20} strokeWidth={4} />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
            <div className="flex items-center justify-between px-2">
              <span className={`text-xs font-bold uppercase tracking-widest ${currentWallpaper === url ? 'text-blue-400' : 'text-white/30'}`}>
                {currentWallpaper === url ? 'Active Theme' : `Wallpaper ${i + 1}`}
              </span>
            </div>
          </div>
        ))}

        {/* Custom Upload Slot */}
        <div className="flex flex-col gap-3">
           <div className="aspect-video rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ImageIcon size={24} className="text-white/20" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest text-white/20">Add Custom Slot</span>
           </div>
           <div className="px-2">
             <span className="text-xs font-bold uppercase tracking-widest text-white/10">Coming Soon</span>
           </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="mt-auto pt-16 pb-8 flex flex-col items-center opacity-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-white/20" />
          <span className="text-sm font-bold tracking-widest uppercase">chromeOS</span>
        </div>
        <p className="text-[10px] font-medium tracking-tight">Gemini Web Engine v1.2</p>
      </div>
    </div>
  );
};
