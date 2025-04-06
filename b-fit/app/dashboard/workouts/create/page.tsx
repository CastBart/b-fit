import { fetchUserExercises } from "@/actions/fetch-exercises";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import WorkoutForm from "@/components/workouts/workout-form";

export default async function CreateWorkoutPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["exercises"],
    queryFn: () => fetchUserExercises(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkoutForm mode="create"/>
    </HydrationBoundary>
  );
}
