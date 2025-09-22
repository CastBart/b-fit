/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply to your service worker
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=UTF-8",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        ],
      },
      {
        // Example: security headers for everything
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(self), microphone=(), camera=(), fullscreen=(self)",
          },
          {
            key: "Content-Security-Policy",
            value: `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval';
                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                font-src 'self' https://fonts.gstatic.com;
                img-src 'self' data: blob:;
                connect-src 'self' https://*.vercel.app;
                object-src 'none';
                frame-ancestors 'self';
                base-uri 'self';
                form-action 'self';
                `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
