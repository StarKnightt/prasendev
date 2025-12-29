import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return NextResponse.json({
      success: false,
      error: 'GITHUB_TOKEN not found in environment variables',
      hint: 'Make sure you added GITHUB_TOKEN to your .env.local file'
    });
  }

  try {
    // Test basic GitHub API access
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `GitHub API returned ${response.status}`,
        hint: 'Token might be invalid or expired'
      });
    }

    const userData = await response.json();

    // Test GraphQL access
    const graphqlResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query { viewer { login } }`
      }),
    });

    const graphqlData = await graphqlResponse.json();

    return NextResponse.json({
      success: true,
      user: userData.login,
      tokenWorks: true,
      graphqlWorks: !graphqlData.errors,
      message: 'Token is valid and working! ✅',
      tokenScopes: response.headers.get('x-oauth-scopes'),
      hint: graphqlData.errors 
        ? 'GraphQL has errors - check token permissions'
        : 'All systems operational'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

