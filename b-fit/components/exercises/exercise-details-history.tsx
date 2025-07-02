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
  const { data, isLoading } = useExercise(exercise.id);
  const exerciseHistory = data;

  if (isLoading) {
    return (
      <TabsContent value="history">
        <div className="w-full flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="history">
      <div className="text-xl font-bold py-2 pr-2">{exercise.name}</div>
      <div className="space-y-4">
        {exerciseHistory?.map((ex, index) => (
          <div key={index} className="rounded-xl border bg-secondary/50">
            <div className="px-2 flex justify-between">
              <div>{ex.workoutName}</div>
              <div>
                {moment(ex.sessionStartTime).format("MMM Do YY, hh:mm")}
              </div>
            </div>
            <Table>
              <TableCaption className="hidden">Sets</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Set</TableHead>
                  <TableHead className="text-center">Reps</TableHead>
                  <TableHead className="text-center">Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ex.sets.map((set, setIndex) => (
                  <TableRow key={setIndex}>
                    <TableCell className="text-center">
                      {set.setNumber}
                    </TableCell>
                    <TableCell className="text-center">{set.reps}</TableCell>
                    <TableCell className="text-center">{set.weight}</TableCell>
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
