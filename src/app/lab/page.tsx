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
  "The Lab by Prasenjit Nayak: short films made entirely in code, plus browser games and 3D worlds built with Claude, including Clawd: Wonder, PRESS START, Jungle Trail and Night Street.";

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
        alt: "The Lab by Prasenjit Nayak: films, browser games and 3D worlds built with AI",
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
const FILMS = LAB.filter((p) => p.film);
const WORLDS = LAB.filter((p) => !p.film);
const toSortItems = (list: readonly Project[]) => list.map((p) => ({ key: p.title, title: p.title, dates: p.dates }));
const FILM_ITEMS = toSortItems(FILMS);
const WORLD_ITEMS = toSortItems(WORLDS);

export default function LabPage() {
  return (
    <section>
      <BreadcrumbJsonLd items={[{ name: "Lab", href: "/lab" }]} />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-3 tracking-tight">lab</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Films, browser games and 3D worlds, built with Claude while I directed and reviewed. For things people pay
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

          <section id="films" aria-labelledby="films-heading">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h3 id="films-heading" className="mb-1 text-base font-semibold tracking-tight">
                Films <span className="ml-1 text-sm font-normal text-muted-foreground">{FILMS.length}</span>
              </h3>
              <p className="mb-5 text-sm text-muted-foreground">
                Short films where every frame and every note is made in code. Hover to preview.
              </p>
            </BlurFade>
            <ProjectSortGrid items={FILM_ITEMS} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {FILMS.map((project, i) => (
                <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 3 + (i + 1) * 0.05}>
                  <LabTile {...project} />
                </BlurFade>
              ))}
            </ProjectSortGrid>
          </section>

          <section id="games" aria-labelledby="games-heading" className="mt-14">
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <h3 id="games-heading" className="mb-1 text-base font-semibold tracking-tight">
                Games and 3D worlds{" "}
                <span className="ml-1 text-sm font-normal text-muted-foreground">{WORLDS.length}</span>
              </h3>
              <p className="mb-5 text-sm text-muted-foreground">
                Playable in the browser. Most open on Wavedash, no install needed.
              </p>
            </BlurFade>
            <ProjectSortGrid items={WORLD_ITEMS} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {WORLDS.map((project, i) => (
                <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 4 + Math.min(i + 1, 8) * 0.05}>
                  <LabTile {...project} />
                </BlurFade>
              ))}
            </ProjectSortGrid>
          </section>
        </div>
      </ProjectSortProvider>
    </section>
  );
}
