"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
} from "@/lib/definitions";

interface ExerciseFilterProps {
  numOfExercises: number;
  setFilters: (filters: {
    equipment: ExerciseEquipment[];
    muscle: MuscleGroup[];
    type: ExerciseType[];
  }) => void;
}

export default function ExerciseFilters({
  numOfExercises,
  setFilters,
}: ExerciseFilterProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<
    ExerciseEquipment[]
  >([]);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup[]>([]);
  const [selectedType, setSelectedType] = useState<ExerciseType[]>([]);
  const hasFilters =
    selectedEquipment.length > 0 ||
    selectedMuscle.length > 0 ||
    selectedType.length > 0;

  // ✅ useEffect ensures filters update **AFTER** state changes
  useEffect(() => {
    setFilters({
      equipment: selectedEquipment,
      muscle: selectedMuscle,
      type: selectedType,
    });
  }, [selectedEquipment, selectedMuscle, selectedType, setFilters]);

  // Toggle selection for multi-select
  const toggleSelection = <
    T extends ExerciseEquipment | MuscleGroup | ExerciseType,
  >(
    selectedList: T[],
    setSelected: React.Dispatch<React.SetStateAction<T[]>>,
    value: T
  ) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  // Clear all filters
  const clearFilters = () => {
    setSelectedEquipment([]);
    setSelectedMuscle([]);
    setSelectedType([]);
  };
  return (
    <DropdownMenu>
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground">{`${numOfExercises} exercises`}</div>
        <div className="flex gap-2 items-center text-primary">
          {hasFilters && <XMarkIcon onClick={clearFilters} className="w-5 h-5 hover:cursor-pointer" />}
          <DropdownMenuTrigger>
            <div className="flex gap-2 justify-end items-center">
              Filters
              <FunnelIcon className="w-5 h-5" />
            </div>
          </DropdownMenuTrigger>
        </div>
      </div>
      <DropdownMenuContent
        className="w-full"
        side={"bottom"}
        sideOffset={10}
        align={"end"}
      >
        <DropdownMenuLabel className="">Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Equipment Filter */}
        <DropdownMenuGroup>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full text-left p-1">
              Equipment
            </DropdownMenuTrigger>
            <DropdownMenuContent side={"left"} sideOffset={10} align={"start"} className="">
              {Object.values(ExerciseEquipment).map((equip) => (
                <DropdownMenuCheckboxItem
                  key={equip}
                  checked={selectedEquipment.includes(equip)}
                  onCheckedChange={() =>
                    toggleSelection(
                      selectedEquipment,
                      setSelectedEquipment,
                      equip
                    )
                  }
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  {equip}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuGroup>

        {/* Muscle Filter */}
        <DropdownMenuGroup>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full text-left p-1">
              Muscle
            </DropdownMenuTrigger>
            <DropdownMenuContent side={"left"} sideOffset={10} align={"start"}>
              {Object.values(MuscleGroup).map((musc) => (
                <DropdownMenuCheckboxItem
                  key={musc}
                  checked={selectedMuscle.includes(musc)}
                  onCheckedChange={() =>
                    toggleSelection(selectedMuscle, setSelectedMuscle, musc)
                  }
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  {musc}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuGroup>

        {/* Exercise Type Filter */}
        <DropdownMenuGroup>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full text-left p-1">
              Exercise Type
            </DropdownMenuTrigger>
            <DropdownMenuContent side={"left"} sideOffset={10} align={"start"}>
              {Object.values(ExerciseType).map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedType.includes(type)}
                  onCheckedChange={() =>
                    toggleSelection(selectedType, setSelectedType, type)
                  }
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
