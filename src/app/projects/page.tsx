import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA, type Project } from "@/data/resume";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectCard } from "@/components/project-card";
import { HeadingScribble } from "@/components/motion/heading-scribble";
import { LabBeaker } from "@/components/motion/lab-beaker";
import { LabHashRedirect } from "@/components/lab-hash-redirect";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import type { Metadata } from "next";

const PAGE_DESCRIPTION =
  "Projects by Prasenjit Nayak: Outbuilt, a pay-to-rank leaderboard with 23 paid placements in its first 10 days; Dateup, PayBrackets, Wallpaperz, CleanType and Next.js Learning.";

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
        alt: "Projects by Prasenjit Nayak",
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
const LAB_COUNT = PROJECTS.filter((p) => p.group === "lab").length;

export default function ProjectsPage() {
  return (
    <section>
      <LabHashRedirect />
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

        <BlurFade delay={BLUR_FADE_DELAY * 2 + (PRODUCTS.length + 1) * 0.05}>
          <Link
            href="/lab"
            className="group flex items-center gap-3 rounded-xl border border-border/60 px-4 py-3 transition-colors hover:bg-muted/40"
          >
            <LabBeaker />
            <p className="flex-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Lab</span>
              <span className="mx-2 text-border">/</span>
              {LAB_COUNT} experiments built with Claude, from procedural 3D worlds to a code-generated trailer
            </p>
            <span className="shrink-0 text-sm font-medium transition-transform group-hover:translate-x-0.5">
              See the Lab →
            </span>
          </Link>
        </BlurFade>
      </div>
    </section>
  );
}
