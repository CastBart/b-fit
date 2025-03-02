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

export default function ExerciseFilter() {
    const {isMobile} = useSidebar()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full" >
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
