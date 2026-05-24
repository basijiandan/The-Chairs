export class ToneSynth {
  private ctx: AudioContext | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;

  constructor() {
    // Lazy initialized on user interaction to comply with autoplay policy
  }

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playChords(notes: number[], durationSec = 1.8) {
    try {
      this.initCtx();
      if (!this.ctx || !this.gainNode) return;

      // Stop previous active notes
      this.stop();

      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      
      // Lush fade-in to avoid pops
      this.gainNode.gain.setValueAtTime(0, now);
      this.gainNode.gain.linearRampToValueAtTime(0.18, now + 0.15); // soft volume
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      this.activeOscillators = notes.map((freq, index) => {
        const osc = this.ctx!.createOscillator();
        
        // Combine sine and triangle waves for a warm cozy retro synthesizer tone
        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        
        // Layer a tiny detune to create a lush chorus effect (classic dream-pop feel)
        const detuneValue = (index - 2) * 8; 
        osc.detune.setValueAtTime(detuneValue, now);

        osc.connect(this.gainNode!);
        osc.start(now);
        osc.stop(now + durationSec);
        return osc;
      });
    } catch (e) {
      console.warn("Web Audio synthesis failed or blocked by policy:", e);
    }
  }

  public playBeep(freq = 440, durationSec = 0.1) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + durationSec);
    } catch {}
  }

  public stop() {
    this.activeOscillators.forEach(osc => {
      try { osc.stop(); } catch {}
    });
    this.activeOscillators = [];
  }
}

export const synthInstance = new ToneSynth();
