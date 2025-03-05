"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Exercise } from "@/lib/definitions";

interface ExerciseTableProps {
  exercises: Exercise[];
}

export default function ExerciseTable({ exercises }: ExerciseTableProps) {
  return (
    <div className="overflow-y-auto custom-scrollbar">
      <Table>
        <TableCaption >All exercises</TableCaption>
        <TableBody>
          {exercises.map((exercise, index) => (
            <TableRow key={index}>
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
