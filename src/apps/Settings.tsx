import React, { useState } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { cn } from '../lib/utils';

const WALLPAPERS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1536697246787-1f27d5ce5044?q=80&w=2564&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2564&auto=format&fit=crop'
];

export const Settings: React.FC = () => {
  const { wallpaper, theme, reducedMotion, setWallpaper, setTheme, setReducedMotion } = useSettingsStore();
  const [customUrl, setCustomUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'wallpaper' | 'appearance' | 'dock'>('wallpaper');

  const handleCustomWallpaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl) {
      setWallpaper(customUrl);
      setCustomUrl('');
    }
  };

  return (
    <div className="flex h-full bg-black/60 text-white">
      {/* Sidebar */}
      <div className="w-48 bg-black/40 border-r border-white/10 p-4">
        <ul className="space-y-2">
          <li 
            onClick={() => setActiveTab('wallpaper')}
            className={cn("px-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-colors", activeTab === 'wallpaper' ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400")}
          >
            Wallpaper
          </li>
          <li 
            onClick={() => setActiveTab('appearance')}
            className={cn("px-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-colors", activeTab === 'appearance' ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400")}
          >
            Appearance
          </li>
          <li 
            onClick={() => setActiveTab('dock')}
            className={cn("px-3 py-2 rounded-lg cursor-pointer font-medium text-sm transition-colors", activeTab === 'dock' ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400")}
          >
            Dock
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'wallpaper' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-semibold mb-6">Wallpaper</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-400 mb-3">Presets</h3>
                <div className="grid grid-cols-2 gap-4">
                  {WALLPAPERS.map((url, i) => (
                    <div 
                      key={i}
                      className={`aspect-video rounded-lg bg-cover bg-center cursor-pointer border-2 transition-colors ${wallpaper === url ? 'border-blue-500' : 'border-transparent hover:border-white/20'}`}
                      style={{ backgroundImage: `url(${url})` }}
                      onClick={() => setWallpaper(url)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 mb-3">Custom URL</h3>
                <form onSubmit={handleCustomWallpaper} className="flex gap-2">
                  <input 
                    type="url" 
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                  <button 
                    type="submit"
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Apply
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-semibold mb-6">Appearance</h2>
            <div className="space-y-6 max-w-md">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h4 className="font-medium">Theme Mode</h4>
                  <p className="text-xs text-gray-400 mt-1">Choose between Dark and Light mode (Mock)</p>
                </div>
                <div className="flex bg-black/50 rounded-lg p-1">
                  <button 
                    onClick={() => setTheme('dark')}
                    className={cn("px-4 py-1.5 rounded-md text-sm transition-colors", theme === 'dark' ? "bg-white/20 text-white" : "text-gray-400 hover:text-white")}
                  >
                    Dark
                  </button>
                  <button 
                    onClick={() => setTheme('light')}
                    className={cn("px-4 py-1.5 rounded-md text-sm transition-colors", theme === 'light' ? "bg-white/20 text-white" : "text-gray-400 hover:text-white")}
                  >
                    Light
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <h4 className="font-medium">Reduced Motion</h4>
                  <p className="text-xs text-gray-400 mt-1">Minimize animations across the OS</p>
                </div>
                <button 
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={cn("w-12 h-6 rounded-full transition-colors relative", reducedMotion ? "bg-blue-500" : "bg-white/20")}
                >
                  <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white transition-all", reducedMotion ? "left-7" : "left-1")} />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dock' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h2 className="text-xl font-semibold mb-6">Dock Settings</h2>
            <div className="space-y-6 max-w-md">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 opacity-50 cursor-not-allowed">
                <div>
                  <h4 className="font-medium">Dock Position</h4>
                  <p className="text-xs text-gray-400 mt-1">Change where the dock appears (Coming soon)</p>
                </div>
                <select disabled className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none">
                  <option>Bottom</option>
                  <option>Left</option>
                  <option>Right</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 opacity-50 cursor-not-allowed">
                <div>
                  <h4 className="font-medium">Auto-Hide Dock</h4>
                  <p className="text-xs text-gray-400 mt-1">Hide the dock when not in use (Coming soon)</p>
                </div>
                <button disabled className="w-12 h-6 rounded-full bg-white/20 relative cursor-not-allowed">
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white opacity-50" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
