import { SidebarTrigger } from "../ui/sidebar";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({
  title,
}: DashboardHeaderProps) {
  return (
    <div className="sticky top-0 left-0 z-50 flex flex-col bg-background ">
      <header className="flex h-16 items-center gap-2 border-b px-4 relative">
        <SidebarTrigger className="absolute left-0" />
        <h1 className="text-3xl font-semibold w-full text-center">{title}</h1>
      </header>
    </div>
  );
}

