import { TabsContent } from "@/components/ui/tabs";
import { useExercise } from "@/hooks/queries/use-exercise";

import { Exercise } from "@/lib/definitions";

interface ExerciseDetailsHistoryProps {
  exercise: Exercise;
}
export default function ExerciseDetailsHistory({
  exercise,
}: ExerciseDetailsHistoryProps) {
  debugger;
  const { data, isLoading } = useExercise(exercise.id);
  const exerciseHistory = data;
  return (
    <TabsContent value="history">
      <div className="text-xl font-bold py-2 pr-2">{exercise.name}</div>
      <div className="space-y-2">
        {exerciseHistory?.map((ex) => (
          <div className="rounded-xl border bg-secondary">
            <div className="px-2 flex justify-between">
              <div>{ex.workoutName}</div>
              <div>{ex.sessionStartTime.toString()}</div>
            </div>
            <div className="flex flex-col">
              {ex.sets.map((set)=>(
                <div className="flex justify-evenly">
                  <div>{set.reps}</div>
                  <div>{set.weight}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </TabsContent>
  );
}
