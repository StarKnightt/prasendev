"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FlipAvatarProps {
  src: string;
  hoverSrc: string;
  alt: string;
  fallback: string;
}

export function FlipAvatar({ src, hoverSrc, alt, fallback }: FlipAvatarProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="size-28 [perspective:600px] cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative size-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <Avatar className="absolute inset-0 size-28 [backface-visibility:hidden]">
          <AvatarImage
            alt={alt}
            src={src}
            width={224}
            height={224}
            loading="eager"
            className="object-cover"
          />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>

        {/* Back */}
        <Avatar className="absolute inset-0 size-28 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <AvatarImage
            alt={`${alt} alternate`}
            src={hoverSrc}
            width={224}
            height={224}
            className="object-cover"
          />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
