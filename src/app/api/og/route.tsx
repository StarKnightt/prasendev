/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const type = searchParams.get('type') || 'default';

  if (title) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px 80px',
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#22c55e',
                }}
              />
              <span style={{ color: '#a1a1aa', fontSize: '20px' }}>
                prasen.dev/blog
              </span>
            </div>
            <h1
              style={{
                fontSize: title.length > 60 ? '48px' : '56px',
                fontWeight: 700,
                color: '#fafafa',
                lineHeight: 1.2,
                margin: 0,
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src="https://avatars.githubusercontent.com/u/92244026?v=4"
                width="48"
                height="48"
                style={{ borderRadius: '50%' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#fafafa', fontSize: '20px', fontWeight: 600 }}>
                  Prasenjit Nayak
                </span>
                <span style={{ color: '#71717a', fontSize: '16px' }}>
                  Full Stack Developer
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#71717a',
                fontSize: '16px',
              }}
            >
              prasen.dev
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 40%, #16213e 70%, #0f0f0f 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow accent */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            position: 'relative',
          }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/92244026?v=4"
            width="100"
            height="100"
            style={{
              borderRadius: '50%',
              border: '3px solid rgba(255,255,255,0.1)',
            }}
          />

          <h1
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#fafafa',
              margin: 0,
              letterSpacing: '-2px',
            }}
          >
            Prasenjit Nayak
          </h1>

          <p
            style={{
              fontSize: '24px',
              color: '#a1a1aa',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Full Stack Developer — React, Next.js, TypeScript
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px',
              padding: '8px 20px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
              }}
            />
            <span style={{ color: '#d4d4d8', fontSize: '18px' }}>
              prasen.dev
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
