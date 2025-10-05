"use client";

import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function NoActiveSession() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      {/* Icon */}
      <div className="rounded-full bg-muted p-6">
        <Dumbbell className="w-12 h-12 text-muted-foreground" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">No Active Session</h2>
        <p className="text-muted-foreground max-w-sm">
          You don’t have an active workout session right now. 
          Head back to your dashboard to start a new one!
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/dashboard/workouts">Start a Workout</Link>
        </Button>
      </div>
    </div>
  );
}
