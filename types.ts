
export type AppID = 'browser' | 'terminal' | 'gemini' | 'settings' | 'files' | 'calculator' | 'store' | 'camera' | 'notes' | 'gallery' | 'wallpaper';

export interface AppMetadata {
  id: AppID;
  name: string;
  icon: string;
  color: string;
}

export interface WindowInstance {
  id: string;
  appId: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OSState {
  windows: WindowInstance[];
  activeWindowId: string | null;
  wallpaper: string;
  isLauncherOpen: boolean;
  isQuickSettingsOpen: boolean;
  isLocked: boolean;
  isTabletMode: boolean;
  currentTime: Date;
}
