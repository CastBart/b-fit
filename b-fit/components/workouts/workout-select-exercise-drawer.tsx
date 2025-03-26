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

export default function WorkoutSelectExerciseDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add Exercise</Button>
      </DrawerTrigger>
      <DrawerContent className="custom-drawer justify-self-center p-4">
        <DrawerHeader>
          <DrawerTitle className="text-center text-3xl">Exercises</DrawerTitle>
          <DrawerDescription className="hidden">
            Exercise Selection
          </DrawerDescription>
          <Separator className="h-1" />
        </DrawerHeader>
        <Exercises mode="select" />
        <DrawerFooter>
          <DrawerClose>
            <Button variant={"secondary"}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
