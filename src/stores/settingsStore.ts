import { create } from 'zustand';

const API_BASE = 'https://vibewquest-be.onrender.com/api/v1';

interface SettingsStore {
  studentId: string | null;
  settingsDocId: string | null;
  isLoading: boolean;

  wallpaper: string;
  accentColor: string;
  dockSize: number;
  dockAutohide: boolean;
  theme: 'dark' | 'light';
  reducedMotion: boolean;

  init: () => Promise<void>;
  setWallpaper: (url: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setReducedMotion: (reduced: boolean) => void;
  _saveSettings: (updates: Partial<SettingsStore>) => Promise<void>;
}

const DEFAULT_SETTINGS = {
  wallpaper: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  accentColor: '#3b82f6',
  dockSize: 64,
  dockAutohide: false,
  theme: 'dark' as const,
  reducedMotion: false,
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  studentId: null,
  settingsDocId: null,
  isLoading: true,
  ...DEFAULT_SETTINGS,

  init: async () => {
    set({ isLoading: true });
    try {
      let id = localStorage.getItem('cosmos_notes_studentId');
      
      if (!id) {
        const res = await fetch(`${API_BASE}/init`);
        const data = await res.json();
        id = data.studentId;
        if (id) {
            localStorage.setItem('cosmos_notes_studentId', id);
        }
      }

      set({ studentId: id });

      if (id) {
        const res = await fetch(`${API_BASE}/${id}/settings`);
        const data = await res.json();
        const docs = data.documents || [];
        
        if (docs.length > 0) {
          const settings = docs[0];
          set({
            settingsDocId: settings.id,
            wallpaper: settings.wallpaper ?? DEFAULT_SETTINGS.wallpaper,
            accentColor: settings.accentColor ?? DEFAULT_SETTINGS.accentColor,
            dockSize: settings.dockSize ?? DEFAULT_SETTINGS.dockSize,
            dockAutohide: settings.dockAutohide ?? DEFAULT_SETTINGS.dockAutohide,
            theme: settings.theme ?? DEFAULT_SETTINGS.theme,
            reducedMotion: settings.reducedMotion ?? DEFAULT_SETTINGS.reducedMotion,
            isLoading: false,
          });
        } else {
          const createRes = await fetch(`${API_BASE}/${id}/settings`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(DEFAULT_SETTINGS)
          });
          const createData = await createRes.json();
          if (createData.success && createData.documentId) {
             set({ settingsDocId: createData.documentId, isLoading: false });
          } else {
             set({ isLoading: false });
          }
        }
      } else {
          set({ isLoading: false });
      }
    } catch (err) {
      console.error('Failed to init settings:', err);
      set({ isLoading: false });
    }
  },

  _saveSettings: async (updates) => {
    const { studentId, settingsDocId } = get();
    if (!studentId || !settingsDocId) return;

    try {
      await fetch(`${API_BASE}/${studentId}/settings/${settingsDocId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  },

  setWallpaper: (url) => {
    set({ wallpaper: url });
    get()._saveSettings({ wallpaper: url });
  },
  setTheme: (theme) => {
    set({ theme });
    get()._saveSettings({ theme });
  },
  setReducedMotion: (reducedMotion) => {
    set({ reducedMotion });
    get()._saveSettings({ reducedMotion });
  },
}));
