"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserExercises } from "@/actions/fetch-exercises";
import { deleteExercise } from "@/actions/delete-exercise";
import ExerciseTable from "@/components/exercises/exercise-table";
import CreateExerciseDrawer from "@/components/exercises/exercise-create-drawer";
import ExerciseSearch from "@/components/exercises/exercise-search";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
  Exercise,
} from "@/lib/definitions";
import { ExerciseFilterDrawer } from "./exercise-filter-drawer";
import { toast } from "sonner"; // ✅ Import toast for confirmation
import { useExercises } from "@/hooks/queries/use-exercises";

interface ExercisesProps {
  mode: "view" | "select"; // ✅ "view" for exercise details, "select" for adding to a list
  onExerciseSelect?: (exercise: Exercise) => void; // ✅ Callback for when an exercise is selected
}

export default function Exercises({ mode, onExerciseSelect }: ExercisesProps) {
  const { exercises, isPending, isError, error, handleDelete, createExercise, refetch } = useExercises();


  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    equipment: [] as ExerciseEquipment[],
    muscle: [] as MuscleGroup[],
    type: [] as ExerciseType[],
  });

  // ✅ Filter logic remains the same
  const filteredExercises = exercises.filter((exercise) => {
    if (
      searchTerm &&
      !exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.equipment.length > 0 &&
      !filters.equipment.includes(exercise.equipment)
    ) {
      return false;
    }
    if (
      filters.muscle.length > 0 &&
      !(
        filters.muscle.includes(exercise.primaryMuscle) ||
        exercise.auxiliaryMuscles.some((muscle) =>
          filters.muscle.includes(muscle)
        )
      )
    ) {
      return false;
    }
    if (filters.type.length > 0 && !filters.type.includes(exercise.type)) {
      return false;
    }
    return true;
  });

  if (isPending) return <p>Loading exercises...</p>;
  if (isError) return <p>Error loading exercises: {String(error)}</p>;

  return (
    <>
      <CreateExerciseDrawer />
      <ExerciseSearch setSearchTerm={setSearchTerm} />
      <ExerciseFilterDrawer
        numOfExercises={filteredExercises.length}
        setFilters={setFilters}
      />
      <ExerciseTable
        mode={mode}
        exercises={filteredExercises}
        onDelete={handleDelete}
        onSelect={onExerciseSelect}
      />
    </>
  );
}
