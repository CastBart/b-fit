import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  type: "PERSONAL" | "CLIENT" | "PT" | "ENTERPRISE";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}


// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt"
 
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    type?: "PERSONAL" | "CLIENT" | "PT" | "ENTERPRISE";
  }
}
