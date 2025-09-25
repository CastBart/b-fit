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
    "/dashboard/workouts", 
    "/dashboard/exercises", 
    "/dashboard/sessions", 
    "/dashboard",
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
   1. GET routes (API reads)
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
   2. POST routes (API mutations)
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
   3. DELETE routes (API deletes)
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
   4. Page navigations (HTML documents)
---------------------------------- */
serwist.registerRoute(
  new Route(
    ({ request }) => request.mode === "navigate", // catch all navigations
    new NetworkFirst({
      cacheName: "pages",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 50, // keep last 50 pages
          maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
        }),
      ],
    }),
    "GET"
  )
);

// 🚀 Add listeners for install, activate, fetch, etc.
serwist.addEventListeners();
