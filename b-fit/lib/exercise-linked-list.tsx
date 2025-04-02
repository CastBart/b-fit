import { v4 as uuidv4 } from "uuid";

export class ExerciseNode {
  id: string; // Exercise ID
  instanceId: string; // Unique per instance
  name: string;
  equipment: string;
  primaryMuscle: string;
  auxiliaryMuscles: string[];
  type: string;
  next: ExerciseNode | null = null;

  constructor(exercise: Omit<ExerciseNode, "next" | "instanceId">) {
    this.id = exercise.id;
    this.instanceId = uuidv4(); // ✅ Generate unique ID
    this.name = exercise.name;
    this.equipment = exercise.equipment;
    this.primaryMuscle = exercise.primaryMuscle;
    this.auxiliaryMuscles = exercise.auxiliaryMuscles;
    this.type = exercise.type;
  }
}
