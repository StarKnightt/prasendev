import BlurFade from "@/components/magicui/blur-fade";
import { VideosList } from "@/components/videos-list";
import { fetchYouTubeVideos } from "@/lib/youtube";
import { DATA } from "@/data/resume";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch my latest videos about software development, coding tutorials, and technology by Prasenjit Nayak.",
  alternates: {
    canonical: `${DATA.url}/videos`,
  },
  openGraph: {
    title: "Videos | Prasenjit Nayak",
    description: "Software development videos, coding tutorials, and technology content.",
    url: `${DATA.url}/videos`,
    images: [{ url: `${DATA.url}/api/og?title=Videos&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Videos | Prasenjit Nayak",
    description: "Software development videos, coding tutorials, and technology content.",
    images: [`${DATA.url}/api/og?title=Videos&type=page`],
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function VideosPage() {
  const videos = await fetchYouTubeVideos();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <BreadcrumbJsonLd items={[{ name: "Videos", href: "/videos" }]} />
      <section id="videos">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                My Videos
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Latest Videos
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Watch my latest videos about software development and technology.
              </p>
            </div>
          </div>
        </BlurFade>
        
        <VideosList videos={videos} />
      </section>
    </main>
  );
}
