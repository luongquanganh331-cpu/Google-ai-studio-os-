
import React, { useState } from 'react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNum = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullEq = equation + display;
      // Note: Eval is used here for simplicity in a mock app
      const result = eval(fullEq);
      setEquation(fullEq + ' =');
      setDisplay(String(result));
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="h-full bg-[#1e1e1e] text-white flex flex-col p-4 font-sans select-none">
      <div className="flex-1 flex flex-col justify-end items-end p-4 pb-8">
        <div className="text-sm text-white/40 mb-1">{equation}</div>
        <div className="text-4xl font-light tracking-tight">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <CalcBtn label="AC" color="bg-gray-700/50" onClick={clear} />
        <CalcBtn label="+/-" color="bg-gray-700/50" />
        <CalcBtn label="%" color="bg-gray-700/50" />
        <CalcBtn label="÷" color="bg-orange-500" onClick={() => handleOp('/')} />

        <CalcBtn label="7" onClick={() => handleNum('7')} />
        <CalcBtn label="8" onClick={() => handleNum('8')} />
        <CalcBtn label="9" onClick={() => handleNum('9')} />
        <CalcBtn label="×" color="bg-orange-500" onClick={() => handleOp('*')} />

        <CalcBtn label="4" onClick={() => handleNum('4')} />
        <CalcBtn label="5" onClick={() => handleNum('5')} />
        <CalcBtn label="6" onClick={() => handleNum('6')} />
        <CalcBtn label="-" color="bg-orange-500" onClick={() => handleOp('-')} />

        <CalcBtn label="1" onClick={() => handleNum('1')} />
        <CalcBtn label="2" onClick={() => handleNum('2')} />
        <CalcBtn label="3" onClick={() => handleNum('3')} />
        <CalcBtn label="+" color="bg-orange-500" onClick={() => handleOp('+')} />

        <CalcBtn label="0" colSpan="col-span-2" onClick={() => handleNum('0')} />
        <CalcBtn label="." onClick={() => handleNum('.')} />
        <CalcBtn label="=" color="bg-orange-500" onClick={calculate} />
      </div>
    </div>
  );
};

const CalcBtn = ({ label, color = "bg-white/5", colSpan = "", onClick }: any) => (
  <button 
    onClick={onClick}
    className={`h-14 rounded-xl flex items-center justify-center text-lg font-medium hover:brightness-125 active:scale-95 transition-all ${color} ${colSpan}`}
  >
    {label}
  </button>
);
