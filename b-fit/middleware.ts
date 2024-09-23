// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
 
// export default NextAuth(authConfig).auth;
 
// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET || "";
  console.log("AUTH_SECRET: ", secret);
  // Get the session token from the request cookies.
  const token = await getToken({ req, secret});

  const { pathname } = req.nextUrl; // Get the current path

  // Define the login page path to redirect unauthenticated users.
  const loginPath = "/login";

  // If the token is not present and the user is trying to access a protected route, redirect them to the login page.
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  // If the user is authenticated or accessing non-protected routes, continue the request.
  return NextResponse.next();
}

// Configure the routes where the middleware should be applied
export const config = {
  matcher: ["/dashboard/:path*", "/protected-route/:path*", "/((?!api|_next/static|_next/image|.*\\.png$).*)"], // Protect these routes
};

