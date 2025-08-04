"use client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Shadcn Switch
import { handleLogOut } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { UserSettings } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  const user = useCurrentUser();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    user?.isTwoFactorEnabled ?? false
  );
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  function SignOut() {
    handleLogOut();
  }

  function handleToggle(value: boolean) {
    setTwoFactorEnabled(value);
    setChanged(value !== user?.isTwoFactorEnabled);
  }

  async function handleUpdate() {
    setLoading(true);
    const settings: UserSettings = {
      isTwoFactorEnabled: twoFactorEnabled,
    };
    const res = await fetch("/api/settings/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    // Optionally handle response/errors
    setChanged(false);
    setLoading(false);
  }

  return (
    <div className="max-w-[600px] mx-auto p-2">
      {/* <div className="flex flex-col space-y-4 rounded-md border p-4 mt-8 bg-secondary"> */}
      <Card className="w-full shadow-md ">
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
          <CardDescription>Configure your user settings</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="font-bold">
              Name
            </label>
            <span id="username" className="text-muted-foreground">
              {user?.name}
            </span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <span id="email" className="text-muted-foreground">
              {user?.email}
            </span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="account-type" className="font-bold">
              Account Type
            </label>
            <span id="account-type" className="text-muted-foreground">
              {user?.type}
            </span>
          </div>
          <div className="flex flex-col">
            <label htmlFor="two-factor-auth" className="font-bold mb-2">
              Two Factor Authentication
            </label>
            <div className="flex items-center gap-2">
              <Switch
                id="two-factor-auth"
                checked={twoFactorEnabled}
                onCheckedChange={handleToggle}
                disabled={loading}
              />
              <span className="text-muted-foreground">
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {changed && (
            <Button
              onClick={handleUpdate}
              variant="default"
              className="mt-2 w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          )}
          <Button
            onClick={SignOut}
            variant="outline"
            disabled={loading}
            className=" w-full"
          >
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </div>
    // </div>
  );
}
