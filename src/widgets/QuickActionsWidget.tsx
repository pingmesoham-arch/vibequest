import React, { useState } from 'react';
import { Wifi, Bluetooth, Moon, Battery } from 'lucide-react';
import { cn } from '../lib/utils';

export const QuickActionsWidget: React.FC = () => {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [dnd, setDnd] = useState(false);
  const [powerMode, setPowerMode] = useState(false);

  const ActionButton = ({ icon: Icon, label, active, onClick, color }: any) => (
    <div className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={onClick}>
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
        active ? color : "bg-white/10 text-white hover:bg-white/20"
      )}>
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-medium text-gray-300">{label}</span>
    </div>
  );

  return (
    <div className="w-64 p-5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white shadow-xl">
      <div className="grid grid-cols-2 gap-4">
        <ActionButton 
          icon={Wifi} 
          label="Wi-Fi" 
          active={wifi} 
          color="bg-blue-500 text-white"
          onClick={() => setWifi(!wifi)} 
        />
        <ActionButton 
          icon={Bluetooth} 
          label="Bluetooth" 
          active={bluetooth} 
          color="bg-blue-500 text-white"
          onClick={() => setBluetooth(!bluetooth)} 
        />
        <ActionButton 
          icon={Moon} 
          label="Do Not Disturb" 
          active={dnd} 
          color="bg-indigo-500 text-white"
          onClick={() => setDnd(!dnd)} 
        />
        <ActionButton 
          icon={Battery} 
          label="Low Power" 
          active={powerMode} 
          color="bg-yellow-500 text-white"
          onClick={() => setPowerMode(!powerMode)} 
        />
      </div>
    </div>
  );
};
