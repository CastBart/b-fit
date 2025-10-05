"use client";

import { useEffect, useState } from "react";
import { useReleaseNotes } from "@/hooks/use-release-notes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "lastSeenVersion";

export function ReleaseNotesDialog() {
  const release = useReleaseNotes();
  const [open, setOpen] = useState(false);
  const [swUpdated, setSwUpdated] = useState(false);

  // Listen for SW update events
  useEffect(() => {
    function handleUpdate() {
      setSwUpdated(true);
      // Reload after short delay if a new SW is waiting
      setTimeout(async () => {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg?.waiting) {
          reg.waiting.postMessage({ type: "SKIP_WAITING" });
          window.location.reload();
        }
      }, 1000);
    }

    window.addEventListener("sw-update", handleUpdate);
    return () => window.removeEventListener("sw-update", handleUpdate);
  }, []);

  // Show if version changed, even before SW update event
  useEffect(() => {
    if (!release) return;

    const lastSeen = localStorage.getItem(STORAGE_KEY);
    if (release.version && lastSeen !== release.version) {
      setOpen(true);
    }
  }, [release]);

  async function handleClose() {
    if (release) {
      localStorage.setItem(STORAGE_KEY, release.version);
    }

    // If a new SW is waiting, activate it and reload
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg?.waiting) {
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
    }

    setOpen(false);
    window.location.reload();
  }

  if (!release) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🚀 What’s New (v{release.version})</DialogTitle>
        </DialogHeader>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          {release.notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          Released on {release.date}
        </p>
      </DialogContent>
    </Dialog>
  );
}
