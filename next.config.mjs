/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
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
