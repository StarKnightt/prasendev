import { NextResponse } from 'next/server';

export const revalidate = 3600;

interface Sponsor {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  isOneTime: boolean;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      return NextResponse.json({ sponsors: [], error: 'GITHUB_TOKEN not configured' });
    }

    const query = `
      query {
        viewer {
          login
          sponsorshipsAsMaintainer(first: 100, includePrivate: false, activeOnly: false) {
            totalCount
            nodes {
              sponsorEntity {
                ... on User {
                  login
                  name
                  avatarUrl
                  url
                }
                ... on Organization {
                  login
                  name
                  avatarUrl
                  url
                }
              }
              tier {
                isOneTime
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({ sponsors: [], error: `GitHub API error: ${response.status}` });
    }

    const data = await response.json();
    
    if (data.errors) {
      const hasFatalError = data.errors.some((error: any) => 
        !error.path?.includes('tier')
      );
      if (hasFatalError) {
        return NextResponse.json({ sponsors: [], error: 'GraphQL query failed' });
      }
    }

    const viewer = data.data?.viewer;
    const sponsorships = viewer?.sponsorshipsAsMaintainer?.nodes || [];
    const totalCount = viewer?.sponsorshipsAsMaintainer?.totalCount || 0;
    
    const sponsors: Sponsor[] = sponsorships
      .filter((node: any) => node?.sponsorEntity)
      .map((node: any) => ({
        login: node.sponsorEntity.login,
        name: node.sponsorEntity.name || node.sponsorEntity.login,
        avatarUrl: node.sponsorEntity.avatarUrl,
        url: node.sponsorEntity.url,
        isOneTime: node.tier?.isOneTime || false,
      }));

    return NextResponse.json(
      { sponsors, totalCount },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ 
      sponsors: [], 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

