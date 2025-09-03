'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";

type V0IconProps = Omit<ImageProps, "src" | "alt" | "width" | "height">;

export function V0Icon(props: V0IconProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="size-6 opacity-0">
        <Image
          src="/v0-light.webp"
          alt="v0"
          width={24}
          height={24}
          className="object-contain"
          {...props}
        />
      </div>
    );
  }

  // Use resolvedTheme instead of theme to properly handle system preference
  const isDark = resolvedTheme === 'dark';
  
  return (
    <div className="size-6">
      <Image
        src={isDark ? '/v0-dark.webp' : '/v0-light.webp'}
        alt="v0"
        width={24}
        height={24}
        className="object-contain transition-opacity duration-200"
        {...props}
      />
    </div>
  );
}