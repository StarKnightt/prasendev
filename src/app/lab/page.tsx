import Link from "next/link";
import BlurFade from "@/components/magicui/blur-fade";
import { DATA, type Project } from "@/data/resume";
import { LabTile } from "@/components/lab-tile";
import { HeadingScribble } from "@/components/motion/heading-scribble";
import { LabBeaker } from "@/components/motion/lab-beaker";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { ProjectSortGrid, ProjectSortProvider, ProjectSortSelect } from "@/components/project-sort";
import type { Metadata } from "next";

const PAGE_DESCRIPTION =
  "The Lab by Prasenjit Nayak: browser 3D worlds, games and a code-generated trailer built with Claude while he directed, including Jungle Trail, Night Street, Sedona Sunset and PRESS START.";

const OG_IMAGE = `${DATA.url}/api/og?title=Lab&type=page`;

export const metadata: Metadata = {
  title: "Lab",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: `${DATA.url}/lab`,
  },
  openGraph: {
    title: "Lab | Prasenjit Nayak",
    description: PAGE_DESCRIPTION,
    url: `${DATA.url}/lab`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "The Lab by Prasenjit Nayak: AI-built browser 3D demos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lab | Prasenjit Nayak",
    description: PAGE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const BLUR_FADE_DELAY = 0.04;

const LAB: readonly Project[] = DATA.projects.filter((p) => p.group === "lab");
const SORT_ITEMS = LAB.map((p) => ({ key: p.title, title: p.title, dates: p.dates }));

export default function LabPage() {
  return (
    <section>
      <BreadcrumbJsonLd items={[{ name: "Lab", href: "/lab" }]} />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-3 tracking-tight">lab</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Browser worlds, games and one trailer, built with Claude while I directed and reviewed. For things people pay
          for or use every day, see{" "}
          <Link href="/projects" className="underline underline-offset-4 hover:text-foreground">
            projects
          </Link>
          .
        </p>
      </BlurFade>
      <ProjectSortProvider>
        <div id="lab">
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex items-center gap-2">
              <h2 className="relative w-fit text-lg font-semibold tracking-tight">
                Lab
                <HeadingScribble kind="hook" />
              </h2>
              <LabBeaker />
              <ProjectSortSelect label="Sort the Lab" className="ml-auto" />
            </div>
            <p className="mt-2 mb-5 text-sm text-muted-foreground">
              Things I directed AI to build and shared on X. Every texture, mesh and sound generated in code unless stated.
            </p>
          </BlurFade>
          <ProjectSortGrid items={SORT_ITEMS} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {LAB.map((project, i) => (
              <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 2 + (i + 1) * 0.05}>
                <LabTile {...project} />
              </BlurFade>
            ))}
          </ProjectSortGrid>
        </div>
      </ProjectSortProvider>
    </section>
  );
}
