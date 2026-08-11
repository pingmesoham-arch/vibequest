import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';

export const NotesWidget: React.FC = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Basic polling to sync with Notes app across different tabs or updates
    const timer = setInterval(() => {
      const saved = localStorage.getItem('cosmos-notes');
      if (saved !== null && saved !== content) {
        setContent(saved);
      }
    }, 2000);
    // initial load
    const saved = localStorage.getItem('cosmos-notes');
    if (saved) setContent(saved);
    
    return () => clearInterval(timer);
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    localStorage.setItem('cosmos-notes', newContent);
  };

  return (
    <div className="w-64 h-64 bg-yellow-200/90 backdrop-blur-md rounded-2xl shadow-xl flex flex-col overflow-hidden text-gray-900 border border-yellow-300">
      <div className="bg-yellow-300/50 p-2 flex items-center gap-2 text-xs font-semibold text-yellow-900">
        <Edit3 size={14} /> Quick Note
      </div>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Type a note..."
        className="flex-1 bg-transparent p-3 resize-none outline-none text-sm placeholder:text-yellow-700/50"
      />
    </div>
  );
};
