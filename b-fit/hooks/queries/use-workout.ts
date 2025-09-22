import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWorkoutWithExercises,
  WorkoutWithExercises,
} from "@/actions/fetch-workout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { z } from "zod";
import { WorkoutSchema } from "@/schemas";

type UpdateWorkoutParams = {
  id: string;
  data: z.infer<typeof WorkoutSchema>;
};

export function useWorkout(id: string) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch the workout
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["workout", id],
    queryFn: () => getWorkoutWithExercises(id),
    enabled: !!id,
  });

  // Update mutation
  const updateMutation = useMutation<
    WorkoutWithExercises,
    Error,
    UpdateWorkoutParams
  >({
    mutationFn: async ({ id, data }: UpdateWorkoutParams) => {
      const res = await fetch(`/api/workouts/${id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update workout.");
      }

      return result.workout as WorkoutWithExercises;
    },
    onSuccess: (updatedWorkout, variables) => {
      queryClient.setQueryData(["workout", variables.id], updatedWorkout);
      queryClient.setQueryData<WorkoutWithExercises[]>(["workouts"], (old) =>
        old
          ? old.map((w) => (w.id === updatedWorkout.id ? updatedWorkout : w))
          : []
      );

      toast.success("Workout updated successfully.");
      router.push("/dashboard/workouts");
    },
    onError: (error) => {
      toast.error("Failed to update workout", {
        description: error?.message ?? "Something went wrong.",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation<string, Error, string>({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/workouts/${id}/delete`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to delete workout.");
      }

      return result.id as string;
    },
    onSuccess: (deletedId) => {
      // Remove single workout cache
      queryClient.removeQueries({ queryKey: ["workout", deletedId] });

      // Update workouts list cache
      queryClient.setQueryData<WorkoutWithExercises[]>(["workouts"], (old) =>
        old ? old.filter((w) => w.id !== deletedId) : []
      );

      toast.success("Workout deleted.");
      router.push("/dashboard/workouts");
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
    toast(`Delete "${name}"?`, {
      description:
        "Are you sure you want to delete this workout? This action cannot be undone.",
      position: "bottom-center",
      duration: 10000,
      action: {
        label: "Confirm Delete",
        onClick: () => deleteMutation.mutate(id),
      },
      className: "pointer-events-auto",
    });
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
