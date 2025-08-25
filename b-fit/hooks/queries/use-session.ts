import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SessionInput } from "@/actions/session-complete";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/lib/getQueryClient";
import { useDispatch } from "react-redux";
import { endSession } from "@/store/sessionSlice";
export const useSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();

  const createMutation = useMutation({
    mutationFn: async (data: SessionInput) => {
      const res = await fetch("/api/session/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to create workout.");
      }

      return result;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      // Invalidate & set exercise histories for each exercise
      const completedExercises = Object.values(variables.progress).filter(
        (ex) => ex.sets.some((set) => set.completed)
      );
      completedExercises.forEach((ex) => {
        const exerciseId = variables.exerciseMap[ex.exerciseId].id;
        console.log("Current Exercise Invalidation ID:", exerciseId);
        // Invalidate exercise history query
        queryClient.invalidateQueries({
          queryKey: ["exercise", exerciseId],
        });

        // Optimistically update exercise history cache
        queryClient.setQueryData(["exercise", exerciseId], (oldData: any) => {
          if (!oldData) return oldData;

          const newHistoryEntry = {
            sessionId: variables.sessionId,
            exerciseId,
            date: new Date().toISOString(),
            sets: ex.sets
              .filter((set) => set.completed)
              .map((set) => ({
                reps: set.reps,
                weight: set.weight,
                isCompleted: true,
                setNumber: set.setNumber,
              })),
          };
          console.log("Old Data:", oldData);
          console.log("Old History:", oldData.history);
          console.log("New History Entry:", newHistoryEntry);
          return {
            ...oldData,
            history: [...oldData.history, newHistoryEntry],
          };
        });
      });
      toast.success("Session Completed!", {
        description: `Session "${variables.workoutName}" has been saved.`,
      });
      router.push("/dashboard");
      dispatch(endSession());
    },
    onError: (error: any) => {
      toast.error("Failed to save Session", {
        description: error?.message ?? "Something went wrong.",
      });
    },
  });

  //Todo: Implement fetch sessions Query
  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["sessions"],
  //   queryFn: async () => {
  //     const res = await fetch(`/api/sessions`);
  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.error || "Failed to fetch workouts.");
  //     }

  //     return data;
  //   },
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });

  return {
    // sessions: data,
    // isLoading,
    // isError,
    // error,
    createSession: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
