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
import { toast } from "sonner";
import Exercises from "@/components/exercises/exercises";
import { Exercise } from "@/lib/definitions";
import { WorkoutSchema } from "@/schemas";
import WorkoutSelectExerciseDrawer from "@/components/workouts/workout-select-exercise-drawer";

export default function CreateWorkout() {
  const form = useForm<z.infer<typeof WorkoutSchema>>({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: { name: "", description: "", exercises: [] },
  });

  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  function onSubmit(values: z.infer<typeof WorkoutSchema>) {
    toast.success("Workout created!", {
      description: `Workout "${values.name}" has been saved.`,
    });
    console.log("Workout Data:", values);
    form.reset();
    setSelectedExercises([]);
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
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

          {/* Description Input */}
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
          />

          {/* Exercise Selection */}
          <div className="space-y-2">
            <FormLabel>Selected Exercises</FormLabel>
            {selectedExercises.length === 0 ? (
              <p className="text-muted-foreground">No exercises selected.</p>
            ) : (
              <ul className="space-y-1">
                {selectedExercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="flex justify-between p-2 bg-secondary rounded"
                  >
                    {exercise.name}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        setSelectedExercises(
                          selectedExercises.filter((e) => e.id !== exercise.id)
                        )
                      }
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Exercise Selector */}
          <WorkoutSelectExerciseDrawer />
          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Workout
          </Button>
        </form>
      </Form>
    </div>
  );
}
