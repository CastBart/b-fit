import type { NextAuthConfig } from 'next-auth';
import type { User } from "@/app/lib/definitions";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("Is logged in Auth User: ", auth?.user)
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      console.log("JWT callback - initial token:", token); // Debugging line
      console.log("JWT callback - initial User:", user); // Debugging line
      
      if (user) {
        const customUser = user as User;
        token.id = customUser.id;
        token.email = customUser.email;
        token.name = customUser.name;
      }
      console.log("JWT callback - Modified User:", user)
      console.log("JWT callback - modified token:", token); // Debugging line
      return token;
    },

    async session({ session, token}) {
      console.log("Session callback - initial session:", session); // Debugging line
      console.log("Session callback - token:", token); // Debugging line
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      console.log("Session callback - modified session:", session); // Debugging line
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

