import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { z } from "zod";
import { WorkoutSchema } from "@/schemas";
import type { Workout } from "@/lib/definitions";

export const useWorkouts = () => {
  const queryClient = useQueryClient(); // ✅ correct client-side queryClient

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof WorkoutSchema>) => {
      const res = await fetch("/api/workouts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to create workout.");
      }

      return result;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] }); // ✅ will now work
      toast.success("Workout created!", {
        description: `Workout "${variables.name}" has been saved.`,
      });
    },
    onError: (error: any) => {
      toast.error("Failed to create workout", {
        description: error?.message ?? "Something went wrong.",
      });
    },
  });

  const workoutsQuery = useQuery<Workout[]>({
    queryKey: ["workouts"],
    queryFn: async () => {
      const res = await fetch(`/api/workouts`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch workouts.");
      }

      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...workoutsQuery,
    createWorkout: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
