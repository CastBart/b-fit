import SideNav from "@/components/dashboard/sidenav";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider"; // ✅ Import the QueryProvider
import { StoreProvider } from "@/providers/store-provider";
import { startGlobalTimer } from "@/lib/timeRunner";
import { GlobalTimerProvider } from "@/providers/global-timer-provider";
import SessionResumeButton from "@/components/session/session-resume-button";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <QueryProvider>
          <SidebarProvider>
            <DashboardSidebar />
            <main className="w-full max-h-screen">
              <DashboardHeader />
              {children}
              <Toaster />
              <SessionResumeButton />
            </main>
            <GlobalTimerProvider />
          </SidebarProvider>
        </QueryProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
