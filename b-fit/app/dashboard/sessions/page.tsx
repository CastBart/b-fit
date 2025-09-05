// app/sessios/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import SessionCompleteClientPage from "@/components/session/session-complete";
import { getQueryClient } from "@/lib/getQueryClient";
import { fetchSession } from "@/actions/session-fetch-session";
import { SessionsCalendarView } from "@/components/session/session-calendar-view";

export default function AllSessionsPage() {
  const queryClient = getQueryClient();
  //   await queryClient.prefetchQuery({
  //     queryKey: ["exercises"],
  //     queryFn: () => fetchSession(),
  //   })
  return (
    <div className="p-4 max-w-[900px] mx-auto space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SessionsCalendarView />
      </HydrationBoundary>
    </div>
  );
}
