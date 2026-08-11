import { create } from 'zustand';

export interface WindowState {
  id: string;
  appId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  state: 'open' | 'minimized' | 'maximized';
  previousState?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
}

interface WindowStore {
  windows: WindowState[];
  bringToFront: (id: string) => void;
  openApp: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const DEFAULT_SIZE = { width: 800, height: 600 };
const DEFAULT_POSITION = { x: 100, y: 100 };

export const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  bringToFront: (id) => set((state) => {
    const maxZ = state.windows.reduce((max, w) => Math.max(max, w.zIndex), 0);
    return {
      windows: state.windows.map(w => 
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      )
    };
  }),
  openApp: (appId) => set((state) => {
    // Check if app is already open
    const existingWindow = state.windows.find(w => w.appId === appId);
    if (existingWindow) {
      const maxZ = state.windows.reduce((max, w) => Math.max(max, w.zIndex), 0);
      return {
        windows: state.windows.map(w => 
          w.appId === appId 
            ? { ...w, state: 'open', zIndex: maxZ + 1 } 
            : w
        )
      };
    }
    
    // Open new window
    const maxZ = state.windows.reduce((max, w) => Math.max(max, w.zIndex), 0);
    const newWindow: WindowState = {
      id: generateId(),
      appId,
      position: { ...DEFAULT_POSITION, x: DEFAULT_POSITION.x + (state.windows.length * 30), y: DEFAULT_POSITION.y + (state.windows.length * 30) },
      size: { ...DEFAULT_SIZE },
      zIndex: maxZ + 1,
      state: 'open'
    };
    return { windows: [...state.windows, newWindow] };
  }),
  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id)
  })),
  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, state: 'minimized' } : w
    )
  })),
  maximizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id && w.state !== 'maximized'
        ? { 
            ...w, 
            state: 'maximized', 
            previousState: { position: w.position, size: w.size } 
          } 
        : w
    )
  })),
  restoreWindow: (id) => set((state) => ({
    windows: state.windows.map(w => {
      if (w.id === id && w.state === 'maximized') {
        return {
          ...w,
          state: 'open',
          position: w.previousState?.position || w.position,
          size: w.previousState?.size || w.size
        };
      } else if (w.id === id && w.state === 'minimized') {
        return {
          ...w,
          state: 'open'
        };
      }
      return w;
    })
  })),
  updatePosition: (id, pos) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, position: pos } : w
    )
  })),
  updateSize: (id, size) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, size: size } : w
    )
  })),
}));
