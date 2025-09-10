"use server";
import { db } from "@/lib/db/db";
import { auth } from "@/auth"; 
import { UserSettings } from "@/lib/definitions";

export async function updateUserSettings(
  data: UserSettings
) {

  // Ensure the user is authenticated
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to create an exercise." };
  }
  return db.user.update({
    where: { id: session.user.id },
    data: {
      isTwoFactorEnabled: data.isTwoFactorEnabled,
    },
  });
}
