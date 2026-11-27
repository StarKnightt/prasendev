// components/sunlight.tsx
// Afternoon light on the paper, on every page. Blurred plant shadows (a branch, a
// hanging vine, a reed plume, a fern) and patches of window light fall across the
// page, each page with its own arrangement, placed by how far down the page they sit
// so later sections get some too. Shadows multiply into the paper; in dark mode they
// turn to faint moonlight. Shapes live in sunlight-shapes.ts; nothing is computed here.
"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { SHADOW_SHAPES, type ShadowKind } from "@/components/sunlight-shapes";

type Plant = {
  kind: ShadowKind;
  side: "left" | "right";
  /** distance from the top of the page: px for the first screen, % further down */
  top: string;
  /** width on wide screens, capped; and on phones */
  w: string;
  max: number;
  sm: string;
  /** how far it hangs off the edge, as a share of its own width */
  off?: number;
  offSm?: number;
  flip?: boolean;
  tilt?: number;
  sway?: "slow" | "slower" | "none";
};
type Light = { side: "left" | "right"; top: string };
type Scene = { plants: Plant[]; lights: Light[]; band?: boolean };

const BRANCH_TOP: Plant = { kind: "branch", side: "right", top: "-24px", w: "60vw", max: 780, sm: "135vw", off: 0.05, offSm: 0.28 };

const SCENES: Record<string, Scene> = {
  home: {
    band: true,
    plants: [
      BRANCH_TOP,
      { kind: "vine", side: "left", top: "21%", w: "22vw", max: 300, sm: "48vw", off: 0.25, sway: "slower" },
      { kind: "reed", side: "right", top: "40%", w: "20vw", max: 280, sm: "50vw", off: 0.3, tilt: -8 },
      { kind: "fern", side: "left", top: "62%", w: "34vw", max: 460, sm: "80vw", off: 0.35, tilt: 6 },
      { kind: "branch", side: "right", top: "82%", w: "42vw", max: 560, sm: "100vw", off: 0.2, tilt: 18 },
    ],
    lights: [{ side: "left", top: "50%" }],
  },
  lab: {
    plants: [
      { kind: "fern", side: "right", top: "-30px", w: "42vw", max: 560, sm: "100vw", off: 0.12, flip: true, tilt: 160 },
      { kind: "reed", side: "left", top: "38%", w: "20vw", max: 280, sm: "50vw", off: 0.3, tilt: 8 },
      { kind: "branch", side: "right", top: "70%", w: "44vw", max: 580, sm: "100vw", off: 0.2, tilt: 14 },
    ],
    lights: [{ side: "left", top: "120px" }],
  },
  projects: {
    plants: [
      { kind: "vine", side: "right", top: "-10px", w: "24vw", max: 320, sm: "55vw", off: 0.15, flip: true, sway: "slower" },
      { kind: "fern", side: "left", top: "48%", w: "34vw", max: 460, sm: "80vw", off: 0.35, tilt: 4 },
    ],
    lights: [{ side: "right", top: "58%" }],
  },
  blog: {
    plants: [
      { kind: "reed", side: "left", top: "40px", w: "20vw", max: 300, sm: "50vw", off: 0.3, tilt: 10 },
      { kind: "branch", side: "right", top: "45%", w: "44vw", max: 580, sm: "100vw", off: 0.2, tilt: 12 },
    ],
    lights: [{ side: "right", top: "80px" }],
  },
  post: {
    // a reading page: one quiet branch at the top, nothing over the text below
    plants: [{ ...BRANCH_TOP, w: "46vw", max: 620, sm: "110vw" }],
    lights: [],
  },
  shelf: {
    plants: [
      { kind: "fern", side: "right", top: "-30px", w: "40vw", max: 540, sm: "100vw", off: 0.12, flip: true, tilt: 160 },
      { kind: "vine", side: "left", top: "50%", w: "22vw", max: 300, sm: "48vw", off: 0.25, sway: "slower" },
    ],
    lights: [{ side: "left", top: "140px" }],
  },
  other: { plants: [BRANCH_TOP], lights: [] },
};

function sceneFor(path: string): Scene {
  if (path === "/") return SCENES.home;
  if (path.startsWith("/lab")) return SCENES.lab;
  if (path.startsWith("/projects")) return SCENES.projects;
  if (path === "/blog") return SCENES.blog;
  if (path.startsWith("/blog/")) return SCENES.post;
  if (path.startsWith("/gadgets") || path.startsWith("/videos")) return SCENES.shelf;
  if (path.startsWith("/cli")) return { plants: [], lights: [] };
  return SCENES.other;
}

function PlantShadow({ p }: { p: Plant }) {
  const shape = SHADOW_SHAPES[p.kind];
  const style = {
    top: p.top,
    [p.side]: "calc(var(--w-now) * var(--off-now) * -1)",
    "--off": p.off ?? 0,
    "--off-sm": p.offSm ?? p.off ?? 0,
    "--w": p.w,
    "--w-max": `${p.max}px`,
    "--w-sm": p.sm,
    "--tilt": `${p.tilt ?? 0}deg`,
    "--flip": p.flip ? -1 : 1,
    transformOrigin: p.kind === "reed" || p.kind === "fern" ? "50% 100%" : p.side === "right" ? "100% 0" : "0 0",
  } as CSSProperties;
  return (
    <svg
      className="shadow-plant"
      data-sway={p.sway ?? "slow"}
      data-kind={p.kind}
      style={style}
      viewBox={shape.viewBox}
      preserveAspectRatio="xMidYMin meet"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        {shape.stems.map((s) => (
          <path key={s.w} d={s.d} strokeWidth={s.w} />
        ))}
      </g>
      <path fill="currentColor" d={shape.fill} />
    </svg>
  );
}

export function Sunlight() {
  const scene = sceneFor(usePathname() ?? "/");
  if (!scene.plants.length && !scene.lights.length) return null;
  return (
    <div aria-hidden className="sunlight pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {scene.band && <div className="sunlight-band" />}
      {scene.lights.map((l, i) => (
        <div key={`l${i}`} className="window-light" style={{ top: l.top, [l.side]: "-6vw" } as CSSProperties} data-side={l.side}>
          <span />
          <span />
        </div>
      ))}
      {scene.plants.map((p, i) => (
        <PlantShadow key={i} p={p} />
      ))}
    </div>
  );
}
