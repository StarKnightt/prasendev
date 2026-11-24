import Reveal from "@/components/motion/reveal";
import { InkDoodle } from "@/components/motion/ink-doodle";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

const BLOG_DESCRIPTION =
  "Blog by Prasenjit Nayak: honest takes on web development, Next.js, AI tools like Cursor and Claude, Linux, and what it's like shipping as a freelance dev.";
const BLOG_IMAGE = `${DATA.url}/og/blog-2026-11.png`;

export const metadata: Metadata = {
  title: "Blog",
  description: BLOG_DESCRIPTION,
  metadataBase: new URL(DATA.url),
  alternates: {
    canonical: `${DATA.url}/blog`,
  },
  openGraph: {
    title: "Blog | Prasenjit Nayak",
    description: BLOG_DESCRIPTION,
    url: `${DATA.url}/blog`,
    siteName: "Prasenjit Nayak - Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: BLOG_IMAGE,
        width: 1200,
        height: 630,
        alt: "A notebook page reading Prasenjit's blog: AI tools, apps, games and whatever i'm into",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Prasenjit Nayak",
    description: BLOG_DESCRIPTION,
    creator: "@prasenx",
    images: [BLOG_IMAGE],
  },
};

const short = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

// The index is laid out like the contents page of a book: posts grouped by year,
// numbered, with a dotted leader running out to the date.
export default async function BlogPage() {
  const posts = (await getBlogPosts()).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
  const years = new Map<string, typeof posts>();
  for (const post of posts) {
    const y = post.metadata.publishedAt.slice(0, 4);
    years.set(y, [...(years.get(y) ?? []), post]);
  }
  let n = posts.length;

  return (
    <section>
      <BreadcrumbJsonLd items={[{ name: "Blog", href: "/blog" }]} />
      <Reveal>
        <h1 className="relative w-fit text-4xl sm:text-5xl">
          Writing
          <InkDoodle kind="inkpot" delay={300} className="absolute left-full top-1/2 -translate-y-1/2 ml-3 h-12 w-12" />
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          {posts.length} pieces on AI tools, apps, games and whatever I am building. Newest first.
        </p>
      </Reveal>

      {[...years].map(([year, list], yi) => (
        <Reveal key={year} delay={0.05 + yi * 0.05}>
          <h2 className="mb-2 mt-12 flex items-center gap-4 text-2xl text-muted-foreground">
            {year}
            <span aria-hidden className="h-px flex-1 bg-border" />
          </h2>
          <ol>
            {list.map((post) => {
              const no = String(n--).padStart(2, "0");
              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid grid-cols-[2.25rem_1fr] gap-x-3 rounded-md py-2.5"
                  >
                    <span className="pt-[0.3rem] font-type text-xs tabular-nums text-muted-foreground">{no}</span>
                    <span className="flex min-w-0 items-end gap-3">
                      <span className="text-[17px] leading-snug decoration-foreground/40 underline-offset-4 group-hover:underline">
                        {post.metadata.title}
                      </span>
                      <span aria-hidden className="mb-[0.45rem] hidden h-0 min-w-8 flex-1 border-b border-dotted border-foreground/35 sm:block" />
                      <time
                        dateTime={post.metadata.publishedAt}
                        className="mb-[0.2rem] hidden whitespace-nowrap font-type text-xs text-muted-foreground sm:block"
                      >
                        {short(post.metadata.publishedAt)} &middot; {post.metadata.readingTime.replace(" read", "")}
                      </time>
                    </span>
                    <span className="col-start-2 mt-1 font-type text-[11px] text-muted-foreground sm:hidden">
                      {formatDate(post.metadata.publishedAt)} &middot; {post.metadata.readingTime}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Reveal>
      ))}
    </section>
  );
}
