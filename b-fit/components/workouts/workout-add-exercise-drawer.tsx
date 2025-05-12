import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Exercises from "../exercises/exercises";
import { Exercise } from "@/lib/definitions";

export default function WorkoutSelectExerciseDrawer({
  onExerciseSelect,
}: {
  onExerciseSelect: (exercises: Exercise[]) => void;
}) {
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [open, setOpen] = useState(false); //drawer open/close state

  function handleExerciseSelect(exercise: Exercise) {
    setSelectedExercises((prev) => {
      return prev.includes(exercise) ? prev.filter((e) => e !== exercise) : [...prev, exercise]
    });
  }

  function handleConfirmSelection() {
    onExerciseSelect(selectedExercises); // Pass selected exercises to parent
  }

  function handleDrawerChange(isOpen: boolean) {
    if (!isOpen) {
      // Drawer is being closed (either via button or clicking outside)
      setSelectedExercises([]);
    }
    setOpen(isOpen);
  }

  return (
    <Drawer open={open} onOpenChange={handleDrawerChange}>
      <DrawerTrigger asChild>
        <Button>Add Exercise</Button>
      </DrawerTrigger>
      <DrawerContent className="add-exercise-drawer justify-self-center p-4">
        <DrawerHeader>
          <DrawerTitle className="text-center text-3xl">Exercises</DrawerTitle>
          <DrawerDescription className="hidden">
            Exercise Selection
          </DrawerDescription>
          <Separator className="h-1" />
        </DrawerHeader>

        {/* Pass the selection handler to Exercises */}
        <Exercises mode="select" onExerciseSelect={handleExerciseSelect} />

        <DrawerFooter className="">
          <div className="flex justify-between items-center">
            <DrawerClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DrawerClose>
            {selectedExercises.length > 0 && (
              <DrawerClose asChild>
                <Button onClick={handleConfirmSelection}>{`Add (${selectedExercises.length})`}</Button>
              </DrawerClose>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
