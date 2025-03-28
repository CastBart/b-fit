"use client";
import { createWorkout } from "@/actions/create-workout";
import { useTransition, useState } from "react";
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

  const [isPending, startTransition] = useTransition();
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  function handleExerciseSelect(newExercises: Exercise[]) {
    const updatedExercises = [...selectedExercises, ...newExercises]; // ✅ Allow duplicates
    setSelectedExercises(updatedExercises);
    form.setValue("exercises", updatedExercises, { shouldValidate: true }); // ✅ Sync with form
  }

  function onSubmit(values: z.infer<typeof WorkoutSchema>) {
    if (selectedExercises.length === 0) {
      form.setError("exercises", {
        type: "manual",
        message: "At least one exercise is required",
      });
      return;
    }

    startTransition(async () => {
      const response = await createWorkout({
        ...values,
        exercises: selectedExercises,
      });

      if (response.error) {
        toast.error("Failed to create workout", {
          description: response.error,
        });
      } else {
        toast.success("Workout created!", {
          description: `Workout "${values.name}" has been saved.`,
        });
        form.reset();
        setSelectedExercises([]); // Reset selected exercises after submitting
      }
    });
  }

  return (
    <div className="max-w-[600px] mx-auto p-6 overflow-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="create-workout-form"
        >
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
          />
        </form>
      </Form>

      <WorkoutSelectExerciseDrawer onExerciseSelect={handleExerciseSelect} />

      {selectedExercises.length > 0 ? (
        <div className="p-2 border rounded-lg">
          <div className="overflow-y-auto custom-scrollbar max-h-[calc(100vh-460px)]">
            <Table>
              <TableCaption>Selected exercises</TableCaption>
              <TableBody>
                {selectedExercises.map((exercise, index) => (
                  <TableRow key={index} className="w-full">
                    <TableCell className="w-full flex justify-between items-center">
                      <div>
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
                        onClick={() => {
                          const updatedExercises = selectedExercises.filter(
                            (_, i) => i !== index
                          );
                          setSelectedExercises(updatedExercises);
                          form.setValue("exercises", updatedExercises, {
                            shouldValidate: true,
                          }); // ✅ Update form validation
                        }}
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

      {/* 🔹 Display validation message for exercises */}
      {form.formState.errors.exercises && (
        <p className="text-sm text-red-500">
          {form.formState.errors.exercises.message}
        </p>
      )}

      <Button
        type="submit"
        form="create-workout-form"
        className="w-full"
        onClick={() => {
          form.setValue("exercises", selectedExercises, {
            shouldValidate: true,
          });
          form.handleSubmit(onSubmit);
        }}
      >
        Create Workout
      </Button>
    </div>
  );
}
