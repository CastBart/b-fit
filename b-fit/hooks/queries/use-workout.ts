import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkoutWithExercises } from "@/actions/fetch-workout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { z } from "zod";
import { WorkoutSchema } from "@/schemas";
import { getQueryClient } from "@/lib/getQueryClient";

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
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: UpdateWorkoutParams) => {
      const res = await fetch(`/api/workouts/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update workout.");
      }

      return result;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["workout", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      toast.success("Workout updated successfully.");
      router.push("/dashboard/workouts");
    },
    onError: (error: any) => {
      toast.error("Failed to update workout", {
        description: error?.message ?? "Something went wrong.",
      });
      router.push("/dashboard/workouts");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/workouts/${id}/delete`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to delete workout.");
      }

      return result;
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.removeQueries({ queryKey: ["workout", deletedId] });
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
