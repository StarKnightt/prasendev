// components/page-background.tsx
// The page is a sheet of old book paper: fine grain, slow mottling, and edges
// that have browned with age. All of it is static SVG noise, rendered once by
// the browser and never animated, so it costs nothing per frame.

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .32 0 0 0 0 .24 0 0 0 0 .15 0 0 0 .9 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23g)'/%3E%3C/svg%3E")`;

const FIBRES = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1600'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.006 .05' numOctaves='2' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .34 0 0 0 0 .2 0 0 0 .9 -.42'/%3E%3C/filter%3E%3Crect width='1600' height='1600' filter='url(%23f)'/%3E%3C/svg%3E")`;

const MOTTLE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.0028' numOctaves='4' seed='11'/%3E%3CfeColorMatrix values='0 0 0 0 .55 0 0 0 0 .4 0 0 0 0 .2 0 0 0 1.2 -.5'/%3E%3C/filter%3E%3Crect width='1600' height='1000' filter='url(%23m)'/%3E%3C/svg%3E")`;

export function PageBackground() {
  return (
    <div aria-hidden className="paper fixed inset-0 -z-10 pointer-events-none">
      <div className="paper-layer" style={{ backgroundImage: MOTTLE, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} />
      <div className="paper-layer paper-fibres" style={{ backgroundImage: FIBRES, backgroundSize: "1600px 1600px" }} />
      <div className="paper-layer paper-grain" style={{ backgroundImage: GRAIN, backgroundSize: "240px 240px" }} />
      <div className="paper-layer paper-edge" />
    </div>
  );
}
