import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface BlogPost {
  title: string;
  publishedAt: string;
  summary: string;
  slug: string;
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-border/60 bg-card/30 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-card/70 hover:shadow-md"
    >
      <article className="space-y-2">
        <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>
        <time className="text-xs text-muted-foreground">
          {post.publishedAt.split('T')[0]}
        </time>
      </article>
    </Link>
  );
}
