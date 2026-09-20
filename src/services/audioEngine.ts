/**
 * Web Audio Engine with Equalizer, Realtime Analyser & Procedural Fallback Synth
 */

export class AudioEngine {
  private audioCtx: AudioContext | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private eqFilters: BiquadFilterNode[] = [];

  // Procedural synthesizer state for guaranteed sound playback
  private synthInterval: any = null;
  private isSynthPlaying = false;

  private onTimeUpdateCallback?: (currentTime: number, duration: number) => void;
  private onEndedCallback?: () => void;
  private onPlayStateChangeCallback?: (isPlaying: boolean) => void;

  private frequencies = [60, 250, 1000, 4000, 14000];

  constructor() {
    // Lazy init audio element
    if (typeof window !== "undefined") {
      this.audioElement = new Audio();
      this.audioElement.crossOrigin = "anonymous";
      this.audioElement.preload = "auto";

      this.audioElement.addEventListener("timeupdate", () => {
        if (this.audioElement && this.onTimeUpdateCallback) {
          this.onTimeUpdateCallback(
            this.audioElement.currentTime,
            this.audioElement.duration || 0
          );
        }
      });

      this.audioElement.addEventListener("ended", () => {
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      });

      this.audioElement.addEventListener("play", () => {
        if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(true);
      });

      this.audioElement.addEventListener("pause", () => {
        if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(false);
      });

      this.audioElement.addEventListener("error", (e) => {
        console.warn("Audio element error, falling back to procedural synthesizer:", e);
        this.startProceduralSynth();
      });
    }
  }

  private initAudioContext() {
    if (this.audioCtx) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      if (!this.audioElement) return;

      this.sourceNode = this.audioCtx.createMediaElementSource(this.audioElement);
      this.gainNode = this.audioCtx.createGain();

      this.analyserNode = this.audioCtx.createAnalyser();
      this.analyserNode.fftSize = 256;
      this.analyserNode.smoothingTimeConstant = 0.8;

      // Build 5-band equalizer chain
      this.eqFilters = this.frequencies.map((freq, index) => {
        const filter = this.audioCtx!.createBiquadFilter();
        if (index === 0) {
          filter.type = "lowshelf";
        } else if (index === this.frequencies.length - 1) {
          filter.type = "highshelf";
        } else {
          filter.type = "peaking";
          filter.Q.value = 1.0;
        }
        filter.frequency.value = freq;
        filter.gain.value = 0;
        return filter;
      });

      // Connect: source -> eq[0] -> ... -> eq[4] -> analyser -> gain -> destination
      let lastNode: AudioNode = this.sourceNode;
      for (const filter of this.eqFilters) {
        lastNode.connect(filter);
        lastNode = filter;
      }
      lastNode.connect(this.analyserNode);
      this.analyserNode.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);
    } catch (err) {
      console.warn("Web Audio context initialization error:", err);
    }
  }

  public async setTrack(url: string) {
    this.stopProceduralSynth();
    if (!this.audioElement) return;

    this.audioElement.src = url;
    this.audioElement.load();
  }

  public async play(): Promise<void> {
    this.initAudioContext();
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      await this.audioCtx.resume();
    }

    if (this.isSynthPlaying) {
      if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(true);
      return;
    }

    if (this.audioElement) {
      try {
        await this.audioElement.play();
      } catch (err) {
        console.warn("Autoplay or remote URL blocked, engaging procedural audio:", err);
        this.startProceduralSynth();
      }
    }
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.isSynthPlaying) {
      this.stopProceduralSynth();
      if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(false);
    }
  }

  public seek(seconds: number) {
    if (this.audioElement) {
      this.audioElement.currentTime = seconds;
    }
  }

  public setVolume(volume: number) {
    const clamped = Math.max(0, Math.min(1, volume));
    if (this.audioElement) {
      this.audioElement.volume = clamped;
    }
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(clamped, this.audioCtx?.currentTime || 0);
    }
  }

  public setPlaybackRate(rate: number) {
    if (this.audioElement) {
      this.audioElement.playbackRate = rate;
    }
  }

  public setEqualizerBands(gainsInDb: number[]) {
    this.initAudioContext();
    if (!this.audioCtx) return;

    gainsInDb.forEach((gain, idx) => {
      if (this.eqFilters[idx]) {
        this.eqFilters[idx].gain.setTargetAtTime(gain, this.audioCtx!.currentTime, 0.05);
      }
    });
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyserNode) {
      return new Uint8Array(64).fill(0);
    }
    const data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(data);
    return data;
  }

  public getTimeDomainData(): Uint8Array {
    if (!this.analyserNode) {
      return new Uint8Array(64).fill(128);
    }
    const data = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteTimeDomainData(data);
    return data;
  }

  public onTimeUpdate(callback: (currentTime: number, duration: number) => void) {
    this.onTimeUpdateCallback = callback;
  }

  public onEnded(callback: () => void) {
    this.onEndedCallback = callback;
  }

  public onPlayStateChange(callback: (isPlaying: boolean) => void) {
    this.onPlayStateChangeCallback = callback;
  }

  /**
   * Procedural synthesizer: Plays harmonic soothing chords & arpeggios
   * guaranteed to produce sound directly in browser without relying on external CDNs!
   */
  public startProceduralSynth() {
    this.initAudioContext();
    if (!this.audioCtx) return;

    this.isSynthPlaying = true;
    if (this.onPlayStateChangeCallback) this.onPlayStateChangeCallback(true);

    const notes = [220, 261.63, 329.63, 392, 440, 523.25, 659.25]; // A minor pentatonic
    let step = 0;
    let fakeTime = 0;

    this.synthInterval = setInterval(() => {
      if (!this.audioCtx || !this.isSynthPlaying) return;
      fakeTime += 0.5;
      if (this.onTimeUpdateCallback) {
        this.onTimeUpdateCallback(fakeTime % 180, 180);
      }

      const osc = this.audioCtx.createOscillator();
      const noteGain = this.audioCtx.createGain();

      osc.type = step % 2 === 0 ? "sine" : "triangle";
      const freq = notes[step % notes.length];
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      noteGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.12, this.audioCtx.currentTime + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);

      if (this.analyserNode) {
        osc.connect(noteGain);
        noteGain.connect(this.analyserNode);
      } else {
        osc.connect(noteGain);
        noteGain.connect(this.audioCtx.destination);
      }

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.85);

      step++;
    }, 400);
  }

  public stopProceduralSynth() {
    this.isSynthPlaying = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  public isUsingSynth(): boolean {
    return this.isSynthPlaying;
  }
}
