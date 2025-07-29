"use server";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { handleLogOut } from "@/actions/logout";

export default function SettingsServerPage() {
  function SignOut() {
    handleLogOut();
  }
  return (
    <Button
      onClick={SignOut}
      variant="ghost"
      // className="flex h-[48px]  items-center justify-start gap-4 my-2 rounded-md p-3  hover:bg-[#5a7be9]"
    >
      Sign out
    </Button>
  );
}
