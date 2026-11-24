import Link from "next/link";
import { InkDoodle } from "@/components/motion/ink-doodle";
import Reveal from "@/components/motion/reveal";
import { DATA, type Project } from "@/data/resume";
import { LabTile } from "@/components/lab-tile";
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

const REVEAL_DELAY = 0.04;

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
      <ProjectSortProvider>
        <div id="lab">
          <Reveal delay={REVEAL_DELAY}>
            <div className="flex items-center justify-between gap-4">
              <h1 className="relative w-fit text-4xl sm:text-5xl">
                Lab
                <InkDoodle kind="sparkles" delay={300} className="absolute left-full top-1/2 ml-2 h-10 w-12 -translate-y-1/2" />
              </h1>
              <ProjectSortSelect label="Sort the Lab" />
            </div>
            <p className="mb-10 mt-3 max-w-2xl text-muted-foreground">
              Films, browser games and 3D worlds I directed AI to build and shared on X. Every texture, mesh and sound is
              generated in code unless stated. For things people pay for or use every day, see{" "}
              <Link href="/projects" className="underline underline-offset-4 hover:text-foreground">
                projects
              </Link>
              .
            </p>
          </Reveal>

          <section id="films" aria-labelledby="films-heading">
            <Reveal delay={REVEAL_DELAY * 3}>
              <h2 id="films-heading" className="mb-1 text-2xl">
                Films <span className="ml-1 font-type text-sm text-muted-foreground">{FILMS.length}</span>
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Short films where every frame and every note is made in code. Hover to preview.
              </p>
            </Reveal>
            <ProjectSortGrid items={FILM_ITEMS} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {FILMS.map((project, i) => (
                <Reveal key={project.title} delay={REVEAL_DELAY * 3 + (i + 1) * 0.05}>
                  <LabTile {...project} />
                </Reveal>
              ))}
            </ProjectSortGrid>
          </section>

          <section id="games" aria-labelledby="games-heading" className="mt-14">
            <Reveal delay={REVEAL_DELAY * 4}>
              <h2 id="games-heading" className="mb-1 text-2xl">
                Games and 3D worlds{" "}
                <span className="ml-1 font-type text-sm text-muted-foreground">{WORLDS.length}</span>
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Playable in the browser. Most open on Wavedash, no install needed.
              </p>
            </Reveal>
            <ProjectSortGrid items={WORLD_ITEMS} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {WORLDS.map((project, i) => (
                <Reveal key={project.title} delay={REVEAL_DELAY * 4 + Math.min(i + 1, 8) * 0.05}>
                  <LabTile {...project} />
                </Reveal>
              ))}
            </ProjectSortGrid>
          </section>
        </div>
      </ProjectSortProvider>
    </section>
  );
}
