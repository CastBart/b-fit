// import type { NextAuthConfig } from 'next-auth';
 
// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;

import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Here you can control where users are redirected
      if (user) {
        return true;
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user }) {
      console.log("JWT callback - initial token:", token); // Debugging line
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // Ensure the correct field is used
      }
      console.log("JWT callback - modified token:", token); // Debugging line
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session callback - initial session:", session); // Debugging line
      console.log("Session callback - token:", token); // Debugging line
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      console.log("Session callback - modified session:", session); // Debugging line
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Use your existing logic here to fetch the user and validate
        // Replace this with your existing getUser and validation logic
      }
    })
  ],
  secret: process.env.AUTH_SECRET, // Ensure this is set in your environment
};
