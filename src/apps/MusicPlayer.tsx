import React, { useRef } from 'react';
import { useMusicStore } from '../stores/musicStore';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Music as MusicIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export const MusicPlayer: React.FC = () => {
  const { 
    playlist, currentTrackIndex, isPlaying, progress, duration, volume, isShuffle, isRepeat,
    addTrack, playTrack, togglePlayPause, nextTrack, prevTrack, setVolume, seek, toggleShuffle, toggleRepeat
  } = useMusicStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentTrack = currentTrackIndex >= 0 ? playlist[currentTrackIndex] : null;

  const [urlInput, setUrlInput] = React.useState('');

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    
    addTrack({
      id: Math.random().toString(36).substr(2, 9),
      name: urlInput.split('/').pop() || 'Remote Audio',
      url: urlInput.trim()
    });
    setUrlInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      addTrack({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name.replace(/\.[^/.]+$/, ""), // remove extension
        url
      });
    });
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-full bg-black/80 text-white">
      {/* Sidebar: Playlist */}
      <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm">Playlist</h3>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
            >
              Add Files
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="audio/*,video/mp4" 
              multiple 
              className="hidden" 
            />
          </div>
          
          {/* Add URL Form */}
          <form onSubmit={handleAddUrl} className="flex gap-2">
            <input 
              type="url" 
              placeholder="Paste audio URL..." 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-black/50 border border-white/20 rounded px-2 py-1 text-xs text-white outline-none focus:border-blue-400"
            />
            <button type="submit" className="text-xs bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded transition-colors">
              Add
            </button>
          </form>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {playlist.length === 0 ? (
            <div className="text-gray-500 text-xs text-center mt-4">No tracks added</div>
          ) : (
            playlist.map((track, idx) => (
              <div 
                key={track.id}
                onClick={() => playTrack(idx)}
                className={cn(
                  "px-3 py-2 text-sm rounded cursor-pointer truncate transition-colors",
                  idx === currentTrackIndex ? "bg-blue-500/20 text-blue-400 font-medium" : "hover:bg-white/10 text-gray-300"
                )}
              >
                {track.name}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        
        {/* Rotating CD Animation */}
        <div className="mb-12 relative flex items-center justify-center">
          <div className={cn(
            "w-48 h-48 rounded-full border-4 border-gray-800 shadow-2xl flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-gray-800 to-gray-600 transition-transform duration-500",
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
          )}>
            {/* CD Grooves */}
            <div className="absolute inset-2 rounded-full border border-gray-700 opacity-50"></div>
            <div className="absolute inset-4 rounded-full border border-gray-700 opacity-50"></div>
            <div className="absolute inset-8 rounded-full border border-gray-700 opacity-50"></div>
            <div className="absolute inset-12 rounded-full border border-gray-700 opacity-50"></div>
            {/* CD Center hole */}
            <div className="w-12 h-12 bg-black/80 rounded-full border border-gray-600 z-10 flex items-center justify-center">
               <MusicIcon size={20} className="text-gray-400" />
            </div>
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
          </div>
        </div>

        {/* Track Info */}
        <div className="text-center mb-8 w-full max-w-md">
          <h2 className="text-xl font-bold truncate text-white">
            {currentTrack ? currentTrack.name : 'No track selected'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">Local Audio</p>
        </div>

        {/* Playback Controls Area */}
        <div className="w-full max-w-md bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
          
          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-6 text-xs text-gray-400 font-medium">
            <span>{formatTime(progress)}</span>
            <input 
              type="range" 
              min={0} 
              max={duration || 100} 
              value={progress} 
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
            <span>{formatTime(duration)}</span>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between">
            <button 
              onClick={toggleShuffle} 
              className={cn("p-2 rounded-full transition-colors", isShuffle ? "text-blue-400 bg-blue-500/10" : "text-gray-400 hover:text-white hover:bg-white/10")}
            >
              <Shuffle size={18} />
            </button>
            
            <div className="flex items-center gap-4">
              <button onClick={prevTrack} className="p-2 text-white hover:text-blue-400 transition-colors">
                <SkipBack size={24} fill="currentColor" />
              </button>
              
              <button 
                onClick={togglePlayPause} 
                className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              
              <button onClick={nextTrack} className="p-2 text-white hover:text-blue-400 transition-colors">
                <SkipForward size={24} fill="currentColor" />
              </button>
            </div>

            <button 
              onClick={toggleRepeat} 
              className={cn("p-2 rounded-full transition-colors", isRepeat ? "text-blue-400 bg-blue-500/10" : "text-gray-400 hover:text-white hover:bg-white/10")}
            >
              <Repeat size={18} />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 mt-6 text-gray-400">
            <Volume2 size={16} />
            <input 
              type="range" 
              min={0} 
              max={1} 
              step={0.01}
              value={volume} 
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
