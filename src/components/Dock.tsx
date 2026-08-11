import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { useWindowStore } from '../stores/windowStore';
import { useSettingsStore } from '../stores/settingsStore';

export const Dock: React.FC = () => {
  const apps = useAppStore(state => state.installedApps);
  const { windows, openApp, restoreWindow } = useWindowStore();
  const reducedMotion = useSettingsStore(state => state.reducedMotion);
  const motionConfig = reducedMotion ? { duration: 0 } : {};

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-40 pointer-events-none">
      <motion.div 
        className="flex items-end gap-2 px-3 py-2 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl pointer-events-auto"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, ...motionConfig }}
      >
        {/* Search Bar in Dock */}
        <div 
          className="flex items-center justify-center w-12 h-12 bg-white/5 hover:bg-white/10 transition-colors rounded-xl cursor-pointer shadow-sm group mb-1"
          onClick={() => useAppStore.getState().setSearchOpen(true)}
          title="Search (Cmd+K)"
        >
          <Search size={20} className="text-white/70 group-hover:text-white transition-colors" />
        </div>
        
        <div className="w-[1px] h-8 bg-white/10 self-center mx-1" />

        {apps.map(app => {
          const Icon = app.icon;
          const appWindows = windows.filter(w => w.appId === app.id);
          const isOpen = appWindows.length > 0;
          const isMinimized = appWindows.some(w => w.state === 'minimized');

          return (
            <motion.button
              key={app.id}
              whileHover={reducedMotion ? {} : { scale: 1.2, y: -10 }}
              whileTap={reducedMotion ? {} : { scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                if (isMinimized) {
                  appWindows.forEach(w => {
                    if (w.state === 'minimized') restoreWindow(w.id);
                  });
                } else if (!isOpen) {
                  openApp(app.id);
                }
              }}
              className="relative group w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shadow-sm border border-white/10"
            >
              <Icon size={24} className="text-white drop-shadow" />
              
              {/* Tooltip */}
              <div className="absolute -top-10 px-2 py-1 bg-black/60 backdrop-blur border border-white/10 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                {app.name}
              </div>
              
              {/* Active Indicator */}
              {isOpen && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white/70" />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
