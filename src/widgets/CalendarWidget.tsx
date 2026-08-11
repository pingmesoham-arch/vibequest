import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarWidget: React.FC = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const today = now.getDate();

  const [viewDate, setViewDate] = useState(new Date(currentYear, currentMonth, 1));
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startDay = new Date(viewYear, viewMonth, 1).getDay();
  
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, (_, i) => i);

  const isCurrentMonth = viewYear === currentYear && viewMonth === currentMonth;

  const prevMonth = () => {
    setViewDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewYear, viewMonth + 1, 1));
  };

  return (
    <div className="w-64 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-white shadow-xl select-none">
      <div className="flex items-center justify-between mb-3 text-red-400">
        <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded-full transition-colors text-white">
          <ChevronLeft size={16} />
        </button>
        <div className="text-sm font-semibold">
          {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded-full transition-colors text-white">
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {days.map((d, i) => <div key={i} className="text-xs text-gray-400 font-medium">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {blanks.map(b => <div key={`blank-${b}`} />)}
        {dates.map(d => {
          const isToday = isCurrentMonth && d === today;
          return (
            <div 
              key={d} 
              className={`text-xs p-1 w-6 h-6 rounded-full mx-auto flex items-center justify-center ${isToday ? 'bg-red-500 text-white font-bold shadow-md' : 'hover:bg-white/10 cursor-pointer'}`}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
};

