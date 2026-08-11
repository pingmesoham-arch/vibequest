import { create } from 'zustand';
import { AppWindow, Settings, Calculator, FileText, Image, Music, Globe, Terminal } from 'lucide-react';

export interface AppDefinition {
  id: string;
  name: string;
  icon: any;
}

interface AppStore {
  installedApps: AppDefinition[];
  isSearchOpen: boolean;
  toggleSearch: () => void;
  setSearchOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  installedApps: [
    { id: 'explorer', name: 'File Explorer', icon: AppWindow },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'calculator', name: 'Calculator', icon: Calculator },
    { id: 'notes', name: 'Notes', icon: FileText },
    { id: 'gallery', name: 'Gallery', icon: Image },
    { id: 'music', name: 'Music Player', icon: Music },
    { id: 'browser', name: 'Browser', icon: Globe },
    { id: 'terminal', name: 'Terminal', icon: Terminal },
  ],
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  setSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
}));
