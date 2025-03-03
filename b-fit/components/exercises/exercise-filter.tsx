import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../ui/sidebar";
import { number } from "zod";

interface ExerciseFilterProps {
  numOfExercises: number;
}

export default function ExerciseFilter({
  numOfExercises,
}: ExerciseFilterProps) {
  const { isMobile } = useSidebar();
  return (
    <DropdownMenu>
      <div className="flex justify-between items-center ">
        <div className="text-muted-foreground">{`${numOfExercises} exercises`}</div>
        <DropdownMenuTrigger className="text-primary">
          <div className="flex gap-2 justify-end items-center">
            Filters
            <FunnelIcon className="w-5 h-5" />
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-full">
        <DropdownMenuLabel className="text-center">Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Equipment
          <DropdownMenuShortcut>🔗</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Muscle
          <DropdownMenuShortcut>💪🏽</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Type
          <DropdownMenuShortcut>🏋🏽‍♂️</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

