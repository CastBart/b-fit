"use server";
import * as z from "zod";
import { CreateExerciseSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function createExercise(
  values: z.infer<typeof CreateExerciseSchema>
) {
  console.log("Server Log - Form values:", values);

  return { success: "Confirmation email sent!", error: "error", data: values };
}
