import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { PageBackground } from "@/components/page-background";
import { Sunlight } from "@/components/sunlight";
import { CommandPalette } from "@/components/command-palette";
import { SoundProvider } from "@/components/sound-provider";
import { BackToTop } from "@/components/back-to-top";
import { SmoothCursor } from "@/components/smooth-cursor";
import { DomainGuardedAnalytics } from "@/components/domain-guarded-analytics";
import { HALLOWEEN_SEASON_SCRIPT } from "@/lib/season";

// Two families. Geist for reading and UI, its mono sibling for dates, tags and
// code, and Source Serif 4 (optical sizes) for headings, the one bookish note.
const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const fontType = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-type",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: "Prasenjit Nayak | Creative Engineer",
    template: `%s | Prasenjit Nayak`,
  },
  description: "Prasenjit Nayak, a creative engineer from India. Making code alive: games, videos and art built with AI. Explore my lab, projects and blog.",
  keywords: ["Prasenjit Nayak", "Creative Engineer", "Creative Coding", "Full Stack Developer", "React Developer", "Next.js Developer", "TypeScript Developer", "Node.js Developer", "Web Developer India", "Software Engineer"],
  authors: [{ name: "Prasenjit Nayak" }],
  creator: "Prasenjit Nayak",
  publisher: "Prasenjit Nayak",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: "Prasenjit Nayak | Creative Engineer",
    description: "Creative engineer. Making code alive: games, videos and art built with AI. Building in public for 23K+ on X.",
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
    description: 'Creative engineer. Making code alive: games, videos and art built with AI. Building in public for 23K+ on X.',
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
    "theme-color": "#efe9dc",
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
      <body className={cn(fontSans.variable, fontDisplay.variable, fontType.variable, "font-sans antialiased")}>
        {/* Background container */}
        <div className="fixed inset-0 z-[-1]">
          <PageBackground />
        </div>
        <Sunlight />


        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto pt-20 sm:pt-24 pb-24 px-6">
          <DomainGuardedAnalytics gaId="G-XVF0SFD4GW" />
          <JsonLd />
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