import { useQuery } from "@tanstack/react-query";
import { getWorkoutWithExercises } from "@/actions/fetch-workout";

export const useWorkout = (id: string) => {
  return useQuery({
    queryKey: ["workout", id],
    queryFn: () => getWorkoutWithExercises(id),
    enabled: !!id, // only fetch when ID is present
  });
};
