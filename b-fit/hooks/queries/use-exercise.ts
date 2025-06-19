// hooks/use-exercise.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchExercise } from "@/actions/fetch-exercise";

export function useExercise(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["exercise", id],
    queryFn: async () => {
      const res = await fetch(`/api/exercise/${id}`);
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Failed to fetch exercise history");
      }
      return res.json();
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
