"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
} from "@/lib/definitions";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

interface ExerciseFilterProps<T> {
  title: string;
  data: T[];
  selectedItems: T[];
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
  singleSelect?: boolean;
}

export default function ExerciseCreateFilter<
  T extends ExerciseEquipment | MuscleGroup | ExerciseType
>({
  title,
  data,
  selectedItems,
  setSelectedItems,
  singleSelect = false,
}: ExerciseFilterProps<T>) {
  const toggleSelection = (value: T) => {
    if (singleSelect) {
      // For single selection, just set the selected item
      setSelectedItems([value]);
    } else {
      // For multi selection, toggle the selected item
      setSelectedItems((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  return (
    <Dialog>
      <div>
        <Label htmlFor={`create_exercise_filter_${title.replace(" ", "_")}`}>
          {title}
        </Label>
        <DialogTrigger
          asChild
          className="grow"
          id={`create_exercise_filter_${title.replace(" ", "_")}`}
        >
          <Button className="w-full">
            <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
              {selectedItems.length > 0 ? selectedItems.join(", ") : title}
            </div>
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="custom-dialog">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-center">{`${title} Filters`}</DialogTitle>
          <Separator className="h-1" />
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 max-h-[500px] p-2 overflow-y-auto custom-scrollbar">
          {data.map((item) => (
            <div
              key={String(item)}
              onClick={() => toggleSelection(item)} // ✅ Clicking anywhere toggles
              className="flex gap-2 items-center justify-center h-20 px-4 py-2 rounded-sm bg-primary text-primary-foreground shadow hover:bg-primary/90 cursor-pointer"
            >
              <Checkbox
                checked={selectedItems.includes(item)}
                onCheckedChange={() => toggleSelection(item)}
                id={String(item)}
                className="border-primary-foreground"
              />
              <label className="w-full cursor-pointer" htmlFor={String(item)}>
                {String(item)}
              </label>
            </div>
          ))}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
