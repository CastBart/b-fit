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
import { ExerciseNode } from "@/lib/exercise-linked-list";
import { WorkoutSchema } from "@/schemas";
import WorkoutSelectExerciseDrawer from "@/components/workouts/workout-add-exercise-drawer";
import SelectedExercisesList from "@/components/workouts/workout-selected-exercises";
import { Exercise } from "@/lib/definitions";

export default function CreateWorkoutForm() {
  const form = useForm<z.infer<typeof WorkoutSchema>>({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: { name: "", description: "", exercises: [] },
  });

  const [isPending, startTransition] = useTransition();
  const [head, setHead] = useState<ExerciseNode | null>(null);

  function handleExerciseSelect(newExercises: Exercise[]) {
    console.log("Confirmed Exercise List Received:", newExercises);

    const newNodes = newExercises.map((exercise) => new ExerciseNode(exercise));
    console.log("New Exercise Nodes: ", newNodes);

    if (!head) {
      setHead(newNodes[0]); // Set the first node as head
    } else {
      let lastNode = head;
      while (lastNode.next) {
        lastNode = lastNode.next;
      }
      lastNode.next = newNodes[0]; // Link the new nodes to the last node
    }

    // Ensure all new nodes are properly linked
    for (let i = 0; i < newNodes.length - 1; i++) {
      newNodes[i].next = newNodes[i + 1];
    }

    setHead((prevHead) => prevHead ?? newNodes[0]); // Ensure state updates properly
  }

  function getExerciseArray(
    node: ExerciseNode | null
  ): { id: string; name: string }[] {
    const exercises = [];
    while (node) {
      exercises.push({ id: node.id, name: node.name }); // ✅ Extract only id & name
      node = node.next;
    }
    return exercises;
  }

  function onSubmit(values: z.infer<typeof WorkoutSchema>) {

    startTransition(async () => {
      const response = await createWorkout({
        ...values,
        exercises: getExerciseArray(head),
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
      <SelectedExercisesList head={head} setHead={setHead} form={form} />

      {/* 🔹 Display validation message for exercises */}
      {form.formState.errors.exercises && (
        <p className="text-sm text-destructive">
          {form.formState.errors.exercises.message}
        </p>
      )}

      <Button
        type="submit"
        form="create-workout-form"
        className="w-full"
        onClick={() => {
          form.setValue("exercises", getExerciseArray(head), {
            shouldValidate: true,
          });
        }}
      >
        Create Workout
      </Button>
    </div>
  );
}
