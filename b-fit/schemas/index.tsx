import * as z from "zod";

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

export const ExerciseSchema = z.object({
  name: z.string().min(1, { message: "Exercise name is required" }),
  equipment: z.array(z.string()).min(1, { message: "At least one equipment is required" }),
  primaryMuscle: z.string().min(1, { message: "Primary muscle is required" }),
  auxiliaryMuscles: z.array(z.string()).optional(),
  exerciseType: z.string().min(1, { message: "Exercise type is required" }),
});
