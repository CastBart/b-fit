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
  exersices: Exercise[]; // Corrected the prop usage
}

export default function ExerciseTable({ exersices }: ExerciseTableProps) {
  return (
    <div className="overflow-y-auto custom-scrollbar">
      <Table>
        <TableCaption>All exercises</TableCaption>
        <TableBody>
          {exersices.map(
            (
              exercise,
              index
            ) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="text-lg font-semibold">{exercise.name}</div>
                  <span className="text-muted-foreground">
                    {exercise.equipment}
                  </span>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
