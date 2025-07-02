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
    <Drawer
      open={!!selectedExercise}
      onOpenChange={onClose}
      shouldScaleBackground={false}
    >
      <DrawerContent className="w-full max-h-screen lg:w-[600px] justify-self-center">
        {selectedExercise && (
          <>
            <DrawerHeader>
              <div className="flex flex-col gap-2">
                <DrawerTitle className="text-center text-3xl">
                  {selectedExercise.name}
                </DrawerTitle>
                <DrawerDescription className="hidden">
                  View exercise details
                </DrawerDescription>
                <Separator className="h-1"></Separator>
              </div>
            </DrawerHeader>
            <div className="h-[335px] overflow-y-auto custom-scrollbar ">
              <Tabs defaultValue="info" className="px-4 flex flex-col">
                <TabsList className="grid grid-cols-2 sticky top-0 z-10">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <div className=" overflow-y-auto  ">
                  <ExerciseDetailsInfo
                    exercise={selectedExercise}
                    onDelete={onDelete}
                  />
                  <ExerciseDetailsHistory exercise={selectedExercise} />
                </div>
              </Tabs>
            </div>
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
