import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { JsonLd } from "@/components/json-ld";
import { PageBackground } from "@/components/page-background";
import { CommandPalette } from "@/components/command-palette";
import { SoundProvider } from "@/components/sound-provider";
import { BackToTop } from "@/components/back-to-top";
import { DomainGuardedAnalytics } from "@/components/domain-guarded-analytics";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { HALLOWEEN_SEASON_SCRIPT } from "@/lib/season";

const fontSans = localFont({
  src: [
    { path: "../fonts/Switzer-Variable.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/Switzer-VariableItalic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = localFont({
  src: "../fonts/GeneralSans-Semibold.woff2",
  weight: "600",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Prasenjit Nayak | Creative Engineer",
    template: `%s | Prasenjit Nayak`,
  },
  description: "Prasenjit Nayak, a creative engineer from India. I make code come alive: games, films and art built with AI. Explore my lab, projects and blog.",
  keywords: ["Prasenjit Nayak", "Creative Engineer", "Creative Coding", "Full Stack Developer", "React Developer", "Next.js Developer", "TypeScript Developer", "Node.js Developer", "Web Developer India", "Software Engineer"],
  authors: [{ name: "Prasenjit Nayak" }],
  creator: "Prasenjit Nayak",
  publisher: "Prasenjit Nayak",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: "Prasenjit Nayak | Creative Engineer",
    description: "Creative engineer. I make code come alive: games, films and art built with AI. Building in public for 23K+ on X.",
    url: DATA.url,
    siteName: "Prasenjit Nayak - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/og/home-2026-11.jpg`,
        width: 1200,
        height: 630,
        alt: "A sketchbook page: Prasenjit in ink, a taped polaroid sketch portrait, and doodles for apps, games and notes"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prasenjit Nayak | Creative Engineer',
    description: 'Creative engineer. I make code come alive: games, films and art built with AI. Building in public for 23K+ on X.',
    images: [`${DATA.url}/og/home-2026-11.jpg`],
    creator: '@prasenx',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/favicons/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/favicons/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicons/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicons/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/favicons/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/favicons/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/favicons/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicons/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicons/android-icon-192x192.png",
      },
      {
        rel: "manifest",
        url: "/favicons/manifest.json",
      },
    ],
  },
  manifest: "/favicons/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Prasenjit Nayak",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/favicons/ms-icon-144x144.png",
    "msapplication-config": "/favicons/browserconfig.xml",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HALLOWEEN_SEASON_SCRIPT }} />
      </head>
      <body className={cn(fontSans.variable, fontDisplay.variable, "font-sans antialiased")}>
        {/* Background container */}
        <div className="fixed inset-0 z-[-1]">
          <PageBackground />
        </div>


        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto pt-20 sm:pt-24 pb-24 px-6">
          <DomainGuardedAnalytics gaId="G-XVF0SFD4GW" />
          <JsonLd />
          <ScrollProgress />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <SoundProvider>
              <TooltipProvider delayDuration={0}>
                {children}
                <Navbar />
                <CommandPalette />
                <BackToTop />
                <SmoothCursor />
              </TooltipProvider>
            </SoundProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}