"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlayButton } from "./play-button";
import { VideoPlayerModal } from "./video-player-modal";
import type { Project } from "@/data/resume";

export function LabTile({ title, href, tagline, description, technologies, links, image, video, play }: Project) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const model = technologies.find((t) => t.startsWith("Claude"));
  const receipts = [
    ...links.filter((link) => link.type !== "Website" && link.type !== "Source"),
    ...links.filter((link) => link.type === "Source"),
  ];

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="group flex h-full flex-col">
      {video ? (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label={`Watch ${title}`}
          className="relative block overflow-hidden rounded-lg border border-border/60"
        >
          <video
            ref={videoRef}
            src={video}
            poster={image}
            loop
            muted
            playsInline
            preload="none"
            className="pointer-events-none aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="rounded-full border border-white/20 bg-black/50 p-3 shadow-xl backdrop-blur-sm">
              <Play className="size-5 fill-white text-white" />
            </div>
          </div>
        </button>
      ) : (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-lg border border-border/60"
        >
          <Image
            src={image}
            alt={title}
            width={640}
            height={360}
            sizes="(min-width: 640px) 320px, 100vw"
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      )}
      <div className="mt-3 flex items-center justify-between gap-2">
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="truncate text-sm font-semibold tracking-tight"
        >
          {title}
        </Link>
        {model && (
          <span className="shrink-0 rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            {model}
          </span>
        )}
      </div>
      <p className="mt-1 text-pretty text-xs text-muted-foreground">{tagline ?? description}</p>
      {(play || receipts.length > 0) && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {play && <PlayButton title={title} play={play} />}
          {receipts.map((link) => (
            <Link href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">
              <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                {link.icon}
                {link.type}
              </Badge>
            </Link>
          ))}
        </div>
      )}
      {video && (
        <VideoPlayerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={video}
          videoTitle={title}
        />
      )}
    </div>
  );
}
