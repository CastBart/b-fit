import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchUserExercises } from "@/actions/fetch-exercises";
import { deleteExercise } from "@/actions/delete-exercise";
import { Exercise } from "@/lib/definitions";
import { toast } from "sonner";
import { getQueryClient } from "@/lib/getQueryClient";
import { CreateExerciseSchema } from "@/schemas";
import * as z from "zod";

export function useExercises() {
  const queryClient = getQueryClient();

  const {
    data: exercises = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => fetchUserExercises(),
  });

  const createMutation = useMutation({
    mutationFn: async (newExercise: z.infer<typeof CreateExerciseSchema>) => {
      const response = await fetch("/api/exercises/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create exercise");
      }

      return data.exercise;
    },
    onSuccess: (exercise) => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success(`Exercise "${exercise.exerciseName}" created.`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (exerciseId: string) => {
      const response = await fetch(`/api/exercises/${exerciseId}/delete`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete exercise");
      }
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(["exercises"], (old?: Exercise[]) =>
        old ? old.filter((e) => e.id !== id) : []
      );
      toast.success("Exercise deleted.");
    },
  });

  function handleDelete(id: string, name: string) {
    toast(`Delete "${name}"?`, {
      description:
        "Are you sure you want to delete this exercise? This action cannot be undone.",
      position: "bottom-center",
      duration: 10000000,
      action: {
        label: "Confirm Delete",
        onClick: () => deleteMutation.mutate(id),
      },
      className: "pointer-events-auto",
    });
  }

  return {
    exercises,
    isPending,
    isError,
    error,
    createExercise: createMutation.mutate,
    handleDelete,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["exercises"] }),
  };
}
