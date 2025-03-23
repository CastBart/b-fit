import { Button } from "@/components/ui/button";
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
import { Separator } from "../ui/separator";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateExercise() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <div className="flex justify-end">
        <DrawerTrigger asChild>
          <Button>Create</Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className="custom-drawer justify-self-center">
        <DrawerHeader>
          <div className="flex flex-col gap-2">
            <DrawerTitle className="text-center text-3xl">
              Create Exercise
            </DrawerTitle>
            <DrawerDescription className="hidden">Create your own exercise</DrawerDescription>
            <Separator className="h-1"></Separator>
          </div>
        </DrawerHeader>
        <div className="grid gap-4 py-4 border p-2 rounded-md m-2">
          <div className="grid grid-cols-full items-center gap-4">
            <Input
              id="exercise_name"
              placeholder="Name"
              className="col-span-3 border-none focus-visible:ring-0 "
            />
          </div>
        </div>
        <DrawerFooter>
          <Button type="submit">Create</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
