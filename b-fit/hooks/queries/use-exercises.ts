import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Exercise } from "@/lib/definitions";
import { toast } from "sonner";
import { CreateExerciseSchema } from "@/schemas";
import * as z from "zod";

export function useExercises() {
  const queryClient = useQueryClient();

  const {
    data: exercises = [],
    isError,
    error,
  } = useQuery<Exercise[], Error>({
    queryKey: ["exercises"],
    queryFn: async () => {
      const res = await fetch("/api/exercises");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || "Failed to fetch exercises - Use Exercises."
        );
      }
      return data as Exercise[];
    },
  });

  const createMutation = useMutation<
    Exercise,
    Error,
    z.infer<typeof CreateExerciseSchema>
  >({
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
      queryClient.setQueryData<Exercise[]>(["exercises"], (old) =>
        old ? [...old, exercise] : [exercise]
      );
      toast.success(`Exercise "${exercise.name}" created.`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation<string, Error, string>({
    mutationFn: async (exerciseId) => {
      const response = await fetch(`/api/exercises/${exerciseId}/delete`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete exercise");
      }

      return data.id as string;
    },
    onSuccess: (exerciseId) => {
      queryClient.setQueryData(["exercises"], (old?: Exercise[]) =>
        old ? old.filter((e) => e.id !== exerciseId) : []
      );
      toast.success("Exercise deleted.");
    },
    onError: (error) => {
      toast.error(error.message);
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
    isCreating: createMutation.isPending,
    isError,
    error,
    createExercise: createMutation.mutate,
    handleDelete,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["exercises"] }),
  };
}
