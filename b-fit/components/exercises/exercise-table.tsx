"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Exercise } from "@/lib/definitions";
import { useState } from "react";
import { ExerciseDetailsDrawer } from "./exercise-details-drawer";

interface ExerciseTableProps {
  exercises: Exercise[];
  onDelete: (exerciseId: string, exerciseName: string) => void;
}

export default function ExerciseTable({ exercises, onDelete }: ExerciseTableProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <div className="overflow-y-auto custom-scrollbar">
      <Table id="exercise-table">
        <TableCaption>All exercises</TableCaption>
        <TableBody id="exercise-table-body">
          {exercises.map((exercise) => (
            <TableRow
              key={exercise.id}
              id={`exercise-table-row-${exercise.id}`}
              onClick={() => setSelectedExercise(exercise)}
              className="cursor-pointer hover:bg-muted"
            >
              <TableCell className="w-full">
                <div className="text-lg font-semibold">{exercise.name}</div>
                <span className="text-muted-foreground">{exercise.equipment}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ExerciseDetailsDrawer
        selectedExercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onDelete={onDelete}
      />
    </div>
  );
}
