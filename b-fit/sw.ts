/// <reference lib="WebWorker" />

import {
  Serwist,
  Route,
  NetworkFirst,
  StaleWhileRevalidate,
  ExpirationPlugin,
  BackgroundSyncPlugin,
  type PrecacheEntry,
  type SerwistGlobalConfig,
  type RuntimeCaching,
} from "serwist";
import { defaultCache } from "@serwist/next/worker";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;
// Custom caching strategies
const cacheStrategies: RuntimeCaching[] = [
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("RSC") === "1" &&
      request.headers.get("Next-Router-Prefetch") === "1" &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new StaleWhileRevalidate({
      cacheName: "pages-rsc-prefetch",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("RSC") === "1" &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new StaleWhileRevalidate({
      cacheName: "pages-rsc",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("Content-Type")?.includes("text/html") &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new StaleWhileRevalidate({
      cacheName: "pages",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get("Content-Type")?.includes("text/html") &&
      sameOrigin &&
      !pathname.startsWith("/api/"),
    handler: new NetworkFirst({
      cacheName: "dashboard-pages",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: "last-used",
        }),
      ],
    }),
  },

  // Other resource caching strategies
  // {
  //   matcher: /\.(?:mp4|webm)$/i,
  //   handler: new StaleWhileRevalidate({
  //     cacheName: 'static-video-assets',
  //     plugins: [
  //       new ExpirationPlugin({
  //         maxEntries: 32,
  //         maxAgeSeconds: 7 * 24 * 60 * 60,
  //         maxAgeFrom: 'last-used',
  //       }),
  //      new RangeRequestsPlugin(),
  //     ],
  //   }),
  // },
  
];

/**
 * Initialize Serwist with precaching, default runtime cache for static assets,
 * and offline fallback page.
 */
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [...cacheStrategies, ...defaultCache],
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

// 🔁 Background sync plugin for write operations (POST/DELETE)
const mutationSync = new BackgroundSyncPlugin("mutation-queue", {
  maxRetentionTime: 24 * 60, // retry up to 24h
});

/* ---------------------------------
   1. API GET
---------------------------------- */
// serwist.registerRoute(
//   new Route(
//     ({ url, request }) =>
//       request.method === "GET" &&
//       (url.pathname.startsWith("/api/workouts") ||
//         url.pathname.startsWith("/api/sessions") ||
//         url.pathname.startsWith("/api/session") || // includes /session/[id]
//         url.pathname.startsWith("/api/exercises")),
//     new StaleWhileRevalidate({
//       cacheName: "api-get",
//       plugins: [
//         new ExpirationPlugin({
//           maxEntries: 100,
//           maxAgeSeconds: 60 * 60, // 1 hour
//         }),
//       ],
//     }),
//     "GET"
//   )
// );

/* ---------------------------------
   2. API POST
---------------------------------- */
serwist.registerRoute(
  new Route(
    ({ url, request }) =>
      request.method === "POST" &&
      (url.pathname.startsWith("/api/workouts/create") ||
        (url.pathname.includes("/api/workouts/") &&
          url.pathname.endsWith("/update")) ||
        url.pathname.startsWith("/api/settings/update") ||
        url.pathname.startsWith("/api/session/create") ||
        url.pathname.startsWith("/api/exercises/create")),
    new NetworkFirst({
      cacheName: "api-post",
      plugins: [mutationSync],
    }),
    "POST"
  )
);

/* ---------------------------------
   3. API DELETE
---------------------------------- */
serwist.registerRoute(
  new Route(
    ({ url, request }) =>
      request.method === "DELETE" &&
      ((url.pathname.includes("/api/workouts/") &&
        url.pathname.endsWith("/delete")) ||
        (url.pathname.includes("/api/exercises/") &&
          url.pathname.endsWith("/delete"))),
    new NetworkFirst({
      cacheName: "api-delete",
      plugins: [mutationSync],
    }),
    "DELETE"
  )
);

/* ---------------------------------
   4. Page navigations (Next.js App Router + RSC support)
---------------------------------- */
// serwist.registerRoute(
//   new Route(
//     ({ url, request }) => {
//       // ✅ Force-match any RSC request or dashboard navigation
//       const isDashboard =
//         url.pathname.startsWith("/dashboard") ||
//         url.pathname.startsWith("/offline");
//       console.log("[SW DEBUG] URL Pathname:", url.pathname);
//       const isRSC = url.searchParams.has("_rsc") || url.searchParams.has("__flight__");

//       // Log every time this matcher runs
//       if (isDashboard && (isRSC || request.mode === "navigate" || request.method === "GET")) {
//         console.log(
//           "[SW DEBUG] ✅ Matched dashboard route:",
//           url.href,
//           "| mode:",
//           request.mode
//         );
//         return true;
//       }

//       return false;
//     },
//     new NetworkFirst({
//       cacheName: "dashboard-pages",
//       matchOptions: { ignoreSearch: true },
//       plugins: [
//         new ExpirationPlugin({
//           maxEntries: 50,
//           maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
//         }),
//       ],
//     }),
//     "GET"
//   )
// );


/* ---------------------------------
   6. Generic scripts / styles / workers
   (covers runtime chunks that don’t fall under /_next/static/)
---------------------------------- */
serwist.registerRoute(
  new Route(
    ({ request }) =>
      request.destination === "script" ||
      request.destination === "style" ||
      request.destination === "worker",
    new StaleWhileRevalidate({
      cacheName: "assets",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    })
  )
);


// 🚀 Add listeners
serwist.addEventListeners();
