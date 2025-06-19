import { TabsContent } from "@/components/ui/tabs";
import { useExercise } from "@/hooks/queries/use-exercise";

import { Exercise } from "@/lib/definitions";

interface ExerciseDetailsHistoryProps {
  exercise: Exercise;
}
export default function ExerciseDetailsHistory({
  exercise,
}: ExerciseDetailsHistoryProps) {
  const { data, isLoading } = useExercise(exercise.id);
  
  return (
    <TabsContent value="history">
      <div className="text-xl font-bold py-2 pr-2">{exercise.name}</div>
      <div className="space-y-2">
        <div className="h-24">No Data</div>
        <div className="h-24">No Data</div>
        <div className="h-24">No Data</div>
        <div className="h-24">No Data</div>
        <div className="h-24">No Data</div>
        <div className="h-24">No Data</div>
        <div className="h-24">No Data</div>
      </div>
    </TabsContent>
  );
}
