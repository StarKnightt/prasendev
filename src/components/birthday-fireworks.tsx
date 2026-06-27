"use client";

import { useEffect, useRef, useState } from "react";

// Module-level guard so the show plays once per full page load, not on every
// client-side navigation back to the home page within the same session.
let hasCelebrated = false;

const BIRTHDAY_MONTH = 5; // June (0-indexed)
const BIRTHDAY_DATE = 27;

const LAUNCH_MS = 12000; // keep launching new rockets for this long
const MAX_MS = 17000; // hard stop, letting late bursts finish

const PALETTES = [
  ["#ff6ec7", "#ff9a76", "#fffb96", "#a855f7"],
  ["#00d4ff", "#00ff87", "#7b2ff7", "#ff00c8"],
  ["#fbbf24", "#f472b6", "#818cf8", "#34d399"],
  ["#e879f9", "#38bdf8", "#fbbf24", "#f87171"],
  ["#c084fc", "#fb7185", "#60a5fa", "#4ade80"],
  ["#f97316", "#eab308", "#a855f7", "#06b6d4"],
  ["#f0abfc", "#67e8f9", "#fcd34d", "#fca5a5"],
];

type Pt = { x: number; y: number };

export function BirthdayFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);
  const [opacityOn, setOpacityOn] = useState(false);

  // Decide whether to celebrate after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    if (hasCelebrated) return;
    const now = new Date();
    if (now.getMonth() !== BIRTHDAY_MONTH || now.getDate() !== BIRTHDAY_DATE) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hasCelebrated = true;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;
    let finished = false;
    let raf = 0;
    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const fireworks: Firework[] = [];
    const particles: Particle[] = [];
    const sparks: Spark[] = [];
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const withAlpha = (hex: string, a: number) =>
      hex +
      Math.floor(Math.max(0, Math.min(1, a)) * 255)
        .toString(16)
        .padStart(2, "0");

    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      life = 1;
      decay = 0.02 + Math.random() * 0.02;
      size = Math.random() * 1.5 + 0.5;
      constructor(x: number, y: number, vx: number, vy: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
      }
      update() {
        this.vx *= 0.96;
        this.vy *= 0.96;
        this.vy += 0.05;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = withAlpha(this.color, this.life * 0.8);
        ctx!.fill();
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      hasTail: boolean;
      life = 1;
      decay = 0.008 + Math.random() * 0.008;
      size = Math.random() * 2 + 1;
      trail: Pt[] = [];
      constructor(
        x: number,
        y: number,
        vx: number,
        vy: number,
        color: string,
        hasTail: boolean
      ) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.hasTail = hasTail;
      }
      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 8) this.trail.shift();
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.vy += 0.03;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
      }
      draw() {
        if (this.hasTail && this.trail.length > 1) {
          for (let i = 1; i < this.trail.length; i++) {
            const t = this.trail[i];
            const prev = this.trail[i - 1];
            const alpha = (i / this.trail.length) * this.life * 0.4;
            ctx!.beginPath();
            ctx!.moveTo(prev.x, prev.y);
            ctx!.lineTo(t.x, t.y);
            ctx!.strokeStyle = withAlpha(this.color, alpha);
            ctx!.lineWidth = this.size * 0.5;
            ctx!.stroke();
          }
        }
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = withAlpha(this.color, this.life);
        ctx!.fill();
        if (this.life > 0.3) {
          const glow = ctx!.createRadialGradient(
            this.x,
            this.y,
            0,
            this.x,
            this.y,
            this.size * 3
          );
          glow.addColorStop(0, withAlpha(this.color, this.life * 0.35));
          glow.addColorStop(1, "transparent");
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }
      }
    }

    class Firework {
      x: number;
      y: number;
      speed = 4 + Math.random() * 3;
      angle: number;
      vx: number;
      vy: number;
      distanceToTarget: number;
      distanceTraveled = 0;
      trail: Pt[] = [];
      palette: string[] = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      alive = true;
      constructor(x: number, y: number, targetX: number, targetY: number) {
        this.x = x;
        this.y = y;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.distanceToTarget = Math.hypot(targetX - x, targetY - y);
      }
      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 12) this.trail.shift();
        this.x += this.vx;
        this.y += this.vy;
        this.distanceTraveled += this.speed;
        if (this.distanceTraveled >= this.distanceToTarget * 0.9) {
          this.explode();
          this.alive = false;
        }
      }
      draw() {
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          const alpha = (i / this.trail.length) * 0.5;
          ctx!.beginPath();
          ctx!.arc(t.x, t.y, 1.4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx!.fill();
        }
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, 3);
        g.addColorStop(0, "#fff");
        g.addColorStop(0.5, this.palette[0]);
        g.addColorStop(1, "transparent");
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();
      }
      explode() {
        const count = 70 + Math.floor(Math.random() * 50);
        const type = Math.random();
        if (type < 0.3) this.spiral(count);
        else if (type < 0.6) this.burst(count);
        else this.ring(count);
        for (let i = 0; i < 22; i++) {
          const a = Math.random() * Math.PI * 2;
          const s = Math.random() * 6 + 2;
          sparks.push(
            new Spark(
              this.x,
              this.y,
              Math.cos(a) * s,
              Math.sin(a) * s,
              this.palette[Math.floor(Math.random() * this.palette.length)]
            )
          );
        }
      }
      spiral(count: number) {
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 6;
          const s = 2 + (i / count) * 6;
          particles.push(
            new Particle(
              this.x,
              this.y,
              Math.cos(a) * s,
              Math.sin(a) * s,
              this.palette[i % this.palette.length],
              true
            )
          );
        }
      }
      burst(count: number) {
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + Math.random() * 0.3;
          const s = Math.random() * 7 + 1;
          particles.push(
            new Particle(
              this.x,
              this.y,
              Math.cos(a) * s,
              Math.sin(a) * s,
              this.palette[Math.floor(Math.random() * this.palette.length)],
              false
            )
          );
        }
      }
      ring(count: number) {
        const rings = 2 + Math.floor(Math.random() * 2);
        for (let r = 0; r < rings; r++) {
          const ringCount = Math.floor(count / rings);
          for (let i = 0; i < ringCount; i++) {
            const a = (i / ringCount) * Math.PI * 2;
            const s = 3 + r * 2.5;
            particles.push(
              new Particle(
                this.x,
                this.y,
                Math.cos(a) * s,
                Math.sin(a) * s,
                this.palette[r % this.palette.length],
                false
              )
            );
          }
        }
      }
    }

    const launch = (tx?: number, ty?: number) => {
      const targetX = tx ?? rand(width * 0.12, width * 0.88);
      const targetY = ty ?? rand(height * 0.12, height * 0.45);
      const originX = width / 2 + rand(-width * 0.18, width * 0.18);
      fireworks.push(new Firework(originX, height, targetX, targetY));
    };

    const onPointer = (e: PointerEvent) => launch(e.clientX, e.clientY);
    window.addEventListener("pointerdown", onPointer);

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setOpacityOn(false); // CSS fade-out
      fadeTimeout = setTimeout(() => {
        if (!cancelled) setShow(false);
      }, 750);
    };

    // Opening volley.
    launch(width * 0.5, height * 0.3);
    launch(width * 0.32, height * 0.36);
    launch(width * 0.7, height * 0.33);

    const start = performance.now();
    let launchTimer = 0;

    const frame = (t: number) => {
      const elapsed = t - start;

      // Fade previous frame without painting a black box (keeps page visible).
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (elapsed < LAUNCH_MS) {
        launchTimer++;
        if (launchTimer > 16 + Math.random() * 14) {
          launchTimer = 0;
          launch();
          if (Math.random() < 0.45) launch();
        }
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();
        if (!fireworks[i].alive) fireworks.splice(i, 1);
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].life <= 0) sparks.splice(i, 1);
      }

      const empty =
        fireworks.length === 0 && particles.length === 0 && sparks.length === 0;
      if (elapsed > MAX_MS || (elapsed > LAUNCH_MS && empty)) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    const fadeInRaf = requestAnimationFrame(() => setOpacityOn(true));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(fadeInRaf);
      if (fadeTimeout) clearTimeout(fadeTimeout);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 9998,
        opacity: opacityOn ? 1 : 0,
        transition: "opacity 650ms ease",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
