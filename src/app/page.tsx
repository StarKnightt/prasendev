import { DATA } from "@/data/resume";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Markdown, { type Components } from "react-markdown";
import { remarkMarks } from "@/lib/remark-marks";
import { formatDate } from "@/lib/utils";
import { Highlight, type HighlightType } from "@/components/highlight";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ExperienceItem } from "@/components/experience-item";
import { EmailButton } from "@/components/email-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PersonSchema } from "@/components/schema/person-schema";
import { Metadata } from 'next';
import ShinyButton from "@/components/ui/shiny-button";
import { GitHubSponsors } from "@/components/github-sponsors";
import { AgeCounter } from "@/components/age-counter";
import { FlipAvatar } from "@/components/flip-avatar";
import { GitHubHoverCard } from "@/components/github-hover-card";
import { SteamHoverCard } from "@/components/steam-hover-card";
import { YouTubeHoverCard } from "@/components/youtube-hover-card";
import { XHoverCard } from "@/components/x-hover-card";
import { LinkedInHoverCard } from "@/components/linkedin-hover-card";
import { InstagramHoverCard } from "@/components/instagram-hover-card";
import { CodePenHoverCard } from "@/components/codepen-hover-card";
import { BuyMeACoffeeHoverCard } from "@/components/bmc-hover-card";
import { DiscordHoverCard } from "@/components/discord-hover-card";
import { MediumHoverCard } from "@/components/medium-hover-card";
import { SteamNowPlaying } from "@/components/steam-now-playing";
import { BirthdayFireworks } from "@/components/birthday-fireworks";
import { BirthdayHat } from "@/components/birthday-hat";
import { VisitorCounter, GithubContributionsPlain } from "@/components/lazy-client";
import { StatGlyph, type StatGlyphKind } from "@/components/motion/stat-glyph";
import { CountUp } from "@/components/motion/count-up";
import { HeadingScribble } from "@/components/motion/heading-scribble";
import { ExperienceTimeline } from "@/components/motion/experience-timeline";
import { ContributionsWave } from "@/components/motion/contributions-wave";
import { Signature } from "@/components/motion/signature";
import { AvatarDoodles } from "@/components/motion/avatar-doodles";

const BLUR_FADE_DELAY = 0.04;

// Brand hover colors for social icons; others fall back to foreground
const SOCIAL_HOVER_COLORS: Record<string, string> = {
  LinkedIn: "hover:text-[#0a66c2]",
  Youtube: "hover:text-[#ff0000]",
  Medium: "hover:text-black dark:hover:text-white",
  Instagram: "hover:text-[#e4405f]",
  Steam: "hover:text-[#00adee]",
  Discord: "hover:text-[#5865f2]",
};

const PROOF: {
  value: string;
  label: string;
  glyph: StatGlyphKind;
  receipts: { label: string; href: string }[];
}[] = [
  {
    value: "22.5K+",
    glyph: "signal",
    label: "followers on X",
    receipts: [{ label: "@prasenx", href: DATA.contact.social.X.url }],
  },
  {
    value: "2x",
    glyph: "spark",
    label: "featured by the official Claude account",
    receipts: [
      { label: "Night Street", href: "https://x.com/claudeai/status/2090557648567505222" },
      { label: "Sedona Sunset", href: "https://x.com/claudeai/status/2101017905462722619" },
    ],
  },
  {
    value: "PR #3",
    glyph: "merge",
    label: "merged from the Xbox CTO",
    receipts: [
      { label: "Jungle Trail", href: "https://github.com/StarKnightt/jungle-trail/pull/3" },
    ],
  },
  {
    value: "23",
    glyph: "bars",
    label: "paid placements on Outbuilt",
    receipts: [{ label: "outbuilt.lol", href: "https://outbuilt.lol" }],
  },
];

