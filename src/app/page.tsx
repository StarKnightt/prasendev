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
import { GithubSkeleton } from "@/components/skeletons/github-skeleton";
import { GitHubSponsors } from "@/components/github-sponsors";
import { AgeCounter } from "@/components/age-counter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlipAvatar } from "@/components/flip-avatar";
import { GitHubHoverCard } from "@/components/github-hover-card";
import { SteamHoverCard } from "@/components/steam-hover-card";
import { YouTubeHoverCard } from "@/components/youtube-hover-card";
import { XHoverCard } from "@/components/x-hover-card";
import { LinkedInHoverCard } from "@/components/linkedin-hover-card";
import { InstagramHoverCard } from "@/components/instagram-hover-card";
import { CodePenHoverCard } from "@/components/codepen-hover-card";
import { VercelHoverCard } from "@/components/vercel-hover-card";
import { BuyMeACoffeeHoverCard } from "@/components/bmc-hover-card";
import { DiscordHoverCard } from "@/components/discord-hover-card";
import { SteamNowPlaying } from "@/components/steam-now-playing";
import { BirthdayFireworks } from "@/components/birthday-fireworks";
import { BirthdayHat } from "@/components/birthday-hat";

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
    creator: '@prasenx',
    images: ['https://prasen.dev/portfolio.png'],
  },
};

const GithubContributions = dynamic(() => import("@/components/github-calendar").then(mod => mod.GithubContributions), {
  ssr: false,
  loading: () => <GithubSkeleton />
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
      <BirthdayFireworks />
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
                  as="h1"
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
                  <BirthdayHat />
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

                      if (name === "Youtube") {
                        return (
                          <YouTubeHoverCard key={name}>
                            {socialLink}
                          </YouTubeHoverCard>
                        );
                      }

                      if (name === "X") {
                        return (
                          <XHoverCard key={name}>
                            {socialLink}
                          </XHoverCard>
                        );
                      }

                      if (name === "LinkedIn") {
                        return (
                          <LinkedInHoverCard key={name}>
                            {socialLink}
                          </LinkedInHoverCard>
                        );
                      }

                      if (name === "Instagram") {
                        return (
                          <InstagramHoverCard key={name}>
                            {socialLink}
                          </InstagramHoverCard>
                        );
                      }

                      if (name === "CodePen") {
                        return (
                          <CodePenHoverCard key={name}>
                            {socialLink}
                          </CodePenHoverCard>
                        );
                      }

                      if (name === "Vercel") {
                        return (
                          <VercelHoverCard key={name}>
                            {socialLink}
                          </VercelHoverCard>
                        );
                      }

                      if (name === "buyMeACoffee") {
                        return (
                          <BuyMeACoffeeHoverCard key={name}>
                            {socialLink}
                          </BuyMeACoffeeHoverCard>
                        );
                      }

                      if (name === "Discord") {
                        return (
                          <DiscordHoverCard key={name}>
                            {socialLink}
                          </DiscordHoverCard>
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


        {/* ─── GITHUB ─── */}
        <section id="contributions">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <SectionLabel label="Open Source" />
            <h2 className="mt-1.5 text-xl font-bold tracking-tight">GitHub Contributions</h2>
            <div className="mt-3">
              <GithubContributions />
            </div>
          </BlurFade>
        </section>


        {/* ─── SKILLS ─── */}
        <section id="skills">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <SectionLabel label="Technologies" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Tech Stack</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.map((skill) => (
                  <Badge key={skill.name} variant="secondary" className="inline-flex items-center gap-1.5 border border-border/50 px-3 py-1.5 text-sm">
                    {"customIcon" in skill ? (
                      <skill.customIcon className="size-4" />
                    ) : (
                      <FontAwesomeIcon icon={skill.icon} className="size-4" />
                    )}
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>


        {/* ─── PROJECTS ─── */}
        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <SectionLabel label="Portfolio" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Featured Projects</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 11.5}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {DATA.projects
                  .filter((project) => 
                    ["PayBrackets", "Backrooms: Level 0", "Dateup"].includes(project.title)
                  )
                  .sort((a, b) => {
                    const order = ["PayBrackets", "Backrooms: Level 0", "Dateup"];
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


        {/* ─── WORK ─── */}
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 12}>
              <SectionLabel label="Career" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Work Experience</h2>
            </BlurFade>
            <div className="space-y-3">
              {DATA.work.map((work, id) => (
                <BlurFade
                  key={work.company}
                  delay={BLUR_FADE_DELAY * 12.5 + id * 0.05}
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


        {/* ─── EDUCATION ─── */}
        <section id="education">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <SectionLabel label="Academic" />
              <h2 className="mt-1.5 text-xl font-bold tracking-tight">Education</h2>
            </BlurFade>
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 13.5 + id * 0.05}
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


        {/* ─── NOW PLAYING ─── */}
        <BlurFade delay={BLUR_FADE_DELAY * 13.5}>
          <SteamNowPlaying />
        </BlurFade>

        {/* ─── SPONSORS ─── */}
        <section id="sponsors">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <GitHubSponsors />
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
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">{DATA.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Full Stack Developer from India.
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
