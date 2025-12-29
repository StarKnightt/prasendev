"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Sponsor {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  isOneTime: boolean;
}

export function GitHubSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<any>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch('/api/sponsors', {
          cache: 'no-store',
        });
        const data = await response.json();
        console.log('🎯 Sponsors API response:', data);
        setSponsors(data.sponsors || []);
        setDebug(data.debug);
        // Only set error if we have an error and no sponsors
        if (data.error && (!data.sponsors || data.sponsors.length === 0)) {
          setError(data.error);
        }
      } catch (error) {
        console.error('❌ Error fetching sponsors:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch sponsors');
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) {
    return (
      <div className="w-full rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-pink-500 animate-pulse" fill="currentColor" />
          <h3 className="text-xl font-bold">Loading Sponsors...</h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-full bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-xl border border-red-500/20 bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
          <h3 className="text-xl font-bold text-red-500">Error Loading Sponsors</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {error}
        </p>
        {debug && (
          <details className="text-xs text-muted-foreground mt-2">
            <summary className="cursor-pointer">Debug Info</summary>
            <pre className="mt-2 p-2 bg-muted rounded">{JSON.stringify(debug, null, 2)}</pre>
          </details>
        )}
      </div>
    );
  }

  if (sponsors.length === 0) {
    return (
      <div className="relative w-full rounded-xl border border-border bg-card overflow-hidden group">
        <BorderBeam
          duration={5}
          size={350}
          className="from-transparent via-pink-500 to-transparent"
        />
        <BorderBeam
          duration={5}
          delay={2.5}
          size={350}
          className="from-transparent via-purple-500 to-transparent"
        />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-pink-500 group-hover:animate-pulse" fill="currentColor" />
            <h3 className="text-xl font-bold">Become a Sponsor</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Support my open source work and get your name featured here! ✨
          </p>
          <Link
            href="https://github.com/sponsors/StarKnightt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            Sponsor on GitHub
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl border border-border bg-card overflow-hidden">
      <BorderBeam
        duration={5}
        size={350}
        className="from-transparent via-pink-500 to-transparent"
      />
      <BorderBeam
        duration={5}
        delay={2.5}
        size={350}
        className="from-transparent via-red-500 to-transparent"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 animate-pulse" fill="currentColor" />
            <h3 className="text-xl font-bold">
              Sponsors {sponsors.length > 0 && `(${sponsors.length})`}
            </h3>
          </div>
          <Link
            href="https://github.com/sponsors/StarKnightt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
            Sponsor me
          </Link>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Thank you to these amazing people for supporting my work! 💖
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.login}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Link
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-pink-500/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-14 h-14 border-2 border-pink-500/30 group-hover:border-pink-500 transition-all duration-300 group-hover:scale-105 shrink-0">
                      <AvatarImage src={sponsor.avatarUrl} alt={sponsor.name || sponsor.login} />
                      <AvatarFallback>{sponsor.login[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">
                          {sponsor.name || sponsor.login}
                        </h4>
                        <Heart className="w-3 h-3 text-pink-500 shrink-0" fill="currentColor" />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        @{sponsor.login}
                      </p>
                      {sponsor.isOneTime && (
                        <Badge variant="secondary" className="text-[10px] mt-1.5">
                          One-time Sponsor
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {sponsors.length >= 10 && (
          <Link
            href="https://github.com/sponsors/StarKnightt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all sponsors
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}

