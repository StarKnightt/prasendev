import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Bundle shiki through webpack (it is in Next's default server-external
  // list) so the alias below applies and only the fine-grained langs used in
  // src/data/blog.ts end up in the server bundle. Without this, the full
  // ~9 MB grammar set gets pulled into the Cloudflare Worker and exceeds the
  // Workers size limit.
  transpilePackages: ['shiki'],
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'hostinger.in',
      },
      {
        protocol: 'https',
        hostname: 'assets.hostinger.com',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      }
    ],
    minimumCacheTTL: 60,
  },

  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Robots-Tag',
          value: 'index, follow'
        },
      ]
    }
  ],

  // Compress outputs
  compress: true,

  // Enable experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // Next 14 only traces index.node.js for next/og; the OpenNext Cloudflare
    // adapter also needs the wasm + font files from @vercel/og at build time.
    // Harmless on Vercel (files already ship there).
    outputFileTracingIncludes: {
      '/api/og': ['./node_modules/next/dist/compiled/@vercel/og/**/*'],
      // Blog/sitemap/rss read ./content/*.mdx via fs at render time; bundle
      // the files so request-time rendering works on Cloudflare Workers.
      '/blog/**': ['./content/**/*'],
      '/rss.xml': ['./content/**/*'],
      '/sitemap.xml': ['./content/**/*'],
    },
  },

  // Configure webpack if needed
  webpack: (config) => {
    config.optimization.minimize = true;
    // Exact-match alias: only the bare `shiki` full-bundle import (used by
    // rehype-pretty-code) is shimmed; `shiki/core`, `shiki/langs/*` etc.
    // still resolve normally for the fine-grained highlighter in blog.ts.
    config.resolve.alias = {
      ...config.resolve.alias,
      'shiki$': path.join(__dirname, 'src/lib/shiki-shim.ts'),
    };
    return config;
  },

  // Add redirect handling
  async redirects() {
    return [
      // Add any specific redirects here if needed
      {
        source: '/home',
        destination: '/',
        permanent: true,
      }
    ];
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;
