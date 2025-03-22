"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Exercise } from "@/lib/definitions";
import { ExerciseDetailsDrawer } from "./exercise-details-drawer";

interface ExerciseTableProps {
  exercises: Exercise[];
}

export default function ExerciseTable({ exercises }: ExerciseTableProps) {
  return (
    <div className="overflow-y-auto custom-scrollbar">
      <Table id="exercise-table">
        <TableCaption>All exercises</TableCaption>
        <TableBody id="exercise-table-body">
          {exercises.map((exercise, index) => (
            <ExerciseDetailsDrawer key={index} index={index} exercise={exercise} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


