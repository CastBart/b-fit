import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserWorkouts } from "@/actions/fetch-user-workouts";
import { createWorkout } from "@/actions/create-workout";
import { toast } from "sonner";
import type { z } from "zod";
import { WorkoutSchema } from "@/schemas";
import { getQueryClient } from "@/lib/getQueryClient";

export const useWorkouts = () => {
  const queryClient = getQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof WorkoutSchema>) => createWorkout(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });

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

  const workoutsQuery = useQuery({
    queryKey: ["workouts"],
    queryFn: fetchUserWorkouts,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...workoutsQuery,
    createWorkout: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
