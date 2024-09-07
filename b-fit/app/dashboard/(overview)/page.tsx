'use client'
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session,status } = useSession();
  console.log("Session data on client:", session);

  if(status === "loading"){
    return <div>Loading...</div>
  }
  return (
    <main>
      <div>Hello {session?.user?.name}, this is user dashboard</div>
    </main>
  );
}
