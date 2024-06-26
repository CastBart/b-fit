"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { User, websiteLinks } from "../definitions";
import { v4 } from "uuid";
import { Pool, sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

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
      message: "Missing Fields. Failed to Create User.",
    };
  }
  // Check if password and confirmPassword match
  const { fullName, email, password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: ["Passwords do not match"],
      },
      message: "Password mismatch",
    };
  }

  //Hash User Password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create User in DB
  try {
    //check if email exists
    const { rows } = await sql`
    SELECT COUNT(*)
    FROM users
    WHERE email = ${email}`;
    const emailCount = parseInt(rows[0].count, 10);
    //create user if email doesnt exist
    if (emailCount === 0) {
      sql`
        INSERT INTO users (email, full_name, password)
        VALUES (${email}, ${fullName}, ${hashedPassword})
      `;
    } else {
      // return email exists error
      return {
        errors: {
          email: ["Email is already in use"],
        },
        message: "Email in use",
      };
    }
    //insert user into DB
    await sql`
    `;
  } catch (error) {
    return {
      message: "Database error: Failed to Create User",
    };
  }

  revalidatePath(websiteLinks.welcome.link);
  redirect(websiteLinks.welcome.link);
}
