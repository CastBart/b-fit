// app/dashboard/workouts/[id]/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/getQueryClient";
import { getWorkoutWithExercises } from "@/actions/fetch-workout";
import WorkoutDetails from "@/components/workouts/workout-details";

export default async function WorkoutDetailsPage({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["workout", params.id],
    queryFn: () => getWorkoutWithExercises(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkoutDetails workoutId={params.id} />
    </HydrationBoundary>
  );
}
