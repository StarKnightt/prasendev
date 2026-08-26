// components/social-icon-link.tsx
'use client';

import type { JSX } from 'react';
import BlurFade from './magicui/blur-fade';
import Link from 'next/link';

type SocialIconLinkProps = {
  name: string;
  url: string;
  icon: JSX.Element;
  delay: number;
  color?: string;
};

export function SocialIconLink({ name, url, icon, delay, color }: SocialIconLinkProps) {
  return (
    <BlurFade delay={delay}>
      <div className="group relative">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="flex items-center justify-center p-3 rounded-xl bg-card hover:bg-accent/50 transition-all duration-200"
        >
          <div className="w-6 h-6 flex items-center justify-center" style={{ color }}>
            {icon}
          </div>
        </Link>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap capitalize">
          {name}
        </div>
      </div>
    </BlurFade>
  );
}