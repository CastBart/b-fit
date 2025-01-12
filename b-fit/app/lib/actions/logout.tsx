"use server";
import { signOut } from "next-auth/react";

export async function handleLogOut() {
  // Sign out and redirect to home
  await signOut({ callbackUrl: "/" });
}
