'use client'

import { useCurrentUser } from "@/hooks/use-current-user";


export default function Page() {
  // console.log("Session user: ", session?.user);
  const user = useCurrentUser();
  console.log(user)
  return (
    <main>
      <div>Hello {user?.name}, this is user dashboard</div>
    </main>
  );
}
