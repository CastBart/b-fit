"use client";

import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function DashboardHeader() {
  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Next.js router for navigation

  // Define titles for each route
  const routeTitles: Record<string, string> = {
    "/dashboard/caloriecalculator": "Calorie Calculator",
    "/dashboard/plans": "Plans",
    "/dashboard/plans/create": "Create Plan",
    "/dashboard/exercises": "Exercises",
    "/dashboard/workouts": "Workouts",
    "/dashboard/workouts/create": "Create Workout",
    "/dashboard": "Dashboard",
  };

  // Handle dynamic workout ID titles
  let title = "Dashboard";
  if (pathname.includes("/dashboard/workouts/")) {
    title = "Workout Details";
  } else {
    title = routeTitles[pathname] || "Dashboard";
  }

  // Define back navigation behavior
  let backPath: string | null = null;

  if (pathname.includes("/dashboard/workouts/")) {
    backPath = "/dashboard/workouts"; // Ensure back button goes to workouts list
  } else {
    const backRoutes: Record<string, string> = {
      "/dashboard/plans": "/dashboard",
      "/dashboard/exercises": "/dashboard",
      "/dashboard/workouts": "/dashboard",
      "/dashboard/caloriecalculator": "/dashboard",
      "/dashboard/plans/create": "/dashboard/plans",
      "/dashboard/workouts/create": "/dashboard/workouts",
    };

    backPath = backRoutes[pathname] || null;
  }

  return (
    <div className="sticky top-0 left-0 z-50 flex flex-col bg-background">
      <header className="flex min-h-[72px] items-center gap-4 border-b px-4 relative">
        <div className="absolute left-0 flex gap-4 justify-center items-center">
          {/* Sidebar Toggle */}
          <SidebarTrigger className="" />

          {/* Back Button */}
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
        {/* Page Title */}
        <h1 className="text-3xl font-semibold w-full text-center">{title}</h1>
      </header>
    </div>
  );
}
