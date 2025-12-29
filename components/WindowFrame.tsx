
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { WindowInstance } from '../types';

interface WindowFrameProps {
  window: WindowInstance;
  isActive: boolean;
  isTabletMode?: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ 
  window, 
  isActive, 
  isTabletMode = false,
  onClose, 
  onMinimize, 
  onFocus, 
  children 
}) => {
  const [pos, setPos] = useState({ x: window.x, y: window.y });
  const [isMaximized, setIsMaximized] = useState(window.isMaximized || isTabletMode);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);

  useEffect(() => {
    if (isTabletMode) {
      setIsMaximized(true);
    }
  }, [isTabletMode]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isTabletMode) return;
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPos({
        x: dragRef.current.startPosX + dx,
        y: dragRef.current.startPosY + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragRef.current = null;
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const toggleMaximize = () => {
    if (isTabletMode) return;
    setIsMaximized(!isMaximized);
  };

  const windowStyle: React.CSSProperties = isMaximized 
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 3rem)', // Height of screen minus shelf (12 * 4 = 48px or 3rem)
        zIndex: window.zIndex,
        borderRadius: isTabletMode ? '0' : '0.75rem'
      }
    : {
        top: `${pos.y}px`,
        left: `${pos.x}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
        zIndex: window.zIndex,
      };

  return (
    <div 
      className={`absolute flex flex-col bg-[#1a1a1a] overflow-hidden transition-all duration-300 ${isMaximized ? '' : 'rounded-xl shadow-2xl'} ${isActive ? 'ring-1 ring-blue-500/20' : 'opacity-95'} ${isTabletMode ? 'animate-in fade-in zoom-in-95 duration-200' : ''}`}
      style={windowStyle}
      onClick={onFocus}
    >
      {/* Title Bar - Hidden in Tablet mode */}
      {!isTabletMode && (
        <div 
          className="h-10 bg-[#252525] flex items-center justify-between px-4 cursor-default select-none group shrink-0"
          onMouseDown={handleMouseDown}
          onDoubleClick={toggleMaximize}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/90 transition-colors">
            {window.title}
          </span>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <Minus size={14} className="text-white/70" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              <Maximize2 size={12} className="text-white/70" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/80 hover:text-white transition-colors"
            >
              <X size={14} className="text-white/70" />
            </button>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-[#0b0b0b]">
        {children}
      </div>
    </div>
  );
};
