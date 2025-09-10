import { db } from "@/lib/db/db";

export async function getTwoFactorConfirmationByUserId(userId: string) {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
}
