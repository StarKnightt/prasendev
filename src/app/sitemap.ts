import { MetadataRoute } from 'next';
import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://prasen.dev';
export const revalidate = 86400; // Revalidate once per day

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts
  const posts = await getBlogPosts();
  
  // Get file modification dates for static pages
  const getFileModDate = (filePath: string) => {
    try {
      const stats = fs.statSync(path.join(process.cwd(), filePath));
      return new Date(stats.mtime);
    } catch (e) {
      return new Date();
    }
  };

  // Static routes with actual file modification dates
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: getFileModDate('src/app/page.tsx'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: getFileModDate('src/app/blog/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: getFileModDate('src/app/videos/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gadgets`,
      lastModified: getFileModDate('src/app/gadgets/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: getFileModDate('src/app/projects/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cli`,
      lastModified: getFileModDate('src/app/cli/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Add blog posts to sitemap
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
