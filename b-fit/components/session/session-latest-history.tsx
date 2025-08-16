import moment from "moment";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useExercise } from "@/hooks/queries/use-exercise";
import { Loader2 } from "lucide-react";

interface LatestExerciseHistoryProps {
  id: string;
}

export default function LatestExerciseHistory({
  id,
}: LatestExerciseHistoryProps) {
  const { data, isFetching } = useExercise(id);

  if (isFetching) {
    return (
      <div className="w-full flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  // No history state
  if (!isFetching && !data?.history.length) {
    return (
      <div className="w-full flex justify-center py-10 text-muted-foreground">
        No history of this exercise
      </div>
    );
  }
  if (!data) return null;

  // Find the latest history entry by sessionStartTime
  const latest = data.history.reduce((latest, current) =>
    new Date(current.sessionStartTime) > new Date(latest.sessionStartTime)
      ? current
      : latest
  );
  return (
    <div className="rounded-xl border bg-secondary/50">
      <div className="px-4 pt-2 flex justify-between">
        <div>{latest.workoutName}</div>
        <div>{moment(latest.sessionStartTime).format("MMM Do YY hh:mm")}</div>
      </div>
      <Table>
        <TableCaption className="hidden">Sets</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Set</TableHead>
            <TableHead className="text-center">Weight</TableHead>
            <TableHead className="text-center">Reps</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {latest.sets.map((set, idx) => (
            <TableRow key={idx}>
              <TableCell className="text-center">{set.setNumber}</TableCell>
              <TableCell className="text-center">{set.weight}</TableCell>
              <TableCell className="text-center">{set.reps}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
