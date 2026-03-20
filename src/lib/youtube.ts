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

    return allItems
      .filter((item) => item.snippet.title !== "Private video" && item.snippet.title !== "Deleted video")
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
