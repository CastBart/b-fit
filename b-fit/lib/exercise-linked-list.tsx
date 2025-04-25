import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { WorkoutSchema } from "@/schemas";

export type ExerciseNode = {
  id: string;
  instanceId: string;
  name: string;
  equipment: string;
  primaryMuscle: string;
  auxiliaryMuscles: string[];
  type: string;
  next: ExerciseNode | null;
  prev: ExerciseNode | null;
};

type ExerciseBaseData = Omit<ExerciseNode, "instanceId" | "next" | "prev">;

export function createExerciseNode(data: ExerciseBaseData): ExerciseNode {
  return {
    ...data,
    instanceId: uuidv4(),
    next: null,
    prev: null,
  };
}

export function getLinkedExerciseArray(
  node: ExerciseNode | null
): z.infer<typeof WorkoutSchema>["exercises"] {
  const exercises = [];

  while (node) {
    exercises.push({
      exerciseID: node.id,
      prevId: node.prev ? node.prev.instanceId : undefined,
      nextId: node.next ? node.next.instanceId : undefined,
    });

    node = node.next;
  }

  return exercises;
}
