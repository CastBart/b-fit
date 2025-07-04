"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRestTimer } from "@/hooks/use-rest-timer";
import { formatTime } from "@/lib/formatTime";

export default function SessionResumeButton() {
  const pathname = usePathname();
  const router = useRouter();

  // Call our tick hook — this ensures re-render every second

  const activeSession = useSelector((state: RootState) => state.session.isActive);

  // Don't render on the session page
  if (pathname.startsWith("/dashboard/session")) return null;

  if (!activeSession) return null;

  return (
    <div className="fixed bottom-4 right-24 z-50">
      <Button onClick={() => router.push("/dashboard/session")}>
        Back to session
      </Button>
    </div>
  );
}
