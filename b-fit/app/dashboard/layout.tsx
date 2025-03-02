import SideNav from "@/components/dashboard/sidenav";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log(JSON.stringify(session?.user))
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full min-h-screen">
          <DashboardHeader title="Exercises"/>
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
}
