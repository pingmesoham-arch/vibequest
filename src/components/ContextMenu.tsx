import React, { useEffect } from 'react';
import { Monitor, Layout, RefreshCw } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  // Prevent default context menu from closing this immediately
  useEffect(() => {
    const handleGlobalClick = () => onClose();
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [onClose]);

  return (
    <div 
      className="fixed z-[100] w-48 bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-1 text-sm text-gray-200"
      style={{ top: y, left: x }}
      onClick={e => e.stopPropagation()}
    >
      <div className="px-3 py-1.5 hover:bg-blue-500/50 hover:text-white cursor-pointer flex items-center gap-2" onClick={() => { window.location.reload(); onClose(); }}>
        <RefreshCw size={14} /> Refresh
      </div>
      <div className="h-px bg-white/10 my-1" />
      <div className="px-3 py-1.5 hover:bg-blue-500/50 hover:text-white cursor-pointer flex items-center gap-2" onClick={onClose}>
        <Layout size={14} /> Add Widget
      </div>
      <div className="px-3 py-1.5 hover:bg-blue-500/50 hover:text-white cursor-pointer flex items-center gap-2" onClick={onClose}>
        <Monitor size={14} /> Change Wallpaper
      </div>
    </div>
  );
};