function shortMonth(period: string) {
  return period.replace(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g,
    (m) => m.slice(0, 3)
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[9rem_1fr]">
      <span className="pt-0.5 text-sm text-muted-foreground">{label}</span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

// Plain-text description. DATA.summary is markdown and leaks syntax into meta tags
const HOME_DESCRIPTION =
  "Freelance full stack developer from Bhubaneswar, India. I build with Next.js, TypeScript and React: Outbuilt, Jungle Trail, Night Street and more. Open to DevRel work.";

export const metadata: Metadata = {
  title: DATA.name,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: DATA.name,
    description: HOME_DESCRIPTION,
    url: DATA.url,
    siteName: DATA.name,
    images: [
      {
        url: `${DATA.url}/portfolio.png`,
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
    description: HOME_DESCRIPTION,
    creator: '@prasenx',
    images: [`${DATA.url}/portfolio.png`],
  },
};

const summaryComponents: Components = {
  mark: ({ node, children, ...props }) => {
    const { "data-type": type, "data-order": order } = props as Record<string, string>;
    return (
      <Highlight type={type as HighlightType} order={Number(order)}>
        {children}
      </Highlight>
    );
  },
};

function SectionLabel({ label }: { label: string }) {
  return (
    <span className="inline-block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
      {label}
    </span>
  );
}

export default async function Page() {
  const posts = (await getBlogPosts())
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    )
    .slice(0, 3);

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
                  <AvatarDoodles />
                </div>
              </BlurFade>
            </div>

            {/* About */}
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <Markdown
                className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert [&_a:has(.rough-mark)]:no-underline"
                remarkPlugins={[remarkMarks]}
                components={summaryComponents}
              >
                {DATA.summary}
              </Markdown>
            </BlurFade>

            {/* Proof points */}
            <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6 sm:grid-cols-4">
                {PROOF.map((item) => (
                  <div key={item.label} className="proof-stat flex flex-col">
                    <dt className="sr-only">{item.label}</dt>
                    <dd className="flex items-center gap-2 text-xl font-medium tabular-nums tracking-tight">
                      <StatGlyph kind={item.glyph} />
                      <CountUp value={item.value} />
                    </dd>
                    <dd className="mt-1 text-sm leading-snug text-muted-foreground">{item.label}</dd>
                    <dd className="mt-2 flex flex-wrap gap-x-2 text-xs text-muted-foreground">
                      {item.receipts.map((r) => (
                        <a
                          key={r.href}
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/40"
                        >
                          {r.label}
                        </a>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <EmailButton />
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
                          className={`rounded-full border border-border/60 bg-card/40 p-2.5 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card ${SOCIAL_HOVER_COLORS[name] ?? "hover:text-foreground"}`}
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

                      if (name === "Medium") {
                        return (
                          <MediumHoverCard key={name}>
                            {socialLink}
                          </MediumHoverCard>
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


        {/* ─── PROJECTS ─── */}
        <section id="projects">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <SectionLabel label="Portfolio" />
                  <h2 className="relative mt-1.5 w-fit text-xl font-bold tracking-tight">
                    Selected Work
                    <HeadingScribble kind="swoosh" />
                  </h2>
                </div>
                <Link href="/projects" className="shrink-0">
                  <ShinyButton className="px-3 py-1.5 font-semibold transition-all duration-300 hover:shadow-lg active:scale-[0.98] [&>span]:text-xs">
                    View All Projects →
                  </ShinyButton>
                </Link>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 11.5}>
              <div className="grid gap-4 sm:grid-cols-2">
                {DATA.projects
                  .filter((project) => 
                    ["Outbuilt", "Jungle Trail", "Night Street", "Sedona Sunset"].includes(project.title)
                  )
                  .sort((a, b) => {
                    const order = ["Outbuilt", "Jungle Trail", "Night Street", "Sedona Sunset"];
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
            </BlurFade>
          </div>
        </section>


        {/* ─── WORK ─── */}
        <section id="work">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 12}>
              <SectionLabel label="Career" />
              <h2 className="relative mt-1.5 w-fit text-xl font-bold tracking-tight">
                Experience
                <HeadingScribble kind="flick" />
              </h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 12.5}>
              <ExperienceTimeline>
                <ol className="divide-y divide-border border-y border-border">
                  {DATA.work.map((work) => (
                    <ExperienceItem
                      key={work.company}
                      company={work.company}
                      title={work.title}
                      period={shortMonth(`${work.start} - ${work.end}`)}
                      logoUrl={"logoUrl" in work ? work.logoUrl : undefined}
                      logoIcon={"logoIcon" in work ? work.logoIcon : undefined}
                      impact={work.impact}
                      description={work.description}
                      badges={work.badges}
                      links={"links" in work ? work.links : undefined}
                      redacted={"redacted" in work ? work.redacted : undefined}
                    />
                  ))}
                </ol>
              </ExperienceTimeline>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
              <ul className="mt-3 space-y-2">
                {DATA.education.map((edu) => (
                  <li
                    key={edu.school}
                    className="grid gap-x-8 text-sm sm:grid-cols-[9rem_1fr]"
                  >
                    <span className="whitespace-nowrap text-[13px] leading-5 tabular-nums text-muted-foreground">
                      {edu.start} - {edu.end}
                    </span>
                    <span className="text-muted-foreground">
                      <span className="text-foreground/80">{edu.degree}</span>,{" "}
                      <a
                        href={edu.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 align-bottom underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/40"
                      >
                        <Image
                          src={edu.logoUrl}
                          alt=""
                          width={16}
                          height={16}
                          className="size-4 shrink-0 rounded-full bg-white object-contain dark:ring-1 dark:ring-white/25"
                        />
                        {edu.school}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </BlurFade>
          </div>
        </section>


        {/* ─── ELSEWHERE ─── */}
        <section id="elsewhere">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 14}>
              <SectionLabel label="More" />
              <h2 className="relative mt-1.5 w-fit text-xl font-bold tracking-tight">
                Behind the Scenes
                <HeadingScribble kind="double" />
              </h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 14.5}>
              <div className="divide-y divide-border border-y border-border">
                <Row label="Stack">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {DATA.skills.map((s) => s.name).join(", ")}
                  </p>
                </Row>
                <Row label="Now playing">
                  <div className="max-w-sm">
                    <SteamNowPlaying />
                  </div>
                </Row>
                <Row label="Support">
                  <GitHubSponsors variant="compact" />
                </Row>
              </div>
              <div className="mt-6">
                <p className="mb-3 text-sm text-muted-foreground">GitHub contributions</p>
                <ContributionsWave>
                  <GithubContributionsPlain />
                </ContributionsWave>
              </div>
            </BlurFade>
          </div>
        </section>


        {/* ─── WRITING ─── */}
        <section id="writing">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 15}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <SectionLabel label="Blog" />
                  <h2 className="relative mt-1.5 w-fit text-xl font-bold tracking-tight">
                    Writing
                    <HeadingScribble kind="wave" />
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  All posts
                  <ArrowRight className="size-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
                </Link>
              </div>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 15.5}>
              <ul className="-mx-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid gap-x-8 gap-y-0.5 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-muted/60 sm:grid-cols-[9rem_1fr]"
                    >
                      <time
                        dateTime={post.metadata.publishedAt}
                        className="whitespace-nowrap text-[13px] leading-6 tabular-nums text-muted-foreground"
                      >
                        {formatDate(post.metadata.publishedAt)}
                      </time>
                      <span className="text-[15px] leading-6 underline-offset-4 group-hover:underline">
                        {post.metadata.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </BlurFade>
          </div>
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
                href="mailto:hi@prasen.dev"
                className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-background/70 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-background"
              >
                <Avatar className="size-6">
                  <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
                Let's talk
              </a>
              </div>
              <Signature className="pointer-events-none absolute bottom-2 right-4 w-24 -rotate-6 text-muted-foreground/70 sm:bottom-3 sm:right-6 sm:w-36" />

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
