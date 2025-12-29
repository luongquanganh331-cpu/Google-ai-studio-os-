
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Plus } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const GeminiApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am Gemini, your integrated OS assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Use process.env.API_KEY directly as per SDK guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are the built-in AI assistant for Gemini Web OS. You are helpful, concise, and professional. Provide clear answers about computing, OS features, and general knowledge."
        }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "I couldn't generate a response." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error connecting to the brain center." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-[#121212] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] border-r border-white/5 flex flex-col p-4">
        <button className="flex items-center gap-2 w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors mb-6 text-sm font-medium">
          <Plus size={18} />
          New Chat
        </button>
        <div className="flex-1 space-y-1">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-3 mb-2">RECENT</div>
          <button className="w-full text-left p-2 rounded-lg hover:bg-white/5 text-sm text-white/60 truncate">What is FydeOS?</button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-white/5 text-sm text-white/60 truncate">How to use Linux apps</button>
          <button className="w-full text-left p-2 rounded-lg hover:bg-white/5 text-sm text-white/60 truncate">System settings help</button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="h-14 border-b border-white/5 flex items-center px-6 justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-purple-500 rounded-lg">
              <Sparkles size={16} />
            </div>
            <span className="font-semibold text-sm">Gemini Advanced</span>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={18} />
                </div>
              )}
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/5 rounded-tl-none'
              }`}>
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <User size={18} />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center animate-pulse">
                <Bot size={18} />
              </div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none animate-pulse">
                <div className="w-12 h-2 bg-white/20 rounded-full" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-[10px] text-center text-white/30 mt-4">
            Gemini may display inaccurate info. Your privacy is protected by Gemini Web OS security.
          </p>
        </div>
      </div>
    </div>
  );
};
