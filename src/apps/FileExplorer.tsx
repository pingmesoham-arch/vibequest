import React from 'react';
import { Folder, File, HardDrive, Star, Clock, Image } from 'lucide-react';

const MOCK_FILES = [
  { name: 'Documents', type: 'folder', icon: Folder, color: 'text-blue-400' },
  { name: 'Downloads', type: 'folder', icon: Folder, color: 'text-blue-400' },
  { name: 'Pictures', type: 'folder', icon: Folder, color: 'text-blue-400' },
  { name: 'Desktop', type: 'folder', icon: Folder, color: 'text-blue-400' },
  { name: 'project_notes.txt', type: 'file', icon: File, color: 'text-gray-300' },
  { name: 'vacation.jpg', type: 'image', icon: Image, color: 'text-emerald-400' },
  { name: 'presentation.pdf', type: 'file', icon: File, color: 'text-red-400' },
];

export const FileExplorer: React.FC = () => {
  return (
    <div className="flex h-full bg-black/60 text-white">
      {/* Sidebar */}
      <div className="w-48 bg-black/40 border-r border-white/10 p-3 flex flex-col gap-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Favorites</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 px-2 py-1.5 bg-white/10 rounded-md cursor-pointer text-sm">
              <Star size={14} className="text-yellow-400" /> Favorites
            </li>
            <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer text-sm">
              <Clock size={14} className="text-blue-400" /> Recents
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Locations</h3>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer text-sm">
              <HardDrive size={14} className="text-gray-300" /> Macintosh HD
            </li>
            <li className="flex items-center gap-2 px-2 py-1.5 hover:bg-white/5 rounded-md cursor-pointer text-sm">
              <HardDrive size={14} className="text-gray-300" /> Cosmos OS
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar / Breadcrumbs */}
        <div className="h-12 border-b border-white/10 flex items-center px-4 bg-white/5">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="cursor-pointer hover:text-white">Cosmos OS</span>
            <span className="text-gray-500">/</span>
            <span className="cursor-pointer hover:text-white">Users</span>
            <span className="text-gray-500">/</span>
            <span className="text-white font-medium">Guest</span>
          </div>
        </div>

        {/* Files Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
            {MOCK_FILES.map((file, i) => {
              const Icon = file.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer group transition-colors">
                  <Icon size={48} className={`${file.color} drop-shadow-md group-hover:scale-105 transition-transform`} strokeWidth={1.5} />
                  <span className="text-xs text-center truncate w-full px-1">{file.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
