import BlurFade from "@/components/magicui/blur-fade";
import { DATA, type Project } from "@/data/resume";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectCard } from "@/components/project-card";
import { LabTile } from "@/components/lab-tile";
import { HeadingScribble } from "@/components/motion/heading-scribble";
import { LabBeaker } from "@/components/motion/lab-beaker";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import type { Metadata } from "next";

const PAGE_DESCRIPTION =
  "Projects by Prasenjit Nayak: Outbuilt, a pay-to-rank leaderboard with 23 paid placements in its first 10 days; Dateup, PayBrackets, Wallpaperz, CleanType and more, plus a Lab of AI-built browser 3D demos.";

export const metadata: Metadata = {
  title: "Projects",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${DATA.url}/projects`,
  },
  openGraph: {
    title: "Projects | Prasenjit Nayak",
    description: PAGE_DESCRIPTION,
    url: `${DATA.url}/projects`,
    images: [
      {
        url: `${DATA.url}/og/projects-2026-09.png`,
        width: 1200,
        height: 630,
        alt: "Projects by Prasenjit Nayak: products and a Lab of AI-built browser 3D demos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Prasenjit Nayak",
    description: PAGE_DESCRIPTION,
    images: [`${DATA.url}/og/projects-2026-09.png`],
  },
};

const BLUR_FADE_DELAY = 0.04;

const PROJECTS: readonly Project[] = DATA.projects;
const PRODUCTS = PROJECTS.filter((p) => (p.group ?? "products") === "products");
const LAB = PROJECTS.filter((p) => p.group === "lab");

export default function ProjectsPage() {
  return (
    <section>
      <BreadcrumbJsonLd items={[{ name: "Projects", href: "/projects" }]} />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">projects</h1>
      </BlurFade>
      <div className="space-y-12">
        <div id="products">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h2 className="relative w-fit text-lg font-semibold tracking-tight">
              Projects
              <HeadingScribble kind="lift" />
            </h2>
            <p className="mt-2 mb-5 text-sm text-muted-foreground">Things people pay for or use every day</p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRODUCTS.map((project, i) => (
              <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 2 + (i + 1) * 0.05}>
                <div className="relative overflow-hidden rounded-xl">
                  <BorderBeam
                    duration={4}
                    size={300}
                    reverse
                    className="from-transparent via-purple-500 to-transparent"
                  />
                  <ProjectCard {...project} tags={project.technologies} />
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        <div id="lab">
          <BlurFade delay={BLUR_FADE_DELAY * 2 + (PRODUCTS.length + 1) * 0.05}>
            <div className="flex items-center gap-2">
              <h2 className="relative w-fit text-lg font-semibold tracking-tight">
                Lab
                <HeadingScribble kind="hook" />
              </h2>
              <LabBeaker />
            </div>
            <p className="mt-2 mb-5 text-sm text-muted-foreground">
              Things I directed AI to build and shared on X. Every texture, mesh and sound generated in code unless stated.
            </p>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {LAB.map((project, i) => (
              <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 2 + (PRODUCTS.length + i + 2) * 0.05}>
                <LabTile {...project} />
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
