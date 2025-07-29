"use client";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { handleLogOut } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function SettingsPage() {
  const user = useCurrentUser();
  function SignOut() {
    handleLogOut();
  }
  return (
    <div className="max-w-[600px] mx-auto p-2">
      <div className="flex flex-col space-y-2 rounded-md border p-2 mt-8">
        <div className="flex flex-col">
          <label htmlFor="username" className="font-bold">
            Name
          </label>
          <span id="username">{user?.name}</span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold">
            Email
          </label>
          <span id="email">{user?.email}</span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="account-type" className="font-bold">
            Account Type
          </label>
          <span id="account-type">{user?.type}</span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="two-factor-auth" className="font-bold">
            Two Factor Authentication
          </label>
          <span id="two-factor-auth">
            {user?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
        <Button onClick={SignOut} variant="outline">
          Sign out
        </Button>
      </div>
    </div>
  );
}
