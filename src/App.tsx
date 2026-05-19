/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FidgetToy } from './components/FidgetToy';
import { SwitchType, audioService } from './services/audioService';
import { Keyboard as KeyboardIcon, Volume2, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [switchType, setSwitchType] = useState<SwitchType>('brown');
  const [isMuted, setIsMuted] = useState(false);

  const switches: { type: SwitchType; label: string; description: string; color: string }[] = [
    { type: 'blue', label: '청축 (찰칵이)', description: '경쾌한 클릭 소리', color: 'bg-blue-400' },
    { type: 'brown', label: '갈축 (서걱이)', description: '부드러운 구분감', color: 'bg-[#8B4513]' },
    { type: 'red', label: '적축 (구름이)', description: '가볍고 조용함', color: 'bg-rose-400' },
  ];

  // Listen for physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      audioService.playPress(switchType);
    };
    const handleKeyUp = () => {
      audioService.playRelease(switchType);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [switchType]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-zinc-300 font-sans selection:bg-orange-500/30 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* Header */}
        <header className="w-full flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <KeyboardIcon className="text-black" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">KEYCAP SIM</h1>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">ASMR & Haptic Experience</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="px-4 py-1.5 rounded-full text-xs font-black bg-white text-rose-500 border-2 border-rose-200 shadow-[2px_2px_0_0_#fecdd3]">
              KITSCH FIDGET v1.0
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <Volume2 className={isMuted ? 'text-zinc-600' : 'text-zinc-300'} size={20} />
            </button>
          </div>
        </header>

        {/* Main Interface */}
        <main className="w-full flex flex-col items-center gap-8">
          
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Switch Selection */}
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-md md:col-span-1">
              <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500 mb-6 flex items-center gap-2">
                <Info size={14} /> Switch Type
              </h2>
              <div className="flex flex-col gap-3">
                {switches.map((sw) => (
                  <button
                    key={sw.type}
                    onClick={() => setSwitchType(sw.type)}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-xl transition-all
                      border ${switchType === sw.type ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/5 bg-white/5 hover:bg-white/10'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${sw.color}`} />
                      <div className="text-left">
                        <p className={`text-xs font-semibold ${switchType === sw.type ? 'text-white' : 'text-zinc-400'}`}>{sw.label}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col items-center justify-center py-8 min-h-[400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <FidgetToy switchType={switchType} />
              </motion.div>
            </div>
          </div>

          {/* Interaction Prompt for Haptics */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl max-w-lg text-center backdrop-blur-sm">
            <p className="text-white text-xs leading-relaxed font-medium mb-2">
              터치 시 리얼한 <span className="text-rose-400 font-bold">진동(Haptic)</span>이 느껴집니다.
            </p>
            <p className="text-zinc-500 text-[11px] italic">
              "키캡 장난감을 파우치에 달고 다니듯, 온라인에서 언제든 눌러보세요!"
            </p>
          </div>
        </main>

        <footer className="mt-auto pt-24 pb-8 w-full flex flex-col items-center gap-6 border-t border-white/5">
          <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] text-zinc-600 font-medium font-mono">
            <a href="#" className="hover:text-orange-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Components</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Github</a>
          </div>
          <p className="text-[10px] text-zinc-700 font-mono">CREATED FOR ASMR ENTHUSIASTS © 2026</p>
        </footer>
      </div>
    </div>
  );
}
