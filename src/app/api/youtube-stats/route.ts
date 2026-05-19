import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const CACHE_MAX_AGE = 3600;

export async function GET() {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    return NextResponse.json(
      { error: "YouTube API not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: CACHE_MAX_AGE } }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "YouTube API error" },
        { status: res.status }
      );
    }

    const json = await res.json();
    const channel = json.items?.[0];
    if (!channel) {
      return NextResponse.json(
        { error: "Channel not found" },
        { status: 404 }
      );
    }

    const { snippet, statistics } = channel;

    return NextResponse.json(
      {
        name: snippet.title,
        avatar: snippet.thumbnails.medium.url,
        description: snippet.description,
        subscribers: Number(statistics.subscriberCount),
        views: Number(statistics.viewCount),
        videos: Number(statistics.videoCount),
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
