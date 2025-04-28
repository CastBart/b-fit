import * as z from "zod";
import {
  ExerciseEquipment,
  ExerciseType,
  MuscleGroup,
  WorkoutExercise,
} from "@/lib/definitions";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Minumum 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(3, { message: "Minumum 3 characters required" }),
});

export const CreateExerciseSchema = z.object({ 
  exerciseName: z.string().min(1, { message: "Exercise name is required" }),
  equipment: z
    .union([z.nativeEnum(ExerciseEquipment), z.literal("")])
    .refine((val) => val !== "", {
      message: "Equipment selection is required",
    }),
  primaryMuscle: z
    .union([z.nativeEnum(MuscleGroup), z.literal("")])
    .refine((val) => val !== "", {
      message: "Primary muscle selection is required",
    }),
  auxiliaryMuscles: z.array(z.nativeEnum(MuscleGroup)).default([]), // Optional
  exerciseType: z
    .union([z.nativeEnum(ExerciseType), z.literal("")])
    .refine((val) => val !== "", {
      message: "Exercise type selection is required",
    }),
});


const WorkoutExerciseSchema = z.object({
  exerciseID: z.string(),
  nextId: z.string().optional(),
  prevId: z.string().optional(),
  instanceId: z.string(),
  supersetGroupId: z.string().optional(),
});

// Define WorkoutSchema
export const WorkoutSchema = z.object({
  name: z.string().min(3, "Workout name must be at least 3 characters"),
  description: z.string().optional(),
  exercises: z.array(WorkoutExerciseSchema).min(1, "At least one exercise must be selected"),
});

