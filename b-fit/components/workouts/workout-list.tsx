"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserWorkouts } from "@/actions/fetch-user-workouts";
import WorkoutCard from "@/components/workouts/workout-card";
import { useWorkouts } from "@/hooks/queries/use-workouts";

export default function WorkoutList() {
  const { data: workouts = [], isPending, isError, error } = useWorkouts();

  if (isPending) return <p>Loading workouts...</p>;
  if (isError) return <p>Error loading workouts: {error.message}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 rounded-xl border p-4">
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
