// import { auth } from "@/auth";
import { SessionProvider, useSession } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/providers/store-provider";
import QueryProvider from "@/providers/query-provider";
import { GlobalTimerProvider } from "@/providers/global-timer-provider";
import SessionResumeButton from "@/components/session/session-resume-button";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
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
