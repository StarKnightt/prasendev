import BlurFade from "@/components/magicui/blur-fade";
import dynamic from "next/dynamic";
import { DATA } from "@/data/resume";
import { ProjectSkeleton } from "@/components/skeletons/project-skeleton";
import { BorderBeam } from "@/components/magicui/border-beam";

export const metadata = {
  title: "Projects",
  description: "Web applications and open source projects built with React, Next.js, TypeScript, and Node.js by Prasenjit Nayak.",
};

const BLUR_FADE_DELAY = 0.04;

const ProjectCard = dynamic(() => import("@/components/project-card").then(mod => mod.ProjectCard), {
  loading: () => <ProjectSkeleton />
});

export default function ProjectsPage() {
  return (
    <section>
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
