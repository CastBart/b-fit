import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkoutWithExercises } from "@/actions/fetch-workout";
import { updateWorkout } from "@/actions/update-workout";
import { deleteWorkout } from "@/actions/delete-workout";
import { toast } from "sonner";
import type { z } from "zod";
import { WorkoutSchema } from "@/schemas";
import { getQueryClient } from "@/lib/getQueryClient";

type UpdateWorkoutParams = {
  id: string;
  data: z.infer<typeof WorkoutSchema>;
};

export function useWorkout(id: string) {
  const queryClient = getQueryClient();

  // Fetch the workout
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["workout", id],
    queryFn: () => getWorkoutWithExercises(id),
    enabled: !!id,
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: UpdateWorkoutParams) =>
      updateWorkout(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workout", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      toast.success("Workout updated successfully.");
    },
    onError: (error: any) => {
      toast.error("Failed to update workout", {
        description: error?.message ?? "Something went wrong.",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteWorkout,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.removeQueries({ queryKey: ["workout", deletedId] });
      toast.success("Workout deleted.");
    },
    onError: () => {
      toast.error("Failed to delete workout.");
    },
  });

  // Trigger update
  function handleUpdate(data: z.infer<typeof WorkoutSchema>) {
    if (!id) return;
    updateMutation.mutate({ id, data });
  }

  // Trigger delete with confirmation
  function handleDelete(name: string) {
    // toast(`Delete "${name}"?`, {
    //   description:
    //     "Are you sure you want to delete this workout? This action cannot be undone.",
    //   position: "bottom-center",
    //   duration: 10000,
    //   action: {
    //     label: "Confirm Delete",
    //     onClick: () => deleteMutation.mutate(id),
    //   },
    //   className: "pointer-events-auto",
    // });
  }

  return {
    data,
    isLoading,
    isError,
    error,
    handleUpdate,
    isUpdating: updateMutation.isPending,
    handleDelete,
    isDeleting: deleteMutation.isPending,
  };
}
