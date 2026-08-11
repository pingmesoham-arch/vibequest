import { create } from 'zustand';

const API_BASE = 'https://vibewquest-be.onrender.com/api/v1';

export interface WidgetState {
  id: string;
  type: string;
  position: { x: number; y: number };
}

interface WidgetStore {
  studentId: string | null;
  layoutDocId: string | null;
  isLoading: boolean;
  widgets: WidgetState[];
  
  init: () => Promise<void>;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  _saveLayout: (widgets: WidgetState[]) => Promise<void>;
}

const DEFAULT_WIDGETS: WidgetState[] = [
  { id: 'w-clock', type: 'clock', position: { x: 20, y: 20 } },
  { id: 'w-weather', type: 'weather', position: { x: 20, y: 150 } },
  { id: 'w-calendar', type: 'calendar', position: { x: 20, y: 300 } },
  { id: 'w-notes', type: 'notes', position: { x: 300, y: 20 } },
  { id: 'w-music', type: 'music', position: { x: 600, y: 20 } },
  { id: 'w-quickactions', type: 'quickactions', position: { x: 900, y: 20 } },
];

export const useWidgetStore = create<WidgetStore>((set, get) => ({
  studentId: null,
  layoutDocId: null,
  isLoading: true,
  widgets: DEFAULT_WIDGETS,

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
        const res = await fetch(`${API_BASE}/${id}/widget_layout`);
        const data = await res.json();
        const docs = data.documents || [];
        
        if (docs.length > 0) {
          const layout = docs[0];
          set({
            layoutDocId: layout.id,
            widgets: layout.widgets || DEFAULT_WIDGETS,
            isLoading: false,
          });
        } else {
          // POST default layout
          const createRes = await fetch(`${API_BASE}/${id}/widget_layout`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ widgets: DEFAULT_WIDGETS })
          });
          const createData = await createRes.json();
          if (createData.success && createData.documentId) {
             set({ layoutDocId: createData.documentId, isLoading: false });
          } else {
             set({ isLoading: false });
          }
        }
      } else {
          set({ isLoading: false });
      }
    } catch (err) {
      console.error('Failed to init widgets:', err);
      set({ isLoading: false });
    }
  },

  _saveLayout: async (widgets) => {
    const { studentId, layoutDocId } = get();
    if (!studentId || !layoutDocId) return;

    try {
      await fetch(`${API_BASE}/${studentId}/widget_layout/${layoutDocId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widgets })
      });
    } catch (err) {
      console.error('Failed to save widget layout:', err);
    }
  },

  updatePosition: (id, pos) => {
    set((state) => {
      const newWidgets = state.widgets.map(w => w.id === id ? { ...w, position: pos } : w);
      get()._saveLayout(newWidgets);
      return { widgets: newWidgets };
    });
  },
}));
