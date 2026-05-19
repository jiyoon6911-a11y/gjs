
export type SwitchType = 'blue' | 'red' | 'brown';

class KeyboardAudio {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  public playPress(type: SwitchType) {
    this.init();
    if (!this.ctx) return;

    // Haptic feedback (vibration)
    if ('vibrate' in navigator) {
      if (type === 'blue') {
        navigator.vibrate([10, 5, 10]); // Quick double tap feel
      } else if (type === 'red') {
        navigator.vibrate(15); // Solid single tap
      } else {
        navigator.vibrate(20); // Tactile bump feel
      }
    }

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    if (type === 'blue') {
      // High pitch click
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
    } else if (type === 'red') {
      // Dull thump
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.1);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
    } else {
      // Tactile thock
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);
      gain.gain.setValueAtTime(0.15, t);
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
