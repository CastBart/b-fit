"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .then((registration) => {
          registration.onupdatefound = () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.onstatechange = () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  // 🔔 Dispatch a custom event
                  window.dispatchEvent(new Event("sw-update"));
                }
              };
            }
          };
        });
    }
  }, []);

  return null;
}
