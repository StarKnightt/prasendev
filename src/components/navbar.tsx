"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    <>
      {/* Top Navbar */}
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
            <div className="hidden md:flex items-center gap-1">
              {DATA.navbar.slice(1).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full",
                      isActive 
                        ? "text-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-muted rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {item.label}
                  </Link>
                );
              })}
              
              <div className="w-px h-4 bg-border mx-2" />
              
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
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-muted text-foreground" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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

      {/* Bottom Dock */}
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
        {/* Background blur layer */}
        <div className="fixed bottom-0 inset-x-0 h-16 w-full pointer-events-none bg-gradient-to-t from-background/40 via-background/25 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:from-black/30 dark:via-black/20"></div>
        
        {/* Glass dock */}
        <Dock className="z-50 relative mx-auto flex min-h-full h-full items-center px-1 
          bg-white/15 dark:bg-black/20 
          backdrop-blur-xl backdrop-saturate-150 
          rounded-2xl 
          border border-white/20 dark:border-white/10
          [background:linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))]
          dark:[background:linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.15))]
          [box-shadow:0_4px_15px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1),0_0_0_1px_rgba(0,0,0,0.1)]
          dark:[box-shadow:0_4px_15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.05),0_0_0_1px_rgba(0,0,0,0.2)]
          transform-gpu
          transition-all duration-300 ease-out
          hover:bg-white/25 hover:border-white/30 hover:[box-shadow:0_8px_20px_rgba(0,0,0,0.12),inset_0_0_0_1px_rgba(255,255,255,0.15),0_0_0_1px_rgba(0,0,0,0.1)]
          dark:hover:bg-black/30 dark:hover:border-white/15 dark:hover:[box-shadow:0_8px_20px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.07),0_0_0_1px_rgba(0,0,0,0.2)]
          before:absolute before:inset-0 before:pointer-events-none before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:dark:from-white/5
          after:absolute after:inset-0 after:pointer-events-none after:rounded-2xl after:bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent_70%)] after:dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.08),transparent_70%)]">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "relative size-12 transition-colors hover:bg-white/20 dark:hover:bg-white/10"
                    )}
                  >
                    <item.icon className="size-4" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent sideOffset={4}>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <DockIcon>
            <CliButton />
          </DockIcon>
          <Separator orientation="vertical" className="h-full opacity-10 mx-1" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent sideOffset={4}>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </div>
    </>
  );
}
