export interface YouTubeVideo {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  date: string;
  videoId: string;
}

interface YouTubePlaylistItem {
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      maxres?: { url: string };
      standard?: { url: string };
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
    resourceId: {
      videoId: string;
    };
  };
}

interface YouTubePlaylistResponse {
  items: YouTubePlaylistItem[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
  };
}

function getBestThumbnail(thumbnails: YouTubePlaylistItem["snippet"]["thumbnails"]): string {
  return (
    thumbnails.maxres?.url ||
    thumbnails.standard?.url ||
    thumbnails.high?.url ||
    thumbnails.medium?.url ||
    thumbnails.default?.url ||
    ""
  );
}

function getUploadsPlaylistId(channelId: string): string {
  return "UU" + channelId.slice(2);
}

// YouTube Shorts are capped at 3 minutes, so anything this length or shorter
// is treated as a Short and excluded. Lower this if a legit short video is hidden.
const MAX_SHORT_DURATION_SECONDS = 180;

function parseISO8601Duration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);
  return hours * 3600 + minutes * 60 + seconds;
}

async function fetchDurations(
  videoIds: string[],
  apiKey: string
): Promise<Map<string, number>> {
  const durations = new Map<string, number>();

  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50);
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("id", chunk.join(","));
    url.searchParams.set("key", apiKey);

    try {
      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
      if (!res.ok) continue;
      const data = await res.json();
      for (const item of data.items ?? []) {
        const seconds = parseISO8601Duration(item.contentDetails?.duration ?? "PT0S");
        durations.set(item.id, seconds);
      }
    } catch {
      // ignore; videos with unknown duration are kept rather than hidden
    }
  }

  return durations;
}

function truncateDescription(desc: string, maxLength = 150): string {
  const firstLine = desc.split("\n")[0];
  if (firstLine.length <= maxLength) return firstLine;
  return firstLine.slice(0, maxLength).trimEnd() + "...";
}

export async function fetchYouTubeVideos(maxResults = 50): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    console.warn("YouTube API key or channel ID not configured");
    return [];
  }

  const playlistId = getUploadsPlaylistId(channelId);
  const allItems: YouTubePlaylistItem[] = [];
  let pageToken: string | undefined;

  try {
    while (allItems.length < maxResults) {
      const perPage = Math.min(50, maxResults - allItems.length);
      const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      url.searchParams.set("part", "snippet");
      url.searchParams.set("playlistId", playlistId);
      url.searchParams.set("maxResults", String(perPage));
      url.searchParams.set("key", apiKey);
      if (pageToken) url.searchParams.set("pageToken", pageToken);

      const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

      if (!res.ok) {
        console.error(`YouTube API error: ${res.status} ${res.statusText}`);
        return [];
      }

      const data: YouTubePlaylistResponse = await res.json();

      if (!data.items?.length) break;

      allItems.push(...data.items);
      pageToken = data.nextPageToken;

      if (!pageToken) break;
    }

    const validItems = allItems.filter(
      (item) =>
        item.snippet.title !== "Private video" &&
        item.snippet.title !== "Deleted video"
    );

    // Filter out Shorts using each video's duration
    const durations = await fetchDurations(
      validItems.map((item) => item.snippet.resourceId.videoId),
      apiKey
    );

    return validItems
      .filter((item) => {
        const seconds = durations.get(item.snippet.resourceId.videoId);
        // keep videos longer than the Short cutoff; keep unknowns to avoid hiding real content
        return seconds === undefined || seconds > MAX_SHORT_DURATION_SECONDS;
      })
      .map((item) => ({
        title: item.snippet.title,
        description: truncateDescription(item.snippet.description),
        thumbnail: getBestThumbnail(item.snippet.thumbnails),
        url: `https://youtu.be/${item.snippet.resourceId.videoId}`,
        date: item.snippet.publishedAt.split("T")[0],
        videoId: item.snippet.resourceId.videoId,
      }));
  } catch (error) {
    console.error("Failed to fetch YouTube videos:", error);
    return [];
  }
}
