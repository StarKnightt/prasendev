"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import dynamic from "next/dynamic";
import { VideoSkeleton } from "@/components/skeletons/video-skeleton";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VideoCard = dynamic(() => import("@/components/video-card").then(mod => mod.VideoCard), {
  loading: () => <VideoSkeleton />
});

interface Video {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
}

interface VideosListProps {
  videos: readonly Video[];
}

const BLUR_FADE_DELAY = 0.04;

export function VideosList({ videos }: VideosListProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const sortedVideos = [...videos].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <>
      <div className="flex justify-end mb-6">
        <Select value={sortOrder} onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}>
          <SelectTrigger className="w-[180px]">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {sortedVideos.map((video, idx) => (
          <BlurFade key={video.url} delay={BLUR_FADE_DELAY * (idx + 2)}>
            <VideoCard video={video} />
          </BlurFade>
        ))}
      </div>
    </>
  );
}

