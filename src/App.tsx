import { useEffect } from 'react';
import Desktop from './components/Desktop';

function App() {
  // Prevent context menu globally unless handled by specific components
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => window.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden text-white bg-black">
      <Desktop />
    </div>
  );
}

export default App;
