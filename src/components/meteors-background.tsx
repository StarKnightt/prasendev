// components/meteors-background.tsx
import Meteors from "./ui/meteors";
import { GhibliSkyBackground } from "./ghibli-elements";

export function MeteorsBackground() {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <GhibliSkyBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20">
          <Meteors number={40} />
        </div>
      </div>
    );
  }