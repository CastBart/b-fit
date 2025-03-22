import SideNav from "@/components/dashboard/sidenav";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Toaster } from "@/components/ui/sonner";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full max-h-screen">
          <DashboardHeader title="Exercises" />
          {children}
          <Toaster />
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
