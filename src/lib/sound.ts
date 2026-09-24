export type SoundType = "click" | "toggle" | "success";

const BASE_VOLUME = 0.3;
const THROTTLE_MS = 40;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;
const lastPlayed: Partial<Record<SoundType, number>> = {};

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.connect(ctx.destination);

    const length = Math.floor(ctx.sampleRate * 0.1);
    noise = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

const vary = (amount: number) => 1 + (Math.random() * 2 - 1) * amount;

function envelope(param: AudioParam, t: number, peak: number, decay: number) {
  param.setValueAtTime(0.0001, t);
  param.linearRampToValueAtTime(peak, t + 0.001);
  param.exponentialRampToValueAtTime(0.0001, t + decay);
}

function tick(ac: AudioContext, out: AudioNode, t: number, level: number, pitch = 1) {
  const p = pitch * vary(0.05);
  const g = level * vary(0.1);

  const src = ac.createBufferSource();
  src.buffer = noise;
  const band = ac.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 3200 * p;
  band.Q.value = 1.4;
  const noiseGain = ac.createGain();
  envelope(noiseGain.gain, t, 0.5 * g, 0.012);
  src.connect(band).connect(noiseGain).connect(out);
  src.start(t, Math.random() * 0.07, 0.02);

  const body = ac.createOscillator();
  body.type = "triangle";
  body.frequency.setValueAtTime(230 * p, t);
  body.frequency.exponentialRampToValueAtTime(110 * p, t + 0.04);
  const bodyGain = ac.createGain();
  envelope(bodyGain.gain, t, 0.35 * g, 0.045);
  body.connect(bodyGain).connect(out);
  body.start(t);
  body.stop(t + 0.05);
}

function chime(ac: AudioContext, out: AudioNode, t: number, freq: number, peak: number) {
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(peak, t + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  osc.connect(gain).connect(out);
  osc.start(t);
  osc.stop(t + 0.17);
}

export function playSound(type: SoundType, volume: number = BASE_VOLUME) {
  const now = performance.now();
  if (now - (lastPlayed[type] ?? -Infinity) < THROTTLE_MS) return;
  lastPlayed[type] = now;

  const ac = getContext();
  if (!ac || !master || !noise) return;

  const level = Math.max(0, Math.min(volume / BASE_VOLUME, 2)) * 0.3;
  const t = ac.currentTime + 0.002;

  try {
    switch (type) {
      case "click":
        tick(ac, master, t, level);
        break;
      case "toggle":
        tick(ac, master, t, level * 0.8, 0.9);
        tick(ac, master, t + 0.07, level, 1.25);
        break;
      case "success":
        tick(ac, master, t, level * 0.7);
        chime(ac, master, t, 1046.5 * vary(0.01), level * 0.12);
        chime(ac, master, t + 0.08, 1568 * vary(0.01), level * 0.1);
        break;
    }
  } catch {
    // audio is best-effort
  }
}
