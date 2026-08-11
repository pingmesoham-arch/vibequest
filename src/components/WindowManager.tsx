import React from 'react';
import { useWindowStore } from '../stores/windowStore';
import { Window } from './Window';

export const WindowManager: React.FC = () => {
  const windows = useWindowStore(state => state.windows);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* 
        The container is pointer-events-none so we can click through to the desktop,
        but we need to restore pointer events on the windows themselves.
      */}
      {windows.map(windowState => (
        <div key={windowState.id} className="pointer-events-auto">
          <Window windowState={windowState} />
        </div>
      ))}
    </div>
  );
};
