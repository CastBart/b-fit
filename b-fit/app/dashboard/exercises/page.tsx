"use client";

import { useState, useEffect } from "react";
import exercisesData from "@/lib/exercise-list";
import ExerciseTable from "@/components/exercises/exercise-table";
import ExerciseSearch from "@/components/exercises/exercise-search";
import ExerciseFilter from "@/components/exercises/exercise-filter";
import { ExerciseEquipment, MuscleGroup, ExerciseType } from "@/lib/definitions";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    equipment: [] as ExerciseEquipment[],
    muscle: [] as MuscleGroup[],
    type: [] as ExerciseType[],
  });

  const [filteredExercises, setFilteredExercises] = useState(exercisesData);

  useEffect(() => {
    let updatedExercises = exercisesData;

    // Apply search filter
    if (searchTerm) {
      updatedExercises = updatedExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply multi-filters
    if (filters.equipment.length > 0) {
      updatedExercises = updatedExercises.filter((exercise) =>
        filters.equipment.includes(exercise.equipment)
      );
    }

    if (filters.muscle.length > 0) {
      updatedExercises = updatedExercises.filter(
        (exercise) =>
          filters.muscle.includes(exercise.primaryMuscle) ||
          exercise.auxiliaryMuscles.some((muscle) => filters.muscle.includes(muscle))
      );
    }

    if (filters.type.length > 0) {
      updatedExercises = updatedExercises.filter((exercise) =>
        filters.type.includes(exercise.type)
      );
    }

    setFilteredExercises(updatedExercises);
  }, [searchTerm, filters]);

  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex flex-col gap-2 border rounded-3xl p-4 my-10 h-[calc(100vh-9rem)] m-2">
        <ExerciseSearch setSearchTerm={setSearchTerm} />
        <ExerciseFilter numOfExercises={filteredExercises.length} setFilters={setFilters} />
        <ExerciseTable exercises={filteredExercises} />
      </div>
    </div>
  );
}
