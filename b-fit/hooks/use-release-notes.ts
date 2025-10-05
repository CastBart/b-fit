import { useEffect, useState } from "react";

export interface ReleaseNotes {
  version: string;
  date: string;
  notes: string[];
  showInApp?: boolean; // optional toggle for visibility
}

export function useReleaseNotes() {
  const [data, setData] = useState<ReleaseNotes | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchNotes() {
      try {
        const res = await fetch("/release.json", { cache: "no-cache" });
        if (!res.ok) throw new Error("Failed to fetch release notes");
        const json: ReleaseNotes = await res.json();

        // Only show if explicitly allowed (default true if not set)
        if (!ignore && (json.showInApp ?? true)) {
          setData(json);
        }
      } catch {
        if (!ignore) setData(null);
      }
    }

    fetchNotes();
    return () => {
      ignore = true;
    };
  }, []);

  return data;
}
