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

  const handlePress = async () => {
    if (isPressed) return;
    setIsPressed(true);
    await audioService.unlock();
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
        relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl cursor-pointer
        ${color} flex items-center justify-center
        border-t-4 border-white/50
        select-none active:scale-95 shadow-lg
      `}
    >
      <span className="text-4xl sm:text-5xl drop-shadow-sm">{emoji}</span>
      
      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full" />
      <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/30 rounded-full" />
      <div className="absolute inset-x-3 top-2 h-1/4 bg-white/20 rounded-full blur-[1px] pointer-events-none" />
    </motion.button>
  );
};

export interface ToyConfig {
  caseColor: string;
  innerColor: string;
  keys: { emoji: string; color: string }[];
}

export const FidgetToy: React.FC<{ switchType: SwitchType; config: ToyConfig }> = ({ 
  switchType, 
  config
}) => {
  return (
    <motion.div 
      className="relative"
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      {/* Kitsch Keyring Chain */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-12 h-12 border-[6px] border-zinc-400 rounded-full shadow-lg flex items-center justify-center bg-white/10">
            <div className="w-4 h-4 bg-zinc-300 rounded-full" />
        </div>
        <div className="w-3 h-10 bg-zinc-400 -mt-1 shadow-md" />
        <div className="w-4 h-4 bg-zinc-500 rounded-full -mt-2" />
      </div>

      {/* Cute Case */}
      <div 
        className={`p-6 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-b-[12px] transition-colors duration-500 ${config.caseColor}`}
        style={{ borderBottomColor: 'rgba(0,0,0,0.1)' }}
      >
        <div className={`p-5 rounded-[2.5rem] shadow-inner grid grid-cols-2 gap-5 border-2 border-black/5 transition-colors duration-500 ${config.innerColor}`}>
          {config.keys.map((key, i) => (
            <ToyKeycap 
                key={i} 
                emoji={key.emoji} 
                color={key.color} 
                switchType={switchType} 
            />
          ))}
        </div>
        
        <div className="mt-5 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-white/30" />
            ))}
        </div>
      </div>
      
      <motion.div 
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} 
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute -right-12 -top-4 text-3xl"
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

