
export type SwitchType = 'blue' | 'red' | 'brown';

class KeyboardAudio {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public async playPress(type: SwitchType) {
    this.init();
    if (!this.ctx) return;

    // Haptic feedback (vibration)
    if ('vibrate' in navigator) {
      try {
        if (type === 'blue') {
          navigator.vibrate([15, 30, 15]); // More distinct double tap
        } else if (type === 'red') {
          navigator.vibrate(20); 
        } else {
          navigator.vibrate(30); 
        }
      } catch (e) {
        console.warn('Vibration blocked', e);
      }
    }

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === 'blue') {
      // High pitch double click (clicky)
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.02);
      
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(800, t + 0.01);
      osc2.frequency.exponentialRampToValueAtTime(100, t + 0.05);
      
      const g2 = this.ctx.createGain();
      osc2.connect(g2);
      g2.connect(this.ctx.destination);
      
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.02);
      
      g2.gain.setValueAtTime(0.05, t + 0.01);
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      
      osc2.start(t + 0.01);
      osc2.stop(t + 0.05);

    } else if (type === 'red') {
      // Dull, deep thump (linear)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.12);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
    } else {
      // Tactile "thock" (brown)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    }

    osc.start(t);
    osc.stop(t + 0.1);
  }

  public playRelease(type: SwitchType) {
    this.init();
    if (!this.ctx) return;
    
    // Release sound is usually a lighter version of the press + resonance
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.03);
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.start(t);
    osc.stop(t + 0.03);
  }
}

export const audioService = new KeyboardAudio();
