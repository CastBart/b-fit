"use server";
import { signOut } from "@/auth";

export async function handleLogOut() {
  // Sign out and redirect to home
  await signOut({ redirectTo: "/" });
}
