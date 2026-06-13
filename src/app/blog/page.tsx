import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";

export const metadata = {
  title: "Blog",
  description: "Technical articles about web development, React, Next.js, and software engineering by Prasenjit Nayak.",
  metadataBase: new URL(DATA.url),
  alternates: {
    canonical: `${DATA.url}/blog`,
  },
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div 
      className="relative min-h-screen bg-background"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23595959' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
      }}
    >
      <BreadcrumbJsonLd items={[{ name: "Blog", href: "/blog" }]} />
      <section>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="font-medium text-2xl mb-8 tracking-tighter">blog</h1>
        </BlurFade>
        {posts
          .sort((a, b) =>
            new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
          )
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="flex flex-col space-y-1 mb-4"
                href={`/blog/${post.slug}`}
              >
                <div className="w-full flex flex-col">
                  <p className="tracking-tight">{post.metadata.title}</p>
                  <p className="h-6 text-xs text-muted-foreground">
                    {post.metadata.publishedAt} &middot; {post.metadata.readingTime}
                  </p>
                </div>
              </Link>
            </BlurFade>
          ))}
      </section>
    </div>
  );
}
