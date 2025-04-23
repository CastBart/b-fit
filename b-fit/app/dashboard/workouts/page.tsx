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
    queryFn: () => fetchUserWorkouts(),
  });

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex flex-col border rounded-3xl space-y-2 p-4 my-10 h-[calc(100vh-9rem)] m-2">
        <Button asChild className="self-end w-full" size={"lg"}>
          <Link href="/dashboard/workouts/create">Create Workout</Link>
        </Button>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <WorkoutList />
        </HydrationBoundary>
      </div>
    </div>
  );
}
