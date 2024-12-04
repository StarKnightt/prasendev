"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    url: string;
  };
}

function getYouTubeEmbedUrl(url: string) {
  const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
}

export function VideoPlayerModal({ isOpen, onClose, video }: VideoPlayerModalProps) {
  const embedUrl = getYouTubeEmbedUrl(video.url);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] md:max-w-[80vw] lg:max-w-[1200px] p-2 md:p-4 h-auto">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-base md:text-lg line-clamp-1">{video.title}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full aspect-video">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
            style={{ border: 'none' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}