import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
}

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: '1', type: 'output', content: 'Cosmos OS Terminal v1.0.0' },
    { id: '2', type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const addLine = (type: 'input' | 'output' | 'error', content: string) => {
    setHistory(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), type, content }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    addLine('input', `$ ${trimmed}`);
    
    const args = trimmed.split(' ').filter(Boolean);
    const command = args[0].toLowerCase();
    const fullCommand = args.join(' ').toLowerCase();

    switch(command) {
      case 'help':
        addLine('output', 'Available commands:');
        addLine('output', '  help     - Show this help message');
        addLine('output', '  clear    - Clear the terminal');
        addLine('output', '  about    - About Cosmos OS');
        addLine('output', '  whoami   - Display current user');
        addLine('output', '  version  - Show OS version');
        addLine('output', '  projects - List projects');
        addLine('output', '  skills   - List skills');
        addLine('output', '  neofetch - Display system information');
        addLine('output', '  quest    - Quest IT commands (tech, content, design, events)');
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'about':
        addLine('output', 'Cosmos OS is a browser-based desktop OS shell.');
        break;
      case 'whoami':
        addLine('output', 'guest');
        break;
      case 'version':
        addLine('output', 'Cosmos OS v1.0.0 (Web)');
        break;
      case 'projects':
        addLine('output', '1. Cosmos OS\n2. Portfolio Website\n3. AI Agent');
        break;
      case 'skills':
        addLine('output', 'React, TypeScript, Tailwind CSS, Framer Motion, Zustand');
        break;
      case 'neofetch':
        addLine('output', '       .           guest@cosmos');
        addLine('output', '      / \\          ------------');
        addLine('output', '     /   \\         OS: Cosmos OS 1.0');
        addLine('output', '    /_____\\        Host: Browser');
        addLine('output', '   /       \\       Kernel: WebKit/V8');
        addLine('output', '  /_________\\      Shell: CosmosTerm');
        break;
      case 'quest':
        if (fullCommand === 'quest it tech') {
          addLine('output', 'Quest IT Tech: Exploring the latest in Web, AI, and Systems.');
        } else if (fullCommand === 'quest it content') {
          addLine('output', 'Quest IT Content: Crafting stories, documentation, and media.');
        } else if (fullCommand === 'quest it design') {
          addLine('output', 'Quest IT Design: UI/UX, Glassmorphism, and beautiful interfaces.');
        } else if (fullCommand === 'quest it events') {
          addLine('output', 'Quest IT Events: Hackathons, workshops, and meetups.');
        } else {
          addLine('error', `Usage: quest it [tech|content|design|events]`);
        }
        break;
      default:
        addLine('error', `Command not found: ${command}`);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-black/90 text-green-500 font-mono text-sm p-4 cursor-text" onClick={() => document.getElementById('terminal-input')?.focus()}>
      <div className="flex items-center gap-2 mb-4 opacity-50 select-none">
        <TerminalIcon size={16} />
        <span>guest@cosmos-os:~</span>
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden break-words">
        {history.map((line) => (
          <div key={line.id} className={cn("mb-1 whitespace-pre-wrap", line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-white' : 'text-green-400')}>
            {line.content}
          </div>
        ))}
        
        <form onSubmit={onSubmit} className="flex items-center mt-2">
          <span className="text-white mr-2">$</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-white caret-white"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
