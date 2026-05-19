/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FidgetToy, ToyConfig } from './components/FidgetToy';
import { SwitchType, audioService } from './services/audioService';
import { Volume2, Palette, Sparkles, RotateCcw, Heart, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isFinished, setIsFinished] = useState(false);
  const [switchType, setSwitchType] = useState<SwitchType>('brown');
  const [isMuted, setIsMuted] = useState(false);
  const [bgColor, setBgColor] = useState('bg-[#FFF0F5]');
  
  const [toyConfig, setToyConfig] = useState<ToyConfig>({
    caseColor: 'bg-[#FFEDF3]',
    innerColor: 'bg-white/80',
    keys: [
      { emoji: '🧸', color: 'bg-[#FFB7B2]' },
      { emoji: '🍬', color: 'bg-[#B2CEFE]' },
      { emoji: '🎀', color: 'bg-[#FDFD96]' },
      { emoji: '🌸', color: 'bg-[#B2FBA5]' },
    ]
  });

  const [activeKeyIndex, setActiveKeyIndex] = useState(0);

  useEffect(() => {
    audioService.setMuted(isMuted);
  }, [isMuted]);

  const switches: { type: SwitchType; label: string; description: string; color: string }[] = [
    { type: 'blue', label: '청축', description: '찰깍찰깍!', color: 'bg-blue-400' },
    { type: 'brown', label: '갈축', description: '서걱서걱!', color: 'bg-amber-800' },
    { type: 'red', label: '적축', description: '부드러워요!', color: 'bg-rose-400' },
  ];

  const bgOptions = [
    { name: 'Cherry Blossom', class: 'bg-[#FFF0F5]' },
    { name: 'Sky Blue', class: 'bg-[#E3F2FD]' },
    { name: 'Mint Leaf', class: 'bg-[#E8F5E9]' },
    { name: 'Lemonade', class: 'bg-[#FFFDE7]' },
    { name: 'Lavender', class: 'bg-[#F3E5F5]' },
  ];

  const colorOptions = [
    { name: 'Rose', class: 'bg-[#FFB7B2]' },
    { name: 'Blue', class: 'bg-[#B2CEFE]' },
    { name: 'Yellow', class: 'bg-[#FDFD96]' },
    { name: 'Green', class: 'bg-[#B2FBA5]' },
    { name: 'Purple', class: 'bg-[#C5B3E3]' },
    { name: 'Normal', class: 'bg-zinc-200' },
    { name: 'White', class: 'bg-white' },
    { name: 'Black', class: 'bg-zinc-800' },
  ];

  const emojiOptions = ['🧸', '🍬', '🎀', '🌸', '✨', '🌈', '🪐', '🍰', '🐶', '🐱', '🦄', '🍎', '🎮', '🎧', '⚡'];

  const updateKeyColor = (color: string) => {
    setToyConfig(prev => {
        const newKeys = [...prev.keys];
        newKeys[activeKeyIndex] = { ...newKeys[activeKeyIndex], color };
        return { ...prev, keys: newKeys };
    });
  };

  const updateKeyEmoji = (emoji: string) => {
    setToyConfig(prev => {
        const newKeys = [...prev.keys];
        newKeys[activeKeyIndex] = { ...newKeys[activeKeyIndex], emoji };
        return { ...prev, keys: newKeys };
    });
  };

  const handleFinish = () => {
    audioService.playSuccess();
    setIsFinished(true);
  };

  return (
    <div className={`min-h-screen ${bgColor} text-zinc-800 font-sans transition-colors duration-700 overflow-x-hidden relative`}>
      {/* Atmosphere elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-100/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100/20 blur-[100px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {isFinished ? (
          <motion.div 
            key="finish"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/40 backdrop-blur-3xl p-6"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="text-center flex flex-col items-center"
            >
              <div className="mb-8 relative">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    className="absolute inset-[-40px] border-2 border-dashed border-rose-300 rounded-full opacity-30"
                />
                <h2 className="text-4xl font-black text-rose-500 italic drop-shadow-sm flex items-center justify-center gap-3">
                  ✨ MY KITSCH TOY ✨
                </h2>
              </div>
              
              <div className="scale-125 mb-24 mt-10">
                <FidgetToy switchType={switchType} config={toyConfig} isFinished={true} />
              </div>

              <div className="bg-white/80 p-6 rounded-[2rem] border-2 border-rose-100 shadow-xl mb-12 max-w-sm">
                <p className="text-rose-400 text-sm font-black mb-2 italic">Touch to Play!</p>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  나만의 커스텀 키캡이 완성되었습니다.<br/>
                  화면을 터치하며 리얼한 소리와 진동을 즐겨보세요!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <button 
                  onClick={() => setIsFinished(false)}
                  className="bg-white px-10 py-4 rounded-3xl font-black text-rose-400 flex items-center justify-center gap-3 shadow-xl hover:bg-rose-50 active:scale-95 transition-all outline-none border border-rose-50"
                >
                  <RotateCcw size={20} /> 다시 만들기
                </button>
                <button 
                  className="bg-rose-400 px-10 py-4 rounded-3xl font-black text-white flex items-center justify-center gap-3 shadow-[0_8px_0_0_#fb7185] active:shadow-none active:translate-y-1 transition-all outline-none"
                >
                  <Share2 size={20} /> 사진 저장
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 max-w-7xl mx-auto px-6 py-12"
          >
            {/* Header */}
            <header className="w-full flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="bg-rose-400 p-2 rounded-2xl">
                    <Heart className="text-white fill-white" size={20} />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-rose-500 italic leading-none">공작새</h1>
                  <p className="text-[10px] text-rose-300 uppercase font-black tracking-widest mt-1">나만의 키캡 만들기</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`flex items-center gap-2 p-3 ${isMuted ? 'bg-zinc-100 text-zinc-400' : 'bg-white text-rose-400'} rounded-2xl shadow-sm transition-all px-4 border border-rose-50`}
              >
                <Volume2 size={20} />
              </button>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Preview */}
              <div className="flex flex-col items-center justify-center lg:sticky lg:top-12 py-10 bg-white/20 rounded-[3rem] border-2 border-white/40 shadow-inner">
                <p className="text-[10px] font-black text-rose-300/60 uppercase tracking-[0.3em] mb-12">Preview Model</p>
                <div className="scale-110 mb-20 origin-center">
                  <FidgetToy switchType={switchType} config={toyConfig} />
                </div>
                
                <div className="w-full max-w-md bg-white/80 p-4 rounded-3xl border border-white flex justify-between items-center shadow-lg mx-6">
                    <span className="text-[11px] font-black text-rose-400 ml-2 uppercase tracking-wider">Switch Audio</span>
                    <div className="flex gap-2">
                        {switches.map(sw => (
                            <button
                                key={sw.type}
                                onClick={() => setSwitchType(sw.type)}
                                className={`px-4 py-2 rounded-2xl text-[10px] font-black transition-all ${switchType === sw.type ? 'bg-rose-400 text-white shadow-md' : 'bg-white text-zinc-400 hover:text-rose-400'}`}
                            >
                                {sw.label}
                            </button>
                        ))}
                    </div>
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex flex-col gap-6">
                <section className="bg-white/70 p-7 rounded-[2.5rem] border border-white shadow-xl shadow-rose-200/5">
                  <h2 className="text-xs font-black uppercase text-rose-400 mb-5 flex items-center gap-2">
                    <Palette size={14} /> 1. 테마 & 배경
                  </h2>
                  
                  <p className="text-[10px] font-black text-zinc-400 uppercase mb-3">배경 세계관</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {bgOptions.map(opt => (
                      <button
                        key={opt.name}
                        onClick={() => setBgColor(opt.class)}
                        className={`w-10 h-10 rounded-full ${opt.class} border-2 ${bgColor === opt.class ? 'border-rose-400 scale-110 shadow-md' : 'border-white'} transition-all`}
                        title={opt.name}
                      />
                    ))}
                  </div>

                  <p className="text-[10px] font-black text-zinc-400 uppercase mb-3">본체 케이스</p>
                  <div className="flex gap-3">
                    {['bg-[#FFEDF3]', 'bg-[#FFFDE7]', 'bg-[#E3F2FD]', 'bg-[#E8F5E9]', 'bg-zinc-800'].map(c => (
                        <button
                            key={c}
                            onClick={() => setToyConfig(prev => ({ ...prev, caseColor: c }))}
                            className={`w-10 h-10 rounded-2xl ${c} border-2 ${toyConfig.caseColor === c ? 'border-rose-400 scale-110 shadow-md' : 'border-white'} transition-all`}
                        />
                    ))}
                  </div>
                </section>

                <section className="bg-white/70 p-7 rounded-[2.5rem] border border-white shadow-xl shadow-rose-200/5">
                  <h2 className="text-xs font-black uppercase text-rose-400 mb-5 flex items-center gap-2">
                    <Sparkles size={14} /> 2. 키캡 디자인
                  </h2>
                  
                  <div className="flex gap-2 mb-8 bg-rose-50/50 p-1.5 rounded-[1.5rem]">
                    {toyConfig.keys.map((k, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveKeyIndex(i)}
                        className={`flex-1 py-3 rounded-2xl transition-all font-black text-[10px] flex flex-col items-center gap-1 ${activeKeyIndex === i ? 'bg-white text-rose-400 shadow-sm' : 'text-zinc-400 hover:text-rose-300'}`}
                      >
                        <span className="text-xl">{k.emoji}</span>
                        <span>Slot {i+1}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-8">
                    <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase mb-4">컬러 칩</p>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                            {colorOptions.map(opt => (
                                <button
                                    key={opt.name}
                                    onClick={() => updateKeyColor(opt.class)}
                                    className={`aspect-square rounded-xl ${opt.class} border-2 ${toyConfig.keys[activeKeyIndex].color === opt.class ? 'border-rose-400 scale-110' : 'border-white'} transition-all shadow-sm`}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase mb-4">아이콘 이모지</p>
                        <div className="grid grid-cols-5 gap-3">
                            {emojiOptions.map(emoji => (
                                <button
                                    key={emoji}
                                    onClick={() => updateKeyEmoji(emoji)}
                                    className={`aspect-square flex items-center justify-center rounded-2xl bg-white/50 border-2 ${toyConfig.keys[activeKeyIndex].emoji === emoji ? 'border-rose-300 bg-white shadow-sm scale-110 rotate-3' : 'border-transparent'} hover:bg-white transition-all text-2xl`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                  </div>
                </section>

                <button 
                  onClick={handleFinish}
                  className="mt-6 w-full bg-rose-400 hover:bg-rose-500 text-white font-black py-7 rounded-[2.5rem] shadow-[0_10px_0_0_#fb7185] active:shadow-none active:translate-y-2 transition-all text-2xl flex items-center justify-center gap-3 outline-none"
                >
                  <Sparkles size={28} className="animate-pulse" /> 조립 완료!
                </button>
              </div>
            </main>

            <footer className="mt-24 py-10 text-center border-t border-rose-100">
              <p className="text-[11px] font-black tracking-widest text-rose-300 uppercase italic">Kitsch Factory Experience</p>
              <p className="text-[9px] text-zinc-300 mt-2">© 2026 나だけの키보드 제작소</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
