import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TtsService {
  private synth = window.speechSynthesis;
  private voicesList: SpeechSynthesisVoice[] = [];

  constructor() {
    if (this.synth) {
      this.loadVoices();
      this.synth.onvoiceschanged = () => this.loadVoices();
    }
  }

  private loadVoices(): void {
    this.voicesList = this.synth.getVoices();
  }

  get isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  private getBestVoice(): SpeechSynthesisVoice | null {
    // Prefer high-quality English voices
    const preferred = ['Google US English', 'Microsoft Zira', 'Samantha', 'Alex'];
    for (const name of preferred) {
      const v = this.voicesList.find(v => v.name.includes(name) && v.lang.startsWith('en'));
      if (v) return v;
    }
    return this.voicesList.find(v => v.lang === 'en-US') ||
           this.voicesList.find(v => v.lang.startsWith('en')) ||
           null;
  }

  speak(text: string, rate = 0.85, pitch = 1): void {
    if (!this.isSupported) return;
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1;

    const voice = this.getBestVoice();
    if (voice) utterance.voice = voice;

    this.synth.speak(utterance);
  }

  speakSlow(text: string): void {
    this.speak(text, 0.6, 1);
  }

  stop(): void {
    if (this.isSupported) this.synth.cancel();
  }
}
