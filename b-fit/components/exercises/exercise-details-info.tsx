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
  function handleSelectionClick() {
    if (exercise.owner === ExerciseOwnership.BFit) {
      toast("BFit Exercise!", {
        description: `This exercise is part of the default BFit database and cannot be modified.`,
        duration: 7000,
        position: "top-center",
      });
    } else {
      toast(exercise.name, {
        description: `Editing Custom Exercises is not available just yet, hang in there until next release. Thank you for understanding!`,
        duration: 7000,
        position: "top-center",
      });
    }
  }
  return (
    <TabsContent value="info" className="pt-4">
      <div className="text-xl font-bold py-2">{exercise.name}</div>
      <div className="space-y-2">
        <SelectionButton
          handleClick={handleSelectionClick}
          label="Equipment"
          value={exercise.equipment}
        />
        <SelectionButton
          handleClick={handleSelectionClick}
          label="Primary Muscle"
          value={exercise.primaryMuscle}
        />
        <SelectionButton
          handleClick={handleSelectionClick}
          label="Auxiliary Muscles"
          value={exercise.auxiliaryMuscles}
        />
        <SelectionButton
          handleClick={handleSelectionClick}
          label="Exercise Type"
          value={exercise.type}
        />
      </div>
    </TabsContent>
  );
}

interface SelectionButtonProps {
  label: string;
  value: string | string[];
  handleClick: () => void;
}

function SelectionButton({ label, value, handleClick }: SelectionButtonProps) {
  return (
    <Button
      className="w-full min-h-[48px] h-full"
      variant={"secondary"}
      onClick={handleClick}
    >
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
