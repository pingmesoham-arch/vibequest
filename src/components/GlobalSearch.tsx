import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../stores/appStore';
import { useWindowStore } from '../stores/windowStore';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

export const GlobalSearch: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const apps = useAppStore(state => state.installedApps);
  const openApp = useWindowStore(state => state.openApp);

  const results = apps.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(s => Math.min(s + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        openApp(results[selectedIndex].id);
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-[500px] bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Search size={20} className="text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search apps..."
            className="flex-1 bg-transparent border-none outline-none text-lg font-light text-white placeholder:text-gray-500"
          />
        </div>
        
        {query && (
          <div className="max-h-64 overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="text-gray-500 text-sm p-3 text-center">No results found for "{query}"</div>
            ) : (
              results.map((app, idx) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.id}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => {
                      openApp(app.id);
                      onClose();
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
                      selectedIndex === idx ? "bg-blue-500/30 text-white" : "text-gray-300 hover:bg-white/10"
                    )}
                  >
                    <Icon size={18} />
                    <span>{app.name}</span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
