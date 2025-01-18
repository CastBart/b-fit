"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function Social() {
  function onClick(provider: "google" | "facebook") {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FaGoogle className="w-5 h-5" />
      </Button>
    </div>
  );
}
