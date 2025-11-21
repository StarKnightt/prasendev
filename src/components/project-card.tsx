"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { BorderBeam } from "@/components/magicui/border-beam";
import { VideoPlayerModal } from "./video-player-modal";
import { useState } from "react";
import { Play } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags?: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // If there is a video, prevent default link behavior and open modal
    if (video) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Card className={cn("flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full relative group", className)}>
        <Link
          href={href || "#"}
          className="block cursor-pointer relative overflow-hidden"
          onClick={handleCardClick}
        >
          {video && (
            <video
              src={video}
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 group-hover:blur-[2px]"
            />
          )}
          {image && !video && (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full overflow-hidden object-cover object-top transition-transform duration-500 group-hover:scale-105 group-hover:blur-[2px]"
            />
          )}
          
          {/* Hover Overlay with Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 z-10">
             <div className="bg-black/50 rounded-full p-3 backdrop-blur-sm border border-white/20 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-white fill-white" />
             </div>
          </div>
        </Link>
        <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 max-w-full overflow-hidden">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px] whitespace-nowrap"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
        <BorderBeam
          duration={4}
          size={300}
          reverse
          className="from-transparent via-green-500 to-transparent"
        />
      </Card>

      {video && (
        <VideoPlayerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          videoUrl={video}
          videoTitle={title}
        />
      )}
    </>
  );
}
