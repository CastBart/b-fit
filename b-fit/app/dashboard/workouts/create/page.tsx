import CreateWorkoutForm from "@/components/workouts/workout-create-workout-form";

import { fetchUserExercises } from "@/actions/fetch-exercises";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function CreateWorkoutPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["exercises"],
    queryFn: () => fetchUserExercises(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateWorkoutForm />
    </HydrationBoundary>
  );
}
