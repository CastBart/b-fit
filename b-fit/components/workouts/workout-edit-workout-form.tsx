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
import { toast } from "sonner";
import { createExerciseNode, ExerciseNode } from "@/lib/exercise-linked-list";
import { WorkoutSchema } from "@/schemas";
import WorkoutSelectExerciseDrawer from "@/components/workouts/workout-add-exercise-drawer";
import SelectedExercisesList from "@/components/workouts/workout-selected-exercises";
import { Exercise } from "@/lib/definitions";

interface EditWorkoutFormProps {
  workoutHead: ExerciseNode | null;
  workoutName: string;
  workoutDescription: string | undefined;
}

export default function EditWorkoutForm({
  workoutHead,
  workoutName,
  workoutDescription,
}: EditWorkoutFormProps) {
  // Convert workoutHead (linked list) into an array of exercises for form default values
  function getLinkedExerciseArray(node: ExerciseNode | null) {
    const exercises = [];
    let prevNode: ExerciseNode | null = null;
    while (node) {
      exercises.push({
        exerciseID: node.id,
        prevId: prevNode ? prevNode.instanceId : undefined,
        nextId: node.next ? node.next.instanceId : undefined,
      });
      prevNode = node;
      node = node.next;
    }
    return exercises;
  }

  const form = useForm<z.infer<typeof WorkoutSchema>>({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: {
      name: workoutName,
      description: workoutDescription,
      exercises: getLinkedExerciseArray(workoutHead), // Set exercises default values here
    },
  });

  const [isPending, startTransition] = useTransition();
  const [head, setHead] = useState<ExerciseNode | null>(workoutHead);

  function handleExerciseSelect(newExercises: Exercise[]) {
    const newNodes = newExercises.map((exercise) =>
      createExerciseNode({
        id: exercise.id,
        name: exercise.name,
        equipment: exercise.equipment,
        primaryMuscle: exercise.primaryMuscle,
        auxiliaryMuscles: exercise.auxiliaryMuscles,
        type: exercise.type,
      })
    );

    // Link new nodes together
    for (let i = 0; i < newNodes.length - 1; i++) {
      newNodes[i].next = newNodes[i + 1];
    }

    if (!head) {
      setHead(newNodes[0]);
    } else {
      let lastNode = head;
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      lastNode.next = newNodes[0];

      // 👇 This line forces React to detect a change and re-render
      setHead({ ...head });
    }
  }

  function onSubmit(values: z.infer<typeof WorkoutSchema>) {
    startTransition(async () => {
      const response = await createWorkout({
        ...values,
        exercises: getLinkedExerciseArray(head),
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
        setHead(null);
      }
    });
  }

  return (
    <div className="max-w-[600px] mx-auto p-6 overflow-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="edit-workout-form"
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
      <SelectedExercisesList head={head} setHead={setHead} form={form} />

      {form.formState.errors.exercises && (
        <p className="text-sm text-destructive">
          {form.formState.errors.exercises.message}
        </p>
      )}

      <Button
        type="submit"
        form="edit-workout-form"
        className="w-full"
        onClick={() => {
          form.setValue("exercises", getLinkedExerciseArray(head), {
            shouldValidate: true,
          });
        }}
      >
        Save Workout
      </Button>
    </div>
  );
}
