"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Music2, Play, Pause, ExternalLink } from "lucide-react";

interface SpotifyTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  duration: number;
  progress: number;
}

function getSpotifyTrackId(url: string): string | null {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

function formatTime(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        // Add timestamp to bust cache
        const res = await fetch(`/api/spotify?t=${Date.now()}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        if (res.ok) {
          setTrack(data);
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    // Poll every 3 seconds for real-time updates
    const interval = setInterval(fetchNowPlaying, 3000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 bg-secondary/30 rounded-xl p-3 animate-pulse">
        <div className="w-14 h-14 bg-muted rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-32" />
          <div className="h-3 bg-muted rounded w-24" />
        </div>
      </div>
    );
  }

  // If no track data at all, show "Not playing"
  if (!track || (!track.isPlaying && !track.title)) {
    return (
      <div className="flex items-center gap-3 bg-secondary/30 rounded-xl p-3 border border-border/50">
        <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
          <Music2 className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">Not playing</p>
          <p className="text-xs text-muted-foreground/70">Spotify</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl bg-card border border-border hover:border-green-500/50 transition-all duration-300 p-4"
      >
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
            {track.albumImageUrl ? (
              <Image
                src={track.albumImageUrl}
                alt={track.album}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Music2 className="w-7 h-7 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Track Info & Progress */}
          <div className="flex-1 min-w-0">
            {/* Header with Spotify badge */}
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-3.5 h-3.5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span className="text-xs text-green-500 font-medium">
                {track.isPlaying ? 'Now playing' : 'Last played'}
              </span>
            </div>

            {/* Song Title */}
            <h3 className="text-sm font-semibold text-foreground truncate mb-1.5 group-hover:text-green-500 transition-colors">
              {track.title}
            </h3>
            
            {/* Artist */}
            <p className="text-xs text-muted-foreground truncate">
              by {track.artist}
            </p>
          </div>

          {/* Animated Music Bars */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-[3px] w-10 justify-center h-10">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-[3px] bg-green-500 rounded-full"
                  animate={{
                    height: track.isPlaying 
                      ? ['12px', '24px', '16px', '24px', '12px']
                      : ['12px', '12px', '12px'],
                  }}
                  transition={{
                    duration: track.isPlaying ? 1.2 : 0.3,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

