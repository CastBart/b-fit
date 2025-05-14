"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  let title = "Dashboard";
  let backPath: string | null = null;

  // Exact matches for known routes
  const exactTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/caloriecalculator": "Calorie Calculator",
    "/dashboard/plans": "Plans",
    "/dashboard/plans/create": "Create Plan",
    "/dashboard/exercises": "Exercises",
    "/dashboard/workouts": "Workouts",
    "/dashboard/workouts/create": "Create Workout",
    "/dashboard/settings": "Settings",
  };

  const exactBackPaths: Record<string, string> = {
    "/dashboard/caloriecalculator": "/dashboard",
    "/dashboard/plans": "/dashboard",
    "/dashboard/plans/create": "/dashboard/plans",
    "/dashboard/exercises": "/dashboard",
    "/dashboard/workouts": "/dashboard",
    "/dashboard/workouts/create": "/dashboard/workouts",
    "/dashboard/settings": "/dashboard",
  };

  if (exactTitles[pathname]) {
    title = exactTitles[pathname];
    backPath = exactBackPaths[pathname] || null;
  }

  // Dynamic route: Edit Workout (e.g., /dashboard/workouts/cm94g20co000bvuvguvse05jc)
  else if (/^\/dashboard\/workouts\/[a-zA-Z0-9]+$/.test(pathname)) {
    title = "Edit Workout";
    backPath = "/dashboard/workouts";
  }

  return (
    <div className="sticky top-0 left-0 z-50 flex flex-col bg-background">
      <header className="flex min-h-[72px] items-center gap-4 border-b px-4 relative">
        <div className="absolute left-0 flex gap-4 justify-center items-center">
          <SidebarTrigger />

          {backPath && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(backPath)}
              className="h-5 w-5"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
          )}
        </div>

        <h1 className="text-3xl font-semibold w-full text-center">{title}</h1>
      </header>
    </div>
  );
}
