import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchUserExercises } from "@/actions/fetch-exercises";
import { deleteExercise } from "@/actions/delete-exercise";
import { Exercise } from "@/lib/definitions";
import { toast } from "sonner";

export function useExercises() {
  const queryClient = useQueryClient();

  const {
    data: exercises = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => fetchUserExercises(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExercise,
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
      duration: 10000,
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
    handleDelete,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["exercises"] }),
  };
}
