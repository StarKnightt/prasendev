import { NextResponse } from "next/server";

// Next 15 no longer caches GET route handlers by default; declare it.
export const revalidate = 3600;

const FEED_URL = "https://medium.com/feed/@prasenx";
const CACHE_MAX_AGE = 3600;

/** Errors must never be cached, or a bad upstream response sticks for an hour. */
function upstreamError(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

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
      return upstreamError("Medium feed error", 502);
    }

    const xml = await res.text();
    // A bot-challenge page can come back as a 200; only a feed with items counts.
    if (!/<rss[\s>]/.test(xml) || !/<channel[\s>]/.test(xml)) {
      return upstreamError("Medium feed is not RSS", 502);
    }
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    const first = items[0];
    if (!first) {
      return upstreamError("Medium feed has no items", 502);
    }

    return NextResponse.json(
      {
        count: items.length,
        latest: {
          title: tag(first, "title"),
          link: tag(first, "link").split("?")[0],
          pubDate: tag(first, "pubDate"),
        },
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=600`,
        },
      }
    );
  } catch {
    return upstreamError("Internal server error", 500);
  }
}
