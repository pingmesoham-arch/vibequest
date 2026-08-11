import { useEffect } from 'react';
import { useWindowStore } from '../stores/windowStore';

export const useKeyboardShortcuts = (toggleSearch: () => void) => {
  const { windows, closeWindow, minimizeWindow, openApp } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      
      // Cmd/Ctrl + W to close topmost window
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        const topWindow = [...windows].sort((a, b) => b.zIndex - a.zIndex)[0];
        if (topWindow && topWindow.state !== 'minimized') {
          closeWindow(topWindow.id);
        }
      }

      // Cmd/Ctrl + M to minimize topmost window
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        const topWindow = [...windows].sort((a, b) => b.zIndex - a.zIndex)[0];
        if (topWindow && topWindow.state !== 'minimized') {
          minimizeWindow(topWindow.id);
        }
      }

      // Cmd/Ctrl + E to open Explorer
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        openApp('explorer');
      }

      // Cmd/Ctrl + T to open Terminal
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 't') {
        e.preventDefault();
        openApp('terminal');
      }

      // Cmd/Ctrl + B to open Browser
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        openApp('browser');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [windows, toggleSearch, closeWindow, minimizeWindow, openApp]);
};
