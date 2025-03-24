import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { Exercise } from "@/lib/definitions";
import ExerciseDetailsInfo from "./exercise-details-info";
import ExerciseDetailsHistory from "./exercise-details-history";

interface ExerciseDetailsDrawerProps {
  selectedExercise: Exercise | null;
  onClose: () => void;
  onDelete: (exerciseId: string, exerciseName: string) => void;
}

export function ExerciseDetailsDrawer({
  selectedExercise,
  onClose,
  onDelete,
}: ExerciseDetailsDrawerProps) {
  return (
    <Drawer open={!!selectedExercise} onOpenChange={onClose} shouldScaleBackground={false}>
      <DrawerContent className="custom-drawer justify-self-center">
        {selectedExercise && (
          <>
            <DrawerHeader>
              <div className="flex flex-col gap-2">
                <DrawerTitle className="text-center text-3xl">
                  {selectedExercise.name}
                </DrawerTitle>
                <DrawerDescription className="hidden">View exercise details</DrawerDescription>
                <Separator className="h-1"></Separator>
              </div>
            </DrawerHeader>
            <Tabs defaultValue="info" className="px-4 flex flex-col overflow-y-auto custom-scrollbar">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <div>
                <ExerciseDetailsInfo exercise={selectedExercise} onDelete={onDelete} />
                <ExerciseDetailsHistory exercise={selectedExercise} />
              </div>
            </Tabs>
            <DrawerFooter>
              <DrawerClose asChild id="exercise-filters-drawer-close">
                <Button variant="secondary">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
