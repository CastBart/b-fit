import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SessionInput } from "@/actions/session-complete";
import { useRouter } from "next/navigation";
import { SessionWithHistory } from "@/lib/db/session";
import { Session } from "@prisma/client";
import { ExerciseHistory, ExerciseWithHistory } from "@/actions/fetch-exercise";
/**
 *
 * @param sessionId Optional session ID to fetch a specific session. If not provided, fetches all sessions.
 * @returns If sessionId is provided, returns a single session object and related states. If not, returns an array of sessions and related states.
 */
export const useSession = (sessionId?: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  /**
   * Fetch a single session by ID (if sessionId is passed)
   */
  const {
    data: session,
    isLoading: isSessionLoading,
    isError: isSessionError,
    error: sessionError,
  } = useQuery<SessionWithHistory, Error>({
    queryKey: ["sessions", sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/session/${sessionId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch session.");
      }

      return data;
    },
    enabled: !!sessionId, // only run if an id is provided
  });

  /**
   * Fetch all sessions (for listing history, dashboards, etc.)
   */
  const {
    data: sessions,
    isLoading: isSessionsLoading,
    isError: isSessionsError,
    error: sessionsError,
  } = useQuery<Session[], Error>({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await fetch(`/api/sessions`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch sessions.");
      }

      return data;
    },
    enabled: !sessionId, // don’t fetch all if we’re focusing on a single one
  });

  /**
   * Create a new session
   */
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
        throw new Error(result.error || "Failed to create session.");
      }

      return result;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });

      // Invalidate & update exercise histories
      const completedExercises = Object.values(variables.progress).filter(
        (ex) => ex.sets.some((set) => set.completed)
      );

      completedExercises.forEach((ex) => {
        const exerciseId = variables.exerciseMap[ex.exerciseId].id;

        queryClient.invalidateQueries({
          queryKey: ["exercise", exerciseId],
        });

        //set query data cache for exercise history
        queryClient.setQueryData<ExerciseWithHistory>(
          ["exercise", exerciseId],
          (oldData) => {
            if (!oldData) return oldData;

            const newHistoryEntry: ExerciseHistory = {
              exerciseName: variables.exerciseMap[ex.exerciseId].name,
              workoutName: variables.workoutName,
              sessionStartTime: variables.startTime,
              sets: ex.sets
                .filter((set) => set.completed)
                .map((set) => ({
                  reps: set.reps,
                  weight: set.weight,
                  isCompleted: true,
                  setNumber: set.setNumber,
                })),
            };

            return {
              ...oldData,
              history: [newHistoryEntry, ...oldData.history].sort(
                (a, b) =>
                  new Date(b.sessionStartTime).getTime() -
                  new Date(a.sessionStartTime).getTime()
              ),
            };
          }
        );
      });

      //todo: set query data for session with history
      queryClient.setQueryData<SessionWithHistory>(["session", data.id], data);

      //todo: set query data for sessions
      queryClient.setQueryData<SessionWithHistory[]>(["sessions"], (old) =>
        old ? [data, ...old] : [data]
      );

      toast.success("Session Completed!", {
        description: `Session "${variables.workoutName}" has been saved.`,
      });
    },
    onError: (error: any) => {
      toast.error("Failed to save Session", {
        description: error?.message ?? "Something went wrong.",
      });
    },
  });

  return {
    // Single session
    session,
    isSessionLoading,
    isSessionError,
    sessionError,

    // All sessions
    sessions,
    isSessionsLoading,
    isSessionsError,
    sessionsError,

    // Mutation
    createSession: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
