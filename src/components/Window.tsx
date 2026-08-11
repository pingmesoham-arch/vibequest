import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useWindowStore, WindowState } from '../stores/windowStore';
import { useAppStore } from '../stores/appStore';
import { X, Minus, Square } from 'lucide-react';
import { cn } from '../lib/utils';

// Lazy loaded applications
const FileExplorer = React.lazy(() => import('../apps/FileExplorer').then(m => ({ default: m.FileExplorer })));
const Notes = React.lazy(() => import('../apps/Notes').then(m => ({ default: m.Notes })));
const Calculator = React.lazy(() => import('../apps/Calculator').then(m => ({ default: m.Calculator })));
const Settings = React.lazy(() => import('../apps/Settings').then(m => ({ default: m.Settings })));
const Browser = React.lazy(() => import('../apps/Browser').then(m => ({ default: m.Browser })));
const Terminal = React.lazy(() => import('../apps/Terminal').then(m => ({ default: m.Terminal })));
const MusicPlayer = React.lazy(() => import('../apps/MusicPlayer').then(m => ({ default: m.MusicPlayer })));

interface WindowProps {
  windowState: WindowState;
}

export const Window: React.FC<WindowProps> = ({ windowState }) => {
  const { id, appId, position, size, zIndex, state } = windowState;
  const { bringToFront, closeWindow, minimizeWindow, maximizeWindow, restoreWindow, updateSize } = useWindowStore();
  const installedApps = useAppStore(state => state.installedApps);
  const app = installedApps.find(a => a.id === appId);

  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const isMaximized = state === 'maximized';
  const isMinimized = state === 'minimized';
  
  const [isResizing, setIsResizing] = useState(false);
  const [localSize, setLocalSize] = useState(size);

  useEffect(() => {
    setLocalSize(size);
  }, [size]);

  if (isMinimized) return null;

  const handlePointerDown = () => {
    bringToFront(id);
  };

  const handleResizeStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = localSize.width;
    const startHeight = localSize.height;
    
    const onPointerMove = (e: PointerEvent) => {
      const newWidth = Math.max(320, startWidth + (e.clientX - startX));
      const newHeight = Math.max(240, startHeight + (e.clientY - startY));
      setLocalSize({ width: newWidth, height: newHeight });
    };

    const onPointerUp = () => {
      setIsResizing(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (windowRef.current) {
        updateSize(id, { width: windowRef.current.offsetWidth, height: windowRef.current.offsetHeight });
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const renderAppContent = () => {
    switch(appId) {
      case 'explorer': return <FileExplorer />;
      case 'notes': return <Notes />;
      case 'calculator': return <Calculator />;
      case 'settings': return <Settings />;
      case 'browser': return <Browser />;
      case 'terminal': return <Terminal />;
      case 'music': return <MusicPlayer />;
      default: return <div className="p-4 text-white">App {appId} not implemented yet.</div>;
    }
  };

  return (
    <motion.div
      ref={windowRef}
      onPointerDown={handlePointerDown}
      drag={!isMaximized}
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      initial={isMaximized ? false : { x: position.x, y: position.y, scale: 0.9, opacity: 0 }}
      animate={isMaximized ? {
        x: 0,
        y: 28,
        width: '100vw',
        height: 'calc(100vh - 28px)',
        scale: 1,
        opacity: 1
      } : {
        width: localSize.width,
        height: localSize.height,
        scale: 1,
        opacity: 1
      }}
      style={{
        position: 'absolute',
        zIndex,
      }}
      className={cn(
        "rounded-xl overflow-hidden flex flex-col shadow-2xl border border-white/20",
        "bg-black/80 backdrop-blur-xl", // Using a solid base color with blur for glass effect
        isResizing ? "select-none" : ""
      )}
    >
      {/* Title Bar */}
      <div 
        className="title-bar h-10 bg-white/10 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing border-b border-white/10"
        onDoubleClick={() => isMaximized ? restoreWindow(id) : maximizeWindow(id)}
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="flex items-center gap-2">
          {app?.icon && React.createElement(app.icon, { size: 16, className: "text-white" })}
          <span className="text-sm font-medium text-white">{app?.name}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <Minus size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); isMaximized ? restoreWindow(id) : maximizeWindow(id); }} className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            {isMaximized ? <Square size={12} /> : <Square size={14} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="w-6 h-6 rounded-full hover:bg-red-500 flex items-center justify-center text-white transition-colors">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden relative">
        <Suspense fallback={<div className="flex items-center justify-center h-full text-white/50 text-sm">Loading...</div>}>
          {renderAppContent()}
        </Suspense>
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onPointerDown={handleResizeStart}
        />
      )}
    </motion.div>
  );
};
