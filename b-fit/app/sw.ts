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
} from "serwist";
import { defaultCache } from "@serwist/next/worker";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

/**
 * Initialize Serwist with precaching, default runtime cache for static assets,
 * and offline fallback page.
 */
const serwist = new Serwist({
  precacheEntries: [
    ...(self.__SW_MANIFEST || []), // what Next injects (JS, CSS, etc.)
    "/offline", // your offline fallback page
    "/dashboard",
    "/dashboard/workouts",
    "/dashboard/exercises",
    "/dashboard/sessions",
    "/dashboard/plans",
    "/dashboard/caloriecalculator",
    "/dashboard/session",
  ],
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/offline",
        matcher({ request }) {
          return request.mode === "navigate";
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
serwist.registerRoute(
  new Route(
    ({ url, request }) =>
      request.method === "GET" &&
      (url.pathname.startsWith("/api/workouts") ||
        url.pathname.startsWith("/api/sessions") ||
        url.pathname.startsWith("/api/session") || // includes /session/[id]
        url.pathname.startsWith("/api/exercises")),
    new StaleWhileRevalidate({
      cacheName: "api-get",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1 hour
        }),
      ],
    }),
    "GET"
  )
);

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
   4. Page navigations
---------------------------------- */
serwist.registerRoute(
  new Route(
    ({ request }) => request.mode === "navigate",
    new NetworkFirst({
      cacheName: "pages",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
        }),
      ],
    }),
    "GET"
  )
);

/* ---------------------------------
   5. Next.js static assets (chunks, css, etc.)
---------------------------------- */
serwist.registerRoute(
  new Route(
    ({ url }) => url.pathname.startsWith("/_next/static/"),
    new StaleWhileRevalidate({
      cacheName: "next-static",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        }),
      ],
    })
  )
);

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
