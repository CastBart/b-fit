import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { WorkoutSchema } from "@/schemas";
import { ExerciseEquipment, ExerciseType, MuscleGroup } from "./definitions";

export type ExerciseNode = {
  id: string;
  instanceId: string;
  name: string;
  equipment: ExerciseEquipment;
  primaryMuscle: MuscleGroup;
  auxiliaryMuscles: MuscleGroup[];
  type: ExerciseType;
  next: ExerciseNode | null;
  prev: ExerciseNode | null;
  supersetGroupId: string | null;
};

export type FlattenedExerciseNode = Omit<ExerciseNode, "next" | "prev"> & {
  next: string | null;
  prev: string | null;
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

export function createFlattenedExerciseNode(
  data: ExerciseBaseData
): FlattenedExerciseNode {
  return {
    ...data,
    instanceId: uuidv4(),
    next: null,
    prev: null,
  };
}

export function flattenExerciseNodeList(
  head: ExerciseNode
): Record<string, FlattenedExerciseNode> {
  const map: Record<string, FlattenedExerciseNode> = {};
  let current: ExerciseNode | null = head;

  while (current) {
    map[current.instanceId] = {
      ...current,
      next: current.next?.instanceId || null,
      prev: current.prev?.instanceId || null,
    };
    current = current.next;
  }

  return map;
}
export function unFlattenExerciseNodeList(
  flattenedMap: Record<string, FlattenedExerciseNode>,
  headId: string
): ExerciseNode {
  const nodeMap: Record<string, ExerciseNode> = {};

  // Create all nodes first (no links yet)
  for (const id in flattenedMap) {
    const flat = flattenedMap[id];
    nodeMap[id] = {
      ...flat,
      next: null,
      prev: null,
    };
  }

  // Now link them
  for (const id in nodeMap) {
    const flat = flattenedMap[id];
    if (flat.next) nodeMap[id].next = nodeMap[flat.next];
    if (flat.prev) nodeMap[id].prev = nodeMap[flat.prev];
  }

  return nodeMap[headId]; // return the head of the linked list
}

export function getHeadNode(node: ExerciseNode): ExerciseNode {
  let current = node;
  while (current.prev) {
    current = current.prev;
  }
  return current;
}

export function getLinkedExerciseArray(
  node: ExerciseNode | null
): {
  exerciseID: string;
  instanceId: string;
  prevId?: string;
  nextId?: string;
  supersetGroupId?: string;
}[] {
  const exercises = [];

  while (node) {
    exercises.push({
      exerciseID: node.id, // real exercise id
      instanceId: node.instanceId, // temp instance id (uuidv4)
      prevId: node.prev ? node.prev.instanceId : undefined,
      nextId: node.next ? node.next.instanceId : undefined,
      supersetGroupId: node.supersetGroupId ? node.supersetGroupId : undefined,
    });

    node = node.next;
  }

  return exercises;
}
