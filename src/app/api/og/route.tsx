/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

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
            padding: '80px',
            backgroundColor: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            borderBottom: '6px solid #000000',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src="https://avatars.githubusercontent.com/u/92244026?v=4"
                width="40"
                height="40"
                style={{ borderRadius: '50%' }}
              />
              <span style={{ color: '#000000', fontSize: '20px', fontWeight: 600 }}>
                Prasenjit Nayak
              </span>
            </div>
            <h1
              style={{
                fontSize: title.length > 50 ? '50px' : '62px',
                fontWeight: 800,
                color: '#000000',
                lineHeight: 1.1,
                margin: 0,
                maxWidth: '950px',
                letterSpacing: '-1.5px',
              }}
            >
              {title}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#666666', fontSize: '20px' }}>
              prasen.dev
            </span>
            <span style={{ color: '#666666', fontSize: '20px' }}>
              Blog
            </span>
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
          backgroundColor: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Left section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px',
            flex: 1,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 800,
                color: '#000000',
                margin: 0,
                letterSpacing: '-2px',
                lineHeight: 1.1,
              }}
            >
              Prasenjit Nayak
            </h1>

            <p
              style={{
                fontSize: '26px',
                color: '#555555',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              Full Stack Developer building modern web apps with React, Next.js, and TypeScript.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '12px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
              <span style={{ color: '#888888', fontSize: '18px' }}>
                prasen.dev
              </span>
            </div>
          </div>
        </div>

        {/* Right section - avatar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '400px',
            backgroundColor: '#f5f5f5',
            borderLeft: '1px solid #e5e5e5',
          }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/92244026?v=4"
            width="180"
            height="180"
            style={{ borderRadius: '50%' }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
