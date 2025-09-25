"use client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { RefreshCcw } from "lucide-react";

interface APIEndpoint {
  key: string;
  url: string;
}

export function SyncDataButton() {
  const queryClient = useQueryClient();

  async function handleDownload() {
    try {
      const endpoints: APIEndpoint[] = [
        { key: "workouts", url: "/api/workouts" },
        { key: "exercises", url: "/api/exercises" },
        { key: "sessions", url: "/api/sessions" },
      ];

      // ✅ Prefetch API data into React Query + offline cache
      await Promise.all(
        endpoints.map((endpoint) =>
          queryClient.prefetchQuery({
            queryKey: [endpoint.key],
            queryFn: async () => {
              const res = await fetch(endpoint.url);
              if (!res.ok) throw new Error(`Failed to fetch ${endpoint.url}`);
              return res.json();
            },
          })
        )
      );

      const apiCache = await caches.open("offline-data");
      await Promise.all(endpoints.map((endpoint) => apiCache.add(endpoint.url)));

      // ✅ Pre-cache important dashboard pages
      const pages = [
        "/dashboard",
        "/dashboard/settings",
        "/dashboard/workouts",
        "/dashboard/exercises",
        "/dashboard/sessions",
        "/dashboard/session",
        "/dashboard/plans",
        "/dashboard/caloriecalculator",
      ];

      const pagesCache = await caches.open("pages");
      await Promise.all(pages.map((page) => pagesCache.add(page)));

      toast.success("App is ready for offline use!");
    } catch (error) {
      console.error("[OFFLINE_DOWNLOAD_ERROR]", error);
      toast.error("Failed to prepare offline data.");
    }
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Offline Sync</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleDownload}
              className="flex items-center gap-2 text-lg min-h-[48px]"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Download for offline</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
