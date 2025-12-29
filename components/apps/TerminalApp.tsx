
import React, { useState, useRef, useEffect } from 'react';

export const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Google AI Studio OS [Version 2.0.0-AI]', 'Type "help" for a list of available AI system commands.', '']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `dev@ai-studio:~$ ${input}`];

    if (cmd === 'help') {
      newHistory.push('System commands:', '  help - Show this message', '  clear - Clear the terminal', '  ls - List neural clusters', '  whoami - Current engineer', '  neofetch - AI System information');
    } else if (cmd === 'clear') {
      setHistory(['']);
      setInput('');
      return;
    } else if (cmd === 'ls') {
      newHistory.push('Models/  DataSets/  NeuralLogs/  Config/  Tools/');
    } else if (cmd === 'whoami') {
      newHistory.push('ai_engineer_01');
    } else if (cmd === 'neofetch') {
      newHistory.push(
        ' ██████████████████  Google AI Studio OS ',
        ' ██████████████████  ------------------ ',
        ' ██████████████████  OS: Google AI Studio OS v2.0 ',
        ' ██████████████████  Host: Neural Processing Unit ',
        ' ██████████████████  Uptime: Infinite Intelligence ',
        ' ██████████████████  Shell: zsh (AI Optimized) ',
        ' ██████████████████  Resolution: Quantum Native ',
        ' ██████████████████  DE: Studio Desktop ',
        ' ██████████████████  NPU: Gemini 3 Pro Cluster ',
        '                     Memory: 128GiB / 1024GiB (Synthetic) '
      );
    } else if (cmd === '') {
      // Do nothing
    } else {
      newHistory.push(`Command unrecognized by system: ${cmd}`);
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="h-full bg-black text-blue-400 font-mono p-4 overflow-y-auto selection:bg-blue-500 selection:text-white">
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1 leading-tight">{line}</div>
      ))}
      <form onSubmit={handleCommand} className="flex">
        <span className="mr-2 text-cyan-400">dev@ai-studio:~$</span>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-blue-300"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};
