"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
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
} from "@/components/ui/sidebar";
import Sidebar_Header from "./sidebar-header";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathName = usePathname();
  const user = useCurrentUser();
  return (
    <Sidebar>
      <Sidebar_Header
        imgSrc={user?.image || ""}
        name={user?.name || ""}
        email={user?.email || ""}
      />
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>B-Fit</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuButton asChild isActive={pathName === "/dashboard"}>
              <Link href="/dashboard">Dashboard</Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild isActive={pathName === "/dashboard/plans"}>
              <Link href="/dashboard/plans">Plans</Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild isActive={pathName === "/dashboard/workouts"}>
              <Link href="/dashboard/workouts">Workouts</Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild isActive={pathName === "/dashboard/exercises"}>
              <Link href="/dashboard/exercises">Exercises</Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild isActive={pathName === "/dashboard/caloriecalculator"}>
              <Link href="/dashboard/caloriecalculator">Calorie Calculator</Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
