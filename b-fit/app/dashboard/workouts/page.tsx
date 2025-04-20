import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import WorkoutList from "@/components/workouts/workout-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Workout } from "@/lib/definitions";
import { fetchUserWorkouts } from "@/actions/fetch-user-workouts";

export default async function WorkoutCreatePage() {
  const queryClient = getQueryClient();
  // 
  await queryClient.prefetchQuery<Workout[]>({
    queryKey: ["workouts"],
    queryFn: () => fetchUserWorkouts()
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
