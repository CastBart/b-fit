import { v4 as uuidv4 } from "uuid";
import { ExerciseNode } from "./exercise-linked-list";

type SupersetGroup = {
  id: string;
  exercises: ExerciseNode[];
};

export class SupersetManager {
  private groups: Record<string, SupersetGroup> = {};

  createGroup(nodes: ExerciseNode[]) {
    if (nodes.length < 2) return; // no point creating for 1

    const id = uuidv4();

    nodes.forEach((node) => {
      node.supersetGroupId = id;
    });

    this.groups[id] = {
      id,
      exercises: [...nodes],
    };
  }
  addToGroup(target: ExerciseNode, newNode: ExerciseNode) {
    const groupId = target.supersetGroupId;
    if (!groupId || !this.groups[groupId]) return;
  
    const group = this.groups[groupId];
  
    // Prevent adding duplicates
    const alreadyInGroup = group.exercises.some(
      (n) => n.instanceId === newNode.instanceId
    );
    if (alreadyInGroup) return;
  
    newNode.supersetGroupId = groupId;
    group.exercises.push(newNode);
  }

  getGroupById(id: string): SupersetGroup | null {
    return this.groups[id] ?? null;
  }

  getGroupForNode(node: ExerciseNode): ExerciseNode[] {
    if (!node.supersetGroupId) return [];
    return this.groups[node.supersetGroupId]?.exercises ?? [];
  }

  removeFromGroup(node: ExerciseNode) {
    const groupId = node.supersetGroupId;
    if (!groupId) return;

    const group = this.groups[groupId];
    if (!group) return;

    group.exercises = group.exercises.filter(
      (n) => n.instanceId !== node.instanceId
    );
    node.supersetGroupId = null;

    // Optionally delete the group if it's too small to be a superset
    if (group.exercises.length < 2) {
      group.exercises.forEach((n) => (n.supersetGroupId = null));
      delete this.groups[groupId];
    }
  }

  deleteGroup(groupId: string) {
    const group = this.groups[groupId];
    if (!group) return;

    group.exercises.forEach((n) => (n.supersetGroupId = null));
    delete this.groups[groupId];
  }
}
