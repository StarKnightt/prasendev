"use client";

import { useEffect, createContext, useContext, useState, useCallback } from "react";
import { playSound } from "@/hooks/use-sound";

interface SoundContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const SoundContext = createContext<SoundContextType>({
  enabled: true,
  setEnabled: () => {},
  volume: 0.3,
  setVolume: () => {},
});

export const useSoundSettings = () => useContext(SoundContext);

interface SoundProviderProps {
  children: React.ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    setMounted(true);
    const savedEnabled = localStorage.getItem("sound-enabled");
    const savedVolume = localStorage.getItem("sound-volume");
    
    if (savedEnabled !== null) {
      setEnabled(savedEnabled === "true");
    }
    if (savedVolume !== null) {
      setVolume(parseFloat(savedVolume));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("sound-enabled", String(enabled));
      localStorage.setItem("sound-volume", String(volume));
    }
  }, [enabled, volume, mounted]);

  // Global click sound handler
  useEffect(() => {
    if (!enabled || !mounted) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if clicked element or its parents are interactive
      const isButton = target.closest("button");
      const isLink = target.closest("a");
      const isCard = target.closest("[role='button']");
      const isSelect = target.closest("[data-radix-select-trigger]");
      const isDialog = target.closest("[data-radix-dialog-trigger]");
      const isNavItem = target.closest("nav a, nav button");
      const isDock = target.closest(".dock-item");
      
      if (isButton || isLink || isCard || isSelect || isDialog || isNavItem || isDock) {
        playSound("click", volume);
      }
    };

    // Add click listener
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [enabled, volume, mounted]);

  // Global keyboard sound handler (for Enter key on focused elements)
  useEffect(() => {
    if (!enabled || !mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const target = e.target as HTMLElement;
        const isButton = target.closest("button");
        const isLink = target.closest("a");
        const isCard = target.closest("[role='button']");
        
        if (isButton || isLink || isCard) {
          playSound("click", volume);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, volume, mounted]);

  const handleSetEnabled = useCallback((value: boolean) => {
    setEnabled(value);
    if (value) {
      // Play a sound to confirm sound is enabled
      setTimeout(() => playSound("toggle", volume), 50);
    }
  }, [volume]);

  return (
    <SoundContext.Provider value={{ enabled, setEnabled: handleSetEnabled, volume, setVolume }}>
      {children}
    </SoundContext.Provider>
  );
}
