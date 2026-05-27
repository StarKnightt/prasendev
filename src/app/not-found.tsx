import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 text-center">
      <BlurFade delay={0.04}>
        <div className="space-y-2">
          <h1 className="text-7xl font-bold tracking-tighter sm:text-9xl">
            404
          </h1>
          <p className="text-xl text-muted-foreground sm:text-2xl">
            Lost in space?
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={0.12}>
        <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Maybe try one of the links below.
        </p>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
          >
            Go Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
          >
            Blog
          </Link>
        </div>
      </BlurFade>
    </div>
  );
}
