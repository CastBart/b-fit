// hooks/use-exercise.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ExerciseHistory, fetchExercise } from "@/actions/fetch-exercise";

export function useExercise(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<ExerciseHistory[], Error>({
    queryKey: ["exercise", id],
    queryFn: async () => {
      const res = await fetch(`/api/exercises/${id}`);
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch exercise history");
      }
      return res.json() as Promise<ExerciseHistory[]>;
    },
    enabled: !!id,
  });

  return {
    data, // includes { exercise, history }
    isLoading,
    isError,
    error,
  };
}
