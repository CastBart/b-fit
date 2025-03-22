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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "../ui/separator";
import { Exercise } from "@/lib/definitions";
import { useState, useEffect } from "react";
import ExerciseDetailsInfo from "./exercise-details-info";
import ExerciseDetailsHistory from "./exercise-details-history";

interface ExerciseDetailsDrawerProps {
  index: number;
  exercise: Exercise;
}

export function ExerciseDetailsDrawer({
  index,
  exercise,
}: ExerciseDetailsDrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <DrawerTrigger asChild className="w-full">
        <TableRow key={index} id={`exercise-table-row-${exercise.id}`}>
          <TableCell className="w-full">
            <div className="text-lg font-semibold">{exercise.name}</div>
            <span className="text-muted-foreground">{exercise.equipment}</span>
          </TableCell>
        </TableRow>
      </DrawerTrigger>
      <DrawerContent
        className="custom-drawer justify-self-center"
        id="exercise-details-drawer-content"
      >
        <DrawerHeader>
          <div className="flex flex-col gap-2">
            <DrawerTitle
              id="exercise-details-drawer-title"
              className="text-center text-3xl"
            >
              Exercise Details
            </DrawerTitle>
            <Separator className="h-1"></Separator>
          </div>
        </DrawerHeader>
        <Tabs defaultValue="info" className="px-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <ExerciseDetailsInfo exercise={exercise} />
          <ExerciseDetailsHistory />
        </Tabs>
        <DrawerFooter>
          <DrawerClose asChild id="exercise-filters-drawer-close">
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
