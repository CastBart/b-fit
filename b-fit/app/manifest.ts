// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "B-Fit",
    short_name: "B-Fit",
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#020817",
    background_color: "#020817",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      },
    ],
    screenshots: [
      {
        src: "/Screenshot-Home-Page-Desktop.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/Screenshot-Home-Page-Mobile2.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
  };
}
