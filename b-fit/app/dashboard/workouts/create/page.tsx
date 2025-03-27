"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Exercise } from "@/lib/definitions";
import { WorkoutSchema } from "@/schemas";
import WorkoutSelectExerciseDrawer from "@/components/workouts/workout-select-exercise-drawer";

export default function CreateWorkout() {
  const form = useForm<z.infer<typeof WorkoutSchema>>({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: { name: "", description: "", exercises: [] },
  });

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  function handleExerciseSelect(newExercises: Exercise[]) {
    setSelectedExercises((prev) => [...prev, ...newExercises]); // ✅ Allow duplicates
  }

  function onSubmit(values: z.infer<typeof WorkoutSchema>) {
    toast.success("Workout created!", {
      description: `Workout "${values.name}" has been saved.`,
    });
    console.log("Workout Data:", { ...values, exercises: selectedExercises });
    form.reset();
    setSelectedExercises([]); // Reset selected exercises after submitting
  }

  return (
    <div className="max-w-[600px] mx-auto p-6 overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workout Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter workout name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe your workout (optional)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <WorkoutSelectExerciseDrawer
            onExerciseSelect={handleExerciseSelect}
          />
          {selectedExercises.length > 0 ? (
            <div className="p-2 border rounded-lg">
              <div className="overflow-y-auto custom-scrollbar max-h-[calc(100vh-460px)]">
                <Table className="">
                  <TableCaption>Selected exercises</TableCaption>
                  <TableBody className="">
                    {selectedExercises.map((exercise, index) => (
                      <TableRow
                        key={index} // ✅ Uses index instead of `exercise.id` to allow duplicates
                        className="w-full"
                      >
                        <TableCell className="w-full flex justify-between items-center ">
                          <div className="">
                            <div className="text-lg font-semibold">
                              {exercise.name}
                            </div>
                            <span className="text-muted-foreground">
                              {exercise.equipment}
                            </span>
                          </div>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              setSelectedExercises((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            ""
          )}
          <Button type="submit" className="w-full">
            Create Workout
          </Button>
        </form>
      </Form>
    </div>
  );
}
