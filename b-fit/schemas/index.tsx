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
  password: z.string().min(6, { message: "Minumum 6 characters required" }),
});

// export const CreateExerciseSchema = z.object({
//   exerciseName: z.string().min(1, { message: "Exercise name is required" }),
//   equipment: z.nativeEnum(ExerciseEquipment, {
//     required_error: "Equipment is required",
//   }),
//   primaryMuscle: z.nativeEnum(MuscleGroup, {
//     required_error: "Primary muscle group is required",
//   }),
//   auxiliaryMuscles: z
//     .array(z.nativeEnum(MuscleGroup))
//     .optional()
//     .default([]),
//   exerciseType: z.nativeEnum(ExerciseType, {
//     required_error: "Exercise type is required",
//   }),
// });

export const CreateExerciseSchema = z.object({
  exerciseName: z.string().min(1, { message: "Exercise name is required" }),
  equipment: z.nativeEnum(ExerciseEquipment, {
    required_error: "Equipment selection is required",
  }),
  primaryMuscle: z.nativeEnum(MuscleGroup, {
    required_error: "Primary muscle selection is required",
  }),
  auxiliaryMuscles: z.array(z.nativeEnum(MuscleGroup)).nonempty({
    message: "At least one auxiliary muscle must be selected",
  }),
  exerciseType: z.nativeEnum(ExerciseType, {
    required_error: "Exercise type selection is required",
  }),
});

