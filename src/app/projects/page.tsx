import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectCard } from "@/components/project-card";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web applications and open source projects built with React, Next.js, TypeScript, and Node.js by Prasenjit Nayak.",
  alternates: {
    canonical: `${DATA.url}/projects`,
  },
  openGraph: {
    title: "Projects | Prasenjit Nayak",
    description: "Web applications and open source projects built with React, Next.js, TypeScript, and Node.js.",
    url: `${DATA.url}/projects`,
    images: [{ url: `${DATA.url}/api/og?title=Projects&type=page`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Prasenjit Nayak",
    description: "Web applications and open source projects built with React, Next.js, TypeScript, and Node.js.",
    images: [`${DATA.url}/api/og?title=Projects&type=page`],
  },
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  return (
    <section>
      <BreadcrumbJsonLd items={[{ name: "Projects", href: "/projects" }]} />
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">projects</h1>
      </BlurFade>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {DATA.projects.map((project, id) => (
          <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
            <div className="relative overflow-hidden rounded-xl">
              <BorderBeam
                duration={4}
                size={300}
                reverse
                className="from-transparent via-purple-500 to-transparent"
              />
              <ProjectCard {...project} />
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
