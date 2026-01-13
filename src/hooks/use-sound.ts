"use client";

import { useCallback, useRef, useEffect } from "react";

type SoundType = "click" | "hover" | "success" | "toggle" | "pop" | "whoosh";

interface UseSoundOptions {
  volume?: number;
  enabled?: boolean;
}

// Create audio context lazily to avoid issues with SSR
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Sound generators using Web Audio API
const playClickSound = (ctx: AudioContext, volume: number) => {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.setValueAtTime(800, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
  
  gainNode.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  
  oscillator.type = "sine";
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.08);
};

const playHoverSound = (ctx: AudioContext, volume: number) => {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.03);
  
  gainNode.gain.setValueAtTime(volume * 0.05, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
  
  oscillator.type = "sine";
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.03);
};

const playSuccessSound = (ctx: AudioContext, volume: number) => {
  const oscillator1 = ctx.createOscillator();
  const oscillator2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  // First note
  oscillator1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
  oscillator1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
  
  // Second note (harmony)
  oscillator2.frequency.setValueAtTime(659.25, ctx.currentTime);
  oscillator2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.1); // G5
  
  gainNode.gain.setValueAtTime(volume * 0.1, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  
  oscillator1.type = "sine";
  oscillator2.type = "sine";
  oscillator1.start(ctx.currentTime);
  oscillator2.start(ctx.currentTime);
  oscillator1.stop(ctx.currentTime + 0.2);
  oscillator2.stop(ctx.currentTime + 0.2);
};

const playToggleSound = (ctx: AudioContext, volume: number) => {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.setValueAtTime(400, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);
  
  gainNode.gain.setValueAtTime(volume * 0.12, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  
  oscillator.type = "sine";
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
};

const playPopSound = (ctx: AudioContext, volume: number) => {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.setValueAtTime(150, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.02);
  oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
  
  gainNode.gain.setValueAtTime(volume * 0.2, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  
  oscillator.type = "sine";
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
};

const playWhooshSound = (ctx: AudioContext, volume: number) => {
  const bufferSize = ctx.sampleRate * 0.15;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  
  const noise = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gainNode = ctx.createGain();
  
  noise.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.1);
  filter.Q.value = 1;
  
  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  gainNode.gain.setValueAtTime(volume * 0.08, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  
  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.15);
};

export function useSound(options: UseSoundOptions = {}) {
  const { volume = 0.5, enabled = true } = options;
  const isUnlockedRef = useRef(false);

  // Unlock audio context on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
      isUnlockedRef.current = true;
    };

    // Try to unlock on various interactions
    const events = ["click", "touchstart", "keydown"];
    events.forEach((event) => {
      document.addEventListener(event, unlockAudio, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, unlockAudio);
      });
    };
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      
      const ctx = getAudioContext();
      if (!ctx) return;

      // Resume context if suspended
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      try {
        switch (type) {
          case "click":
            playClickSound(ctx, volume);
            break;
          case "hover":
            playHoverSound(ctx, volume);
            break;
          case "success":
            playSuccessSound(ctx, volume);
            break;
          case "toggle":
            playToggleSound(ctx, volume);
            break;
          case "pop":
            playPopSound(ctx, volume);
            break;
          case "whoosh":
            playWhooshSound(ctx, volume);
            break;
        }
      } catch (e) {
        // Silently fail if audio doesn't work
        console.warn("Sound playback failed:", e);
      }
    },
    [enabled, volume]
  );

  return { play };
}

// Global sound player for components that don't use hooks
export const playSound = (type: SoundType, volume: number = 0.5) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  try {
    switch (type) {
      case "click":
        playClickSound(ctx, volume);
        break;
      case "hover":
        playHoverSound(ctx, volume);
        break;
      case "success":
        playSuccessSound(ctx, volume);
        break;
      case "toggle":
        playToggleSound(ctx, volume);
        break;
      case "pop":
        playPopSound(ctx, volume);
        break;
      case "whoosh":
        playWhooshSound(ctx, volume);
        break;
    }
  } catch (e) {
    console.warn("Sound playback failed:", e);
  }
};
