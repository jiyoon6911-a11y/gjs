/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FidgetToy, ToyConfig } from './components/FidgetToy';
import { SwitchType, audioService } from './services/audioService';
import { Volume2, Palette, Sparkles, RotateCcw, Heart } from 'lucide-react';

export default function App() {
  const [switchType, setSwitchType] = useState<SwitchType>('blue');
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

  return (
    <div className={`min-h-screen ${bgColor} text-zinc-800 font-sans transition-colors duration-700 overflow-x-hidden relative`}>
      {/* Atmosphere elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-pink-100/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <header className="w-full flex justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-rose-400 p-2 rounded-2xl shadow-lg shadow-rose-200">
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
            <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">
              {isMuted ? 'Muted' : 'Sound On'}
            </span>
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Preview & Toy (Interactive Area) */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col items-center justify-center py-10 bg-white/20 rounded-[3rem] border-2 border-white/40 shadow-inner">
            <div className="scale-110 md:scale-125 mb-24 origin-center">
              <FidgetToy switchType={switchType} config={toyConfig} />
            </div>
            
            <p className="mt-8 text-[11px] font-bold text-rose-300/80 animate-pulse text-center px-4">
              커스텀된 키캡을 직접 눌러 소리를 들어보세요!
            </p>
          </div>

          {/* Right: Controls (Customization Area) */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white/70 p-7 rounded-[2.5rem] border border-white shadow-xl shadow-rose-200/5">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xs font-black uppercase text-rose-400 flex items-center gap-2">
                    <Palette size={14} /> 1. 테마 & 배경
                  </h2>
                  <button 
                    onClick={() => {
                        const randomBg = bgOptions[Math.floor(Math.random() * bgOptions.length)].class;
                        setBgColor(randomBg);
                    }}
                    className="text-[10px] font-black text-rose-300 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw size={10} /> 랜덤 배경
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase mb-3">배경 세계관</p>
                    <div className="flex flex-wrap gap-2">
                      {bgOptions.map(opt => (
                        <button
                          key={opt.name}
                          onClick={() => setBgColor(opt.class)}
                          className={`w-8 h-8 rounded-full ${opt.class} border-2 ${bgColor === opt.class ? 'border-rose-400 scale-110 shadow-md' : 'border-white'} transition-all`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase mb-3">본체 케이스</p>
                    <div className="flex gap-2">
                      {['bg-[#FFEDF3]', 'bg-[#FFFDE7]', 'bg-[#E3F2FD]', 'bg-[#E8F5E9]', 'bg-zinc-800'].map(c => (
                          <button
                              key={c}
                              onClick={() => setToyConfig(prev => ({ ...prev, caseColor: c }))}
                              className={`w-8 h-8 rounded-xl ${c} border-2 ${toyConfig.caseColor === c ? 'border-rose-400 scale-110 shadow-md' : 'border-white'} transition-all`}
                          />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white/70 p-7 rounded-[2.5rem] border border-white shadow-xl shadow-rose-200/5">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xs font-black uppercase text-rose-400 flex items-center gap-2">
                    <Heart size={14} /> 2. 키캡 선택
                  </h2>
                  <span className="text-[10px] font-black text-rose-300 px-2 py-1 bg-rose-50 rounded-lg">Slot {activeKeyIndex + 1}</span>
                </div>
                
                <p className="text-[10px] font-black text-zinc-400 uppercase mb-3">꾸밀 키캡을 골라주세요</p>
                <div className="flex gap-2 bg-rose-50/50 p-1.5 rounded-[1.5rem]">
                  {toyConfig.keys.map((k, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveKeyIndex(i)}
                      className={`flex-1 py-3 rounded-2xl transition-all font-black text-[9px] flex flex-col items-center gap-1 ${activeKeyIndex === i ? 'bg-white text-rose-400 shadow-md scale-105 border border-rose-100' : 'text-zinc-400 hover:text-rose-300'}`}
                    >
                      <span className="text-lg">{k.emoji}</span>
                      <span>#{i+1}</span>
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <section className="bg-white/70 p-7 rounded-[2.5rem] border border-white shadow-xl shadow-rose-200/5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs font-black uppercase text-rose-400 flex items-center gap-2">
                  <Sparkles size={14} /> 3. 디테일 디자인
                </h2>
                <button 
                    onClick={() => {
                        setToyConfig(prev => {
                            const newKeys = [...prev.keys];
                            newKeys[activeKeyIndex] = {
                                emoji: emojiOptions[Math.floor(Math.random() * emojiOptions.length)],
                                color: colorOptions[Math.floor(Math.random() * colorOptions.length)].class
                            };
                            return { ...prev, keys: newKeys };
                        });
                        audioService.playPress(switchType);
                    }}
                    className="text-[10px] font-black text-zinc-400 hover:text-rose-400 flex items-center gap-1 bg-zinc-50 px-3 py-1.5 rounded-full transition-all"
                >
                    🎲 랜덤 슬롯
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="text-[10px] font-black text-zinc-400 uppercase mb-4 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-200" />
                        컬러 칩
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {colorOptions.map(opt => (
                            <button
                                key={opt.name}
                                onClick={() => updateKeyColor(opt.class)}
                                className={`aspect-square rounded-xl ${opt.class} border-2 ${toyConfig.keys[activeKeyIndex].color === opt.class ? 'border-rose-400 scale-110 shadow-md ring-2 ring-rose-100' : 'border-white'} transition-all`}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-[10px] font-black text-zinc-400 uppercase mb-4 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-200" />
                        이모지 아이콘
                    </div>
                    <div className="grid grid-cols-5 gap-2.5">
                        {emojiOptions.map(emoji => (
                            <button
                                key={emoji}
                                onClick={() => updateKeyEmoji(emoji)}
                                className={`aspect-square flex items-center justify-center rounded-xl transition-all text-xl ${toyConfig.keys[activeKeyIndex].emoji === emoji ? 'bg-rose-400 text-white scale-110 rotate-3 shadow-lg' : 'bg-white/50 hover:bg-white text-zinc-400 border border-transparent hover:border-rose-100'}`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
              </div>
            </section>
            
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => {
                  setToyConfig({
                    caseColor: 'bg-[#FFEDF3]',
                    innerColor: 'bg-white/80',
                    keys: [
                      { emoji: '🧸', color: 'bg-[#FFB7B2]' },
                      { emoji: '🍬', color: 'bg-[#B2CEFE]' },
                      { emoji: '🎀', color: 'bg-[#FDFD96]' },
                      { emoji: '🌸', color: 'bg-[#B2FBA5]' },
                    ]
                  });
                  setActiveKeyIndex(0);
                }}
                className="w-full bg-white py-6 rounded-[2rem] border-2 border-rose-100 text-rose-300 hover:text-rose-400 transition-colors flex items-center justify-center gap-3 font-black"
                title="초기화"
              >
                <RotateCcw size={20} /> 전체 초기화
              </button>
            </div>
          </div>
        </main>

        <footer className="mt-20 py-10 text-center border-t border-rose-100 flex flex-col items-center">
          <div className="mb-6 bg-white p-4 rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-50">
            <img src="/qr-code.png" alt="QR Code" className="w-24 h-24" />
            <p className="text-[10px] font-black text-rose-300 mt-2">SCAN TO SHARE</p>
          </div>
          <p className="text-[11px] font-black tracking-widest text-rose-300 uppercase italic">Kitsch Factory Experience</p>
          <p className="text-[9px] text-zinc-300 mt-2">© 2026 나만의 키보드 제작소</p>
        </footer>
      </div>
    </div>
  );
}
