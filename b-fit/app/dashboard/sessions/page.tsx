// app/sessios/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { SessionsCalendarView } from "@/components/session/session-calendar-view";
import { fetchUserAllSessions } from "@/actions/fetch-sessions-all";

export default async function AllSessionsPage() {
  const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
      queryKey: ["sessions"],
      queryFn: () => fetchUserAllSessions(),
    })
  return (
    <div className="p-4 max-w-[900px] mx-auto space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SessionsCalendarView />
      </HydrationBoundary>
    </div>
  );
}
