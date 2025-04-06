"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ExerciseEquipment,
  MuscleGroup,
  ExerciseType,
} from "@/lib/definitions";
import { Separator } from "../ui/separator";
import { DialogDescription } from "@radix-ui/react-dialog";

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
        <Button className="text-xl">{title}</Button>
      </DialogTrigger>
      <DialogContent
        className="custom-dialog"
        id={`${title.toLowerCase().replace(/ /g, "-")}-dialog-content`}
      >
        <DialogHeader className="gap-2">
          <DialogTitle
            className="text-center"
            id={`${title.toLowerCase().replace(/ /g, "-")}-dialog-title`}
          >{`${title} Filters`}</DialogTitle>
          <DialogDescription className="hidden">Use the options below to filter by exercise {title}</DialogDescription>
          <Separator className="h-1" />
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 max-h-[500px] px-2 overflow-y-auto custom-scrollbar">
          {data.map((item) => (
            <div
              key={String(item)}
              id={`${title
                .toLowerCase()
                .replace(/ /g, "-")}-filter-option-${String(
                item.toLocaleLowerCase().replace(/ /g, "-")
              )}`}
              onClick={() => toggleSelection(item)}
              className={`flex gap-2 items-center justify-center h-20 px-4 py-2 rounded-sm shadow cursor-pointer
              ${
                selectedItems.includes(item)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              } 
              hover:bg-primary/90`}
            >
              {String(item)}
            </div>
          ))}
        </div>
        <DialogFooter className="sm:justify-start px-2" id={`${title.toLowerCase().replace(/ /g, "-")}-dialog-footer`}>
          <DialogClose asChild className="w-full" id={`${title.toLowerCase().replace(/ /g, "-")}-dialog-close`}>
            <Button type="button" >
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
