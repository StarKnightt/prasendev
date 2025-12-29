import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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
      console.error('❌ GITHUB_TOKEN is not set in .env.local');
      return NextResponse.json({ 
        sponsors: [], 
        error: 'GITHUB_TOKEN not configured' 
      });
    }

    console.log('✅ GITHUB_TOKEN found, fetching sponsors...');

    const query = `
      query {
        viewer {
          login
          sponsorshipsAsMaintainer(first: 100, includePrivate: false, activeOnly: false) {
            totalCount
            nodes {
              createdAt
              privacyLevel
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
                name
                isOneTime
                monthlyPriceInDollars
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
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ GitHub API error:', response.status, errorText);
      return NextResponse.json({ 
        sponsors: [], 
        error: `GitHub API error: ${response.status}` 
      });
    }

    const data = await response.json();
    
    console.log('📦 Raw GitHub API response:', JSON.stringify(data, null, 2));
    
    // Check if we have fatal errors (not just tier permission errors)
    if (data.errors) {
      // Check if errors are only about tier field (which we can ignore)
      const hasFatalError = data.errors.some((error: any) => 
        !error.path?.includes('tier')
      );
      
      if (hasFatalError) {
        console.error('❌ GitHub GraphQL fatal errors:', JSON.stringify(data.errors, null, 2));
        return NextResponse.json({ 
          sponsors: [], 
          error: 'GraphQL query failed',
          details: data.errors 
        });
      } else {
        console.log('⚠️  Non-fatal error (tier field forbidden) - continuing anyway');
      }
    }

    const viewer = data.data?.viewer;
    console.log('👤 GitHub user:', viewer?.login);
    
    const sponsorships = viewer?.sponsorshipsAsMaintainer?.nodes || [];
    const totalCount = viewer?.sponsorshipsAsMaintainer?.totalCount || 0;
    
    console.log(`💖 Total sponsors found: ${totalCount}`);
    console.log(`📋 Sponsorships data:`, JSON.stringify(sponsorships, null, 2));
    
    const sponsors: Sponsor[] = sponsorships
      .filter((node: any) => node?.sponsorEntity)
      .map((node: any) => {
        const sponsor = {
          login: node.sponsorEntity.login,
          name: node.sponsorEntity.name || node.sponsorEntity.login,
          avatarUrl: node.sponsorEntity.avatarUrl,
          url: node.sponsorEntity.url,
          isOneTime: node.tier?.isOneTime || false,
        };
        console.log('✨ Processed sponsor:', sponsor);
        return sponsor;
      });

    console.log(`✅ Returning ${sponsors.length} sponsors`);

    return NextResponse.json(
      { 
        sponsors,
        totalCount,
        debug: {
          hasToken: !!token,
          viewerLogin: viewer?.login,
          rawSponsorsCount: sponsorships.length
        }
      },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('❌ Error fetching sponsors:', error);
    return NextResponse.json({ 
      sponsors: [], 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

