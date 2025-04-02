"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserWorkouts } from "@/actions/fetch-user-workouts";
import WorkoutCard from "@/app/ui/Dashboard/Workouts/WorkoutCard";

export default function WorkoutList() {
  const {
    data: workouts = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["workouts"],
    queryFn: () => fetchUserWorkouts(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (isPending) return <p>Loading workouts...</p>;
  if (isError) return <p>Error loading workouts: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          id={workout.id}
          title={workout.name}
          description={workout.description}
        />
      ))}
    </div>
  );
}
