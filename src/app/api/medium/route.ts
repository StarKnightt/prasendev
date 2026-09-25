import { NextResponse } from "next/server";

// Next 15 no longer caches GET route handlers by default; declare it.
export const revalidate = 3600;

const FEED_URL = "https://medium.com/feed/@prasenx";
const CACHE_MAX_AGE = 3600;

function tag(item: string, name: string) {
  const match = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  if (!match) return "";
  return match[1]
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export async function GET() {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "prasen.dev" },
      next: { revalidate: CACHE_MAX_AGE },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Medium feed error" },
        { status: res.status }
      );
    }

    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const first = items[0];

    return NextResponse.json(
      {
        count: items.length,
        latest: first
          ? {
              title: tag(first, "title"),
              link: tag(first, "link").split("?")[0],
              pubDate: tag(first, "pubDate"),
            }
          : null,
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=600`,
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
