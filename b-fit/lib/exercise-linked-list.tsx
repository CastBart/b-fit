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
  supersetGroupId: string | null;
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
): { exerciseID: string; instanceId: string; prevId?: string; nextId?: string; supersetGroupId?: string }[] {
  const exercises = [];

  while (node) {
    exercises.push({
      exerciseID: node.id,            // real exercise id
      instanceId: node.instanceId,    // temp instance id (uuidv4)
      prevId: node.prev ? node.prev.instanceId : undefined,
      nextId: node.next ? node.next.instanceId : undefined,
      supersetGroupId: node.supersetGroupId ? node.supersetGroupId : undefined,
    });

    node = node.next;
  }

  return exercises;
}

