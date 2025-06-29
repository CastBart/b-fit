import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SessionInput } from "@/actions/session-complete";
import { useRouter } from "next/navigation";
import { getQueryClient } from "@/lib/getQueryClient";
import { useDispatch } from "react-redux";
import { endSession } from "@/store/sessionSlice";
export const useSession = () => {
  const queryClient = getQueryClient(); // ✅ correct client-side queryClient
  const router = useRouter();
  const dispatch = useDispatch();

  const createMutation = useMutation({
    mutationFn: async (data: SessionInput) => {
      const res = await fetch("/api/session", {
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
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await fetch(`/api/sessions`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch workouts.");
      }

      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    sessions: data,
    isLoading,
    isError,
    error,
    createSession: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
