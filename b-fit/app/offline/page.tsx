// app/offline/page.tsx
"use client";

import Link from "next/link";
import { WifiOff, RefreshCcw, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";



export default function OfflinePage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-6 text-center bg-muted/20">
      <div className="flex flex-col items-center gap-4 max-w-md">
        {/* Icon */}
        <WifiOff className="h-16 w-16 text-muted-foreground" />

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight">You’re offline</h1>

        {/* Message */}
        <p className="text-muted-foreground">
          It looks like you’ve lost your connection. Don’t worry — your data is
          safe. You can still access cached workouts and exercises, but some
          features may be unavailable.
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="default"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Retry
          </Button>

          <Button
            asChild
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
