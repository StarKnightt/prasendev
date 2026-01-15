import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Force dynamic rendering since we use cookies
export const dynamic = 'force-dynamic';

const VISITOR_KEY = 'portfolio_visitors';
const COOKIE_NAME = 'visitor_counted';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(request: NextRequest) {
  try {
    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      console.warn('Upstash Redis not configured');
      return NextResponse.json({ count: 0, error: 'Redis not configured' });
    }

    // Check if this visitor was already counted
    const alreadyCounted = request.cookies.get(COOKIE_NAME)?.value === 'true';
    
    if (alreadyCounted) {
      // Return current count without incrementing
      const count = await redis.get<number>(VISITOR_KEY) || 0;
      return NextResponse.json({ count, incremented: false });
    }
    
    // New visitor - increment count
    const newCount = await redis.incr(VISITOR_KEY);
    
    // Set cookie so we don't count them again for 24 hours
    const response = NextResponse.json({ count: newCount, incremented: true });
    response.cookies.set(COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Visitor count error:', error);
    return NextResponse.json({ count: 0, error: 'Failed to fetch count' });
  }
}
