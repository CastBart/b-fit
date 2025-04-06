import { useQuery } from "@tanstack/react-query";
import { fetchUserWorkouts } from "@/actions/fetch-user-workouts";

export const useWorkouts = () => {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: () => fetchUserWorkouts(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
