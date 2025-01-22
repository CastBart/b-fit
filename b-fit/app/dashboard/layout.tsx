import SideNav from "../ui/Dashboard/sidenav";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="h-screen flex bg-[#0F172A]">
        <SideNav />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </SessionProvider>
  );
}
