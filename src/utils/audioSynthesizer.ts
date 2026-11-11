// Web Audio API realistic tone synthesizer for classical instruments

class SoundEngine {
  private ctx: AudioContext | null = null;
  private activeNodes: { stop: () => void }[] = [];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public stopAll() {
    this.activeNodes.forEach(node => {
      try {
        node.stop();
      } catch {
        // ignore
      }
    });
    this.activeNodes = [];
  }

  public playInstrumentPreview(preset: string, onEnded?: () => void) {
    this.stopAll();
    const ctx = this.getContext();
    const now = ctx.currentTime;

    let isPlaying = true;
    const stopHandle = () => {
      isPlaying = false;
      if (onEnded) onEnded();
    };

    switch (preset) {
      case 'violin':
        this.playMelody(ctx, [
          { freq: 440, dur: 0.6, type: 'sawtooth', gain: 0.15 }, // A4
          { freq: 493.88, dur: 0.5, type: 'sawtooth', gain: 0.16 }, // B4
          { freq: 554.37, dur: 0.6, type: 'sawtooth', gain: 0.17 }, // C#5
          { freq: 659.25, dur: 1.2, type: 'sawtooth', gain: 0.20 }, // E5
        ], 'violin', stopHandle);
        break;

      case 'viola':
        this.playMelody(ctx, [
          { freq: 220, dur: 0.7, type: 'sawtooth', gain: 0.20 }, // A3
          { freq: 261.63, dur: 0.6, type: 'sawtooth', gain: 0.22 }, // C4
          { freq: 293.66, dur: 0.7, type: 'sawtooth', gain: 0.22 }, // D4
          { freq: 329.63, dur: 1.4, type: 'sawtooth', gain: 0.25 }, // E4
        ], 'viola', stopHandle);
        break;

      case 'saxophone':
        this.playMelody(ctx, [
          { freq: 293.66, dur: 0.5, type: 'square', gain: 0.15 }, // D4
          { freq: 349.23, dur: 0.5, type: 'square', gain: 0.17 }, // F4
          { freq: 392.00, dur: 0.6, type: 'square', gain: 0.18 }, // G4
          { freq: 440.00, dur: 0.5, type: 'square', gain: 0.18 }, // A4
          { freq: 523.25, dur: 1.4, type: 'square', gain: 0.20 }, // C5
        ], 'saxophone', stopHandle);
        break;

      case 'frenchHorn':
        this.playMelody(ctx, [
          { freq: 174.61, dur: 0.8, type: 'sine', gain: 0.25 }, // F3
          { freq: 220.00, dur: 0.8, type: 'sine', gain: 0.28 }, // A3
          { freq: 261.63, dur: 0.9, type: 'sine', gain: 0.30 }, // C4
          { freq: 349.23, dur: 1.8, type: 'sine', gain: 0.32 }, // F4
        ], 'frenchHorn', stopHandle);
        break;

      case 'cello':
        this.playMelody(ctx, [
          { freq: 130.81, dur: 0.8, type: 'sawtooth', gain: 0.24 }, // C3
          { freq: 164.81, dur: 0.7, type: 'sawtooth', gain: 0.25 }, // E3
          { freq: 196.00, dur: 0.8, type: 'sawtooth', gain: 0.26 }, // G3
          { freq: 261.63, dur: 1.5, type: 'sawtooth', gain: 0.28 }, // C4
        ], 'cello', stopHandle);
        break;

      case 'flute':
        this.playMelody(ctx, [
          { freq: 523.25, dur: 0.6, type: 'sine', gain: 0.22 }, // C5
          { freq: 587.33, dur: 0.5, type: 'sine', gain: 0.24 }, // D5
          { freq: 659.25, dur: 0.6, type: 'sine', gain: 0.25 }, // E5
          { freq: 783.99, dur: 1.2, type: 'sine', gain: 0.26 }, // G5
        ], 'flute', stopHandle);
        break;

      case 'clarinet':
        this.playMelody(ctx, [
          { freq: 261.63, dur: 0.6, type: 'triangle', gain: 0.22 }, // C4
          { freq: 329.63, dur: 0.5, type: 'triangle', gain: 0.24 }, // E4
          { freq: 392.00, dur: 0.6, type: 'triangle', gain: 0.25 }, // G4
          { freq: 523.25, dur: 1.3, type: 'triangle', gain: 0.26 }, // C5
        ], 'clarinet', stopHandle);
        break;

      case 'trumpet':
        this.playMelody(ctx, [
          { freq: 349.23, dur: 0.4, type: 'sawtooth', gain: 0.20 }, // F4
          { freq: 440.00, dur: 0.4, type: 'sawtooth', gain: 0.22 }, // A4
          { freq: 523.25, dur: 0.5, type: 'sawtooth', gain: 0.24 }, // C5
          { freq: 698.46, dur: 1.2, type: 'sawtooth', gain: 0.25 }, // F5
        ], 'trumpet', stopHandle);
        break;

      case 'timpani':
        this.playMelody(ctx, [
          { freq: 98.00, dur: 0.8, type: 'sine', gain: 0.35 }, // G2
          { freq: 110.00, dur: 0.7, type: 'sine', gain: 0.35 }, // A2
          { freq: 130.81, dur: 1.5, type: 'sine', gain: 0.40 }, // C3
        ], 'timpani', stopHandle);
        break;

      default:
        this.playMelody(ctx, [
          { freq: 440, dur: 0.6, type: 'triangle', gain: 0.2 },
          { freq: 554.37, dur: 0.6, type: 'triangle', gain: 0.22 },
          { freq: 659.25, dur: 1.2, type: 'triangle', gain: 0.25 },
        ], 'default', stopHandle);
        break;
    }
  }

