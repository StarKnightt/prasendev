import Link from "next/link";
import { InkDoodle } from "@/components/motion/ink-doodle";
import Reveal from "@/components/motion/reveal";
import { DATA, type Project } from "@/data/resume";
import { ProjectCard } from "@/components/project-card";
import { LabBeaker } from "@/components/motion/lab-beaker";
import { LabHashRedirect } from "@/components/lab-hash-redirect";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { ProjectSortGrid, ProjectSortProvider, ProjectSortSelect } from "@/components/project-sort";
import type { Metadata } from "next";

const PAGE_DESCRIPTION =
  "Projects by Prasenjit Nayak: Outbuilt, a pay-to-rank leaderboard with 27 paid placements since its Aug 2026 launch; Dateup, PayBrackets, Wallpaperz, CleanType and Next.js Learning.";

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

const REVEAL_DELAY = 0.04;

const PROJECTS: readonly Project[] = DATA.projects;
const PRODUCTS = PROJECTS.filter((p) => (p.group ?? "products") === "products");
const LAB_COUNT = PROJECTS.filter((p) => p.group === "lab").length;
const SORT_ITEMS = PRODUCTS.map((p) => ({ key: p.title, title: p.title, dates: p.dates }));

export default function ProjectsPage() {
  return (
    <section>
      <LabHashRedirect />
      <BreadcrumbJsonLd items={[{ name: "Projects", href: "/projects" }]} />
      <div className="space-y-12">
        <ProjectSortProvider>
          <div id="products">
            <Reveal delay={REVEAL_DELAY}>
              <div className="flex items-center justify-between gap-3">
                <h1 className="relative w-fit text-4xl sm:text-5xl">
                  Projects
                  <InkDoodle kind="clapper" delay={300} className="absolute left-full top-1/2 ml-3 h-11 w-12 -translate-y-1/2" />
                </h1>
                <ProjectSortSelect />
              </div>
              <p className="mb-10 mt-3 text-muted-foreground">Things people pay for or use every day.</p>
            </Reveal>
            <ProjectSortGrid items={SORT_ITEMS} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PRODUCTS.map((project, i) => (
                <Reveal key={project.title} delay={REVEAL_DELAY * 2 + (i + 1) * 0.05}>
                  <div className="relative overflow-hidden rounded-xl">
                    <ProjectCard {...project} tags={project.technologies} />
                  </div>
                </Reveal>
              ))}
            </ProjectSortGrid>
          </div>
        </ProjectSortProvider>

        <Reveal delay={REVEAL_DELAY * 2 + (PRODUCTS.length + 1) * 0.05}>
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
        </Reveal>
      </div>
    </section>
  );
}
