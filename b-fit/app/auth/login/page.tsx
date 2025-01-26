import LoginForm from "@/components/auth/login-form";
import React, { Suspense } from "react";

export default function LoginPage(): React.ReactNode {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
