/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['kampaio.com'],
  },
  // 2026-11-17 (owner): the product is the dashboard at dashboard.kampaio.com.
  // Old entry points (/b6 demo behind AuthGuard, the old Next.js sign-in/sign-up)
  // all lead there now, so the 80 blog links to /b6 keep working without editing
  // 43 articles. /auth/google/callback is left alone on purpose.
  async redirects() {
    const DASH = 'https://dashboard.kampaio.com/';
    return ['/b6', '/b6/:path*', '/auth/login', '/auth/register', '/login', '/register', '/dashboard']
      .map((source) => ({ source, destination: DASH, permanent: true }));
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 