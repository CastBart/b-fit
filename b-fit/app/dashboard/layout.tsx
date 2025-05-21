
import SideNav from "@/components/dashboard/sidenav";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/query-provider"; // ✅ Import the QueryProvider
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StoreProvider } from "@/components/store-provider";

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
            <ReactQueryDevtools initialIsOpen={false}/>
          </main>
        </SidebarProvider>
      </QueryProvider>
      </StoreProvider>
    </SessionProvider>
  );
}
