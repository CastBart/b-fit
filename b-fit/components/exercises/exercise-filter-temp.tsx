import * as React from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
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
import ExerciseFilter from "./exercise-filter";

import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Separator } from "../ui/separator";
import { useSidebar } from "../ui/sidebar";

export function ExerciseFilterDrawerTemp() {
  const [open, setOpen] = React.useState(false);
  const {state} = useSidebar()
  console.log(state)

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <div className="flex gap-2 justify-end items-center hover:cursor-pointer text-primary">
          Filters
          <FunnelIcon className="w-5 h-5"/>
        </div>
      </DrawerTrigger>
      <DrawerContent className={`h-[80vh] w-[600px] justify-self-center `}>
        <DrawerHeader className="gap-4">
          <DrawerTitle className="text-center text-3xl">Filters</DrawerTitle>
          <Separator className="h-1"></Separator>
          <div>Equipment filter</div>
          <div>Muscle filter</div>
          <div>Exercises Type filter</div>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
