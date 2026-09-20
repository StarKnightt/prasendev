import BlurFade from "@/components/magicui/blur-fade";
import { DATA, type Project, type ProjectGroup } from "@/data/resume";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectCard } from "@/components/project-card";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Prasenjit Nayak: Outbuilt, a pay-to-rank leaderboard with 23 paid placements in its first 10 days; Jungle Trail, a procedural Three.js jungle with 290+ GitHub stars; Wallpaperz, CleanType and more.",
  alternates: {
    canonical: `${DATA.url}/projects`,
  },
  openGraph: {
    title: "Projects | Prasenjit Nayak",
    description: "Projects by Prasenjit Nayak: Outbuilt, a pay-to-rank leaderboard with 23 paid placements in its first 10 days; Jungle Trail, a procedural Three.js jungle with 290+ GitHub stars; Wallpaperz, CleanType and more.",
    url: `${DATA.url}/projects`,
    images: [{ url: `${DATA.url}/api/og?title=Projects&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Prasenjit Nayak",
    description: "Projects by Prasenjit Nayak: Outbuilt, a pay-to-rank leaderboard with 23 paid placements in its first 10 days; Jungle Trail, a procedural Three.js jungle with 290+ GitHub stars; Wallpaperz, CleanType and more.",
    images: [`${DATA.url}/api/og?title=Projects&type=page`],
  },
};

const BLUR_FADE_DELAY = 0.04;

const GROUPS: readonly { key: ProjectGroup; title: string; subhead: string }[] = [
  { key: "products", title: "Products", subhead: "Things people pay for or use every day" },
  {
    key: "procedural",
    title: "Procedural 3D",
    subhead:
      "Worlds you can walk through in the browser. Every texture, mesh and sound generated in code unless stated.",
  },
  { key: "interactions", title: "Interactions", subhead: "UI experiments that did numbers on X" },
];

const PROJECTS: readonly Project[] = DATA.projects;

export default function ProjectsPage() {
  let index = 0;
  return (
    <section>
      <BreadcrumbJsonLd items={[{ name: "Projects", href: "/projects" }]} />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">projects</h1>
      </BlurFade>
      <div className="space-y-12">
        {GROUPS.map((group) => {
          const items = PROJECTS.filter((p) => (p.group ?? "products") === group.key);
          if (items.length === 0) return null;
          const headingDelay = BLUR_FADE_DELAY * 2 + index * 0.05;
          return (
            <div key={group.key}>
              <BlurFade delay={headingDelay}>
                <h2 className="text-lg font-semibold tracking-tight">{group.title}</h2>
                <p className="mt-1 mb-5 text-sm text-muted-foreground">{group.subhead}</p>
              </BlurFade>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {items.map((project) => {
                  index += 1;
                  return (
                    <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 2 + index * 0.05}>
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
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
