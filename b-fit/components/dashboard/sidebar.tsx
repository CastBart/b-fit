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
import {
  Calculator,
  ClipboardPen,
  Dumbbell,
  Grab,
  LayoutDashboard,
} from "lucide-react";

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
            <SidebarMenuButton
              asChild
              isActive={pathName === "/dashboard"}
              className="text-lg min-h-[48px]"
            >
              <Link href="/dashboard">
                <LayoutDashboard />
                Dashboard
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton
              asChild
              isActive={pathName === "/dashboard/plans"}
              className="text-lg min-h-[48px]"
            >
              <Link href="/dashboard/plans">
                <ClipboardPen />
                Plans
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton
              asChild
              isActive={pathName === "/dashboard/workouts"}
              className="text-lg min-h-[48px]"
            >
              <Link href="/dashboard/workouts">
                {" "}
                <Grab />
                Workouts
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton
              asChild
              isActive={pathName === "/dashboard/exercises"}
              className="text-lg min-h-[48px]"
            >
              <Link href="/dashboard/exercises">
                <Dumbbell />
                Exercises
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton
              asChild
              isActive={pathName === "/dashboard/caloriecalculator"}
              className="text-lg min-h-[48px]"
            >
              <Link href="/dashboard/caloriecalculator">
                <Calculator />
                Calorie Calculator
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
