import dynamic from 'next/dynamic';
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PersonSchema } from "@/components/schema/person-schema";
import { Metadata } from 'next';
import { Icons } from "@/components/icons";
import ShinyButton from "@/components/ui/shiny-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BlogSkeleton } from "@/components/skeletons/blog-skeleton";
import { GithubSkeleton } from "@/components/skeletons/github-skeleton";
import { ProjectSkeleton } from "@/components/skeletons/project-skeleton";
import { HackathonSkeleton } from "@/components/skeletons/hackathon-skeleton";
import { BorderBeam } from "@/components/magicui/border-beam";
import { GhibliSkyBackground } from "@/components/ghibli-elements";
import { GitHubSponsors } from "@/components/github-sponsors";
import { TwitterTestimonials } from "@/components/twitter-testimonials";
import { AgeCounter } from "@/components/age-counter";
import { ArrowUpRight } from "lucide-react";

const VisitorCounter = dynamic(() => import("@/components/visitor-counter"), {
  ssr: false,
});

const BLUR_FADE_DELAY = 0.04;
export const metadata: Metadata = {
  title: DATA.name,
  description: DATA.summary,
  openGraph: {
    title: DATA.name,
    description: DATA.summary,
    url: DATA.url,
    siteName: DATA.name,
    images: [
      {
        url: 'https://prasen.dev/portfolio.png',
        width: 1200,
        height: 630,
        alt: `${DATA.name}'s Portfolio`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: DATA.name,
    description: DATA.summary,
    creator: '@' + 'Star_Knight12',
    images: ['https://prasen.dev/portfolio.png'],
  },
};

const BlogCard = dynamic(() => import("@/components/blog-card").then(mod => mod.BlogCard), {
  ssr: true,
  loading: () => <BlogSkeleton />
});

const GithubContributions = dynamic(() => import("@/components/github-calendar").then(mod => mod.GithubContributions), {
  ssr: false,
  loading: () => <GithubSkeleton />
});

const ProjectCardDynamic = dynamic(() => import("@/components/project-card").then(mod => mod.ProjectCard), {
  ssr: true,
  loading: () => <ProjectSkeleton />
});

const HackathonCardDynamic = dynamic(() => import("@/components/hackathon-card").then(mod => mod.HackathonCard), {
  ssr: true,
  loading: () => <HackathonSkeleton />
});

export default function Page() {
  return (
    <>
      <main className="flex flex-col min-h-[100dvh] space-y-10">
        <PersonSchema />
        <section id="hero">
          <div className="mx-auto w-full space-y-8">
            <div className="gap-4 flex justify-between">
              <div className="flex-col flex flex-1 space-y-1.5">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={`hey, ${DATA.name.split(" ")[0]} here`}
                />
                <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
                  <AgeCounter />
                </BlurFade>
                <BlurFadeText
                  className="max-w-[600px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="profile-wrapper">
                  <Avatar className="size-28 relative z-10">
                    <AvatarImage
                      alt={DATA.name}
                      src={DATA.avatarUrl}
                      width={112}
                      height={112}
                      loading="eager"
                    />
                    <AvatarFallback>{DATA.initials}</AvatarFallback>
                  </Avatar>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
        
        <section id="about">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
              {DATA.summary}
            </Markdown>
          </BlurFade>
        </section>

        <section id="connect">
          <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
            <div className="flex items-center gap-4">
              {Object.entries(DATA.contact.social)
                .filter(([_, social]) => social.navbar !== false)
                .map(([name, social]) => (
                  <Tooltip key={name}>
                    <TooltipTrigger asChild>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={name}
                      >
                        <social.icon className="size-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{social.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
            </div>
          </BlurFade>
        </section>

        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <h2 className="text-xl font-bold">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-1">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge key={skill}>{skill}</Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <h2 className="text-xl font-bold">Work Experience</h2>
            </BlurFade>
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </section>

        <section id="contributions">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h2 className="text-xl font-bold">GitHub Contributions</h2>
            <GithubContributions />
          </BlurFade>
        </section>

        <section id="sponsors">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <GitHubSponsors />
          </BlurFade>
        </section>

        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Featured Projects</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {DATA.projects
                  .filter((project) => 
                    project.active && 
                    project.title !== "Solar System" && 
                    project.title !== "Coffee-Website"
                  )
                  .slice(0, 3)
                  .map((project) => (
                    <div key={project.title} className="relative overflow-hidden rounded-xl">
                      <ProjectCard
                        {...project}
                        tags={Array.from(project.technologies)}
                      />
                    </div>
                  ))}
              </div>
              <Link
                href="/projects"
                className="mt-4 block"
              >
                <ShinyButton
                  className="w-full sm:w-auto group transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] font-semibold"
                >
                  View All Projects →
                </ShinyButton>
              </Link>
            </BlurFade>
          </div>
        </section>

        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <h2 className="text-xl font-bold">Education</h2>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </section>

        <section id="setup">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Development</p>
                <h2 className="text-xl font-bold">Setup</h2>
              </div>
            </BlurFade>
            <div className="flex flex-col gap-2">
              {DATA.setup.map((item, idx) => (
                <BlurFade key={item.title} delay={BLUR_FADE_DELAY * 9.5 + idx * 0.05}>
                  <Link
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 transition-colors group"
                  >
                    <div className="p-2.5 rounded-lg bg-muted">
                      <item.icon className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <TwitterTestimonials />
          </BlurFade>
        </section>

        <section id="contact">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 border border-border/50 rounded-2xl bg-card/30">
              <p className="text-xl text-muted-foreground">
               I'd love to hear from you.
              </p>
              <a
                href="mailto:prasen.nayak@hotmail.com"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                <Avatar className="size-6">
                  <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
                Let's talk
              </a>
            </div>
          </BlurFade>
        </section>
        <footer className="mt-20 border-t py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>© {new Date().getFullYear()} {DATA.name}. All rights reserved.</p>
                  <p>
                    Open source under{' '}
                    <a 
                      href="https://opensource.org/licenses/MIT" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      MIT License
                    </a>
                    {' '}and available on{' '}
                    <a 
                      href="https://github.com/StarKnightt/prasendev" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      GitHub
                    </a>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <VisitorCounter />
                  <span className="text-muted-foreground/30">|</span>
                  <Link href="/sitemap.xml" className="text-sm text-muted-foreground hover:text-foreground">
                    Sitemap
                  </Link>
                  <Link href="/rss.xml" className="text-sm text-muted-foreground hover:text-foreground">
                    RSS
                  </Link>
                </div>
              </div>
            </div>
          </BlurFade>
        </footer>
      </main>
    </>
  );
}