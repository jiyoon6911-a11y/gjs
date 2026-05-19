import { motion, useAnimation } from 'motion/react';
import React, { useState } from 'react';
import { audioService, SwitchType } from '../services/audioService';

interface ToyKeycapProps {
  label: string;
  emoji: string;
  color: string;
  switchType: SwitchType;
}

const ToyKeycap: React.FC<ToyKeycapProps> = ({ label, emoji, color, switchType }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (isPressed) return;
    setIsPressed(true);
    audioService.playPress(switchType);
  };

  const handleRelease = () => {
    if (!isPressed) return;
    setIsPressed(false);
    audioService.playRelease(switchType);
  };

  return (
    <motion.button
      type="button"
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={(e) => { e.preventDefault(); handlePress(); }}
      onTouchEnd={(e) => { e.preventDefault(); handleRelease(); }}
      animate={{
        y: isPressed ? 6 : 0,
        boxShadow: isPressed 
          ? '0 0px 0 0 rgba(0,0,0,0.4)' 
          : '0 8px 0 0 rgba(0,0,0,0.2)',
      }}
      transition={{ type: 'spring', stiffness: 600, damping: 25 }}
      className={`
        relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl cursor-pointer
        ${color} flex flex-col items-center justify-center
        border-t-2 border-white/40
        select-none active:scale-95
      `}
    >
      <span className="text-3xl sm:text-4xl mb-1">{emoji}</span>
      <span className="text-[10px] font-bold opacity-60 uppercase">{label}</span>
      
      {/* Glossy overlay */}
      <div className="absolute inset-x-2 top-2 h-1/3 bg-white/20 rounded-full blur-[2px] pointer-events-none" />
    </motion.button>
  );
};

export const FidgetToy: React.FC<{ switchType: SwitchType }> = ({ switchType }) => {
  return (
    <div className="relative">
      {/* Keyring Chain - Visual Only */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-zinc-500 rounded-full" />
        <div className="w-2 h-8 bg-zinc-500 rounded-full -mt-2" />
        <div className="w-2 h-8 bg-zinc-400 rounded-full -mt-1" />
      </div>

      {/* Case */}
      <div className="bg-zinc-800 p-4 rounded-[2.5rem] shadow-2xl border-t-8 border-zinc-700">
        <div className="bg-zinc-900 p-3 rounded-[2rem] shadow-inner grid grid-cols-2 gap-4">
          <ToyKeycap label="Fire" emoji="🔥" color="bg-rose-500" switchType={switchType} />
          <ToyKeycap label="Water" emoji="💧" color="bg-sky-500" switchType={switchType} />
          <ToyKeycap label="Leaf" emoji="🍃" color="bg-emerald-500" switchType={switchType} />
          <ToyKeycap label="Bolt" emoji="⚡" color="bg-amber-400" switchType={switchType} />
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="px-4 py-1 bg-zinc-700/50 rounded-full">
            <span className="text-[10px] font-black text-zinc-500 tracking-[0.3em] uppercase">
              Fidget Edition
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
