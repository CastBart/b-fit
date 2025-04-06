"use client";

import { useWorkoutDetails } from "@/hooks/queries/use-workout-details";
import { notFound } from "next/navigation";
import { ExerciseNode } from "@/lib/exercise-linked-list";
import WorkoutForm from "@/components/workouts/workout-form";
import { Loader2 } from "lucide-react";

export default function WorkoutDetailsClient({ workoutId }: { workoutId: string }) {
  const { data, isLoading } = useWorkoutDetails(workoutId);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data?.success || !data.workout) return notFound();

  const { workout } = data;

  // Build the linked list
  let head: ExerciseNode | null = null;
  const exerciseMap: Record<string, ExerciseNode> = {};

  for (const workoutExercise of workout.exercises) {
    const node: ExerciseNode = {
      id: workoutExercise.exercise.id,
      instanceId: workoutExercise.id,
      name: workoutExercise.exercise.name,
      equipment: workoutExercise.exercise.equipment,
      primaryMuscle: workoutExercise.exercise.primaryMuscle,
      auxiliaryMuscles: workoutExercise.exercise.auxiliaryMuscles,
      type: workoutExercise.exercise.exerciseType,
      next: null,
    };

    exerciseMap[workoutExercise.id] = node;
    if (!workoutExercise.previousId) {
      head = node;
    }
  }

  for (const workoutExercise of workout.exercises) {
    if (workoutExercise.nextId) {
      exerciseMap[workoutExercise.id].next = exerciseMap[workoutExercise.nextId];
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <WorkoutForm
        mode="edit"
        workoutId={workout.id}
        workoutHead={head}
        defaultName={workout.name}
        defaultDescription={workout.description || ""}
      />
    </div>
  );
}
