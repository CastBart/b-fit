import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import WorkoutList from "@/components/workouts/workout-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Workout } from "@/lib/definitions";

export default async function WorkoutCreatePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery<Workout[]>({
    queryKey: ["workouts"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/workouts`, {
        headers: {
          // Include cookies to preserve session if needed
          cookie: "", // if required, use `headers().get('cookie')` from `next/headers`
        },
        cache: "no-store", // force fresh data
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch workouts");
      return data;
    },
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6 flex flex-col gap-4">
      <Button asChild className="self-end" size={"lg"}>
        <Link href="/dashboard/workouts/create">Create Workout</Link>
      </Button>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <WorkoutList />
      </HydrationBoundary>
    </div>
  );
}
