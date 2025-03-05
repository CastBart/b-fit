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
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
} from "@/lib/definitions";

import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Separator } from "../ui/separator";
import { useSidebar } from "../ui/sidebar";
import { useState, useEffect } from "react";


interface ExerciseFilterDrawerProps {
  numOfExercises: number;
  setFilters: (filters: {
    equipment: ExerciseEquipment[];
    muscle: MuscleGroup[];
    type: ExerciseType[];
  }) => void;
}

export function ExerciseFilterDrawer({
  numOfExercises,
  setFilters,
}: ExerciseFilterDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const { state } = useSidebar();
  console.log(state);
  const [selectedEquipment, setSelectedEquipment] = useState<ExerciseEquipment[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup[]>([]);
  const [selectedType, setSelectedType] = useState<ExerciseType[]>([]);
  const hasFilters = selectedEquipment.length > 0 || selectedMuscle.length > 0 || selectedType.length > 0;

  useEffect(() => {
    setFilters({
      equipment: selectedEquipment,
      muscle: selectedMuscle,
      type: selectedType,
    });
  }, [selectedEquipment, selectedMuscle, selectedType, setFilters]);

  const clearFilters = () => {
    setSelectedEquipment([]);
    setSelectedMuscle([]);
    setSelectedType([]);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={false}>
      <DrawerTrigger asChild>
        <div className="flex gap-2 justify-end items-center hover:cursor-pointer text-primary">
          Filters
          <FunnelIcon className="w-5 h-5" />
        </div>
      </DrawerTrigger>
      <DrawerContent className={`h-[80vh] w-[600px] justify-self-center `}>
        <DrawerHeader className="gap-4">
          <DrawerTitle className="text-center text-3xl">Filters</DrawerTitle>
          <Separator className="h-1"></Separator>
          <ExerciseFilter
            title="Equipment"
            data={Object.values(ExerciseEquipment)}
            selectedItems={selectedEquipment}
            setSelectedItems={setSelectedEquipment}
          />
          <ExerciseFilter
            title="Muscle Group"
            data={Object.values(MuscleGroup)}
            selectedItems={selectedMuscle}
            setSelectedItems={setSelectedMuscle}
          />
          <ExerciseFilter
            title="Exercise Type"
            data={Object.values(ExerciseType)}
            selectedItems={selectedType}
            setSelectedItems={setSelectedType}
          />
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
