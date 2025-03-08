import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "../ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
} from "@/lib/definitions";
import ExerciseCreateFilter from "@/components/exercises/exercise-create-filter";

export default function CreateExerciseDrawer() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  // State for filters
  const [selectedEquipment, setSelectedEquipment] = useState<ExerciseEquipment[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup[]>([]);
  const [selectedAuxMuscles, setSelectedAuxMuscles] = useState<MuscleGroup[]>([]);
  const [selectedType, setSelectedType] = useState<ExerciseType[]>([]);

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <Button>Create</Button>
      </DrawerTrigger>
      <DrawerContent className="custom-drawer justify-self-center">
        <DrawerHeader>
          <div className="flex flex-col gap-2">
            <DrawerTitle className="text-center text-3xl">
              Create Exercise
            </DrawerTitle>
            <Separator className="h-1" />
          </div>
        </DrawerHeader>

        <div className="grid gap-4 px-4 min-h-[200px] overflow-y-auto custom-scrollbar">
          {/* Exercise Name */}
          <div className="grid gap-2">
            <Label htmlFor="create_exercise_name">Exercise Name</Label>
            <Input
              id="create_exercise_name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=""
            />
          </div>

          {/* Equipment Selection (Single-Select) */}
          <ExerciseCreateFilter
            title="Equipment"
            data={Object.values(ExerciseEquipment)}
            selectedItems={selectedEquipment}
            setSelectedItems={setSelectedEquipment}
            singleSelect={true} // Enable single selection
          />
          <ExerciseCreateFilter
            title="Primary Muscle"
            data={Object.values(MuscleGroup)}
            selectedItems={selectedMuscle}
            setSelectedItems={setSelectedMuscle}
            singleSelect={true} // Enable single selection
          />
          <ExerciseCreateFilter
            title="Auxiliary Muscles"
            data={Object.values(MuscleGroup)}
            selectedItems={selectedAuxMuscles}
            setSelectedItems={setSelectedAuxMuscles}
            singleSelect={false} // Allow multiple selections for auxiliary muscles
          />
          <ExerciseCreateFilter
            title="Exercise Type"
            data={Object.values(ExerciseType)}
            selectedItems={selectedType}
            setSelectedItems={setSelectedType}
            singleSelect={true} // Enable single selection
          />
        </div>

        {/* Drawer Footer */}
        <DrawerFooter className="flex justify-between px-4 mt-auto">
          <div className="w-full flex justify-between gap-2">
            <DrawerClose asChild className="w-full">
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
            <Button
              className="w-full"
              type="submit"
              onClick={() =>
                console.log("Create Exercise", {
                  name,
                  selectedEquipment,
                  selectedMuscle,
                  selectedAuxMuscles,
                  selectedType,
                })
              }
            >
              Create
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}