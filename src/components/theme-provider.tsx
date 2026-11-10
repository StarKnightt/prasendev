"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes"; // Updated import path

/** Routes that always render dark without touching the visitor's saved theme. */
const FORCED_DARK_ROUTES = new Set(["/cli"]);

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const pathname = usePathname();
  const forcedTheme = FORCED_DARK_ROUTES.has(pathname) ? "dark" : props.forcedTheme;
  return (
    <NextThemesProvider {...props} forcedTheme={forcedTheme}>
      {children}
    </NextThemesProvider>
  );
}
