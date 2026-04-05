import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') || 'KubeBlocks';
  const description = searchParams.get('description') ?? '';
  const type = searchParams.get('type') ?? 'docs'; // 'docs' | 'blog'

  const accentColor = type === 'blog' ? '#7c6af7' : '#5b8ef7';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0d1117',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* top accent bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '4px',
              background: accentColor,
              borderRadius: '2px',
            }}
          />
          <span style={{ color: accentColor, fontSize: '18px', fontWeight: 600, letterSpacing: '0.1em' }}>
            {type === 'blog' ? 'BLOG' : 'DOCS'} · KUBEBLOCKS
          </span>
        </div>

        {/* main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: title.length > 60 ? '42px' : '52px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {title.length > 100 ? title.slice(0, 97) + '...' : title}
          </div>
          {description && (
            <div
              style={{
                fontSize: '24px',
                color: '#8b949e',
                lineHeight: 1.5,
                maxWidth: '900px',
              }}
            >
              {description.length > 140 ? description.slice(0, 137) + '...' : description}
            </div>
          )}
        </div>

        {/* bottom: logo + site */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: accentColor,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              K
            </div>
            <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 600 }}>
              KubeBlocks
            </span>
          </div>
          <span style={{ color: '#484f58', fontSize: '18px' }}>kubeblocks.io</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
