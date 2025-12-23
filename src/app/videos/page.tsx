import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { VideosList } from "@/components/videos-list";

export const metadata = {
  title: "Videos",
  description: "Watch my latest videos about software development and technology.",
};

const BLUR_FADE_DELAY = 0.04;

export default function VideosPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
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
        
        <VideosList videos={DATA.videos} />
      </section>
    </main>
  );
}
