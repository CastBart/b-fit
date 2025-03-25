"use client";

import { useState, useEffect } from "react";
import { fetchUserExercises } from "@/actions/fetch-exercises";
import { deleteExercise } from "@/actions/delete-exercise";
import exercisesData from "@/lib/exercise-list";
import ExerciseTable from "@/components/exercises/exercise-table";
import CreateExerciseDrawer from "@/components/exercises/exercise-create-drawer";
import ExerciseSearch from "@/components/exercises/exercise-search";
import { ExerciseEquipment, MuscleGroup, ExerciseType, Exercise } from "@/lib/definitions";
import { ExerciseFilterDrawer } from "./exercise-filter-drawer";
import { toast } from "sonner"; // ✅ Import toast for confirmation

export default function Exercises() {
  const [userExercises, setUserExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    equipment: [] as ExerciseEquipment[],
    muscle: [] as MuscleGroup[],
    type: [] as ExerciseType[],
  });

  useEffect(() => {
    async function loadUserExercises() {
      const exercises = await fetchUserExercises();
      setUserExercises(exercises);
    }
    loadUserExercises();
  }, []);

  const allExercises = [...exercisesData, ...userExercises];

  useEffect(() => {
    let updatedExercises = allExercises;

    if (searchTerm) {
      updatedExercises = updatedExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
  }, [searchTerm, filters, userExercises]);

  /**
   * Delete exercise to handle delete of exercises.
   * TODO: Change toast into a dialog
   */
  function handleDelete(exerciseId: string, exerciseName: string) {
    toast(`Delete "${exerciseName}"?`, {
      description: "Are you sure you want to delete this exercise? This action cannot be undone.",
      position: "bottom-center",
      duration: 100000,
      action: {
        label: "Confirm Delete",
        onClick: async () => {
          await deleteExercise(exerciseId);
          setUserExercises((prev) => prev.filter((e) => e.id !== exerciseId));
          toast.success(`"${exerciseName}" has been deleted.`);
        },
      },
      className: "pointer-events-auto"
    });
  }

  return (
    <>
      <CreateExerciseDrawer onExerciseCreated={() => fetchUserExercises().then(setUserExercises)} />
      <ExerciseSearch setSearchTerm={setSearchTerm} />
      <ExerciseFilterDrawer numOfExercises={filteredExercises.length} setFilters={setFilters} />
      <ExerciseTable exercises={filteredExercises} onDelete={handleDelete} />
    </>
  );
}
