"use client";

import { useWorkout } from "@/hooks/queries/use-workout";
import { notFound } from "next/navigation";
import { ExerciseNode } from "@/lib/exercise-linked-list";
import WorkoutForm from "@/components/workouts/workout-form";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { ExerciseEquipment, ExerciseType, getEnumValueByKey, getEnumValuesByKeys, MuscleGroup } from "@/lib/definitions";

export default function WorkoutDetailsClient({ workoutId }: { workoutId: string }) {
  const { data, isLoading } = useWorkout(workoutId);

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
  // first pass - create nodes after db fetch
  for (const workoutExercise of workout.exercises) {
    const node: ExerciseNode = {
      id: workoutExercise.exercise.id,
      instanceId: workoutExercise.id,
      name: workoutExercise.exercise.name,
      equipment: getEnumValueByKey(ExerciseEquipment, workoutExercise.exercise.equipment) ,
      primaryMuscle: getEnumValueByKey(MuscleGroup, workoutExercise.exercise.primaryMuscle),
      auxiliaryMuscles: getEnumValuesByKeys(MuscleGroup, workoutExercise.exercise.auxiliaryMuscles),
      type: getEnumValueByKey(ExerciseType, workoutExercise.exercise.exerciseType),
      next: null,
      prev: null,
      supersetGroupId: workoutExercise.supersetGroupId || null,
    };
    // find head
    exerciseMap[workoutExercise.id] = node;
    if (!workoutExercise.previousId) {
      head = node;
    }
  }
  // second pass - link nodes
  for (const workoutExercise of workout.exercises) {
    const current = exerciseMap[workoutExercise.id];
    if (workoutExercise.nextId) {
      const nextNode = exerciseMap[workoutExercise.nextId];
      current.next = nextNode;
      nextNode.prev = current; // set the reverse link
    }
  }

  return (
    <div className="max-w-2xl mx-auto  space-y-6">
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
