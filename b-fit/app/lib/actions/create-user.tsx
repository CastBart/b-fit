"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { User, websiteLinks } from "../definitions";
import { v4 } from "uuid";
import { sql } from "@vercel/postgres";

// User Form Schema
const UserFormSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

// User Form State
export type RegisterFormState = {
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

const CreateUser = UserFormSchema.omit({ id: true });

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData
) {
  const validatedFields = CreateUser.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  // Check if password and confirmPassword match
  const { fullName, email, password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: ["Passwords do not match"],
        password: ["Passwords do not match"],
      },
      message: "Password mismatch",
    };
  }
  try {
    const user: User = {
      id: v4(),
      name: validatedFields.data.fullName,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    };
    console.log(user);
    const userExists = await sql`
    SELECT COUNT(*)
    FROM users
    WHERE email = '${email}'`;
    console.log(userExists)
  } catch (error) {
    return {
      message: "Database error: Failed to Create User",
    };
  }

  revalidatePath(websiteLinks.welcome.link);
  redirect(websiteLinks.welcome.link);
}
