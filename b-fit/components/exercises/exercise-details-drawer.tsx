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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { Exercise } from "@/lib/definitions";
import ExerciseDetailsInfo from "./exercise-details-info";
import ExerciseDetailsHistory from "./exercise-details-history";
import { useExercise } from "@/hooks/queries/use-exercise";
import { Loader2 } from "lucide-react";
import ExerciseInstructions from "./exercise-details-instructions";

interface ExerciseDetailsDrawerProps {
  selectedExercise: string | null;
  onClose: () => void;
  onDelete: (exerciseId: string, exerciseName: string) => void;
}

export function ExerciseDetailsDrawer({
  selectedExercise,
  onClose,
  onDelete,
}: ExerciseDetailsDrawerProps) {
  const { data, isLoading } = useExercise(selectedExercise || "");

  if (!data) {
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
                    Exercise Drawer
                  </DrawerTitle>
                  <DrawerDescription className="hidden">
                    View exercise details
                  </DrawerDescription>
                  <Separator className="h-1"></Separator>
                </div>
              </DrawerHeader>
              <div className="h-[600px] overflow-y-auto custom-scrollbar ">
                <Tabs defaultValue="info" className="px-4 flex flex-col">
                  <TabsList className="grid grid-cols-2 sticky top-0 z-10">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  <div className=" overflow-y-auto ">
                    <TabsContent value="history">
                      <div className="w-full flex justify-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    </TabsContent>
                    <TabsContent value="info">
                      <div className="w-full flex justify-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    </TabsContent>
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
  if (!data) return;

  const { exercise } = data;

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
                  {exercise.name}
                </DrawerTitle>
                <DrawerDescription className="hidden">
                  View exercise details
                </DrawerDescription>
                <Separator className="h-1"></Separator>
              </div>
            </DrawerHeader>
            <div className="h-screen overflow-y-auto custom-scrollbar ">
              <Tabs defaultValue="info" className="px-4 flex flex-col">
                <div className="sticky top-0 z-10 pb-2 bg-background ">
                  <TabsList
                    className={`grid ${exercise.instructions ? "grid-cols-3" : "grid-cols-2"} `}
                  >
                    <TabsTrigger value="info">Info</TabsTrigger>
                    {exercise.instructions && (
                      <TabsTrigger value="instructions">
                        Instructions
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                </div>
                <div className=" p-2 ">
                  <ExerciseDetailsInfo
                    exercise={exercise}
                    onDelete={onDelete}
                  />
                  {exercise.instructions && (
                    <ExerciseInstructions exercise={exercise} />
                  )}
                  <ExerciseDetailsHistory exercise={exercise} />
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
