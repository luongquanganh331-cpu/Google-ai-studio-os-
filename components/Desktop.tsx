
import React from 'react';

interface DesktopProps {
  wallpaper: string;
}

export const Desktop: React.FC<DesktopProps> = ({ wallpaper }) => {
  return (
    <div 
      className="absolute inset-0 bg-cover bg-center transition-all duration-1000 -z-10"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};
