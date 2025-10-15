import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Exercise, ExerciseOwnership } from "@/lib/definitions";
import { toast } from "sonner";
import { CreateExerciseSchema } from "@/schemas";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

export function useExercises() {
  const queryClient = useQueryClient();

  const {
    data: exercises = [],
    isError,
    error,
  } = useQuery<Exercise[], Error>({
    queryKey: ["exercises"],
    queryFn: async () => {
      if (!navigator.onLine) {
        console.warn("Offline mode: loading cached exercises");
        const cached = queryClient.getQueryData<Exercise[]>(["exercises"]);
        if (cached) return cached;
        throw new Error("No cached exercises available offline");
      }

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
    z.infer<typeof CreateExerciseSchema>,
    { previous?: Exercise[] } // rollback context
  >({
    mutationFn: async (newExercise: z.infer<typeof CreateExerciseSchema>) => {
      const id = newExercise.id ?? uuidv4();

      const exercise: Exercise = {
        id, // ✅ permanent UUID
        name: newExercise.exerciseName,
        equipment: newExercise.equipment,
        primaryMuscle: newExercise.primaryMuscle,
        auxiliaryMuscles: newExercise.auxiliaryMuscles,
        type: newExercise.exerciseType,
        owner: ExerciseOwnership.Custom,
      };

      if (!navigator.onLine) {
        console.warn("Offline mode: storing exercise locally");
        return exercise;
      }

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
    onMutate: async (newExercise: z.infer<typeof CreateExerciseSchema>) => {
      await queryClient.cancelQueries({ queryKey: ["exercises"] });
      const previous = queryClient.getQueryData<Exercise[]>(["exercises"]);

      const id = newExercise.id ?? uuidv4();

      const optimisticExercise: Exercise = {
        id,
        name: newExercise.exerciseName,
        equipment: newExercise.equipment,
        primaryMuscle: newExercise.primaryMuscle,
        auxiliaryMuscles: newExercise.auxiliaryMuscles,
        type: newExercise.exerciseType,
        owner: ExerciseOwnership.Custom,
      };

      queryClient.setQueryData<Exercise[]>(["exercises"], (old) =>
        old ? [...old, optimisticExercise] : [optimisticExercise]
      );
/*
      toast.info(
        navigator.onLine
          ? `Creating "${newExercise.exerciseName}"...`
          : `Offline: "${newExercise.exerciseName}" added locally`
      ); */

      return { previous };
    },
    // Rollback if mutation permanently fails
    onError: (err, newExercise, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["exercises"], context.previous);
      }
      toast.error(err.message);
    },
    onSuccess: (exercise) => {
      queryClient.setQueryData<Exercise[]>(["exercises"], (old) => {
        if (!old) return [exercise];
        return [
          ...old.filter((e) => e.id !== exercise.id), // remove old optimistic version
          exercise, // add the real one from server
        ];
      });

      toast.success(`Exercise "${exercise.name}" created.`);
    },
    // Always revalidate
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });

  const deleteMutation = useMutation<
    string, // return type (deleted id)
    Error, // error type
    string, // variable type (id)
    { previous?: Exercise[] } // rollback context
  >({
    mutationFn: async (exerciseId) => {
      // 🛰️ If offline, just return immediately — deletion will sync later
      if (!navigator.onLine) {
        console.warn("Offline mode: marking exercise as deleted locally");
        return exerciseId;
      }

      const response = await fetch(`/api/exercises/${exerciseId}/delete`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete exercise");
      }

      return data.id as string;
    },
    // 🧠 Optimistic update — remove exercise immediately
    onMutate: async (exerciseId: string) => {
      await queryClient.cancelQueries({ queryKey: ["exercises"] });
      const previous = queryClient.getQueryData<Exercise[]>(["exercises"]);

      // Remove locally
      queryClient.setQueryData<Exercise[]>(["exercises"], (old) =>
        old ? old.filter((e) => e.id !== exerciseId) : []
      );

      toast.info(
        navigator.onLine
          ? "Deleting exercise..."
          : "Offline: exercise removed locally"
      );

      return { previous }; // rollback context
    },
    // ♻️ Rollback if something goes wrong
    onError: (err, id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["exercises"], context.previous);
      }
      toast.error(err.message);
    },
    // ✅ Confirm delete when server success
    onSuccess: (exerciseId) => {
      toast.success("Exercise deleted.");
    },
    // 🔁 Always refetch to ensure server state alignment
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
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
