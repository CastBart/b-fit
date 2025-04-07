"use client";

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
import { createWorkout } from "@/actions/create-workout";
import { updateWorkout } from "@/actions/update-workout";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useWorkout } from "@/hooks/queries/use-workout";
import { useWorkouts } from "@/hooks/queries/use-workouts";

type WorkoutFormProps = {
  mode: "create" | "edit";
  workoutId?: string;
  defaultName?: string;
  defaultDescription?: string;
  workoutHead?: ExerciseNode | null;
};

export default function WorkoutForm({
  mode,
  workoutId,
  defaultName = "",
  defaultDescription = "",
  workoutHead = null,
}: WorkoutFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [head, setHead] = useState<ExerciseNode | null>(workoutHead);
  const workoutQuery = useWorkout(workoutId ?? "");
  const { createWorkout, isCreating } = useWorkouts();

  const form = useForm<z.infer<typeof WorkoutSchema>>({
    resolver: zodResolver(WorkoutSchema),
    defaultValues: {
      name: defaultName,
      description: defaultDescription,
      exercises: getLinkedExerciseArray(workoutHead),
    },
  });

  function getLinkedExerciseArray(
    node: ExerciseNode | null
  ): z.infer<typeof WorkoutSchema>["exercises"] {
    const exercises = [];
    let prevNode: ExerciseNode | null = null;
    while (node) {
      exercises.push({
        exerciseID: node.id,
        prevId: prevNode ? prevNode.id : undefined,
        nextId: node.next ? node.next.id : undefined,
      });
      prevNode = node;
      node = node.next;
    }
    return exercises;
  }

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
      setHead({ ...head });
    }
  }

  function handleSubmit(values: z.infer<typeof WorkoutSchema>) {
    startTransition(async () => {
      const linkedExercises = getLinkedExerciseArray(head);
  
      const workoutData = {
        ...values,
        exercises: linkedExercises,
      };
  
      if (mode === "create") {
        await new Promise<void>((resolve) => {
          createWorkout(workoutData, {
            onSuccess: () => {
              resolve();
              router.push("/dashboard/workouts");
            },
            onError: () => {
              resolve(); // Still resolve to exit transition on failure
            },
          });
        });
      } else if (mode === "edit" && workoutId) {
        workoutQuery?.handleUpdate(workoutData);
        router.push("/dashboard/workouts");
      }
    });
  }
  

  return (
    <div className="max-w-[600px] mx-auto p-6 overflow-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
          id={`${mode}-workout-form`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Workout Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter workout name"
                    className="border-none pl-0 text-2xl md:text-2xl sm:text-2xl lg:text-2xl focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring"
                  />
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
                <FormLabel className="hidden">Description</FormLabel>
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

      {form.formState.errors.exercises && (
        <p className="text-sm text-destructive">
          {form.formState.errors.exercises.message}
        </p>
      )}

      <SelectedExercisesList head={head} setHead={setHead} form={form} />

      <Button
        type="submit"
        form={`${mode}-workout-form`}
        className="w-full"
        onClick={() => {
          form.setValue("exercises", getLinkedExerciseArray(head), {
            shouldValidate: true,
          });
        }}
        disabled={isPending || isCreating}
      >
        {isPending || isCreating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            {mode === "create" ? "Creating..." : "Updating..."}
          </>
        ) : mode === "create" ? (
          "Create Workout"
        ) : (
          "Update Workout"
        )}
      </Button>
    </div>
  );
}
