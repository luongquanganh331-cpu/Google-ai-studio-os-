
import React, { useState, useCallback, useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { Shelf } from './components/Shelf';
import { Launcher } from './components/Launcher';
import { QuickSettings } from './components/QuickSettings';
import { WindowManager } from './components/WindowManager';
import { LockScreen } from './components/LockScreen';
import { BootScreen } from './components/BootScreen';
import { WindowInstance, AppID, OSState } from './types';
import { APPS, DEFAULT_WINDOW_SIZE, WALLPAPERS } from './constants';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [profilePic, setProfilePic] = useState('https://images.unsplash.com/photo-1585366119957-e556f4335403?auto=format&fit=crop&q=80&w=200');
  const [pinnedAppIds, setPinnedAppIds] = useState<AppID[]>(['browser', 'gemini', 'files', 'wallpaper', 'settings', 'store']);
  
  const [state, setState] = useState<OSState>(() => {
    const savedWallpaper = localStorage.getItem('os_wallpaper');
    const savedTabletMode = localStorage.getItem('os_tablet_mode') === 'true';
    return {
      windows: [],
      activeWindowId: null,
      wallpaper: savedWallpaper || WALLPAPERS[0],
      isLauncherOpen: false, 
      isQuickSettingsOpen: false,
      isLocked: true,
      isTabletMode: savedTabletMode,
      currentTime: new Date(),
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => ({ ...prev, currentTime: new Date() }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('os_wallpaper', state.wallpaper);
  }, [state.wallpaper]);

  useEffect(() => {
    localStorage.setItem('os_tablet_mode', String(state.isTabletMode));
  }, [state.isTabletMode]);

  // Sync launcher state for Tablet Mode
  useEffect(() => {
    if (state.isTabletMode && !state.isLocked) {
      const activeWindows = state.windows.filter(w => !w.isMinimized);
      if (activeWindows.length === 0 && !state.isLauncherOpen) {
        setState(prev => ({ ...prev, isLauncherOpen: true }));
      }
    }
  }, [state.isTabletMode, state.windows, state.isLocked]);

  const openApp = useCallback((appId: AppID) => {
    const existingWindow = state.windows.find(w => w.appId === appId);
    
    if (existingWindow) {
      const maxZ = state.windows.length > 0 ? Math.max(...state.windows.map(w => w.zIndex)) : 0;
      setState(prev => ({
        ...prev,
        activeWindowId: existingWindow.id,
        isLauncherOpen: false,
        windows: prev.windows.map(w => 
          w.id === existingWindow.id ? { ...w, isMinimized: false, zIndex: maxZ + 1 } : w
        )
      }));
      return;
    }

    const appInfo = APPS.find(a => a.id === appId);
    const newId = `${appId}-${Date.now()}`;
    const maxZ = state.windows.length > 0 ? Math.max(...state.windows.map(w => w.zIndex)) : 0;

    const newWindow: WindowInstance = {
      id: newId,
      appId,
      title: appInfo?.name || appId,
      isOpen: true,
      isMinimized: false,
      isMaximized: state.isTabletMode,
      zIndex: maxZ + 1,
      x: 60 + (state.windows.length * 30),
      y: 60 + (state.windows.length * 30),
      width: DEFAULT_WINDOW_SIZE.width,
      height: DEFAULT_WINDOW_SIZE.height,
    };

    setState(prev => ({
      ...prev,
      windows: [...prev.windows, newWindow],
      activeWindowId: newId,
      isLauncherOpen: false
    }));
  }, [state.windows, state.isTabletMode]);

  const closeWindow = useCallback((id: string) => {
    setState(prev => {
      const remainingWindows = prev.windows.filter(w => w.id !== id);
      const nextActiveId = prev.activeWindowId === id ? null : prev.activeWindowId;
      const shouldShowLauncher = prev.isTabletMode && remainingWindows.length === 0;

      return {
        ...prev,
        windows: remainingWindows,
        activeWindowId: nextActiveId,
        isLauncherOpen: shouldShowLauncher || prev.isLauncherOpen
      };
    });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setState(prev => {
      const updatedWindows = prev.windows.map(w => w.id === id ? { ...w, isMinimized: true } : w);
      const activeWindows = updatedWindows.filter(w => !w.isMinimized);
      const shouldShowLauncher = prev.isTabletMode && activeWindows.length === 0;

      return {
        ...prev,
        windows: updatedWindows,
        activeWindowId: prev.activeWindowId === id ? null : prev.activeWindowId,
        isLauncherOpen: shouldShowLauncher || prev.isLauncherOpen
      };
    });
  }, []);

  const focusWindow = useCallback((id: string) => {
    const maxZ = state.windows.length > 0 ? Math.max(...state.windows.map(w => w.zIndex)) : 0;
    setState(prev => ({
      ...prev,
      activeWindowId: id,
      isLauncherOpen: false, 
      windows: prev.windows.map(w => 
        w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
      )
    }));
  }, [state.windows]);

  const toggleLauncher = useCallback(() => {
    setState(prev => {
      const activeWindows = prev.windows.filter(w => !w.isMinimized);
      if (prev.isTabletMode && activeWindows.length === 0) {
        return { ...prev, isLauncherOpen: true, isQuickSettingsOpen: false };
      }
      return { ...prev, isLauncherOpen: !prev.isLauncherOpen, isQuickSettingsOpen: false };
    });
  }, []);

  const toggleQuickSettings = useCallback(() => {
    setState(prev => ({ ...prev, isQuickSettingsOpen: !prev.isQuickSettingsOpen, isLauncherOpen: prev.isTabletMode && prev.windows.filter(w => !w.isMinimized).length === 0 }));
  }, []);

  const setWallpaper = useCallback((url: string) => {
    setState(prev => ({ ...prev, wallpaper: url }));
  }, []);

  const toggleTabletMode = useCallback(() => {
    setState(prev => {
      const newTabletMode = !prev.isTabletMode;
      const visibleWindows = prev.windows.filter(w => !w.isMinimized);
      
      return { 
        ...prev, 
        isTabletMode: newTabletMode,
        isLauncherOpen: newTabletMode && visibleWindows.length === 0,
        windows: prev.windows.map(w => ({ ...w, isMaximized: newTabletMode }))
      };
    });
  }, []);

  const installApp = useCallback((appId: AppID) => {
    if (!pinnedAppIds.includes(appId)) {
      setPinnedAppIds(prev => [...prev, appId]);
    }
  }, [pinnedAppIds]);

  const unlock = useCallback(() => {
    setState(prev => ({ ...prev, isLocked: false, isLauncherOpen: prev.isTabletMode }));
  }, []);

  const signout = useCallback(() => {
    setState(prev => ({ ...prev, isLocked: true, isLauncherOpen: false, isQuickSettingsOpen: false, windows: [], activeWindowId: null }));
  }, []);

  if (isBooting) {
    return <BootScreen />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white bg-black">
      <Desktop wallpaper={state.wallpaper} />
      
      {!state.isLocked ? (
        <>
          <WindowManager 
            windows={state.windows} 
            activeWindowId={state.activeWindowId}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
            setWallpaper={setWallpaper}
            onInstallApp={installApp}
            currentWallpaper={state.wallpaper}
            isTabletMode={state.isTabletMode}
          />

          {state.isLauncherOpen && (
            <Launcher 
              onOpenApp={openApp} 
              onClose={toggleLauncher} 
              isTabletMode={state.isTabletMode}
              activeWindowsCount={state.windows.filter(w => !w.isMinimized).length}
            />
          )}

          {state.isQuickSettingsOpen && (
            <QuickSettings 
              onClose={toggleQuickSettings}
              setWallpaper={setWallpaper}
              onLock={signout}
              profilePic={profilePic}
              isTabletMode={state.isTabletMode}
              toggleTabletMode={toggleTabletMode}
            />
          )}

          <Shelf 
            windows={state.windows}
            activeWindowId={state.activeWindowId}
            currentTime={state.currentTime}
            onToggleLauncher={toggleLauncher}
            onToggleQuickSettings={toggleQuickSettings}
            onAppClick={(appId) => openApp(appId as AppID)}
            pinnedAppIds={pinnedAppIds}
            isTabletMode={state.isTabletMode}
          />
        </>
      ) : (
        <LockScreen 
          wallpaper={state.wallpaper} 
          profilePic={profilePic}
          currentTime={state.currentTime}
          onUnlock={unlock}
        />
      )}
    </div>
  );
};

export default App;
