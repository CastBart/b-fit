// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { authConfig } from "./auth.config";
// import { z } from "zod";
// import { sql } from "@vercel/postgres";
// import type { User } from "@/app/lib/definitions";
// import bcrypt from "bcryptjs";

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
//     console.log("Fetched user from database:", user.rows[0]); // Debugging line
//     return user.rows[0];
//   } catch (error) {
//     console.error("Failed to fetch user:", error);
//     throw new Error("Failed to fetch user.");
//   }
// }

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);

//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           console.log("User found:", user); // Debugging line
//           if (!user) return null;
//           const passwordsMatch = await bcrypt.compare(password, user.password);
//           if (passwordsMatch) {
//             console.log("Passwords match. User authenticated:", user); // Debugging line
//             return user;
//           }
//         }
//         console.log("Invalid credentials");
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("JWT callback - initial token:", token); // Debugging line
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.name = user.name;
//       }
//       console.log("JWT callback - modified token:", token); // Debugging line
//       return token;
//     },

//     async session({ session, token, user }) {
//       console.log("Session callback - initial session:", session); // Debugging line
//       console.log("Session callback - token:", token); // Debugging line
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.email = token.email as string;
//         session.user.name = token.name as string;
//       }
//       console.log("Session callback - modified session:", session); // Debugging line
//       return session;
//     },
//   },
//   secret: process.env.AUTH_SECRET,
// });

import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig);
