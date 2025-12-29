
import React, { useState } from 'react';
import { ShoppingBag, Download, Star, Check, Search, Filter } from 'lucide-react';
import { APPS } from '../../constants';

interface StoreAppProps {
  onInstallApp: (id: string) => void;
}

export const StoreApp: React.FC<StoreAppProps> = ({ onInstallApp }) => {
  const [installed, setInstalled] = useState<string[]>(['browser', 'settings', 'files', 'wallpaper', 'store']);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInstall = (id: string) => {
    if (installed.includes(id)) return;
    setInstalled([...installed, id]);
    onInstallApp(id);
  };

  const categories = ['All', 'Productivity', 'Social', 'Tools', 'System'];

  return (
    <div className="h-full bg-[#0f0f0f] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-16 bg-[#1a1a1a] border-b border-white/5 flex items-center px-6 justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
            <ShoppingBag size={18} />
          </div>
          <span className="font-bold">Gemini Store</span>
        </div>
        
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
          <input 
            type="text" 
            placeholder="Search for apps, games, tools..."
            className="w-full h-9 bg-white/5 border border-white/5 rounded-full pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/5 rounded-full"><Filter size={18} className="text-white/40" /></button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar Categories */}
        <div className="w-56 bg-[#121212] border-r border-white/5 p-4 space-y-2">
          {categories.map(cat => (
            <button key={cat} className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${cat === 'All' ? 'bg-white/10 text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Apps Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPS.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase())).map(app => (
              <div key={app.id} className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all group">
                <div className="flex gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${app.color} flex items-center justify-center shadow-lg`}>
                    <span className="font-black text-xl">{app.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{app.name}</h4>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] text-white/40">4.8 • Native App</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-white/30 mb-5 line-clamp-2">
                  Build native efficiency with {app.name}. Optimized for Gemini Web OS.
                </p>

                <button 
                  onClick={() => handleInstall(app.id)}
                  className={`w-full h-9 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                    installed.includes(app.id) 
                      ? 'bg-green-500/10 text-green-500 cursor-default' 
                      : 'bg-pink-600 hover:bg-pink-500 text-white active:scale-95'
                  }`}
                >
                  {installed.includes(app.id) ? (
                    <>
                      <Check size={14} />
                      Installed
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      Install
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
