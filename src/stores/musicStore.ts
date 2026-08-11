import { create } from 'zustand';

export interface Track {
  id: string;
  name: string;
  url: string;
}

interface MusicStore {
  playlist: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  
  // Actions
  addTrack: (track: Track) => void;
  playTrack: (index: number) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (vol: number) => void;
  seek: (time: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

// Global audio instance
const audio = new Audio();

const DEFAULT_PLAYLIST: Track[] = [
  {
    id: 'default-1',
    name: 'SoundHelix Song 1 (Test)',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  }
];

export const useMusicStore = create<MusicStore>((set, get) => {
  // Set up audio event listeners
  audio.addEventListener('timeupdate', () => {
    set({ progress: audio.currentTime });
  });

  audio.addEventListener('loadedmetadata', () => {
    set({ duration: audio.duration });
  });

  audio.addEventListener('play', () => {
    set({ isPlaying: true });
  });

  audio.addEventListener('pause', () => {
    set({ isPlaying: false });
  });

  audio.addEventListener('ended', () => {
    const { isRepeat, nextTrack } = get();
    if (isRepeat) {
      audio.currentTime = 0;
      audio.play().catch(console.error);
    } else {
      nextTrack();
    }
  });

  return {
    playlist: DEFAULT_PLAYLIST,
    currentTrackIndex: 0,
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 1,
    isShuffle: false,
    isRepeat: false,

    addTrack: (track) => set((state) => {
      const newPlaylist = [...state.playlist, track];
      if (state.currentTrackIndex === -1) {
        // Automatically start playing if it's the first track
        audio.src = track.url;
        audio.play().catch(console.error);
        return { playlist: newPlaylist, currentTrackIndex: 0 };
      }
      return { playlist: newPlaylist };
    }),

    playTrack: (index) => set((state) => {
      if (index >= 0 && index < state.playlist.length) {
        audio.src = state.playlist[index].url;
        audio.play().catch(console.error);
        return { currentTrackIndex: index };
      }
      return state;
    }),

    togglePlayPause: () => set((state) => {
      if (state.currentTrackIndex === -1) return state;
      
      if (!audio.src || audio.src === '' || audio.src === window.location.href) {
        audio.src = state.playlist[state.currentTrackIndex].url;
      }

      if (state.isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(console.error);
      }
      return state;
    }),

    nextTrack: () => set((state) => {
      if (state.playlist.length === 0) return state;
      
      let nextIndex = state.currentTrackIndex + 1;
      if (state.isShuffle) {
        nextIndex = Math.floor(Math.random() * state.playlist.length);
      } else if (nextIndex >= state.playlist.length) {
        nextIndex = 0; // wrap around
      }
      
      audio.src = state.playlist[nextIndex].url;
      audio.play().catch(console.error);
      return { currentTrackIndex: nextIndex };
    }),

    prevTrack: () => set((state) => {
      if (state.playlist.length === 0) return state;
      
      // If we are more than 3 seconds in, just restart track
      if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return state;
      }

      let prevIndex = state.currentTrackIndex - 1;
      if (prevIndex < 0) {
        prevIndex = state.playlist.length - 1;
      }
      
      audio.src = state.playlist[prevIndex].url;
      audio.play().catch(console.error);
      return { currentTrackIndex: prevIndex };
    }),

    setVolume: (vol) => {
      audio.volume = vol;
      set({ volume: vol });
    },

    seek: (time) => {
      audio.currentTime = time;
      set({ progress: time });
    },

    toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
    toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  };
});
