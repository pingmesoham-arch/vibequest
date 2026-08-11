import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search } from 'lucide-react';

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://example.com');
  const [inputUrl, setInputUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let finalUrl = inputUrl;
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      finalUrl = 'https://' + inputUrl;
    }
    setUrl(finalUrl);
    setInputUrl(finalUrl);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* Browser Toolbar */}
      <div className="h-12 bg-gray-100 border-b border-gray-300 flex items-center px-2 gap-2">
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
            <ArrowLeft size={16} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-200 text-gray-400 transition-colors">
            <ArrowRight size={16} />
          </button>
          <button 
            className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 800);
            }}
          >
            <RotateCw size={16} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors">
            <Home size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex items-center max-w-2xl bg-white border border-gray-300 rounded-full px-3 py-1 shadow-inner focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Search size={14} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
            placeholder="Search or enter web address"
          />
        </form>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-gray-50 flex items-center justify-center">
        {isLoading ? (
          <div className="text-gray-400 text-sm flex items-center gap-2">
            <RotateCw size={16} className="animate-spin" /> Loading {url}...
          </div>
        ) : (
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Web</h1>
            <p className="text-gray-600 mb-6">You are currently visiting:</p>
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-blue-600 font-medium">
              {url}
            </div>
            <p className="text-xs text-gray-400 mt-8">Note: This is a simulated browser experience for Cosmos OS.</p>
          </div>
        )}
      </div>
    </div>
  );
};
