
import { motion, useAnimation } from 'motion/react';
import React, { useState } from 'react';
import { audioService, SwitchType } from '../services/audioService';

interface KeycapProps {
  label: string;
  subLabel?: string;
  color?: string;
  size?: number; // width multiplier
  switchType: SwitchType;
  onPress?: () => void;
}

export const Keycap: React.FC<KeycapProps> = ({ 
  label, 
  subLabel, 
  color = 'bg-[#ECECEC]', 
  size = 1,
  switchType,
  onPress 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const controls = useAnimation();

  const handlePress = () => {
    if (isPressed) return;
    setIsPressed(true);
    audioService.playPress(switchType);
    onPress?.();
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
        y: isPressed ? 4 : 0,
        scale: isPressed ? 0.98 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      className={`
        relative select-none outline-none
        h-14 sm:h-16 rounded-lg cursor-pointer
        ${color} 
        border-b-4 border-black/20
        shadow-[0_4px_0_0_rgba(0,0,0,0.2)]
        active:shadow-none
        flex flex-col items-center justify-center
      `}
      style={{
        flexBasis: `${size * 4}rem`,
        minWidth: `${size * 2}rem`,
      }}
      id={`keycap-${label.toLowerCase()}`}
    >
      <div className="flex flex-col items-center justify-center gap-0.5">
        {subLabel && <span className="text-[10px] leading-none opacity-50 font-mono">{subLabel}</span>}
        <span className="text-sm sm:text-base font-bold text-black/70 font-sans">{label}</span>
      </div>
      
      {/* Tactical highlight */}
      <div className="absolute inset-0 rounded-lg pointer-events-none border-t border-white/30" />
    </motion.button>
  );
};
