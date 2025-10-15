// hooks/use-exercise.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExerciseWithHistory } from "@/actions/fetch-exercise";
import { Exercise } from "@/lib/definitions";

export function useExercise(id: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, error } = useQuery<
    ExerciseWithHistory,
    Error
  >({
    queryKey: ["exercise", id],
    queryFn: async () => {
      // ✅ Detect offline
      if (!navigator.onLine) {
        console.warn("Offline mode: returning cached exercise data");
        const cached = queryClient.getQueryData<ExerciseWithHistory>(["exercise", id]);
        if (cached) return cached;
        throw new Error("No cached data available for offline mode");
      }

      // ✅ Normal fetch
      const res = await fetch(`/api/exercises/${id}`);
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch exercise history");
      }
      return res.json() as Promise<ExerciseWithHistory>;
    },
    enabled: !!id,
    placeholderData: () => {
      // ✅ Use cached exercises list as a fallback
      const exercises = queryClient.getQueryData<Exercise[]>(["exercises"]);
      const exercise = exercises?.find((e) => e.id === id);
      if (exercise) {
        return { exercise, history: [] };
      }
      return undefined;
    },
    retry: false, 
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  };
}
