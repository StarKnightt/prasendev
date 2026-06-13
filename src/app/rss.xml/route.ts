import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";

function truncateContent(content: string, maxLength: number = 280): string {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + '... [Read More]';
}

export async function GET() {
  const posts = await getBlogPosts();
  const sortedPosts = posts.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" 
      xmlns:atom="http://www.w3.org/2005/Atom"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
      xmlns:webfeeds="http://webfeeds.org/rss/1.0"
    >
      <channel>
        <title>${DATA.name}'s Blog</title>
        <description>${DATA.description}</description>
        <link>${DATA.url}</link>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <generator>Next.js</generator>
        <atom:link href="${DATA.url}/rss.xml" rel="self" type="application/rss+xml"/>
        <webfeeds:cover image="${DATA.url}/api/og" />
        <webfeeds:icon>${DATA.url}/favicon.ico</webfeeds:icon>
        <webfeeds:accentColor>2563EB</webfeeds:accentColor>
        <webfeeds:related layout="card" target="browser"/>
        <image>
          <url>${DATA.url}/api/og</url>
          <title>${DATA.name}'s Blog</title>
          <link>${DATA.url}</link>
        </image>
        <copyright>All rights reserved ${new Date().getFullYear()}, ${DATA.name}</copyright>
        ${sortedPosts
          .map(
            (post) => `
            <item>
              <title>${post.metadata.title}</title>
              <link>${DATA.url}/blog/${post.slug}</link>
              <guid isPermaLink="true">${DATA.url}/blog/${post.slug}</guid>
              <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
              <description><![CDATA[${post.metadata.summary}]]></description>
              <content:encoded><![CDATA[${truncateContent(post.metadata.summary)}]]></content:encoded>
              <dc:creator>${DATA.name}</dc:creator>
              ${post.metadata.tags ? 
                post.metadata.tags.map((tag: string) => `<category>${tag}</category>`).join('') 
                : ''}
              ${post.metadata.image ? 
                `<media:content 
                  url="${DATA.url}${post.metadata.image}" 
                  medium="image" 
                  type="image/jpeg"
                />` 
                : ''}
              <author>${DATA.contact.email} (${DATA.name})</author>
            </item>
          `
          )
          .join('')}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
} 