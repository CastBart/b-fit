"use client";

import exercisesData from "@/lib/exercise-list";
import ExerciseTable from "@/components/exercises/exercise-table";
import ExerciseSearch from "@/components/exercises/exercise-search";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  Exercise,
} from "@/lib/definitions";
import { useState, useEffect } from "react";
import { ExerciseFilterDrawer } from "./exercise-filter-drawer";
import CreateExerciseDrawer from "./exercise-create-drawer";
import { fetchUserExercises } from "@/actions/fetch-exercises";

export default function Exercises() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    equipment: [] as ExerciseEquipment[],
    muscle: [] as MuscleGroup[],
    type: [] as ExerciseType[],
  });
  const [userExercises, setUserExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState(exercisesData);

  // Fetch user-created exercises on mount
  useEffect(() => {
    async function loadUserExercises() {
      const exercises = await fetchUserExercises();
      setUserExercises(exercises);
    }
    loadUserExercises();
  }, []);

  useEffect(() => {
    let updatedExercises = [...exercisesData, ...userExercises];

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
  }, [searchTerm, filters, userExercises]);

  // Update list when a new exercise is created
  async function handleExerciseCreated() {
    const exercises = await fetchUserExercises();
    setUserExercises(exercises);
  }

  return (
    <>
      <CreateExerciseDrawer onExerciseCreated={handleExerciseCreated} />
      <ExerciseSearch setSearchTerm={setSearchTerm} />
      <ExerciseFilterDrawer
        numOfExercises={filteredExercises.length}
        setFilters={setFilters}
      />
      <ExerciseTable exercises={filteredExercises} />
    </>
  );
}
