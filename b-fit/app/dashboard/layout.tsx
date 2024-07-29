import SideNav from "../ui/Dashboard/sidenav";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex bg-[#0F172A]">
      <SideNav />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
