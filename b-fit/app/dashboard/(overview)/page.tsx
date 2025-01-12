'use server'

import { auth } from "@/auth";


export default async function Page() {
  const session = await auth()
  console.log("Session user: ", session?.user);
  return (
    <main>
      <div>Hello {session?.user.name}, this is user dashboard</div>
    </main>
  );
}
