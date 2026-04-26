import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const VANITY_URL = "StarKnight__";
const CACHE_MAX_AGE = 120; // 2 minutes

const STATUS_MAP: Record<number, string> = {
  0: "Offline",
  1: "Online",
  2: "Busy",
  3: "Away",
  4: "Snooze",
  5: "Looking to trade",
  6: "Looking to play",
};

async function resolveSteamId(): Promise<string | null> {
  const res = await fetch(
    `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${STEAM_API_KEY}&vanityurl=${VANITY_URL}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (data.response?.success === 1) return data.response.steamid;
  return null;
}

export async function GET() {
  if (!STEAM_API_KEY) {
    return NextResponse.json(
      { error: "Steam API key not configured" },
      { status: 500 }
    );
  }

  try {
    const steamId = await resolveSteamId();
    if (!steamId) {
      return NextResponse.json(
        { error: "Could not resolve Steam ID" },
        { status: 404 }
      );
    }

    const [playerRes, gamesRes, levelRes] = await Promise.all([
      fetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamId}`,
        { cache: "no-store" }
      ),
      fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${steamId}&include_played_free_games=true&include_appinfo=true`,
        { cache: "no-store" }
      ),
      fetch(
        `https://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${STEAM_API_KEY}&steamid=${steamId}`,
        { next: { revalidate: 3600 } }
      ),
    ]);

    const [playerData, gamesData, levelData] = await Promise.all([
      playerRes.json(),
      gamesRes.json(),
      levelRes.json(),
    ]);

    const player = playerData.response?.players?.[0];
    if (!player) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }

    const allGames = gamesData.response?.games ?? [];
    const lastPlayedGame = allGames
      .filter((g: { rtime_last_played?: number }) => g.rtime_last_played && g.rtime_last_played > 0)
      .sort((a: { rtime_last_played: number }, b: { rtime_last_played: number }) => b.rtime_last_played - a.rtime_last_played)[0] ?? null;

    return NextResponse.json(
      {
        name: player.personaname,
        avatar: player.avatarfull,
        status: STATUS_MAP[player.personastate] ?? "Offline",
        personastate: player.personastate,
        gameextrainfo: player.gameextrainfo ?? null,
        gameid: player.gameid ?? null,
        lastPlayed: lastPlayedGame
          ? {
              name: lastPlayedGame.name,
              appid: String(lastPlayedGame.appid),
              playtime_forever: lastPlayedGame.playtime_forever ?? 0,
            }
          : null,
        level: levelData.response?.player_level ?? 0,
        gamesCount: allGames.length,
        profileUrl: player.profileurl,
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=120`,
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
