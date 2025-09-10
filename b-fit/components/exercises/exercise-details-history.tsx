import { TabsContent } from "@/components/ui/tabs";
import { useExercise } from "@/hooks/queries/use-exercise";
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
import { Loader2 } from "lucide-react";
import moment from "moment";

interface ExerciseDetailsHistoryProps {
  exercise: Exercise;
}
export default function ExerciseDetailsHistory({
  exercise,
}: ExerciseDetailsHistoryProps) {
  const { data, isFetching } = useExercise(exercise.id);
  const exerciseWithHistory = data;

  if (isFetching && !data?.history.length) {
    return (
      <TabsContent value="history">
        <div className="w-full flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </TabsContent>
    );
  }
  // No history state
  if (!isFetching && !exerciseWithHistory?.history.length) {
    return (
      <TabsContent value="history">
        <div className="w-full flex justify-center py-10 text-muted-foreground">
          No history of this exercise
        </div>
      </TabsContent>
    );
  }
  return (
    <TabsContent value="history" className="">
      <div className="text-xl font-bold py-2 pr-2">{exercise.name}</div>
      <div className="space-y-4">
        {exerciseWithHistory?.history.map((ex, index) => (
          <div key={index} className="rounded-xl border bg-secondary/50">
            <div className="px-4 pt-2 flex justify-between">
              <div>{ex.workoutName}</div>
              <div>{moment(ex.sessionStartTime).format("MMM Do, YYYY, HH:mm")}</div>
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
                {ex.sets.map((set, setIndex) => (
                  <TableRow key={setIndex}>
                    <TableCell className="text-center">
                      {set.setNumber}
                    </TableCell>
                    <TableCell className="text-center">{set.weight}</TableCell>
                    <TableCell className="text-center">{set.reps}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}
