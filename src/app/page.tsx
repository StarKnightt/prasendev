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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowUpRight } from "lucide-react";
import { FlipAvatar } from "@/components/flip-avatar";
import { GitHubHoverCard } from "@/components/github-hover-card";
import { SteamHoverCard } from "@/components/steam-hover-card";
import { SteamNowPlaying } from "@/components/steam-now-playing";

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

function SectionLabel({ label }: { label: string }) {
  return (
    <span className="inline-block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
      {label}
    </span>
  );
}

export default function Page() {
  return (
    <>
      <main className="flex min-h-[100dvh] flex-col space-y-12 sm:space-y-14">
        <PersonSchema />

        {/* ─── HERO ─── */}
        <section id="hero">
          <div className="mx-auto w-full space-y-8">
            <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
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
                  className="max-w-[600px] text-muted-foreground md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <div className="profile-wrapper">
                  <FlipAvatar
                    src={DATA.avatarUrl}
                    hoverSrc="/hi2.webp"
                    alt={DATA.name}
                    fallback={DATA.initials}
                  />
                </div>
              </BlurFade>
            </div>

            {/* About */}
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                {DATA.summary}
              </Markdown>
            </BlurFade>

            {/* Social links + Now Playing */}
            <div className="inline-flex flex-col gap-3 items-start">
              <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
                <div className="flex flex-wrap items-center gap-3">
                  {Object.entries(DATA.contact.social)
                    .filter(([_, social]) => social.navbar !== false)
                    .map(([name, social]) => {
                      const socialLink = (
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-border/60 bg-card/40 p-2.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:text-foreground"
                          aria-label={name}
                        >
                          <social.icon className="size-5" />
                        </a>
                      );

                      if (name === "GitHub") {
                        return (
                          <GitHubHoverCard key={name}>
                            {socialLink}
                          </GitHubHoverCard>
                        );
                      }

                      if (name === "Steam") {
                        return (
                          <SteamHoverCard key={name}>
                            {socialLink}
                          </SteamHoverCard>
                        );
                      }

                      return (
                        <Tooltip key={name}>
                          <TooltipTrigger asChild>
                            {socialLink}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{social.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                </div>
              </BlurFade>
            </div>
          </div>
        </section>


        {/* ─── SKILLS ─── */}
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <SectionLabel label="Technologies" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Skills</h2>
            </BlurFade>
            <div className="flex flex-wrap gap-2">
              {DATA.skills.map((skill, id) => (
                <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                  <Badge variant="secondary" className="inline-flex items-center gap-1.5 border border-border/50 px-3 py-1.5 text-sm">
                    {"customIcon" in skill ? (
                      <skill.customIcon className="size-4" />
                    ) : (
                      <FontAwesomeIcon icon={skill.icon} className="size-4" />
                    )}
                    {skill.name}
                  </Badge>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>


        {/* ─── WORK ─── */}
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <SectionLabel label="Career" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Work Experience</h2>
            </BlurFade>
            <div className="space-y-3">
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
                    redacted={(work as any).redacted}
                  />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>


        {/* ─── GITHUB ─── */}
        <section id="contributions">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <SectionLabel label="Open Source" />
            <h2 className="mt-1.5 text-xl font-bold tracking-tight">GitHub Contributions</h2>
            <div className="mt-3">
              <GithubContributions />
            </div>
          </BlurFade>
        </section>

        {/* ─── SPONSORS ─── */}
        <section id="sponsors">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <GitHubSponsors />
          </BlurFade>
        </section>


        {/* ─── PROJECTS ─── */}
        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <SectionLabel label="Portfolio" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Featured Projects</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 8}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {DATA.projects
                  .filter((project) => 
                    ["Dateup", "Wallpaperz", "CleanType"].includes(project.title)
                  )
                  .sort((a, b) => {
                    const order = ["Dateup", "Wallpaperz", "CleanType"];
                    return order.indexOf(a.title) - order.indexOf(b.title);
                  })
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

        {/* ─── EDUCATION ─── */}
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 7}>
              <SectionLabel label="Academic" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Education</h2>
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


        {/* ─── SETUP ─── */}
        <section id="setup">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <SectionLabel label="Development" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Setup</h2>
            </BlurFade>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DATA.setup.map((item, idx) => (
                <BlurFade key={item.title} delay={BLUR_FADE_DELAY * 9.5 + idx * 0.05}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/20 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card/50 group"
                  >
                    <div className="rounded-lg border border-border/50 bg-muted/50 p-2.5">
                      <item.icon className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NOW PLAYING ─── */}
        <BlurFade delay={BLUR_FADE_DELAY * 10}>
          <SteamNowPlaying />
        </BlurFade>

        {/* ─── TESTIMONIALS ─── */}
        <section id="testimonials">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <TwitterTestimonials />
          </BlurFade>
        </section>


        {/* ─── CONTACT ─── */}
        <section id="contact">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-b from-card/60 via-card/40 to-card/20 py-12 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.18) 1px, transparent 0)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-foreground/10 blur-3xl"
              />
              <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
              <SectionLabel label="Get in touch" />
              <p className="text-xl text-muted-foreground">
               I'd love to hear from you.
              </p>
              <a
                href="mailto:prasen.nayak@hotmail.com"
                className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
              >
                <Avatar className="size-6">
                  <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
                Let's talk
              </a>
              </div>
            </div>
          </BlurFade>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-border/40 pt-8 pb-4">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">{DATA.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Frontend Developer from India.
                  <br />Building modern web applications.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Links</p>
                <div className="flex flex-col gap-1.5">
                  {DATA.navbar.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Meta</p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/sitemap.xml" className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
                    Sitemap
                  </Link>
                  <Link href="/rss.xml" className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit">
                    RSS Feed
                  </Link>
                  <a
                    href="https://github.com/StarKnightt/prasendev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
                  >
                    Source Code
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-border/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground/60">
                © {new Date().getFullYear()} {DATA.name}. Open source under{' '}
                <a
                  href="https://opensource.org/licenses/MIT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground transition-colors"
                >
                  MIT
                </a>
              </p>
              <VisitorCounter />
            </div>
          </BlurFade>
        </footer>
      </main>
    </>
  );
}
