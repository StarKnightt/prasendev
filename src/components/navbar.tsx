"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CliButton } from "@/components/cli-button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Hide navbar on CLI page
  if (pathname === "/cli") {
    return null;
  }

  return (
    <motion.nav
      initial={isMounted ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-4xl mx-auto px-6 py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link 
            href="/" 
            className="font-semibold text-base hover:opacity-70 transition-opacity"
          >
            {DATA.name.split(" ")[0]}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {DATA.navbar.slice(1).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-1 text-sm font-medium transition-colors",
                    isActive 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-foreground"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <div className="w-px h-4 bg-border" />
            
            <CliButton />
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-3 space-y-0.5">
              {DATA.navbar.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors border-l-2",
                      isActive 
                        ? "border-foreground text-foreground bg-muted/30" 
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-border/50 mt-2">
                <CliButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
