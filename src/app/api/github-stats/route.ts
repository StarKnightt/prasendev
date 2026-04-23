import { NextResponse } from "next/server";

const GITHUB_USERNAME = "StarKnightt";
const CACHE_MAX_AGE = 3600; // 1 hour

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: CACHE_MAX_AGE },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      {
        name: data.name,
        login: data.login,
        avatar_url: data.avatar_url,
        bio: data.bio,
        followers: data.followers,
        following: data.following,
        public_repos: data.public_repos,
        html_url: data.html_url,
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
