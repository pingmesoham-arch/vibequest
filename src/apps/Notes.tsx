import React, { useEffect } from 'react';
import { useNotesStore } from '../stores/notesStore';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export const Notes: React.FC = () => {
  const { 
    notes, activeNoteId, isLoading, isSaving, 
    init, setActiveNote, createNote, updateNote, saveNote, deleteNote 
  } = useNotesStore();

  useEffect(() => {
    init();
  }, [init]);

  const activeNote = notes.find(n => n.id === activeNoteId);

  if (isLoading) {
    return (
      <div className="flex h-full bg-black/60 items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin opacity-50" />
      </div>
    );
  }

  return (
    <div className="flex h-full bg-black/60 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black/40 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-semibold text-sm">All Notes</h2>
          <button 
            onClick={() => createNote()}
            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
            title="Create Note"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {notes.length === 0 ? (
            <p className="text-xs text-gray-500 text-center mt-4">No notes found.</p>
          ) : (
            notes.map(note => (
              <div
                key={note.id}
                onClick={() => setActiveNote(note.id)}
                className={cn(
                  "px-3 py-2 rounded-lg cursor-pointer flex justify-between items-center group transition-colors",
                  activeNoteId === note.id ? "bg-white/20 text-white" : "hover:bg-white/10 text-gray-300"
                )}
              >
                <span className="truncate text-sm flex-1 pr-2">{note.title || 'Untitled'}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all shrink-0"
                  title="Delete Note"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {activeNote ? (
          <>
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                placeholder="Note Title"
                className="bg-transparent text-lg font-semibold outline-none flex-1 placeholder:text-gray-500"
              />
              <button
                onClick={() => saveNote(activeNote.id)}
                disabled={activeNote.isTemp || isSaving}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors ml-4 shrink-0"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Save
              </button>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
              placeholder="Start typing your note here..."
              className="flex-1 w-full bg-transparent p-6 resize-none outline-none placeholder:text-gray-500 text-sm leading-relaxed"
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Select a note or create a new one.
          </div>
        )}
      </div>
    </div>
  );
};
