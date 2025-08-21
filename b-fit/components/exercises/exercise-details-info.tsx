import { TabsContent } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { Exercise, ExerciseOwnership } from "@/lib/definitions";
import { toast } from "sonner";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import ExerciseInstructions from "./exercise-details-instructions";

interface ExerciseDetailsInfoProps {
  exercise: Exercise;
  onDelete: (exerciseId: string, exerciseName: string) => void;
}

export default function ExerciseDetailsInfo({
  exercise,
  onDelete,
}: ExerciseDetailsInfoProps) {
  function handleDelete() {
    onDelete(exercise.id, exercise.name);
  }

  return (
    <TabsContent value="info">
      <div className="flex items-center">
        <div className="text-xl font-bold py-2 pr-2">{exercise.name}</div>
        {exercise.owner === ExerciseOwnership.Custom ? (
          <EditDropdown onDelete={handleDelete} />
        ) : (
          ""
        )}
      </div>
      <div className="space-y-2">
        <SelectionButton label="Equipment" value={exercise.equipment} />
        <SelectionButton
          label="Primary Muscle"
          value={exercise.primaryMuscle}
        />
        <SelectionButton
          label="Auxiliary Muscles"
          value={exercise.auxiliaryMuscles}
        />
        <SelectionButton label="Exercise Type" value={exercise.type} />
      </div>
      {exercise.instructions && (
        <>
          <Separator className="my-4 h-1" />
          <div className="text-xl font-bold pr-2">Instructions</div>
          <Separator className="my-4 h-1" />
          <ExerciseInstructions instructions={exercise.instructions} />
        </>
      )}
    </TabsContent>
  );
}

function EditDropdown({ onDelete }: { onDelete: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisHorizontalIcon className="h-7 w-7 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Button className="w-full" variant={"destructive"} onClick={onDelete}>
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
interface SelectionButtonProps {
  label: string;
  value: string | string[];
}

function SelectionButton({ label, value }: SelectionButtonProps) {
  return (
    <Button className="w-full min-h-[48px] h-full" variant="secondary">
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
