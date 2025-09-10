import { NextResponse } from "next/server";
import { updateUserSettings } from "@/actions/update-user-settings";
import { UserSettings } from "@/lib/definitions";

// This route handles updating user settings, such as enabling/disabling two-factor authentication
export async function POST(req: Request) {

  const settings: UserSettings = await req.json();

  try {
    await updateUserSettings(settings);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
