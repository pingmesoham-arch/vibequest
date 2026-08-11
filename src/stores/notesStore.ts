import { create } from 'zustand';

const API_BASE = 'https://vibewquest-be.onrender.com/api/v1';

export interface Note {
  id: string;
  title: string;
  content: string;
  isTemp?: boolean;
}

interface NotesStore {
  studentId: string | null;
  notes: Note[];
  activeNoteId: string | null;
  isLoading: boolean;
  isSaving: boolean;
  
  init: () => Promise<void>;
  setActiveNote: (id: string | null) => void;
  createNote: () => Promise<void>;
  updateNote: (id: string, updates: Partial<Note>) => void;
  saveNote: (id: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  studentId: null,
  notes: [],
  activeNoteId: null,
  isLoading: true,
  isSaving: false,

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
        const res = await fetch(`${API_BASE}/${id}/notes`);
        const data = await res.json();
        const docs = data.documents || [];
        set({ notes: docs, isLoading: false });
        if (docs.length > 0) {
          set({ activeNoteId: docs[0].id });
        }
      } else {
          set({ isLoading: false });
      }
    } catch (err) {
      console.error('Failed to init notes:', err);
      set({ isLoading: false });
    }
  },

  setActiveNote: (id) => set({ activeNoteId: id }),

  createNote: async () => {
    const { studentId, notes } = get();
    if (!studentId) return;

    const tempId = `temp-${Date.now()}`;
    const newNote: Note = {
      id: tempId,
      title: 'New Note',
      content: '',
      isTemp: true,
    };

    set({ 
      notes: [newNote, ...notes], 
      activeNoteId: tempId 
    });

    try {
      const res = await fetch(`${API_BASE}/${studentId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newNote.title, content: newNote.content })
      });
      const data = await res.json();
      
      if (data.success && data.documentId) {
        set(state => ({
          notes: state.notes.map(n => 
            n.id === tempId ? { ...n, id: data.documentId, isTemp: false } : n
          ),
          activeNoteId: state.activeNoteId === tempId ? data.documentId : state.activeNoteId
        }));
      }
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  },

  updateNote: (id, updates) => {
    set(state => ({
      notes: state.notes.map(n => n.id === id ? { ...n, ...updates } : n)
    }));
  },

  saveNote: async (id) => {
    const { studentId, notes } = get();
    if (!studentId) return;

    const note = notes.find(n => n.id === id);
    if (!note || note.isTemp) return;

    set({ isSaving: true });
    try {
      await fetch(`${API_BASE}/${studentId}/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: note.title, content: note.content })
      });
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      set({ isSaving: false });
    }
  },

  deleteNote: async (id) => {
    const { studentId, notes, activeNoteId } = get();
    if (!studentId) return;

    // Optimistic UI delete
    const remainingNotes = notes.filter(n => n.id !== id);
    set({ 
      notes: remainingNotes,
      activeNoteId: activeNoteId === id ? (remainingNotes.length > 0 ? remainingNotes[0].id : null) : activeNoteId
    });

    try {
      await fetch(`${API_BASE}/${studentId}/notes/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  }
}));
