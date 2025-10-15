import withSerwistInit from "@serwist/next";
import { v4 as uuid } from "uuid";

const revision = uuid();

/** @type {import('next').NextConfig} */
const baseConfig = {
  async headers() {
    return [
      {
        // Ensure SW is served with correct headers
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
        // Security headers for everything else
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

// Wrap with Serwist
const withSerwist = withSerwistInit({
  swSrc: "sw.ts",     // your custom SW
  swDest: "public/sw.js", // compiled SW output
  register: true,
  disable: process.env.NODE_ENV !== "production",
  cacheOnNavigation: true,
  reloadOnOnline: false,
  additionalPrecacheEntries: [
    { url: "/offline", revision },
    { url: "/dashboard", revision },
    { url: "/dashboard/workouts", revision },
    { url: "/dashboard/exercises", revision },
    { url: "/dashboard/sessions", revision },
    { url: "/dashboard/plans", revision },
    { url: "/dashboard/caloriecalculator", revision },
    { url: "/dashboard/session", revision },
  ],
});

export default withSerwist(baseConfig);
