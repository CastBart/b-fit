// hooks/use-exercise.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExerciseHistory, ExerciseWithHistory } from "@/actions/fetch-exercise";
import { Exercise } from "@/lib/definitions";
import { getQueryClient } from "@/lib/getQueryClient";

export function useExercise(id: string) {
  const queryClient = useQueryClient()
  const { data, isLoading, isFetching, isError, error } = useQuery<
    ExerciseWithHistory,
    Error
  >({
    queryKey: ["exercise", id],
    queryFn: async () => {
      const res = await fetch(`/api/exercises/${id}`);
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch exercise history");
      }
      return res.json() as Promise<ExerciseWithHistory>;
    },
    enabled: !!id,
    placeholderData: () => {
      // Look up this exercise in the exercises list query cache
      const exercises = queryClient.getQueryData<Exercise[]>(["exercises"]);
      const exercise = exercises?.find((e) => e.id === id);

      if (exercise) {
        return { exercise, history: [] }; // hydrate instantly
      }
      return undefined;
    },
  });

  return {
    data, // includes { exercise, history }
    isLoading,
    isFetching,
    isError,
    error,
  };
}
