"use client";
import exercisesData from "@/lib/exercise-list";
import ExerciseTable from "@/components/exercises/exercise-table";
import ExerciseSearch from "@/components/exercises/exercise-search";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
} from "@/lib/definitions";

import { useState, useEffect } from "react";
import CreateExercise from "./exercise-create";
import { ExerciseFilterDrawer } from "./exercise-filter-drawer";
import CreateExerciseDrawer from "./exercise-create-drawer";

export default function Exercises() {
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
          exercise.auxiliaryMuscles.some((muscle) =>
            filters.muscle.includes(muscle)
          )
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
    <>
      <CreateExerciseDrawer />
      <ExerciseSearch setSearchTerm={setSearchTerm} />
      <ExerciseFilterDrawer
        numOfExercises={filteredExercises.length}
        setFilters={setFilters}
      />
      <ExerciseTable exercises={filteredExercises} />
    </>
  );
}
