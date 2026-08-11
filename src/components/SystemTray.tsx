import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search } from 'lucide-react';

interface SystemTrayProps {
  onSearchClick: () => void;
}

export const SystemTray: React.FC<SystemTrayProps> = ({ onSearchClick }) => {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState<number>(100);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let batteryManager: any = null;
    
    const updateBattery = () => {
      if (batteryManager) {
        setBattery(Math.round(batteryManager.level * 100));
        setIsCharging(batteryManager.charging);
      }
    };

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((bm: any) => {
        batteryManager = bm;
        updateBattery();
        bm.addEventListener('levelchange', updateBattery);
        bm.addEventListener('chargingchange', updateBattery);
      });
    }

    return () => {
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', updateBattery);
        batteryManager.removeEventListener('chargingchange', updateBattery);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4 text-xs text-white font-medium select-none pointer-events-none">
      
      {/* Left items - Logo / Menus (Mock) */}
      <div className="flex items-center gap-4 pointer-events-auto cursor-default">
        <div className="font-bold tracking-widest text-[10px]">COSMOS</div>
        <div className="hover:text-blue-300 transition-colors">File</div>
        <div className="hover:text-blue-300 transition-colors">Edit</div>
        <div className="hover:text-blue-300 transition-colors">View</div>
        <div className="hover:text-blue-300 transition-colors">Help</div>
      </div>

      {/* Right items - Tray */}
      <div className="flex items-center gap-4 pointer-events-auto cursor-default">
        <div 
          className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" 
          title="Search (Cmd+K)"
          onClick={onSearchClick}
        >
          <Search size={14} /> <span className="mr-2">Search</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-80">
          <Wifi size={14} />
        </div>
        <div className="flex items-center gap-1.5 opacity-80" title={isCharging ? "Charging" : "Battery"}>
          <Battery size={14} className={isCharging ? "text-green-400" : ""} /> {battery}%
        </div>
        <div className="opacity-90">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
