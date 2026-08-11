import React from 'react';
import { useMusicStore } from '../stores/musicStore';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import { cn } from '../lib/utils';

export const MusicWidget: React.FC = () => {
  const { 
    playlist, currentTrackIndex, isPlaying, progress, duration,
    togglePlayPause, nextTrack, prevTrack 
  } = useMusicStore();

  const currentTrack = currentTrackIndex >= 0 ? playlist[currentTrackIndex] : null;

  return (
    <div className="w-64 p-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-white shadow-xl flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center",
          isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
        )}>
          <Music size={20} className="text-white drop-shadow" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold truncate">{currentTrack ? currentTrack.name : 'No track'}</h4>
          <p className="text-xs text-gray-400 truncate">Local Audio</p>
        </div>
      </div>
      
      {/* Progress */}
      <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden">
        <div 
          className="h-full bg-white rounded-full" 
          style={{ width: `${(duration > 0 ? progress / duration : 0) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center px-4">
        <button onClick={prevTrack} className="text-gray-300 hover:text-white transition-colors">
          <SkipBack size={18} fill="currentColor" />
        </button>
        <button 
          onClick={togglePlayPause} 
          className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        </button>
        <button onClick={nextTrack} className="text-gray-300 hover:text-white transition-colors">
          <SkipForward size={18} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};
