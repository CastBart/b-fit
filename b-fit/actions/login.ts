"use server";
import * as z from "zod";
import { LoginSchema } from "@/app/schemas";
import { error } from "console";

export async function login(values: z.infer<typeof LoginSchema>){
  const falidatedFields = LoginSchema.safeParse(values);

  if (!falidatedFields.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};
