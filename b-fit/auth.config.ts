import FaceBook from "next-auth/providers/facebook";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth"

export default { providers: [FaceBook, Google] } satisfies NextAuthConfig