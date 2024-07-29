"use server";
import { signOut } from "@/auth";

export async function handleLogOut() {
  //sign out and redirect to home
  await signOut({ redirectTo: '/'});
}
