"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import Sidebar_Header from "./sidebar-header";

export function DashboardSidebar() {
  const user = useCurrentUser();
  return (
    <Sidebar>
      <Sidebar_Header
        imgSrc={user?.image || ""}
        name={user?.name || ""}
        email={user?.email || ""}
      />
      <SidebarContent>
        <SidebarGroup></SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
