import SideNav from "./_components/sidenav";
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
      <div className="h-screen flex">
        <SideNav />
        <div className="overflow-auto p-5 w-full">{children}</div>
      </div>
    </SessionProvider>
  );
}
