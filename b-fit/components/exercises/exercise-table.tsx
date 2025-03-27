"use client";

import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableRow } from "@/components/ui/table";
import { Exercise } from "@/lib/definitions";
import { ExerciseDetailsDrawer } from "./exercise-details-drawer";

interface ExerciseTableProps {
  mode: "view" | "select";
  exercises: Exercise[];
  onDelete?: (exerciseId: string, exerciseName: string) => void;
  onSelect?: (exercise: Exercise) => void;
}

export default function ExerciseTable({ mode, exercises, onDelete, onSelect }: ExerciseTableProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  function handleRowClick(exercise: Exercise) {
    if (mode === "view") {
      setSelectedExercise(exercise);
    } else if (mode === "select") {
      setSelectedExercises((prev) =>
        prev.includes(exercise) ? prev.filter((e) => e !== exercise) : [...prev, exercise]
      );
      onSelect?.(exercise);
    }
  }

  return (
    <div className="overflow-y-auto custom-scrollbar">
      <Table id="exercise-table">
        <TableCaption>All exercises</TableCaption>
        <TableBody id="exercise-table-body">
          {exercises.map((exercise) => (
            <TableRow
              key={exercise.id}
              id={`exercise-table-row-${exercise.id}`}
              onClick={() => handleRowClick(exercise)}
              className={`${mode === "select" ? "cursor-pointer" : ""} ${
                selectedExercises.includes(exercise) ? "bg-primary/20" : ""
              }`}
            >
              <TableCell className="w-full">
                <div className="text-lg font-semibold">{exercise.name}</div>
                <span className="text-muted-foreground">{exercise.equipment}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Details Drawer (Only in View Mode) */}
      {mode === "view" && (
        <ExerciseDetailsDrawer
          selectedExercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onDelete={onDelete ? onDelete : () => {}}
        />
      )}
    </div>
  );
}
