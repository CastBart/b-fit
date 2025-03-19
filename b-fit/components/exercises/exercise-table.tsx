"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Exercise } from "@/lib/definitions";

interface ExerciseTableProps {
  exercises: Exercise[];
}

export default function ExerciseTable({ exercises }: ExerciseTableProps) {
  return (
    <div className="overflow-y-auto custom-scrollbar">
      <Table id="exercise-table">
        <TableCaption >All exercises</TableCaption>
        <TableBody id="exercise-table-body">
          {exercises.map((exercise, index) => (
            <TableRow key={index} id={`exercise-table-row-${exercise.id}`}>
              <TableCell>
                <div className="text-lg font-semibold">{exercise.name}</div>
                <span className="text-muted-foreground">{exercise.equipment}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
