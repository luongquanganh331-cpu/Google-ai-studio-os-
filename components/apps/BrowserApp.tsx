
import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Shield, Globe, Lock } from 'lucide-react';

export const BrowserApp: React.FC = () => {
  const [urlInput, setUrlInput] = useState('https://www.google.com/search?igu=1');
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com/search?igu=1');
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = urlInput.trim();
    if (!finalUrl.startsWith('http')) {
      finalUrl = `https://www.google.com/search?q=${encodeURIComponent(finalUrl)}&igu=1`;
    }
    setCurrentUrl(finalUrl);
    setUrlInput(finalUrl);
    setIsLoading(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] text-gray-800">
      {/* Top Bar */}
      <div className="h-10 bg-[#f1f3f4] flex items-center px-2 gap-1 border-b border-gray-300">
        <div className="flex items-center bg-white px-3 py-1.5 rounded-t-lg border-x border-t border-gray-300 gap-2 min-w-[160px]">
          <Globe size={12} className="text-gray-500" />
          <span className="text-xs truncate font-medium">New Tab</span>
          <button className="ml-auto text-gray-400 hover:text-gray-600">×</button>
        </div>
        <button className="p-1.5 hover:bg-gray-200 rounded-full text-gray-600">+</button>
      </div>

      {/* Control Bar */}
      <div className="h-12 bg-white flex items-center gap-3 px-4 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
            <ArrowLeft size={16} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
            <ArrowRight size={16} />
          </button>
          <button onClick={handleRefresh} className={`p-2 hover:bg-gray-100 rounded-full text-gray-600 ${isLoading ? 'animate-spin' : ''}`}>
            <RotateCw size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 flex items-center relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-green-600">
            <Lock size={12} />
          </div>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full h-8 bg-[#f1f3f4] hover:bg-[#e8eaed] focus:bg-white border-transparent focus:border-blue-500 border rounded-full pl-8 pr-4 text-xs transition-all outline-none"
          />
        </form>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><Shield size={16} /></button>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">G</div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <iframe 
          ref={iframeRef}
          src={currentUrl}
          className="w-full h-full border-none"
          title="Browser Content"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};
