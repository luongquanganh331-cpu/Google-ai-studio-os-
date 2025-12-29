
import { 
  Globe, 
  Terminal, 
  MessageSquare, 
  Settings, 
  Folder, 
  Calculator,
  ShoppingBag,
  Camera,
  StickyNote,
  Image as ImageIcon,
  Palette
} from 'lucide-react';
import { AppMetadata } from './types';

export const APPS: AppMetadata[] = [
  { id: 'browser', name: 'Browser', icon: 'Globe', color: 'bg-blue-500' },
  { id: 'gemini', name: 'Gemini AI', icon: 'MessageSquare', color: 'bg-purple-600' },
  { id: 'files', name: 'Files', icon: 'Folder', color: 'bg-yellow-500' },
  { id: 'wallpaper', name: 'Wallpaper', icon: 'Palette', color: 'bg-emerald-500' },
  { id: 'settings', name: 'Settings', icon: 'Settings', color: 'bg-gray-500' },
  { id: 'store', name: 'Store', icon: 'ShoppingBag', color: 'bg-pink-500' },
  { id: 'terminal', name: 'Terminal', icon: 'Terminal', color: 'bg-gray-800' },
  { id: 'calculator', name: 'Calculator', icon: 'Calculator', color: 'bg-green-500' },
  { id: 'camera', name: 'Camera', icon: 'Camera', color: 'bg-zinc-700' },
  { id: 'notes', name: 'Notes', icon: 'StickyNote', color: 'bg-amber-400' },
  { id: 'gallery', name: 'Gallery', icon: 'ImageIcon', color: 'bg-indigo-500' },
];

export const RECENT_FILES = [
  { name: 'Gemini-Setup.dmg', type: 'file', time: '10:51 AM' },
  { name: 'OS_Services.conf', type: 'file', time: '11:35 AM' },
  { name: 'wallpaper_preview.png', type: 'image', time: '11:32 AM' },
];

export const WALLPAPERS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1506744038736-8339886a309a?auto=format&fit=crop&q=80&w=1920',
];

export const DEFAULT_WINDOW_SIZE = {
  width: 800,
  height: 500
};
