"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Sidebar_Header from "./sidebar-header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  CalendarDays,
  ClipboardPen,
  Dumbbell,
  Grab,
  LayoutDashboard,
} from "lucide-react";
import { SyncDataButton } from "./sync-data-button";

export function DashboardSidebar() {
  const pathName = usePathname();

  return (
    <Sidebar>
      <Sidebar_Header />
      <SidebarSeparator />
      <SidebarContent className="flex flex-col justify-between">
        {/* Main nav group */}
        <SidebarGroup>
          <SidebarGroupLabel>B-Fit</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName === "/dashboard"}
                  className="text-lg min-h-[48px]"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName === "/dashboard/plans"}
                  className="text-lg min-h-[48px]"
                >
                  <Link href="/dashboard/plans">
                    <ClipboardPen />
                    <span>Plans</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName === "/dashboard/workouts"}
                  className="text-lg min-h-[48px]"
                >
                  <Link href="/dashboard/workouts">
                    <Grab />
                    <span>Workouts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName === "/dashboard/exercises"}
                  className="text-lg min-h-[48px]"
                >
                  <Link href="/dashboard/exercises">
                    <Dumbbell />
                    <span>Exercises</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName === "/dashboard/sessions"}
                  className="text-lg min-h-[48px]"
                >
                  <Link href="/dashboard/sessions">
                    <CalendarDays />
                    <span>Sessions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathName === "/dashboard/caloriecalculator"}
                  className="text-lg min-h-[48px]"
                >
                  <Link href="/dashboard/caloriecalculator">
                    <Calculator />
                    <span>Calorie Calculator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Offline group */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Offline Sync</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-lg min-h-[48px]">
                  Offline Sync
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
        <SyncDataButton />
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
