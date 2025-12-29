
import React, { useState } from 'react';
import { 
  Wifi, Bluetooth, User, Laptop, Palette, Search, 
  Shield, Grid, ChevronDown, Info, ExternalLink, HelpCircle,
  Monitor, Smartphone as PhoneIcon, ChevronRight, Globe, Lock, 
  Keyboard, MousePointer2, Battery, Check,
  Volume2, Sun, HardDrive, 
  Smartphone as Phone, Key, Tablet
} from 'lucide-react';
import { WALLPAPERS } from '../../constants';

type SectionID = 'network' | 'bluetooth' | 'connected' | 'accounts' | 'device' | 'personalization' | 'search' | 'security' | 'apps' | 'fydeos' | 'about';

interface SettingsAppProps {
  setWallpaper: (url: string) => void;
  currentWallpaper?: string;
  isTabletMode?: boolean;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({ setWallpaper, currentWallpaper, isTabletMode }) => {
  const [activeSection, setActiveSection] = useState<SectionID>('personalization');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeSection) {
      case 'personalization':
        return (
          <div className="space-y-10 animate-in fade-in duration-300">
            <section>
              <h2 className="text-2xl font-bold mb-6">Personalisation</h2>
              <div className="grid grid-cols-1 gap-8">
                <div className="relative h-64 w-full rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl">
                  <img src={currentWallpaper} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" alt="Current" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-2xl flex items-center justify-center border border-white/10">
                      <Palette size={28} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">System Appearance</div>
                      <div className="text-xs text-white/50 font-medium">Dynamic AI Theming enabled</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-xs font-bold text-white/60 uppercase tracking-widest">Neural Wallpapers</h3>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {WALLPAPERS.slice(0, 4).map((url, i) => (
                      <button 
                        key={i}
                        onClick={() => setWallpaper(url)}
                        className={`relative aspect-video rounded-2xl overflow-hidden border-[3px] transition-all hover:scale-[1.05] active:scale-95 ${
                          currentWallpaper === url ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-transparent'
                        }`}
                      >
                        <img src={url} className="w-full h-full object-cover" alt={`Wall ${i}`} />
                        {currentWallpaper === url && (
                          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                            <Check size={20} className="text-white" strokeWidth={4} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-[#28292d] rounded-3xl overflow-hidden border border-white/5">
                  <SettingsRow label="Dark theme" description="AI Optimized for OLED displays" trailing={<Toggle enabled={true} />} />
                  <SettingsRow label="Screen Saver" description="Quantum Visualization" trailing={<ChevronRight size={18} className="text-white/20" />} />
                </div>
              </div>
            </section>
          </div>
        );
      case 'fydeos':
        return (
          <div className="space-y-10 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold mb-6">System Settings</h2>
            <section>
              <h2 className="text-xs font-black text-white/30 mb-4 uppercase tracking-[0.2em]">Interface Mode</h2>
              <div className="bg-[#28292d] rounded-3xl overflow-hidden border border-white/5">
                <SettingsRow 
                  icon={<Tablet size={20} />} 
                  label="Tablet Mode" 
                  description="Optimize for touch and full-screen experience" 
                  trailing={<span className="text-xs text-blue-400 font-bold uppercase tracking-widest mr-2">{isTabletMode ? 'Enabled' : 'Disabled'}</span>} 
                />
              </div>
            </section>
            <section>
              <h2 className="text-xs font-black text-white/30 mb-4 uppercase tracking-[0.2em]">Remote services</h2>
              <div className="bg-[#28292d] rounded-3xl overflow-hidden border border-white/5">
                <SettingsRow label="Neural Studio Desktop" trailing={<ExternalLink size={16} className="text-white/40" />} />
                <SettingsRow 
                  label="System Telemetry" 
                  trailing={<Toggle enabled={false} />} 
                />
              </div>
            </section>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-8 animate-in fade-in duration-300 flex flex-col items-center pt-10">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 rounded-[40px] flex items-center justify-center shadow-[0_20px_60px_rgba(59,130,246,0.3)] mb-8 ring-8 ring-white/5 relative">
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-white fill-current">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-black text-white tracking-tight mb-2">Google AI Studio OS</h2>
              <p className="text-sm text-blue-400/60 font-medium tracking-widest uppercase">Version 2.0.0 (Neural Stable)</p>
            </div>
            
            <div className="w-full max-w-xl mt-12">
              <div className="bg-[#28292d] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
                <SettingsRow label="Check for updates" trailing={<button className="px-6 py-2 bg-blue-500 hover:bg-blue-400 rounded-full text-xs font-black text-white transition-colors shadow-lg shadow-blue-500/20 uppercase tracking-widest">Update</button>} />
                <SettingsRow label="Build Channel" description="Developer (Internal)" trailing={<ChevronRight size={16} className="text-white/20" />} />
                <SettingsRow label="Neural Engine Status" description="All systems operational" trailing={<Check size={16} className="text-green-500" />} />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[400px] opacity-20 select-none grayscale">
            <Monitor size={80} strokeWidth={1} className="mb-6" />
            <p className="text-xl font-bold tracking-widest uppercase">Under Evaluation</p>
          </div>
        );
    }
  };

  const sidebarItems = [
    { id: 'network', label: 'Network', icon: <Wifi size={18} /> },
    { id: 'bluetooth', label: 'Bluetooth', icon: <Bluetooth size={18} /> },
    { id: 'accounts', label: 'Accounts', icon: <User size={18} /> },
    { id: 'device', label: 'Device', icon: <Laptop size={18} /> },
    { id: 'personalization', label: 'Personalisation', icon: <Palette size={18} /> },
    { id: 'security', label: 'Security and privacy', icon: <Shield size={18} /> },
    { id: 'apps', label: 'Apps', icon: <Grid size={18} /> },
  ];

  return (
    <div className="flex h-full bg-[#111214] text-[#e3e3e3] overflow-hidden select-none font-sans">
      {/* Sidebar */}
      <div className="w-64 flex flex-col pt-10 pb-4 border-r border-white/5 bg-[#0b0c0e] shrink-0 shadow-2xl z-10">
        <h1 className="px-8 text-xl font-bold mb-10 text-white tracking-tight flex items-center gap-2">
           <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-400 fill-current">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
           </svg>
           Studio Settings
        </h1>
        
        <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
          {sidebarItems.map(item => (
            <SidebarItem 
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeSection === item.id}
              onClick={() => setActiveSection(item.id as SectionID)}
            />
          ))}
          
          <div className="pt-8 pb-3 px-8 flex items-center justify-between text-[10px] font-black text-white/10 uppercase tracking-[0.2em]">
            <span>Advanced System</span>
          </div>

          <SidebarItem 
            icon={<Monitor size={18} />}
            label="System settings"
            active={activeSection === 'fydeos'}
            onClick={() => setActiveSection('fydeos')}
          />
          <SidebarItem 
            icon={<Info size={18} />}
            label="About AI Studio"
            active={activeSection === 'about'}
            onClick={() => setActiveSection('about')}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Header */}
        <div className="h-20 flex items-center justify-center shrink-0 border-b border-white/5 bg-[#111214]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="relative w-full max-w-[650px] px-8">
            <Search size={18} className="absolute left-14 top-1/2 -translate-y-1/2 text-blue-400/20" />
            <input 
              type="text" 
              placeholder="Search AI Studio configuration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white/5 border border-white/5 rounded-[20px] pl-16 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-white/10"
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-16 py-12 custom-scrollbar scroll-smooth">
          <div className="max-w-[850px] mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-[13px] font-bold transition-all relative group ${
      active 
        ? 'bg-blue-500 text-white shadow-xl shadow-blue-500/10' 
        : 'hover:bg-white/5 text-white/40 active:scale-[0.98]'
    }`}
  >
    <span className={`shrink-0 transition-colors ${active ? 'text-white' : 'text-white/20 group-hover:text-white'}`}>{icon}</span>
    <span className="truncate tracking-tight">{label}</span>
  </button>
);

const SettingsRow = ({ 
  icon, 
  label, 
  description, 
  trailing 
}: { 
  icon?: React.ReactNode, 
  label: string, 
  description?: string, 
  trailing?: React.ReactNode 
}) => (
  <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 last:border-none hover:bg-white/[0.01] transition-colors cursor-pointer group">
    <div className="flex items-center gap-5 overflow-hidden">
      {icon && <span className="shrink-0 text-white/30 group-hover:text-blue-400 transition-colors">{icon}</span>}
      <div className="flex flex-col overflow-hidden">
        <span className="text-sm font-black text-white/80 group-hover:text-white transition-colors truncate tracking-tight">{label}</span>
        {description && <span className="text-[11px] text-white/20 mt-1 truncate font-medium group-hover:text-white/40 transition-colors">{description}</span>}
      </div>
    </div>
    <div className="flex items-center ml-6 shrink-0">
      {trailing}
    </div>
  </div>
);

const Toggle = ({ enabled }: { enabled: boolean }) => {
  const [isOn, setIsOn] = useState(enabled);
  return (
    <div 
      onClick={(e) => { e.stopPropagation(); setIsOn(!isOn); }}
      className={`w-12 h-6.5 rounded-full relative cursor-pointer transition-all duration-500 ease-in-out ${isOn ? 'bg-blue-500' : 'bg-white/10'}`}
    >
      <div className={`absolute top-1 w-4.5 h-4.5 rounded-full transition-all duration-500 ease-in-out shadow-xl ${isOn ? 'left-[26px] bg-white' : 'left-1 bg-white/40'}`} />
    </div>
  );
};
