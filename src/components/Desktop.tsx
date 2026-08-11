import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { useWidgetStore } from '../stores/widgetStore';
import { useAppStore } from '../stores/appStore';
import { WindowManager } from './WindowManager';
import { WidgetLayer } from './WidgetLayer';
import { Dock } from './Dock';
import { SystemTray } from './SystemTray';
import { GlobalSearch } from './GlobalSearch';
import { ContextMenu } from './ContextMenu';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

const Desktop: React.FC = () => {
  const wallpaper = useSettingsStore(state => state.wallpaper);
  const initSettings = useSettingsStore(state => state.init);
  const initWidgets = useWidgetStore(state => state.init);
  const { isSearchOpen, toggleSearch, setSearchOpen } = useAppStore();
  
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    initSettings();
    initWidgets();
  }, [initSettings, initWidgets]);

  useKeyboardShortcuts(toggleSearch);

  const handleDesktopClick = () => {
    if (contextMenu) setContextMenu(null);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="relative w-full h-full bg-center bg-cover overflow-hidden select-none"
      style={{ backgroundImage: `url(${wallpaper})` }}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      <SystemTray onSearchClick={() => setSearchOpen(true)} />
      <WidgetLayer />
      <WindowManager />
      <Dock />

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
      {contextMenu && (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} />
      )}
    </div>
  );
};

export default Desktop;
