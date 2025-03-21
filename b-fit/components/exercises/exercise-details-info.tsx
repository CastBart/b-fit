import { TabsContent } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { Exercise } from "@/lib/definitions";

interface ExerciseDetailsInfoProps {
  exercise: Exercise;
}

export default function ExerciseDetailsInfo({
  exercise,
}: ExerciseDetailsInfoProps) {
  return (
    <TabsContent value="info">
      <Button className="w-full h-12" variant={"secondary"}>
        <div className="flex items-center justify-between w-full">
          <div>Equipment</div>
          <div>{exercise.equipment}</div>
        </div>
      </Button>
    </TabsContent>
  );
}
