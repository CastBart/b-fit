import {
  Serwist,
  Route,
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
  ExpirationPlugin,
  BackgroundSyncPlugin,
  PrecacheEntry,
  SerwistGlobalConfig
} from "serwist";
import { defaultCache } from "@serwist/next/worker";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    // Change this attribute's name to your `injectionPoint`.
    // `injectionPoint` is an InjectManifest option.
    // See https://serwist.pages.dev/docs/build/configuring
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

// Background sync plugin for write ops
const mutationSync = new BackgroundSyncPlugin("mutation-queue", {
  maxRetentionTime: 24 * 60, // retry up to 24h
});

/* ---------------------------
   1. GET routes (read APIs)
---------------------------- */
serwist.registerRoute(
  new Route(
    ({ url, request }) =>
      request.method === "GET" &&
      (
        url.pathname.startsWith("/api/workouts") ||
        url.pathname.startsWith("/api/sessions") ||
        url.pathname.startsWith("/api/session") || // handles /session/[id]
        url.pathname.startsWith("/api/exercises")
      ),
    new StaleWhileRevalidate({
      cacheName: "api-get",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60, // 1h
        }),
      ],
    }),
    "GET"
  )
);

/* ---------------------------
   2. POST routes (mutations)
---------------------------- */
serwist.registerRoute(
  new Route(
    ({ url, request }) =>
      request.method === "POST" &&
      (
        url.pathname.startsWith("/api/workouts/create") ||
        url.pathname.includes("/api/workouts/") && url.pathname.endsWith("/update") ||
        url.pathname.startsWith("/api/settings/update") ||
        url.pathname.startsWith("/api/session/create") ||
        url.pathname.startsWith("/api/exercises/create")
      ),
    new NetworkFirst({
      cacheName: "api-post",
      plugins: [mutationSync],
    }),
    "POST"
  )
);

/* ---------------------------
   3. DELETE routes
---------------------------- */
serwist.registerRoute(
  new Route(
    ({ url, request }) =>
      request.method === "DELETE" &&
      (
        url.pathname.includes("/api/workouts/") && url.pathname.endsWith("/delete") ||
        url.pathname.includes("/api/exercises/") && url.pathname.endsWith("/delete")
      ),
    new NetworkFirst({
      cacheName: "api-delete",
      plugins: [mutationSync],
    }),
    "DELETE"
  )
);

serwist.addEventListeners();
