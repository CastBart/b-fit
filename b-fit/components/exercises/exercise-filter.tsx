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
      <DialogTrigger asChild>
        <Button variant="outline">{title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{`${title} Filters`}</DialogTitle>
          {data.map((item) => (
            <div className="flex gap-2 items-center h-9 px-4 py-2 text-center rounded-sm bg-primary text-primary-foreground shadow hover:bg-primary/90">
              <Checkbox
                key={String(item)}
                checked={selectedItems.includes(item)}
                onCheckedChange={() => toggleSelection(item)}
                onSelect={(e) => e.preventDefault()}
                id={String(item)}
                className="border-primary-foreground"
              />
              <label className="w-full " htmlFor={String(item)}>
                {String(item)}
              </label>
            </div>
          ))}
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
