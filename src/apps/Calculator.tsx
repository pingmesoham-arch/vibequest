import React, { useState } from 'react';
import { cn } from '../lib/utils';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleInput = (val: string) => {
    if (display === '0' && val !== '.') {
      setDisplay(val);
    } else {
      setDisplay(prev => prev + val);
    }
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(display);
      setEquation(display + '=');
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', '']
  ];

  return (
    <div className="flex flex-col h-full bg-black/50 text-white p-4 font-mono">
      <div className="flex-1 flex flex-col items-end justify-end p-4 bg-white/5 rounded-xl mb-4 overflow-hidden">
        <div className="text-gray-400 text-sm h-6">{equation}</div>
        <div className="text-4xl truncate w-full text-right">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 flex-none">
        {buttons.flat().map((btn, i) => (
          btn ? (
            <button
              key={i}
              onClick={() => {
                if (btn === 'C') clear();
                else if (btn === '=') calculate();
                else handleInput(btn);
              }}
              className={cn(
                "h-12 rounded-lg text-lg font-medium transition-colors",
                ['/', '*', '-', '+', '='].includes(btn) ? "bg-orange-500 hover:bg-orange-600" :
                btn === 'C' ? "bg-red-500 hover:bg-red-600" :
                "bg-white/10 hover:bg-white/20"
              )}
            >
              {btn}
            </button>
          ) : (
            <div key={i} />
          )
        ))}
      </div>
    </div>
  );
};
