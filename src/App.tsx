/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FidgetToy } from './components/FidgetToy';
import { SwitchType, audioService } from './services/audioService';
import { Keyboard as KeyboardIcon, Volume2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [switchType, setSwitchType] = useState<SwitchType>('brown');
  const [isMuted, setIsMuted] = useState(false);

  const startExperience = () => {
    setHasStarted(true);
    audioService.playPress('brown'); // Trigger initial interaction
  };

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
    <div className="min-h-screen bg-[#FFF0F5] text-zinc-800 font-sans selection:bg-rose-200 overflow-hidden relative">
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/40 backdrop-blur-xl"
          >
            <div className="text-center p-8 bg-white rounded-[3rem] shadow-2xl border-4 border-rose-100 max-w-sm w-full mx-6">
              <div className="text-6xl mb-6 animate-bounce">🎈</div>
              <h2 className="text-2xl font-black text-rose-500 mb-2 italic">CAP-SIM</h2>
              <p className="text-zinc-500 text-xs mb-8 leading-relaxed">
                키캡 체험을 위해 화면을 터치해주세요!<br/>
                진동과 소리가 함께 재생됩니다.
              </p>
              <button 
                onClick={startExperience}
                className="w-full bg-rose-400 hover:bg-rose-500 text-white font-black py-4 rounded-2xl shadow-[0_8px_0_0_#fb7185] active:shadow-none active:translate-y-1 transition-all"
              >
                체험 시작하기 💓
              </button>
              <p className="mt-6 text-[10px] text-zinc-400">
                Tip: 진동이 느껴지지 않는다면<br/> 
                <span className="font-bold text-rose-300 underline underline-offset-2">새 탭에서 열기</span>로 시도해보세요!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Atmosphere - Kitsch & Cute */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-200/50 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 blur-[100px] rounded-full" />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-[15%] text-4xl opacity-20">☁️</div>
        <div className="absolute bottom-40 right-[15%] text-4xl opacity-20">🌸</div>
        <div className="absolute top-1/2 left-[5%] text-2xl opacity-15">✨</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* Header */}
        <header className="w-full flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-rose-400 p-2 rounded-2xl shadow-sm">
              <KeyboardIcon className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-rose-500 italic">CAP-SIM</h1>
              <p className="text-[10px] text-rose-300 uppercase font-black tracking-widest">Kitsch Fidget Toy</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="px-4 py-1.5 rounded-full text-xs font-black bg-white text-rose-400 border-2 border-rose-100 shadow-[3px_3px_0_0_#ffe4e6]">
              모바일 진동 체험 중 💓
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 bg-white hover:bg-rose-50 rounded-2xl border-2 border-rose-100 shadow-sm transition-all"
            >
              <Volume2 className={isMuted ? 'text-zinc-300' : 'text-rose-400'} size={20} />
            </button>
          </div>
        </header>

        {/* Main Interface */}
        <main className="w-full flex flex-col items-center gap-8">
          
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Switch Selection */}
            <div className="bg-white/60 p-6 rounded-[2.5rem] border-2 border-rose-100 backdrop-blur-md md:col-span-1 shadow-xl shadow-rose-200/20">
              <h2 className="text-xs font-black uppercase tracking-wider text-rose-400 mb-6 flex items-center gap-2">
                <Info size={14} /> 스위치 소리 선택
              </h2>
              <div className="flex flex-col gap-4">
                {switches.map((sw) => (
                  <button
                    key={sw.type}
                    onClick={() => setSwitchType(sw.type)}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-2xl transition-all
                      border-2 ${switchType === sw.type ? 'border-rose-400 bg-white shadow-[0_4px_15px_rgba(251,113,133,0.2)] scale-105' : 'border-rose-50 bg-white/50 hover:bg-white'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${sw.color} ring-4 ring-rose-50`} />
                      <div className="text-left">
                        <p className={`text-sm font-bold ${switchType === sw.type ? 'text-rose-600' : 'text-zinc-500'}`}>{sw.label}</p>
                        <p className="text-[9px] text-zinc-400 font-medium leading-none mt-1">{sw.description}</p>
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
          <div className="bg-white/80 border-2 border-rose-100 p-6 rounded-[2rem] max-w-lg text-center backdrop-blur-sm shadow-xl shadow-rose-200/10">
            <p className="text-rose-500 text-sm leading-relaxed font-black mb-2">
              터치할 때마다 <span className="text-rose-400 underline decoration-wavy underline-offset-4">진동과 소리</span>가 함께! 🦄
            </p>
            <p className="text-zinc-500 text-[11px] font-medium italic">
              "현실의 키캡 장난감을 누르는 느낌을 온라인에서 그대로 담았습니다."
            </p>
          </div>
        </main>

        <footer className="mt-auto pt-20 pb-8 w-full flex flex-col items-center gap-6">
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-rose-300">
            <span>Mechanical ASMR</span>
            <span>Haptic Sim</span>
            <span>Kitsch Edition</span>
          </div>
          <p className="text-[10px] text-rose-200 font-bold">PINKY FIDGET TOY © 2026</p>
        </footer>
      </div>
    </div>
  );
}
