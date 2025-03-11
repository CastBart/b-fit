import * as z from "zod";
import {
  ExerciseEquipment,
  ExerciseType,
  MuscleGroup,
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
  auxiliaryMuscles: z.array(z.nativeEnum(MuscleGroup)).nonempty({
    message: "At least one auxiliary muscle must be selected",
  }),
  exerciseType: z
    .union([z.nativeEnum(ExerciseType), z.literal("")])
    .refine((val) => val !== "", {
      message: "Exercise type selection is required",
    }),
});
