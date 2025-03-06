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

interface ExerciseFilterProps<T> {
  title: string;
  data: T[];
  selectedItems: T[];
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function ExerciseFilter<
  T extends ExerciseEquipment | MuscleGroup | ExerciseType,
>({ title, data, selectedItems, setSelectedItems }: ExerciseFilterProps<T>) {
  const toggleSelection = (value: T) => {
    setSelectedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild className="grow">
        <Button variant="default" className="text-xl">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-center">{`${title} Filters`}</DialogTitle>
          <Separator className="h-1" />
          <div className="max-h-[600px] grid grid-cols-2 gap-2 p-2 overflow-y-auto custom-scrollbar">
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
        </DialogHeader>
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
