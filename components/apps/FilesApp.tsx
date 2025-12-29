
import React from 'react';
import { Folder, File, ChevronRight, Clock, Star, Trash2, HardDrive, LayoutGrid, List } from 'lucide-react';

const DUMMY_FILES = [
  { name: 'Documents', type: 'folder', date: 'Oct 12, 2024', size: '-' },
  { name: 'Downloads', type: 'folder', date: 'Oct 14, 2024', size: '-' },
  { name: 'Pictures', type: 'folder', date: 'Oct 10, 2024', size: '-' },
  { name: 'budget_2024.xlsx', type: 'file', date: 'Oct 15, 2024', size: '24 KB' },
  { name: 'readme.txt', type: 'file', date: 'Oct 16, 2024', size: '1 KB' },
  { name: 'presentation.pptx', type: 'file', date: 'Oct 13, 2024', size: '4.2 MB' },
];

export const FilesApp: React.FC = () => {
  return (
    <div className="flex h-full bg-[#1a1a1a] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-56 bg-[#121212] flex flex-col p-2">
        <div className="space-y-1 mt-4">
          <NavItem icon={<Clock size={16} />} label="Recent" />
          <NavItem icon={<Star size={16} />} label="Favorites" />
          <NavItem icon={<HardDrive size={16} />} label="My Files" active />
          <div className="px-3 py-2 mt-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">LOCATIONS</div>
          <NavItem icon={<Folder size={16} className="text-blue-400" />} label="Google Drive" />
          <NavItem icon={<Trash2 size={16} />} label="Trash" />
        </div>

        <div className="mt-auto p-4 bg-white/5 rounded-xl">
          <div className="text-[10px] font-semibold text-white/40 mb-2">STORAGE</div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-1">
            <div className="h-full bg-blue-500 w-[65%]" />
          </div>
          <div className="text-[10px] text-white/60">42.5 GB of 64 GB used</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-white/5 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/40">My Files</span>
            <ChevronRight size={14} className="text-white/20" />
            <span className="font-medium">Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-lg text-white/60"><LayoutGrid size={18} /></button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-white/60"><List size={18} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/5">
                <th className="font-medium p-4">Name</th>
                <th className="font-medium p-4">Date Modified</th>
                <th className="font-medium p-4">Size</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_FILES.map((file, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="p-4 flex items-center gap-3">
                    {file.type === 'folder' ? (
                      <Folder size={20} className="text-blue-400" />
                    ) : (
                      <File size={20} className="text-gray-400" />
                    )}
                    <span className="group-hover:text-blue-400 transition-colors">{file.name}</span>
                  </td>
                  <td className="p-4 text-white/40">{file.date}</td>
                  <td className="p-4 text-white/40">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-blue-500/10 text-blue-400 font-medium' : 'hover:bg-white/5 text-white/60'}`}>
    {icon}
    {label}
  </button>
);
