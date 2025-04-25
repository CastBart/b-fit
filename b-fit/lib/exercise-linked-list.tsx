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
};

type ExerciseBaseData = Omit<ExerciseNode, "instanceId" | "next">;

export function createExerciseNode(data: ExerciseBaseData): ExerciseNode {
  return {
    ...data,
    instanceId: uuidv4(),
    next: null,
  };
}

export function getLinkedExerciseArray(
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
