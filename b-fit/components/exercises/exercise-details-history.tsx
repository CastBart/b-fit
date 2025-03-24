import { TabsContent } from "@/components/ui/tabs";

import { Exercise } from "@/lib/definitions";

interface ExerciseDetailsHistoryProps {
  exercise: Exercise;
}
export default function ExerciseDetailsHistory({
  exercise,
}: ExerciseDetailsHistoryProps) {
  return (
    <TabsContent value="history" className="">
      <div className="text-xl font-bold py-2">{exercise.name}</div>
      <div className="flex items-center justify-center">
        <div>No Data</div>
      </div>
    </TabsContent>
  );
}
