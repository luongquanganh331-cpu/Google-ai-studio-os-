
import React from 'react';
import { WindowInstance } from '../types';
import { WindowFrame } from './WindowFrame';
import { BrowserApp } from './apps/BrowserApp';
import { GeminiApp } from './apps/GeminiApp';
import { TerminalApp } from './apps/TerminalApp';
import { FilesApp } from './apps/FilesApp';
import { SettingsApp } from './apps/SettingsApp';
import { CalculatorApp } from './apps/CalculatorApp';
import { WallpaperApp } from './apps/WallpaperApp';
import { StoreApp } from './apps/StoreApp';

interface WindowManagerProps {
  windows: WindowInstance[];
  activeWindowId: string | null;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  setWallpaper: (url: string) => void;
  onInstallApp: (id: any) => void;
  currentWallpaper: string;
  isTabletMode: boolean;
}

const APP_COMPONENTS: Record<string, React.FC<any>> = {
  browser: BrowserApp,
  gemini: GeminiApp,
  terminal: TerminalApp,
  files: FilesApp,
  settings: SettingsApp,
  calculator: CalculatorApp,
  wallpaper: WallpaperApp,
  store: StoreApp,
};

export const WindowManager: React.FC<WindowManagerProps> = ({ 
  windows, 
  activeWindowId,
  onClose,
  onMinimize,
  onFocus,
  setWallpaper,
  onInstallApp,
  currentWallpaper,
  isTabletMode,
}) => {
  // In Tablet Mode, only the active window is visible and it is forced fullscreen.
  const visibleWindows = isTabletMode 
    ? windows.filter(w => w.id === activeWindowId && !w.isMinimized)
    : windows.filter(w => !w.isMinimized);

  return (
    <>
      {visibleWindows.map(window => {
        const AppContent = APP_COMPONENTS[window.appId];
        
        return (
          <WindowFrame
            key={window.id}
            window={window}
            isActive={window.id === activeWindowId}
            isTabletMode={isTabletMode}
            onClose={() => onClose(window.id)}
            onMinimize={() => onMinimize(window.id)}
            onFocus={() => onFocus(window.id)}
          >
            {AppContent ? (
              <AppContent 
                setWallpaper={setWallpaper} 
                onInstallApp={onInstallApp} 
                currentWallpaper={currentWallpaper}
                isTabletMode={isTabletMode}
              />
            ) : (
              <div className="p-4 text-white">App not found</div>
            )}
          </WindowFrame>
        );
      })}
    </>
  );
};
