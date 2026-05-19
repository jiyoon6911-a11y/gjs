import { motion, useAnimation } from 'motion/react';
import React, { useState } from 'react';
import { audioService, SwitchType } from '../services/audioService';

interface ToyKeycapProps {
  emoji: string;
  color: string;
  switchType: SwitchType;
}

const ToyKeycap: React.FC<ToyKeycapProps> = ({ emoji, color, switchType }) => {
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
        y: isPressed ? 8 : 0,
        boxShadow: isPressed 
          ? '0 0px 0 0 rgba(0,0,0,0.3)' 
          : '0 10px 0 0 rgba(0,0,0,0.15)',
      }}
      transition={{ type: 'spring', stiffness: 700, damping: 20 }}
      className={`
        relative w-24 h-24 rounded-3xl cursor-pointer
        ${color} flex items-center justify-center
        border-t-4 border-white/50
        select-none active:scale-95 shadow-lg
      `}
    >
      <span className="text-5xl drop-shadow-sm">{emoji}</span>
      
      {/* Decorative stars/dots for kitsch feel */}
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full" />
      <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/30 rounded-full" />

      {/* Glossy highlight */}
      <div className="absolute inset-x-3 top-2 h-1/4 bg-white/20 rounded-full blur-[1px] pointer-events-none" />
    </motion.button>
  );
};

export const FidgetToy: React.FC<{ switchType: SwitchType }> = ({ switchType }) => {
  return (
    <div className="relative">
      {/* Kitsch Keyring Chain */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-12 h-12 border-[6px] border-zinc-400 rounded-full shadow-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-zinc-300 rounded-full" />
        </div>
        <div className="w-3 h-10 bg-zinc-400 -mt-1 shadow-md" />
        <div className="w-4 h-4 bg-zinc-500 rounded-full -mt-2" />
      </div>

      {/* Cute Case */}
      <div className="bg-[#FFEDF3] p-6 rounded-[3.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.3)] border-b-[12px] border-[#FFD1DC]">
        <div className="bg-white/80 p-5 rounded-[2.5rem] shadow-inner grid grid-cols-2 gap-5 border border-[#FFD1DC]">
          <ToyKeycap emoji="🧸" color="bg-[#FFB7B2]" switchType={switchType} />
          <ToyKeycap emoji="🍬" color="bg-[#B2CEFE]" switchType={switchType} />
          <ToyKeycap emoji="🎀" color="bg-[#FDFD96]" switchType={switchType} />
          <ToyKeycap emoji="🌸" color="bg-[#B2FBA5]" switchType={switchType} />
        </div>
        
        <div className="mt-5 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-pink-200" />
            ))}
        </div>
      </div>
      
      {/* Floating Kitsch element */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute -right-12 -top-4 text-3xl opacity-80"
      >
        ✨
      </motion.div>
    </div>
  );
};
