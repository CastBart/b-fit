import { TabsContent } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { Exercise, ExerciseOwnership } from "@/lib/definitions";
import { toast } from "sonner";

interface ExerciseDetailsInfoProps {
  exercise: Exercise;
}

export default function ExerciseDetailsInfo({
  exercise,
}: ExerciseDetailsInfoProps) {

  return (
    <TabsContent value="info" className="pt-4">
      <div className="text-xl font-bold py-2">{exercise.name}</div>
      <div className="space-y-2">
        <SelectionButton label="Equipment" value={exercise.equipment} exercise={exercise} />
        <SelectionButton label="Primary Muscle" value={exercise.primaryMuscle} exercise={exercise} />
        <SelectionButton label="Auxiliary Muscles" value={exercise.auxiliaryMuscles} exercise={exercise} />
        <SelectionButton label="Exercise Type" value={exercise.type} exercise={exercise} />
      </div>
    </TabsContent>
  );
}

interface SelectionButtonProps {
  label: string;
  value: string | string[];
  exercise: Exercise;
}

function SelectionButton({ label, value, exercise }: SelectionButtonProps) {
  function handleClick() {
    if (exercise.owner === ExerciseOwnership.BFit) {
      toast("BFit Exercise!", {
        description: `This exercise is part of the default BFit database and cannot be modified.`,
        position: "top-center",
      });
    } else {
      toast(exercise.name, {
        description: `Editing Custom Exercises is not available just yet, hang in there until next release. Thank you for understanding!`,
        position: "top-center",
      });
    }
  }

  return (
    <Button className="w-full min-h-[48px] h-full" variant={"secondary"} onClick={handleClick}>
      <div className="flex items-start justify-between w-full">
        <div>{label}</div>
        <div className="text-right text-muted-foreground">
          {Array.isArray(value) ? (
            value.length > 0 ? (
              value.map((item, index) => <div key={index}>{item}</div>)
            ) : (
              <div>None</div>
            )
          ) : (
            <div>{value}</div>
          )}
        </div>
      </div>
    </Button>
  );
}
