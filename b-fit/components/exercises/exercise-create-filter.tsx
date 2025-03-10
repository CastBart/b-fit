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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, Control } from "react-hook-form";

interface ExerciseFilterProps<T> {
  title: string;
  data: T[];
  name: string;
  control: Control<any>;
  singleSelect?: boolean;
}

export default function ExerciseCreateFilter<T extends string>({
  title,
  data,
  name,
  control,
  singleSelect = false,
}: ExerciseFilterProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {field.value && field.value.length > 0
                      ? Array.isArray(field.value)
                        ? field.value.join(", ")
                        : field.value
                      : `Select ${title}`}
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="custom-dialog">
                <DialogHeader className="gap-2">
                  <DialogTitle className="text-center">{`${title}`}</DialogTitle>
                  <Separator className="h-1" />
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2 max-h-[500px] p-2 overflow-y-auto custom-scrollbar">
                  {data.map((item) => (
                    <div
                      key={String(item)}
                      onClick={() =>
                        field.onChange((prev: T[]) => {
                          const newSelection = singleSelect
                            ? item
                            : prev.includes(item)
                              ? prev.filter((i) => i !== item)
                              : [...prev, item];

                          return newSelection;
                        })
                      }
                      className="flex gap-2 items-center justify-center h-20 px-4 py-2 rounded-sm bg-primary text-primary-foreground shadow hover:bg-primary/90 cursor-pointer"
                    >
                      <Checkbox
                        checked={
                          singleSelect
                            ? field.value === item
                            : field.value.includes(item)
                        }
                        onCheckedChange={() =>
                          field.onChange((prev: T[]) => {
                            const newSelection = singleSelect
                              ? item
                              : prev.includes(item)
                                ? prev.filter((i) => i !== item)
                                : [...prev, item];

                            return newSelection;
                          })
                        }
                        id={String(item)}
                        className="border-primary-foreground"
                      />
                      <label
                        className="w-full cursor-pointer"
                        htmlFor={String(item)}
                      >
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
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
