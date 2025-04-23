"use client";

import { useState } from "react";
import { useWorkouts } from "@/hooks/queries/use-workouts";
import WorkoutCard from "@/components/workouts/workout-card";
import { Input } from "@/components/ui/input"; // If you're using shadcn/ui Input component
import Search from "../exercises/exercise-search";

export default function WorkoutList() {
  const { data: workouts = [], isPending, isError, error } = useWorkouts();
  const [searchQuery, setSearchQuery] = useState("");

  if (isPending) return <p>Loading workouts...</p>;
  if (isError) return <p>Error loading workouts: {error.message}</p>;

  // Filter workouts based on search query (case-insensitive)
  const filteredWorkouts = workouts.filter((workout) =>
    workout.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search Input */}
      <Search setSearchTerm={setSearchQuery} />

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 gap-4 pr-2 overflow-y-auto custom-scrollbar">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))
        ) : (
          <p className="text-muted-foreground">No workouts found.</p>
        )}
      </div>
    </>
  );
}