  private playMelody(
    ctx: AudioContext,
    notes: { freq: number; dur: number; type: OscillatorType; gain: number }[],
    preset: string,
    onEnded: () => void
  ) {
    let offset = 0;
    const totalDuration = notes.reduce((sum, n) => sum + n.dur, 0);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.7, ctx.currentTime);
    masterGain.connect(ctx.destination);

    notes.forEach((note, index) => {
      const startTime = ctx.currentTime + offset;
      const endTime = startTime + note.dur;

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator(); // harmonic detune
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Configure timbre
      if (preset === 'violin' || preset === 'viola' || preset === 'cello') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(preset === 'violin' ? 2400 : 1800, startTime);
        filter.Q.setValueAtTime(2.5, startTime);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.freq, startTime);

        // Vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(5.5, startTime);
        vibratoGain.gain.setValueAtTime(4.0, startTime);
        vibrato.connect(osc.frequency);
        vibrato.start(startTime + 0.1);
        vibrato.stop(endTime);

        // Attack & Release for bowed string
        gainNode.gain.setValueAtTime(0.001, startTime);
        gainNode.gain.exponentialRampToValueAtTime(note.gain, startTime + 0.12);
        gainNode.gain.setValueAtTime(note.gain, endTime - 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);

      } else if (preset === 'saxophone') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, startTime);
        filter.Q.setValueAtTime(1.8, startTime);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.freq, startTime);

        osc2.type = 'square';
        osc2.frequency.setValueAtTime(note.freq * 2, startTime);
        const osc2Gain = ctx.createGain();
        osc2Gain.gain.setValueAtTime(0.3, startTime);
        osc2.connect(osc2Gain);
        osc2Gain.connect(filter);
        osc2.start(startTime);
        osc2.stop(endTime);

        gainNode.gain.setValueAtTime(0.001, startTime);
        gainNode.gain.exponentialRampToValueAtTime(note.gain, startTime + 0.08);
        gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);

      } else if (preset === 'frenchHorn') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, startTime);
        filter.Q.setValueAtTime(1.2, startTime);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, startTime);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(note.freq * 2, startTime);
        const osc2Gain = ctx.createGain();
        osc2Gain.gain.setValueAtTime(0.4, startTime);
        osc2.connect(osc2Gain);
        osc2Gain.connect(filter);
        osc2.start(startTime);
        osc2.stop(endTime);

        gainNode.gain.setValueAtTime(0.001, startTime);
        gainNode.gain.exponentialRampToValueAtTime(note.gain, startTime + 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);

      } else {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, startTime);
        osc.type = note.type;
        osc.frequency.setValueAtTime(note.freq, startTime);

        gainNode.gain.setValueAtTime(0.001, startTime);
        gainNode.gain.exponentialRampToValueAtTime(note.gain, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, endTime);
      }

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(masterGain);

      osc.start(startTime);
      osc.stop(endTime);

      offset += note.dur;
    });

    const timer = setTimeout(() => {
      onEnded();
    }, totalDuration * 1000);

    this.activeNodes.push({
      stop: () => {
        clearTimeout(timer);
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      },
    });
  }
}

export const soundEngine = new SoundEngine();
