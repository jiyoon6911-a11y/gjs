
import React from 'react';
import { Keycap } from './Keycap';
import { SwitchType } from '../services/audioService';

interface KeyboardProps {
  switchType: SwitchType;
  keycapColor: string;
  onKeyClick: (key: string) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ switchType, keycapColor, onKeyClick }) => {
  const rows = [
    [
      { label: 'Q', size: 1 }, { label: 'W', size: 1 }, { label: 'E', size: 1 }, { label: 'R', size: 1 }, { label: 'T', size: 1 },
      { label: 'Y', size: 1 }, { label: 'U', size: 1 }, { label: 'I', size: 1 }, { label: 'O', size: 1 }, { label: 'P', size: 1 }
    ],
    [
      { label: 'A', size: 1 }, { label: 'S', size: 1 }, { label: 'D', size: 1 }, { label: 'F', size: 1 }, { label: 'G', size: 1 },
      { label: 'H', size: 1 }, { label: 'J', size: 1 }, { label: 'K', size: 1 }, { label: 'L', size: 1 }, { label: ';', size: 1 }
    ],
    [
      { label: 'Z', size: 1 }, { label: 'X', size: 1 }, { label: 'C', size: 1 }, { label: 'V', size: 1 }, { label: 'B', size: 1 },
      { label: 'N', size: 1 }, { label: 'M', size: 1 }, { label: ',', size: 1 }, { label: '.', size: 1 }, { label: '/', size: 1 }
    ],
    [
      { label: 'SPACE', size: 5, color: 'bg-white/90' }
    ]
  ];

  return (
    <div className="bg-[#1A1A1A] p-6 sm:p-10 rounded-[2rem] border-[12px] border-[#2A2A2A] shadow-2xl inline-flex flex-col gap-3">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((key, keyIndex) => (
            <Keycap
              key={`${rowIndex}-${keyIndex}`}
              label={key.label}
              size={key.size}
              color={key.color || keycapColor}
              switchType={switchType}
              onPress={() => onKeyClick(key.label)}
            />
          ))}
        </div>
      ))}
      
      {/* Decorative Brand */}
      <div className="flex justify-end pr-4 mt-2">
        <span className="text-[10px] items-center uppercase tracking-widest text-zinc-600 font-mono flex gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          MECHANICAL SIMULATOR v1.0
        </span>
      </div>
    </div>
  );
};
