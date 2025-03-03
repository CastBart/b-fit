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
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
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

export default function ExerciseFilter({
  numOfExercises,
  setFilters,
}: ExerciseFilterProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<ExerciseEquipment[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup[]>([]);
  const [selectedType, setSelectedType] = useState<ExerciseType[]>([]);

  

  // Toggle selection for multi-select
  const toggleSelection = <T extends ExerciseEquipment | MuscleGroup | ExerciseType>(
    selectedList: T[],
    setSelected: React.Dispatch<React.SetStateAction<T[]>>,
    value: T
  ) => {
    setSelected((prev) => {
      const updatedSelection = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      // Update filters after modifying the selected state
      setFilters({
        equipment: value in ExerciseEquipment ? updatedSelection as ExerciseEquipment[] : selectedEquipment,
        muscle: value in MuscleGroup ? updatedSelection as MuscleGroup[] : selectedMuscle,
        type: value in ExerciseType ? updatedSelection as ExerciseType[] : selectedType,
      });

      return updatedSelection;
    });
  };

  // Utility function to handle filtering by type
  const filterByType = <T,>(
    selectedList: T[],
    setSelected: React.Dispatch<React.SetStateAction<T[]>>,
    value: T,
    typeEnum: Record<string, T>
  ): T[] => {
    const newSelection = selectedList.includes(value)
      ? selectedList.filter((item) => item !== value)
      : [...selectedList, value];

    setSelected(newSelection);
    return newSelection;
  };


  // Update filters
  const handleFilterChange = () => {
    setFilters({
      equipment: selectedEquipment,
      muscle: selectedMuscle,
      type: selectedType,
    });
  };

  return (
    <DropdownMenu>
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground">{`${numOfExercises} exercises`}</div>
        <DropdownMenuTrigger className="text-primary">
          <div className="flex gap-2 justify-end items-center">
            Filters
            <FunnelIcon className="w-5 h-5" />
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent
        className="w-full"
        side={"left"}
        sideOffset={10}
        align={"start"}
      >
        <DropdownMenuLabel className="text-center">Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Equipment Filter */}
        <DropdownMenuGroup>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full text-left p-1">
              Equipment
            </DropdownMenuTrigger>
            <DropdownMenuContent side={"left"} sideOffset={10} align={"start"}>
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
                    e.preventDefault()
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
                    toggleSelection(
                      selectedMuscle,
                      setSelectedMuscle,
                      musc
                    )
                  }
                  onSelect={(e) => {
                    e.preventDefault()
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
                    toggleSelection(
                      selectedType,
                      setSelectedType,
                      type
                    )
                  }
                  onSelect={(e) => {
                    e.preventDefault()
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
