/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard } from './components/Keyboard';
import { FidgetToy } from './components/FidgetToy';
import { SwitchType, audioService } from './services/audioService';
import { Settings, Keyboard as KeyboardIcon, Volume2, Info, MousePointer2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Mode = 'keyboard' | 'fidget';

export default function App() {
  const [mode, setMode] = useState<Mode>('fidget');
  const [switchType, setSwitchType] = useState<SwitchType>('brown');
  const [keycapColor, setKeycapColor] = useState('bg-zinc-200');
  const [typedText, setTypedText] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const colors = [
    { name: 'Classic Grey', class: 'bg-zinc-300' },
    { name: 'Mint Pastel', class: 'bg-emerald-100' },
    { name: 'Sunset Pink', class: 'bg-rose-200' },
    { name: 'Deep Navy', class: 'bg-slate-700 text-white' },
    { name: 'Solar Yellow', class: 'bg-amber-300' },
  ];

  const switches: { type: SwitchType; label: string; description: string; color: string }[] = [
    { type: 'blue', label: 'Clicky (Blue)', description: 'Classic tactile click', color: 'bg-blue-500' },
    { type: 'brown', label: 'Tactile (Brown)', description: 'Smooth tactile bump', color: 'bg-amber-800' },
    { type: 'red', label: 'Linear (Red)', description: 'Fast and quiet', color: 'bg-red-500' },
  ];

  const handleKeyClick = useCallback((key: string) => {
    if (key === 'SPACE') {
      setTypedText(prev => prev + ' ');
    } else {
      setTypedText(prev => (prev + key).slice(-20)); // Keep last 20 chars
    }
  }, []);

  // Listen for physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Logic for sounds on physical press
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
          
          <div className="flex items-center bg-zinc-900 border border-white/5 rounded-full p-1 self-center">
            <button 
              onClick={() => setMode('fidget')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${mode === 'fidget' ? 'bg-orange-500 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <MousePointer2 size={12} /> FIDGET TOY
            </button>
            <button 
              onClick={() => setMode('keyboard')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${mode === 'keyboard' ? 'bg-orange-500 text-black' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <KeyboardIcon size={12} /> FULL BOARD
            </button>
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
              <AnimatePresence mode="wait">
                {mode === 'fidget' ? (
                  <motion.div
                    key="fidget"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ type: 'spring', damping: 20 }}
                  >
                    <FidgetToy switchType={switchType} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="keyboard"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="scale-75 sm:scale-90"
                  >
                    <Keyboard 
                      switchType={switchType} 
                      keycapColor={keycapColor} 
                      onKeyClick={handleKeyClick} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Interaction Prompt for Haptics */}
          <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl max-w-lg text-center">
            <p className="text-orange-200 text-xs leading-relaxed font-medium mb-2">
              모바일 기기에서 터치 시 리얼한 <span className="text-orange-400 font-bold">진동(Haptic)</span> 피드백이 느껴집니다.
            </p>
            <p className="text-zinc-500 text-[11px] italic">
              "현실의 키캡 장난감을 누르는 느낌을 온라인에서 체험해보세요. 각 스위치마다 고유한 파형 합성을 통해 소리가 만들어집니다."
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
